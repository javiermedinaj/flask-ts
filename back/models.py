from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin

db = SQLAlchemy()

class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    archivo = db.Column(db.String(200), nullable=False)
    categoria = db.Column(db.String(50), nullable=True)
    fecha = db.Column(db.String(20), nullable=False, default=datetime.now().strftime('%Y-%m-%d'))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)