import sqlite3

# Function to initialize SQLite database and create users table
def init_db():
    conn = sqlite3.connect('cosmetics.db')
    cursor = conn.cursor()
    
    # Create the 'users' table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Function to add a user (for demonstration purposes)
def add_user(email, password, role):
    conn = sqlite3.connect('cosmetics.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO users (email, password, role)
        VALUES (?, ?, ?)
    ''', (email, password, role))
    
    conn.commit()
    conn.close()

# Initialize the database
init_db()
