
import sqlite3

conn = sqlite3.connect('cosmetics.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    review TEXT NOT NULL,
    rating INTEGER NOT NULL
)
''')

conn.commit()
conn.close()
print("✅ Reviews table created.")

