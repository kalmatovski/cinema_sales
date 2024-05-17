###
### ЭТО ПРОСТО КОД, САМ СЕРВЕР ХОСТИТСЯ НА pythonanywhere
###

import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect("cinema.db")
cursor = conn.cursor()

cursor.execute(
    """
CREATE TABLE IF NOT EXISTS Movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    showtime TEXT NOT NULL,
    ticket_available INTEGER NOT NULL
)
"""
)

cursor.execute(
    """
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT  NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)
"""
)
cursor.execute("create table if not exists admin(password varchar)")


cursor.execute("INSERT INTO admin VALUES('ait23')")


cursor.execute(
    """
CREATE TABLE IF NOT EXISTS Sold_Tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES Movies(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
)
"""
)

conn.commit()


@app.route("/add_movie", methods=["POST"])
def add_movie():
    conn = sqlite3.connect("cinema.db")
    cursor = conn.cursor()
    data = request.get_json()

    title = data.get("name")
    description = data.get("description")
    showtime = data.get("showtime")
    ticket_available = data.get("ticket_available")

    if not all([title, description, showtime, ticket_available]):
        return jsonify({"error": "Missing data fields"}), 400
    try:
        cursor.execute(
            """
        INSERT INTO Movies (title, description, showtime, ticket_available)
        VALUES (?, ?, ?, ?)
        """,
            (title, description, showtime, ticket_available),
        )

        conn.commit()
        return jsonify({"message": "Movie added successfully!"}), 201

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


@app.route("/get_movies")
def get_movies():
    conn = sqlite3.connect("cinema.db")
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM Movies")
        movies = cursor.fetchall()

        # Map the results to a list of dictionaries
        movie_list = [
            {
                "id": movie[0],
                "title": movie[1],
                "description": movie[2],
                "showtime": movie[3],
                "ticket_available": movie[4],
            }
            for movie in movies
        ]

        return jsonify(movie_list), 200

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.get_json()

    name = data.get("name")
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not all([name, username, password, email]):
        return jsonify({"error": "Missing data fields"}), 400

    # Hash the password before storing it
    hashed_password = generate_password_hash(password)

    conn = sqlite3.connect("cinema.db")
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
        INSERT INTO Users (name, username, password, email)
        VALUES (?, ?, ?, ?)
        """,
            (name, username, hashed_password, email),
        )

        conn.commit()
        return jsonify({"message": "User added successfully!"}), 201

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


@app.route("/sign_in", methods=["POST"])
def sign_in():
    data = request.get_json()

    email = data.get("username")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "Missing email or password"}), 400

    conn = sqlite3.connect("cinema.db")
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM Users WHERE username = ?", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404

        if not check_password_hash(user[3], password):
            return jsonify({"error": "Incorrect password"}), 401
        user_data = {
            "id": user[0],
            "name": user[1],
            "username": user[2],
            "email": user[4],
        }

        return jsonify({"message": "Sign in successful", "user": user_data}), 200

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


@app.route("/verify_admin")
def verify_admin():
    keyword = request.args.get("password")
    conn = sqlite3.connect("cinema.db")
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM admin WHERE password=?", (keyword,))
    admin = cursor.fetchone()
    if admin:
        return jsonify({"message": "Password verified"}), 200
    else:
        return jsonify({"error": "Wrong password"}), 401
    conn.close()


@app.route("/delete_movie", methods=["DELETE"])
def delete_movie():
    movie_id = request.args.get("id")

    if not movie_id:
        return jsonify({"error": "Missing movie ID"}), 400

    conn = sqlite3.connect("cinema.db")
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM Movies WHERE id = ?", (movie_id,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Movie not found"}), 404

        return jsonify({"message": "Movie deleted successfully!"}), 200

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


if __name__ == "__main__":
    app.run(debug=True)
