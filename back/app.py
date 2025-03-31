from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db, User
from flask_login import LoginManager
import os
import logging
import bcrypt
from routes import init_routes 
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(BASE_DIR, "instance", "database.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'clave_secreta'  
app.config['UPLOAD_FOLDER'] = 'uploads'


logging.basicConfig(filename='biblioteca.log', level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s')

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

instance_dir = os.path.join(BASE_DIR, 'instance')
if not os.path.exists(instance_dir):
    os.makedirs(instance_dir)
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

with app.app_context():
    db.create_all()
    if not User.query.filter_by(username='admin').first():
        hashed_password = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt())
        admin = User(username='admin', password=hashed_password)
        db.session.add(admin)
        db.session.commit()

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

init_routes(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)