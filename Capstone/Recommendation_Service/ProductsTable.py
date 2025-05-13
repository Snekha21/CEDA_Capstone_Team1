import sqlite3

# Connect to the database
conn = sqlite3.connect('cosmetics.db')
cursor = conn.cursor()

# Create the products table if it doesn't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    product_id TEXT PRIMARY KEY,
    product_name TEXT NOT NULL,
    skin_type TEXT NOT NULL
)
''')

# Clear existing data (optional, to avoid duplicates)
cursor.execute('DELETE FROM products')

# Insert skin care products with appropriate skin_type values
products = [
    ('P001', 'Hydrating Day Cream', 'dry'),
    ('P002', 'Oil-Free Gel Moisturizer', 'oily'),
    ('P003', 'Soothing Aloe Vera Gel', 'sensitive'),
    ('P004', 'Lightweight SPF Moisturizer', 'all'),
    ('P005', 'Mattifying Toner', 'oily'),
    ('P006', 'Ceramide Night Cream', 'dry')
]

cursor.executemany('INSERT INTO products (product_id, product_name, skin_type) VALUES (?, ?, ?)', products)

# Commit and close connection
conn.commit()
conn.close()

print("✅ Products table with skin care items.")
