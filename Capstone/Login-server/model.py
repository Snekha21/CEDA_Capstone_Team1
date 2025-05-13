from db import get_db_connection

def create_customer(name, email, password):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO customers (name, email, password) VALUES (?, ?, ?)",
                       (name, email, password))
        conn.commit()
        customer_id = cursor.lastrowid
        conn.close()
        return customer_id
    except Exception:
        return None

def login_customer(email, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM customers WHERE email = ? AND password = ?", (email, password))
    row = cursor.fetchone()
    conn.close()
    return row["id"] if row else None

def create_admin(name, email, password):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
                       (name, email, password))
        conn.commit()
        customer_id = cursor.lastrowid
        conn.close()
        return customer_id
    except Exception:
        return None

def login_admin(email, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM admin WHERE email = ? AND password = ?", (email, password))
    row = cursor.fetchone()
    conn.close()
    return row["id"] if row else None