import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import { mascotaInput,
         propietarioInput,
         telefonoInput,
         fechaInput,
         horaInput,
         sintomasInput,
         form
} from './selectores.js';

import { DB } from './indexedDB.js';

//Instancias
export const ui = new UI();
const administrarCitas = new Citas();

let editando;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a la clase Cita
export function nuevaCita(e){
    e.preventDefault();

    //Extraer info del citaObj
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios.', 'error');
        return;
    }

    if(editando){

        //Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj});

        //Editar en indexedDB
        const transaction = DB.transaction(['citas'], 'readwrite');
        const objStore = transaction.objectStore('citas');

        objStore.put(citaObj);

        transaction.oncomplete = () =>{
            ui.mostrarAlerta('Editado correctamente.', 'success');

        //Regresar el texto del boton a "Crear cita"
        form.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //Quitar modo edición
        editando = false;
        }

        transaction.onerror = () =>{
            console.log('Hubo un error al editar cita');
        }

    }else{
        //Generar id para cada cita
        citaObj.id = Date.now();

        //Creando nueva cita
        administrarCitas.agregarCita({...citaObj}) //Pasar copia del objeto, sino reescribiria el obj

        //Insertar registro en IndexedDB
        const transaction = DB.transaction(['citas'], 'readwrite');

        const objStore = transaction.objectStore('citas');

        objStore.add(citaObj);

        transaction.oncomplete = () =>{
            console.log('Cita agregada');
            //Alerta correcto
            ui.mostrarAlerta('La cita se agregó correctamente.', 'success');
        }
    }

    reiniciarObj();

    //Resetear Form
    form.reset();

    //Mostrar HTML de las citas
    ui.imprimirCitas();
}

//Reiniciar objeto
export function reiniciarObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id){
    //Eliminar cita
    const transaction = DB.transaction(['citas'], 'readwrite');
    const objStore = transaction.objectStore('citas');

    objStore.delete(id);

    //Si todo salió bien
    transaction.oncomplete = () =>{
        //Mostrar mensaje
        ui.mostrarAlerta('La cita se eliminó correctamente.', 'success');

        //Refrescar citas
        ui.imprimirCitas();
    }

    //Si hubo un error
    transaction.onerror = () =>{
        console.log('Hubo un error al eliminar cita');
    }
}

//Cargar datos y modo edicion
export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id =id;

    //Cambiar boton del form a "Guardar cambios"
    form.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    editando = true;
}