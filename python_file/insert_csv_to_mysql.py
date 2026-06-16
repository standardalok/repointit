import mysql.connector
import pandas as pd
import os
from pathlib import Path

# --- MySQL connection ---
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Alok11@g",
    database="sakila"
)

cursor = conn.cursor()

# --- CSV folder ---
csv_folder = r"D:\Coding\python_file\exported_tables"

# --- Get all CSV files ---
csv_files = [f for f in os.listdir(csv_folder) if f.endswith('.csv')]

print(f"Found {len(csv_files)} CSV files to import.\n")

# --- Insert each CSV into the database ---
for csv_file in csv_files:
    file_path = os.path.join(csv_folder, csv_file)
    table_name = csv_file.replace('.csv', '')
    
    try:
        # Read CSV into DataFrame
        df = pd.read_csv(file_path)
        
        print(f"Processing: {table_name} ({len(df)} rows)")
        
        # Get column names
        columns = df.columns.tolist()
        column_names = ", ".join([f"`{col}`" for col in columns])
        placeholders = ", ".join(["%s"] * len(columns))
        
        # Prepare insert statement
        insert_query = f"INSERT INTO `{table_name}` ({column_names}) VALUES ({placeholders})"
        
        # Convert dataframe to list of tuples
        data_tuples = [tuple(row) for row in df.values]
        
        # Execute batch insert
        cursor.executemany(insert_query, data_tuples)
        conn.commit()
        
        print(f"✓ Successfully inserted {len(df)} rows into '{table_name}'\n")
        
    except Exception as e:
        print(f"✗ Error processing {table_name}: {str(e)}\n")
        conn.rollback()

# Close connections
cursor.close()
conn.close()

print("All CSV files have been processed!")
