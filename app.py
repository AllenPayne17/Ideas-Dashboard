from flask import Flask, render_template, request, jsonify
import mysql.connector

# create a Flask app
app = Flask(__name__)

# define the index route
@app.route("/")
def index():
    return render_template("index.html")

# define the dashboard route
@app.route("/Dashboard")
def Dashboard():
    return render_template("Dashboard.html")

# define database connection parameters
host = "localhost"
user = "root"
password = "secret"
database = "TechAssignment5"

# create a MySQL connector
mydb = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)

# create a cursor object
cursor = mydb.cursor()

# define the get all ideas API
@app.route("/idea", methods=["GET"])
def get_all_ideas():
    cursor.execute("SELECT * FROM Ideas")
    result = cursor.fetchall()
    return jsonify(result)

# define the get idea by ID API
@app.route("/idea/<int:idea_id>", methods=["GET"])
def get_idea_by_id(idea_id):
    cursor.execute(f"SELECT * FROM Ideas WHERE id={idea_id}")
    result = cursor.fetchone()
    return jsonify(result)

# define the add idea API
@app.route("/addidea", methods=["POST"])
def add_idea():
    data = request.get_json()
    query = """
    INSERT INTO Ideas (title, competitors, price, cost, market_size)
    VALUES (%s, %s, %s, %s, %s)
    """
    values = (
        data["title"],
        data["competitors"],
        data["price"],
        data["cost"],
        data["market_size"]
    )
    cursor.execute(query, values)
    mydb.commit()
    return jsonify({"message": "Idea added successfully"})

# define the update idea API
@app.route("/idea/<int:idea_id>", methods=["PUT"])
def update_idea(idea_id):
    data = request.get_json()
    query = """
    UPDATE Ideas SET
    title = %s,
    competitors = %s,
    price = %s,
    cost = %s,
    market_size = %s
    WHERE id = %s
    """
    values = (
        data["title"],
        data["competitors"],
        data["price"],
        data["cost"],
        data["market_size"],
        idea_id
    )
    cursor.execute(query, values)
    mydb.commit()
    return jsonify({"message": "Idea updated successfully"})

# define the delete idea API
@app.route("/idea/<int:idea_id>", methods=["DELETE"])
def delete_idea(idea_id):
    query = f"DELETE FROM Ideas WHERE id={idea_id}"
    cursor.execute(query)
    mydb.commit()
    return jsonify({"message": "Idea deleted successfully"})

# run the app
if __name__ == "__main__":
    app.run()
