
export default class DataBase {

    constructor() {
        this.db;
    }

    init() {
        return new Promise((open, close) => {
            const createDb = () => {
                return new Promise((resolve, reject) => {
                    const req = indexedDB.open('store', 1);
                    req.onupgradeneeded = () => {
                        const db = req.result;
                        if (!db.objectStoreNames.contains('columns')) {
                            db.createObjectStore('columns', {keyPath: 'id'});
                        }
                    };
                    req.onsuccess = () => {
                        resolve(req.result);
                    };
                    req.onblocked = reject;
                })
            }
            const db = async() => {
                const some = await createDb();
                this.db = some;
            }
            db();
            const req = createDb();
            
            open(req);
            
        })
    }

    addObject(item) {
        console.log(this.db);
        const transaction = this.db.transaction('columns', 'readwrite');
        const columns = transaction.objectStore('columns');

        const add = () => {
            return new Promise((resolve, reject) => {
                const req = columns.add(item);
                console.log('skdjafkjf');
                req.onsuccess = () => {
                    resolve(req.result);
                };
                req.onerror = () => {
                    reject(req.error);
                };
            })
        }
        add().then((res) => {
            console.log(res);
        })
    }

    addNote = async(anc) => {
        const transaction = this.db.transaction('columns', 'readwrite');
        const columns = transaction.objectStore('columns');

        const put = () => {
            return new Promise((res, rej) => {
                columns.put(anc);
            })
        }
        await put();
    }

    editColumn(item)  {
        const transaction = this.db.transaction('columns', 'readwrite');
        const columns = transaction.objectStore('columns');
        console.log(item);
        const put = () => {
            return new Promise((res, rej) => {
                columns.put(item);
            })
        }
        const func = async() => {
            await put();
        }
        func();
        
    }
        
    deleteNote(item, id) {
        this.editColumn(id, item);
    }

    deleteColumn(id) {
        const transaction = this.db.transaction('columns', 'readwrite');
        const columns = transaction.objectStore('columns');
        columns.delete(parseInt(id));
    }

    readStorage() {
        return new Promise((open) => {
            const transaction = this.db.transaction('columns', 'readwrite');
            const columns = transaction.objectStore('columns');
            const req = columns.getAll();
            req.onsuccess = () => {
                open(this.items = req.result);
            }
            
            // console.log('working');
            // const read = async() => {
            //     const res = await getAll();
            //     console.log(res.result);
            // }
            // read();
        })
        
        // console.log(columns.getAll());
    }
}
