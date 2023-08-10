import { openDB } from 'idb';

// Initialize the IndexedDB database
const initializeDatabase = async () => {
  const databaseName = 'jate';
  const databaseVersion = 1;

  const db = await openDB(databaseName, databaseVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(databaseName)) {
        console.log(`${databaseName} database already exists`);
        return;
      }
      db.createObjectStore(databaseName, { keyPath: 'id', autoIncrement: true });
      console.log(`${databaseName} database created`);
    },
  });
};

// Method to add content to the IndexedDB database
export const addToDatabase = async (content) => {
  console.log('Adding to the database');
  const databaseName = 'jate';
  const databaseVersion = 1;

  const jateDb = await openDB(databaseName, databaseVersion);
  const transaction = jateDb.transaction(databaseName, 'readwrite');
  const store = transaction.objectStore(databaseName);
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - Data saved to the database', result.value);
};

// Method to retrieve content from the IndexedDB database
export const retrieveFromDatabase = async () => {
  console.log('Retrieving from the database');
  const databaseName = 'jate';
  const databaseVersion = 1;

  const jateDb = await openDB(databaseName, databaseVersion);
  const transaction = jateDb.transaction(databaseName, 'readonly');
  const store = transaction.objectStore(databaseName);
  const request = store.get(1);
  const result = await request;

  if (result) {
    console.log('🚀 - Data retrieved from the database', result.value);
  } else {
    console.log('🚀 - Data not found in the database');
  }

  // Use Optional Chaining to return the value if defined
  return result?.value;
};

// Initialize the IndexedDB database on script load
initializeDatabase();
