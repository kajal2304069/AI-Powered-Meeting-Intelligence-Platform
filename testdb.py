from database.db import engine   # if file remains dp.py

try:
    connection = engine.connect()
    print("✅ PostgreSQL Connected Successfully!")
    connection.close()
except Exception as e:
    print("❌ Connection Failed")
    print(e)
