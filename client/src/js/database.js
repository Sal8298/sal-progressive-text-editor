import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const putJateNoteDb = await openDB('jate', 1);
  const tx = putJateNoteDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GETfrom the database');
  const getJateNoteDb = await openDB('jate', 1);
  const tx = getJateNoteDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  if (result) {
    console.log('data was retreived!')
  } else {
    console.log('Data was not found. Try again!')
  }
  return result?.value
};

initdb();
