from flask import request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from models import db, User, Libro
from werkzeug.utils import secure_filename
import logging
import bcrypt
from datetime import datetime

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf', 'epub', 'jpg', 'jpeg', 'png'}

def init_routes(app):
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
            login_user(user)
            logging.info(f"Usuario {username} inició sesión")
            return jsonify({'mensaje': 'Inicio de sesión exitoso'}), 200
        else:
            logging.error(f"Intento de inicio de sesión fallido para {username}")
            return jsonify({'error': 'Credenciales inválidas'}), 401

    @app.route('/logout', methods=['POST'])
    @login_required
    def logout():
        username = current_user.username
        logout_user()
        logging.info(f"Usuario {username} cerró sesión")
        return jsonify({'mensaje': 'Sesión cerrada'}), 200

    @app.route('/upload-book', methods=['POST'])
    @login_required
    def upload_book():
        if 'archivo' not in request.files:
            logging.error("Intento de subida sin archivo")
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
        
        logging.info(f"Libro subido: {titulo} por {current_user.username}")
        return jsonify({'mensaje': 'Libro subido exitosamente', 'id': nuevo_libro.id}), 201