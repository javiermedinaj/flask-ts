from flask import Flask, jsonify, request, render_template, redirect, url_for

app = Flask(__name__)

#ejemplo de libros para testear
books = [
    {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925},
    {"id": 2, "title": "1984", "author": "George Orwell", "year": 1949}
]

#rutas de la web 
@app.route("/api/books", methods=["GET"])
def get_books_api():
    return jsonify(books), 200

@app.route('/api/books', methods=['POST'])
def add_book_api():
    data = request.get_json()
    if not data or 'title' not in data or 'author' not in data:
        return jsonify({"error": "Title and author are required"}), 400

    new_book = {
        "id": len(books) + 1,
        "title": data['title'],
        "author": data['author'],
        "year": data.get('year')
    }
    books.append(new_book)
    return jsonify(new_book), 201

@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book_api(book_id):
    book = next((book for book in books if book["id"] == book_id), None)
    if book:
        return jsonify(book), 200
    return jsonify({"error": "Book not found"}), 404

@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book_api(book_id):
    data = request.get_json()
    book = next((book for book in books if book["id"] == book_id), None)
    
    if not book:
        return jsonify({"error": "Book not found"}), 404
    
    book["title"] = data.get('title', book["title"])
    book["author"] = data.get('author', book["author"])
    book["year"] = data.get('year', book["year"])
    
    return jsonify(book), 200

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book_api(book_id):
    global books
    book = next((book for book in books if book["id"] == book_id), None)
    
    if not book:
        return jsonify({"error": "Book not found"}), 404
    
    books = [book for book in books if book["id"] != book_id]
    return jsonify({"message": "Book deleted successfully"}), 200

#renderizado de las paginas webs
@app.route('/')
def index():
    return render_template('index.html', books=books)

@app.route('/books/new', methods=['GET', 'POST'])
def new_book():
    if request.method == 'POST':
        title = request.form.get('title')
        author = request.form.get('author')
        year = request.form.get('year')
        
        if not title or not author:
            return render_template('new_book.html', error="Title and author are required")
        
        new_book = {
            "id": len(books) + 1,
            "title": title,
            "author": author,
            "year": int(year) if year else None
        }
        books.append(new_book)
        return redirect(url_for('index'))
    
    return render_template('new_book.html')

@app.route('/books/<int:book_id>/edit', methods=['GET', 'POST'])
def edit_book(book_id):
    book = next((book for book in books if book["id"] == book_id), None)
    
    if not book:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        book["title"] = request.form.get('title', book["title"])
        book["author"] = request.form.get('author', book["author"])
        year = request.form.get('year')
        book["year"] = int(year) if year else None
        return redirect(url_for('index'))
    
    return render_template('edit_book.html', book=book)

@app.route('/books/<int:book_id>/delete', methods=['POST'])
def delete_book(book_id):
    global books
    books = [book for book in books if book["id"] != book_id]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)