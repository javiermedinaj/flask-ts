import pytest
from app import app 

@pytest.fixture
def client():
    app.config["TESTING"] = True 
    with app.test_client() as client:
        yield client
def test_get_books_api(client):
    response = client.get("/api/books")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)

def test_add_book_api(client):
    new_book = {
        "title": "Test Book",
        "author": "Test Author",
        "year": 2025
    }
    response = client.post("/api/books", json=new_book)
    assert response.status_code == 201
    data = response.get_json()
    assert data["title"] == new_book["title"]
    assert data["author"] == new_book["author"]
    assert data["year"] == new_book["year"]

def test_get_book_api(client):
    new_book = {"title": "Book For Get", "author": "Author", "year": 2022}
    post_response = client.post("/api/books", json=new_book)
    created_book = post_response.get_json()
    
    response = client.get(f"/api/books/{created_book['id']}")
    assert response.status_code == 200
    data = response.get_json()
    assert data["id"] == created_book["id"]

def test_update_book_api(client):
    new_book = {"title": "Old Title", "author": "Old Author", "year": 2000}
    post_response = client.post("/api/books", json=new_book)
    book = post_response.get_json()

    updated_data = {"title": "New Title", "author": "New Author", "year": 2020}
    put_response = client.put(f"/api/books/{book['id']}", json=updated_data)
    assert put_response.status_code == 200
    data = put_response.get_json()
    assert data["title"] == updated_data["title"]
    assert data["author"] == updated_data["author"]
    assert data["year"] == updated_data["year"]

def test_delete_book_api(client):
    new_book = {"title": "To be deleted", "author": "Author", "year": 1999}
    post_response = client.post("/api/books", json=new_book)
    book = post_response.get_json()

    delete_response = client.delete(f"/api/books/{book['id']}")
    assert delete_response.status_code == 200
    data = delete_response.get_json()
    assert "message" in data

def test_index_page(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"Book Library" in response.data

def test_new_book_page(client):
    response = client.get("/books/new")
    assert response.status_code == 200
    assert b"Add New Book" in response.data
