import mysql.connector
import pandas as pd
import os

# --- MySQL connection ---
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Alok11@g",
    database="sakila"
)

cursor = conn.cursor()

# --- Output folder ---
output_folder = r"D:\sakila"     # <-- Your output folder location
os.makedirs(output_folder, exist_ok=True)

# --- Get all table names ---
cursor.execute("SHOW TABLES")
tables = cursor.fetchall()

# --- Export each table ---
for (table_name,) in tables:
    print(f"Exporting table: {table_name}")

    # Read table into DataFrame
    df = pd.read_sql(f"SELECT * FROM `{table_name}`", conn)

    # File path for each CSV
    file_path = os.path.join(output_folder, f"{table_name}.csv")

    # Save file
    df.to_csv(file_path, index=False)

    print(f"Saved: {file_path}")

# Close connections
cursor.close()
conn.close()

print("\nAll tables exported successfully!")
