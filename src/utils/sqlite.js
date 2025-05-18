import initSqlJs from 'sql.js';

let SQL = null;
let db = null;

// Initialize SQL.js
export const initDatabase = async () => {
  try {
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
    
    // Create a new database
    db = new SQL.Database();
    
    // Create tables (example)
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

// Execute a query
export const executeQuery = (query, params = []) => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  try {
    const result = db.exec(query, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Insert data
export const insertData = (table, data) => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  try {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    db.run(query, values);
    
    return true;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

// Select data
export const selectData = (table, conditions = {}, columns = '*') => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  try {
    let query = `SELECT ${columns} FROM ${table}`;
    const values = [];
    
    if (Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions)
        .map(key => `${key} = ?`)
        .join(' AND ');
      query += ` WHERE ${whereClause}`;
      values.push(...Object.values(conditions));
    }
    
    const result = db.exec(query, values);
    return result;
  } catch (error) {
    console.error('Error selecting data:', error);
    throw error;
  }
};

// Update data
export const updateData = (table, data, conditions) => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  try {
    const setClause = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    const whereClause = Object.keys(conditions)
      .map(key => `${key} = ?`)
      .join(' AND ');
    
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    const values = [...Object.values(data), ...Object.values(conditions)];
    
    db.run(query, values);
    return true;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Delete data
export const deleteData = (table, conditions) => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  try {
    const whereClause = Object.keys(conditions)
      .map(key => `${key} = ?`)
      .join(' AND ');
    
    const query = `DELETE FROM ${table} WHERE ${whereClause}`;
    const values = Object.values(conditions);
    
    db.run(query, values);
    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

// Save database to file
export const saveDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  try {
    const data = db.export();
    const buffer = new Uint8Array(data);
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'database.sqlite';
    a.click();
    
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    throw error;
  }
};

// Load database from file
export const loadDatabase = async (file) => {
  if (!SQL) {
    throw new Error('SQL.js not initialized');
  }
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    db = new SQL.Database(uint8Array);
    return true;
  } catch (error) {
    console.error('Error loading database:', error);
    throw error;
  }
}; 