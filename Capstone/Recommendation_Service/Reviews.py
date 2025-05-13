import sqlite3

reviews = [
    ('P001', 'This is a really hydrating cream', 5),
    ('P003', 'Not good at all, made my skin worse', 1),
    ('P001', 'Decent quality and lasts long', 4),
    ('P004', 'Worst product I ever used', 2),
    ('P002', 'Very lightweight and perfect for oily skin', 5),
    ('P002', 'Caused breakouts', 2),
]

conn = sqlite3.connect('cosmetics.db')
cursor = conn.cursor()

cursor.executemany('INSERT INTO reviews (product_id, review, rating) VALUES (?, ?, ?)', reviews)

conn.commit()
conn.close()
print("✅ Sample reviews inserted.")

