from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import base64
import tempfile
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ── API KEYS ──────────────────────────────────────────────────
DATA_GOV_API_KEY  = 'YOUR_DATA_GOV_API_KEY_HERE'
PLANTNET_API_KEY  = '2b10eVax8cog1DDsfJwcFcGqlu'  # ← paste your PlantNet key here

# ── CROP NAME MAPPING ─────────────────────────────────────────
CROP_MAP = {
    'paddy':      'Paddy(Dhan)(Common)',
    'rice':       'Paddy(Dhan)(Common)',
    'wheat':      'Wheat',
    'maize':      'Maize',
    'corn':       'Maize',
    'cotton':     'Cotton',
    'soybean':    'Soybean',
    'soya':       'Soybean',
    'onion':      'Onion',
    'tomato':     'Tomato',
    'potato':     'Potato',
    'groundnut':  'Groundnut',
    'mustard':    'Mustard',
    'chickpea':   'Gram',
    'chana':      'Gram',
    'arhar':      'Arhar (Tur/Red Gram)(Whole)',
    'tur':        'Arhar (Tur/Red Gram)(Whole)',
    'moong':      'Moong (Green Gram)(Whole)',
    'urad':       'Black Gram (Urd Beans)(Whole)',
    'bajra':      'Bajra(Pearl Millet/Cumbu)',
    'jowar':      'Jowar(Sorghum)',
    'sunflower':  'Sunflower',
    'chilli':     'Dry Chillies',
    'turmeric':   'Turmeric',
    'barley':     'Bajra(Pearl Millet/Cumbu)'
}

# ── STATIC MSP FALLBACK (2024-25) ─────────────────────────────
MSP_FALLBACK = {
    'paddy':     {'msp': '2183', 'unit': 'quintal', 'note': 'Common Grade'},
    'rice':      {'msp': '2183', 'unit': 'quintal', 'note': 'Common Grade'},
    'wheat':     {'msp': '2275', 'unit': 'quintal', 'note': ''},
    'maize':     {'msp': '2090', 'unit': 'quintal', 'note': ''},
    'cotton':    {'msp': '7521', 'unit': 'quintal', 'note': 'Long Staple'},
    'soybean':   {'msp': '4892', 'unit': 'quintal', 'note': ''},
    'groundnut': {'msp': '6783', 'unit': 'quintal', 'note': ''},
    'mustard':   {'msp': '5950', 'unit': 'quintal', 'note': ''},
    'chickpea':  {'msp': '5440', 'unit': 'quintal', 'note': ''},
    'arhar':     {'msp': '7550', 'unit': 'quintal', 'note': ''},
    'moong':     {'msp': '8682', 'unit': 'quintal', 'note': ''},
    'urad':      {'msp': '7400', 'unit': 'quintal', 'note': ''},
    'bajra':     {'msp': '2625', 'unit': 'quintal', 'note': ''},
    'jowar':     {'msp': '3371', 'unit': 'quintal', 'note': 'Hybrid'},
    'sunflower': {'msp': '7280', 'unit': 'quintal', 'note': ''},
}

# ── DISEASE TREATMENT DATABASE (local fallback) ───────────────
DISEASE_TREATMENTS = {
    'blight':        {'bio': 'Spray Trichoderma viride 5g/L', 'chem': 'Mancozeb 2.5g/L', 'prev': 'Avoid overhead irrigation. Ensure good drainage.'},
    'rust':          {'bio': 'Neem oil spray 5ml/L', 'chem': 'Propiconazole 1ml/L', 'prev': 'Use resistant varieties. Crop rotation.'},
    'mosaic':        {'bio': 'Remove infected plants immediately', 'chem': 'Control aphid vectors with Imidacloprid 0.5ml/L', 'prev': 'Use virus-free seeds. Control insect vectors.'},
    'rot':           {'bio': 'Apply Trichoderma 5g/L soil drench', 'chem': 'Carbendazim 1g/L', 'prev': 'Avoid waterlogging. Improve field drainage.'},
    'spot':          {'bio': 'Spray Bordeaux mixture 1%', 'chem': 'Chlorothalonil 2g/L', 'prev': 'Remove infected leaves. Avoid wetting foliage.'},
    'wilt':          {'bio': 'Treat soil with Trichoderma viride', 'chem': 'Carbendazim 1g/L soil drench', 'prev': 'Use resistant varieties. Crop rotation.'},
    'mildew':        {'bio': 'Spray baking soda 5g/L + neem oil', 'chem': 'Sulphur 3g/L or Hexaconazole 1ml/L', 'prev': 'Improve air circulation. Avoid excess humidity.'},
    'aphid':         {'bio': 'Neem oil 5ml/L + soap 2ml/L', 'chem': 'Imidacloprid 0.5ml/L', 'prev': 'Yellow sticky traps. Encourage natural predators.'},
    'whitefly':      {'bio': 'Yellow sticky traps. Neem oil spray', 'chem': 'Thiamethoxam 0.3g/L', 'prev': 'Remove heavily infested leaves.'},
    'caterpillar':   {'bio': 'Bacillus thuringiensis (Bt) spray', 'chem': 'Emamectin benzoate 0.5g/L', 'prev': 'Pheromone traps. Manual removal of egg masses.'},
    'deficiency':    {'bio': 'Add compost/FYM 5 tonnes/ha', 'chem': 'Apply recommended NPK fertiliser', 'prev': 'Regular soil testing. Balanced fertilisation.'},
    'default':       {'bio': 'Neem oil spray 5ml/L as general treatment', 'chem': 'Consult local KVK for specific chemical', 'prev': 'Regular crop monitoring. Good field hygiene.'},
}

