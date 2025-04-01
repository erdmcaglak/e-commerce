import { version } from '@/generated/version';

const DB_NAME = 'cache'
const TABLE_NAME = 'cache-data'

class Cacher {
  #cacheDatas={}

  constructor(){
    this.#initConstructor();
  }

  async #initConstructor(){
    if(process.client){
      if(version !== window?.localStorage?.getItem('version')){
        window?.localStorage?.setItem('version',version);
        this.#clearAll();
      }
      this.#updateCacheDatas();
    }
  }

  async #clearAll(){
    return new Promise(async (resolve,reject)=>{
      const db = await this.#connectToDatabase();
      const transaction = db.transaction(TABLE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(TABLE_NAME);
      const request = objectStore.clear();

      request.onsuccess = event => {
        this.#updateCacheDatas();
        resolve('Table data cleared successfully.');
      };

      request.onerror = event => {
        reject(`Error clearing table data: ${event.target.error}`);
      };
    })
  }

  async #getAllTables(db){
    if(process.client){
      return new Promise((resolve, reject) => {
        const promiseHolder = [];
        
        for(let tbKey in Array.from(db.objectStoreNames)){
          promiseHolder.push(new Promise((resolve,reject)=>{
            let tb = db.objectStoreNames[tbKey];
            const transaction = db.transaction(tb, 'readonly');
            const store = transaction.objectStore(tb);
  
            const request = store.getAll();
  
            request.onsuccess = event => {
              const data = event.target.result;
              const tempObject = {}
  
              for (let item of data) {
                tempObject[item.key] = item.value;
              }
  
              resolve({[tb]:tempObject});
            };
  
            request.onerror = event => {
              reject({[tbKey]:{}});
            };
          }))
        }
  
        Promise.all(promiseHolder).then(values=>{
          let res = {};
  
          for(let item of values){
            for(let key in item){
              res = Object.assign(res,item[key]);
            }
          }
          
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      });
    }
  }

  async #updateCacheDatas(){
    if(process.client){
      const db = await this.#connectToDatabase();
    
      this.#cacheDatas = await this.#getAllTables(db);
    }
  }

  #connectToDatabase() {
    if(process.client){
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME);
        request.onupgradeneeded = event => {
          const db = event.target.result;
          if (TABLE_NAME && !db.objectStoreNames.contains(TABLE_NAME)) {
            db.createObjectStore(TABLE_NAME, { keyPath: 'key' });
            this.#updateCacheDatas();
          }
        };

        request.onsuccess = async event => {
          const db = event.target.result;
          resolve(db);
        };

        request.onerror = event => {
          reject(`Database error: ${event.target.error}`);
        };
      });
    }
  }

  add(key,value){
    if(process.client){
      return new Promise(async (resolve,reject)=>{
        const db = await this.#connectToDatabase(TABLE_NAME);
        const transaction = db.transaction(TABLE_NAME, 'readwrite');
        const store = transaction.objectStore(TABLE_NAME);

        const request = store.put({
          key,
          value:value
        });

        request.onsuccess = event => {
          const data = event.target.result;
          this.#updateCacheDatas();
          resolve(data?.value);
        };
  
        request.onerror = event => {
          reject(`Error getting data from database: ${event.target.error}`);
        };
      })
    }
  }

  get(key){
    if(process.client){
      return new Promise(async (resolve,reject)=>{
        const db = await this.#connectToDatabase(TABLE_NAME);
        const transaction = db.transaction(TABLE_NAME, 'readwrite');
        const store = transaction.objectStore(TABLE_NAME);

        const request = store.get(key);
  
        request.onsuccess = event => {
          const data = event.target.result;
          resolve(data?.value);
        };
  
        request.onerror = event => {
          reject(`Error getting data from database: ${event.target.error}`);
        };
      })
    }
  }
}
export default new Cacher();