import { version } from '@/generated/version';

const DB_NAME = 'cache'

class Cacher {
  #cacheDatas={}

  // async #checkCache(){
  //   if(Object.keys(this.#cacheDatas).length > 0) return;
  //   if(process.client){
  //     this.#initConstructor();
  //   }
  // }

  // async #initConstructor(){
  //   if(version !== window?.localStorage?.getItem('version')){
  //     await this.clearCache(true);
  //     window?.localStorage?.setItem('version',version);
  //   }

  //   await this.#updateCacheDatas();
  // }

  // async #updateCacheDatas(){
  //   if(process.client){
  //     const db = await this.#connectToDatabase();
    
  //     this.#cacheDatas = await this.#getAllDatas(db);

  //     console.log({tempppp:this.#cacheDatas})
  //   }
  // }

  #connectToDatabase(tableName) {
    if(process.client){
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME);
      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (tableName && !db.objectStoreNames.contains(tableName)) {
          db.createObjectStore(tableName, { keyPath: 'key' });
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

  // #getAllDatas(db) {
  //   return new Promise((resolve, reject) => {
  //     const promiseHolder = [];

  //     for(let tbKey in db.objectStoreNames){
  //       promiseHolder.push(new Promise((resolve,reject)=>{
  //         let tb = db.objectStoreNames[tbKey];
  //         const transaction = db.transaction(tb, 'readonly');
  //         const store = transaction.objectStore(tb);

  //         const request = store.getAll();

  //         request.onsuccess = event => {
  //           const data = event.target.result;
  //           const tempObject = {}

  //           for (let item of data) {
  //             tempObject[item.key] = item.value;
  //           }

  //           resolve({[tbKey]:tempObject});
  //         };

  //         request.onerror = event => {
  //           reject({[tbKey]:{}});
  //         };
  //       }))
  //     }

  //     Promise.all(promiseHolder).then(values=>{
  //       const res = {};

  //       for(let key in values){
  //         res[key] = values[key].value
  //       }
        
  //       resolve(res);
  //     }).catch(err=>{
  //       reject(err);
  //     })
  //   });
  // }

  get(tableName,key){
    if(process.client){
      return new Promise(async (resolve,reject)=>{
        const db = await this.#connectToDatabase(tableName);
        const transaction = db.transaction(tableName, 'readwrite');
        const store = transaction.objectStore(tableName);
  
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