def get_treatment(disease_name):
    name_lower = disease_name.lower()
    for key in DISEASE_TREATMENTS:
        if key in name_lower:
            return DISEASE_TREATMENTS[key]
    return DISEASE_TREATMENTS['default']


# ══════════════════════════════════════════════════════════════
#  ROUTE 1 — CROP DISEASE DETECTION (PlantNet API — FREE 500/day)
# ══════════════════════════════════════════════════════════════
@app.route('/api/disease', methods=['POST'])
def detect_disease():
    tmp_path = None
    try:
        body      = request.get_json()
        image_b64 = body.get('image')
        language  = body.get('language', 'en')

        if not image_b64:
            return jsonify({'success': False, 'error': 'No image provided.'})

        # Decode base64 image to temp file (PlantNet needs multipart/form-data)
        image_bytes = base64.b64decode(image_b64)
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        tmp.write(image_bytes)
        tmp.close()
        tmp_path = tmp.name

        # ── Step 1: Identify the plant first ──────────────────
        print('Calling PlantNet identify endpoint...')
        with open(tmp_path, 'rb') as img_file:
            identify_resp = requests.post(
                f'https://my-api.plantnet.org/v2/identify/all?api-key={PLANTNET_API_KEY}&lang=en&no-reject=true',
                files=[('images', ('crop.jpg', img_file, 'image/jpeg'))],
                data={'organs': ['leaf']},
                timeout=30
            )

        print(f'PlantNet identify status: {identify_resp.status_code}')
        id_data = identify_resp.json()

        if identify_resp.status_code not in [200, 201]:
            print(f'PlantNet identify error: {id_data}')
            return jsonify({'success': False, 'error': 'Could not identify plant. Please use a clearer photo.'})

        # Get plant name from identification
        results     = id_data.get('results', [])
        plant_name  = 'Unknown Plant'
        plant_score = 0
        if results:
            top        = results[0]
            plant_name = top.get('species', {}).get('commonNames', ['Unknown Plant'])[0] if top.get('species', {}).get('commonNames') else top.get('species', {}).get('scientificNameWithoutAuthor', 'Unknown Plant')
            plant_score = round((top.get('score', 0)) * 100)

        remaining = id_data.get('remainingIdentificationRequests', 'N/A')
        print(f'Plant identified: {plant_name} ({plant_score}%) | Remaining quota: {remaining}')

        # ── Step 2: Call disease endpoint ─────────────────────
        print('Calling PlantNet disease endpoint...')
        with open(tmp_path, 'rb') as img_file:
            disease_resp = requests.post(
                f'https://my-api.plantnet.org/v2/diseases/identify?api-key={PLANTNET_API_KEY}&lang=en&no-reject=true',
                files=[('images', ('crop.jpg', img_file, 'image/jpeg'))],
                data={'organs': ['auto']},
                timeout=30
            )

        print(f'PlantNet disease status: {disease_resp.status_code}')

        if disease_resp.status_code not in [200, 201]:
            # Disease endpoint failed — still return plant identification
            print(f'Disease endpoint error: {disease_resp.text}')
            return jsonify({
                'success':   True,
                'healthy':   True,
                'plant':     plant_name,
                'score':     plant_score,
                'note':      'Plant identified but no disease detected. Crop appears healthy!'
            })

        disease_data = disease_resp.json()
        disease_results = disease_data.get('results', [])

        # No diseases found — plant is healthy
        if not disease_results:
            return jsonify({
                'success': True,
                'healthy': True,
                'plant':   plant_name,
                'score':   plant_score,
            })

        # ── Format disease results ─────────────────────────────
        formatted = []
        for d in disease_results[:3]:
            name  = d.get('species', {}).get('commonNames', [d.get('species', {}).get('scientificNameWithoutAuthor', 'Unknown')])[0] if d.get('species', {}).get('commonNames') else d.get('species', {}).get('scientificNameWithoutAuthor', 'Unknown Disease')
            score = round((d.get('score', 0)) * 100)
            treat = get_treatment(name)

            formatted.append({
                'name':        name,
                'probability': score,
                'description': f'{name} detected on your crop. Confidence: {score}%.',
                'cause':       d.get('species', {}).get('family', {}).get('scientificNameWithoutAuthor', ''),
                'symptoms':    [],
                'treatment': {
                    'biological': [treat['bio']],
                    'chemical':   [treat['chem']],
                    'prevention': [treat['prev']],
                }
            })

        return jsonify({
            'success':  True,
            'healthy':  False,
            'plant':    plant_name,
            'score':    plant_score,
            'diseases': formatted
        })

    except requests.exceptions.Timeout:
        return jsonify({'success': False, 'error': 'Analysis timed out. Please try again with a smaller image.'})
    except Exception as e:
        print(f'Disease detection error: {e}')
        return jsonify({'success': False, 'error': str(e)})
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)


