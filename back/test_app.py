import pytest
import os
import io
from app import app, db, User
import bcrypt
from flask_login import current_user


@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['WTF_CSRF_ENABLED'] = False

    with app.app_context():
        db.create_all()
        # Create test user
        hashed_password = bcrypt.hashpw(
            'testpassword'.encode('utf-8'), bcrypt.gensalt())
        test_user = User(username='testuser', password=hashed_password)
        db.session.add(test_user)
        db.session.commit()

    client = app.test_client()

    yield client

    with app.app_context():
        db.drop_all()


def test_check_session_when_not_logged_in(client):
    response = client.get('/check-session')
    assert response.status_code == 401
    data = response.get_json()
    assert data['isLoggedIn'] == False


def test_successful_login(client):
    credentials = {'username': 'testuser', 'password': 'testpassword'}
    response = client.post('/login', json=credentials)
    assert response.status_code == 200
    data = response.get_json()
    assert 'mensaje' in data
    assert data['mensaje'] == 'Inicio de sesión exitoso'


def test_failed_login(client):
    credentials = {'username': 'testuser', 'password': 'wrongpassword'}
    response = client.post('/login', json=credentials)
    assert response.status_code == 401
    data = response.get_json()
    assert 'error' in data


def test_check_session_when_logged_in(client):
    # Login first
    credentials = {'username': 'testuser', 'password': 'testpassword'}
    client.post('/login', json=credentials)

    # Now check session
    response = client.get('/check-session')
    assert response.status_code == 200
    data = response.get_json()
    assert data['isLoggedIn'] == True
    assert data['username'] == 'testuser'


def test_logout(client):
    # Login first
    credentials = {'username': 'testuser', 'password': 'testpassword'}
    client.post('/login', json=credentials)

    # Now logout
    response = client.post('/logout')
    assert response.status_code == 200

    # Verificacion de logeos
    session_check = client.get('/check-session')
    assert session_check.status_code == 401


def test_upload_book_without_login(client):
    # Try to upload a book without logging in
    data = {
        'titulo': 'Test Book',
        'autor': 'Test Author',
        'descripcion': 'Test Description',
        'categoria': 'Test Category'
    }
    file = (io.BytesIO(b"test content"), 'test.pdf')
    response = client.post('/upload-book', data={**data, 'archivo': file})
    # Flask-Login redirects to login page instead of returning 401
    assert response.status_code == 302


def test_upload_book_with_login(client):
    # Login first
    credentials = {'username': 'testuser', 'password': 'testpassword'}
    client.post('/login', json=credentials)

    # Prepare data for book upload
    data = {
        'titulo': 'Test Book',
        'autor': 'Test Author',
        'descripcion': 'Test Description',
        'categoria': 'Test Category'
    }

    # Create file-like object for testing
    file_data = (io.BytesIO(b"test content"), 'test.pdf')

    # Make request with multipart/form-data
    response = client.post(
        '/upload-book',
        data={**data, 'archivo': file_data},
        content_type='multipart/form-data'
    )

    assert response.status_code == 201
    data = response.get_json()
    assert 'mensaje' in data
    assert data['mensaje'] == 'Libro subido exitosamente'
    assert 'id' in data
