import mysql.connector

# Connect to MySQL server
cnx = mysql.connector.connect(    
    host="localhost",
    user="root",
    password="secret"
    )

# Create a new database
cursor = cnx.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS TechAssignment5")
cursor.execute("USE TechAssignment5")

# Create a new table called Ideas
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Ideas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100),
        competitors VARCHAR(100),
        price FLOAT,
        cost FLOAT,
        market_size INT
    )
""")

# Insert some sample data into the Ideas table
ideas = [
    ('Online Learning Platform', 'Coursera, Udemy, edX', 49.99, 10.0, 10000),
    ('Smart Home Automation', 'Nest, Ecobee, Philips Hue', 199.99, 50.0, 5000),
    ('Virtual Personal Stylist', 'Stitch Fix, Trunk Club, Nordstrom', 99.99, 25.0, 2000),
    ('Healthy Meal Delivery Service', 'Blue Apron, HelloFresh, Freshly', 149.99, 75.0, 10000),
    ('Social Media Marketing Agency', 'Hootsuite, Sprout Social, Buffer', 999.99, 500.0, 500)
]

for idea in ideas:
    cursor.execute("INSERT INTO Ideas (title, competitors, price, cost, market_size) VALUES (%s, %s, %s, %s, %s)", idea)

# Commit changes and close connection
cnx.commit()
cursor.close()
cnx.close()

print("Database and table created successfully!")