# ══════════════════════════════════════════════════════════════
#  ROUTE 2 — MARKET PRICE
# ══════════════════════════════════════════════════════════════
@app.route('/api/price', methods=['GET'])
def get_price():
    crop  = request.args.get('crop',  '').lower().strip()
    state = request.args.get('state', 'Telangana').strip()

    if not crop:
        return jsonify({'success': False, 'error': 'Please provide a crop name.'})

    commodity = CROP_MAP.get(crop)
    if not commodity:
        supported = ', '.join(CROP_MAP.keys())
        return jsonify({'success': False, 'error': f'Crop "{crop}" not recognised. Supported: {supported}'})

    try:
        url    = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'
        params = {
            'api-key':            DATA_GOV_API_KEY,
            'format':             'json',
            'limit':              '5',
            'filters[commodity]': commodity,
            'filters[state]':     state
        }
        resp = requests.get(url, params=params, timeout=10)
        data = resp.json()

        if not data.get('records') or len(data['records']) == 0:
            params.pop('filters[state]')
            resp = requests.get(url, params=params, timeout=10)
            data = resp.json()

        records = data.get('records', [])
        if records:
            results = []
            for r in records[:5]:
                results.append({
                    'market':      r.get('market',       'N/A'),
                    'district':    r.get('district',     'N/A'),
                    'state':       r.get('state',        'N/A'),
                    'commodity':   r.get('commodity',    commodity),
                    'variety':     r.get('variety',      ''),
                    'min_price':   r.get('min_price',    'N/A'),
                    'max_price':   r.get('max_price',    'N/A'),
                    'modal_price': r.get('modal_price',  'N/A'),
                    'date':        r.get('arrival_date', datetime.now().strftime('%d/%m/%Y'))
                })
            return jsonify({'success': True, 'live': True, 'commodity': commodity, 'state': state, 'results': results, 'date': datetime.now().strftime('%d %b %Y')})

    except Exception as e:
        print(f'Live price API error: {e}')

    msp = MSP_FALLBACK.get(crop)
    if msp:
        return jsonify({'success': True, 'live': False, 'commodity': commodity, 'msp': msp['msp'], 'unit': msp['unit'], 'note': msp['note'], 'message': 'Live mandi data unavailable. Showing Government MSP 2024-25.'})

    return jsonify({'success': False, 'error': 'Could not fetch price. Visit agmarknet.gov.in'})


# ══════════════════════════════════════════════════════════════
#  ROUTE 3 — HEALTH CHECK
# ══════════════════════════════════════════════════════════════
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Farmer Assistant backend is running', 'time': datetime.now().strftime('%d %b %Y %H:%M:%S')})


if __name__ == '__main__':
    app.run(debug=True, port=5001)