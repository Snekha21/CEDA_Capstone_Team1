
import sqlite3

conn = sqlite3.connect('cosmetics.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    product_id TEXT PRIMARY KEY,
    product_name TEXT NOT NULL,
    skin_type TEXT NOT NULL
)
''')

conn.commit()
conn.close()
print("✅ Products table created.")
