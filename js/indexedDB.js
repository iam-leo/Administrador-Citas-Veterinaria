let DB;

export default function crearDB(){
    //Crear la BD version 1.0
    const DataBase = window.indexedDB.open('citas', 1);

    //Si hay un error en la creación de la BD
    DataBase.onerror = () =>{
        console.log('Hubo un error!');
    }

    //Si se creó correctamente la BD
    DataBase.onsuccess = () =>{
        console.log('BD creada exitosamente');
        DB = DataBase.result;
        console.log(DB);
    }

    //Configuracion de la DB
    DataBase.onupgradeneeded = e =>{
        const db = e.target.result;
        console.log(db);

        const objStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        //Definir columnas
        objStore.createIndex('mascota', 'mascota', { unique: false});
        objStore.createIndex('propietario', 'propietario', { unique: false});
        objStore.createIndex('telefono', 'telefono', { unique: false});
        objStore.createIndex('fecha', 'fecha', { unique: false});
        objStore.createIndex('hora', 'hora', { unique: false});
        objStore.createIndex('sintomas', 'sintomas', { unique: false});
        objStore.createIndex('id', 'id', { unique: true});

        console.log('DB creada y lista');
    }

}

