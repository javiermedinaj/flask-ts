from flask import Flask, request, jsonify
from models import db, Libro
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import logging

app = Flask(__name__)

# Ruta donde se va a crear la db
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(BASE_DIR, "instance", "database.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'pdf', 'epub', 'jpg', 'jpeg', 'png', 'txt'}

# logging.basicConfig(filename='biblioteca.log', level=logging.INFO,
#                     format='%(asctime)s %(levelname)s %(message)s')

db.init_app(app)

#verificacion de q existe la carpeta instance
instance_dir = os.path.join(BASE_DIR, 'instance')
if not os.path.exists(instance_dir):
    os.makedirs(instance_dir)

with app.app_context():
    db.create_all()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# ruta post para subir libros 
@app.route('/upload-book', methods=['POST'])
def upload_book():
    if 'archivo' not in request.files:
        logging.error("Intento de subida sin archivo o archivo no válido")
        return jsonify({'error': 'No se envió archivo'}), 400
    
    archivo = request.files['archivo']
    if archivo.filename == '' or not allowed_file(archivo.filename):
        logging.error(f"Archivo no válido: {archivo.filename}")
        return jsonify({'error': 'Archivo no válido'}), 400
    
    filename = secure_filename(archivo.filename)
    ruta_archivo = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    archivo.save(ruta_archivo)
    
    titulo = request.form.get('titulo')
    autor = request.form.get('autor')
    descripcion = request.form.get('descripcion')
    categoria = request.form.get('categoria')
    
    if not titulo or not autor:
        logging.error("Faltan datos obligatorios en libro")
        return jsonify({'error': 'Título y autor son obligatorios'}), 400
    
    nuevo_libro = Libro(
        titulo=titulo,
        autor=autor,
        descripcion=descripcion,
        archivo=ruta_archivo,
        categoria=categoria,
        fecha=datetime.now().strftime('%Y-%m-%d')
    )
    db.session.add(nuevo_libro)
    db.session.commit()
    
    logging.info(f"Libro subido: {titulo}")
    return jsonify({'mensaje': 'Libro subido exitosamente', 'id': nuevo_libro.id}), 201

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True, port=5000)