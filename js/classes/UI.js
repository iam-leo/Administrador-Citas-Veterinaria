import { eliminarCita, cargarEdicion } from '../funciones.js';
import { DB } from '../indexedDB.js';
import { contenedorCitas } from '../selectores.js';

class UI {
    mostrarAlerta(mensaje, tipo){
        if(tipo === 'error'){
            Swal.fire({
                icon: tipo,
                title: mensaje
              })
        }else{
            Swal.fire({
                icon: tipo,
                title: mensaje
              })
        }
    }

    imprimirCitas(){
        this.limpiarHTML();
        
        //Leer contenido de la BD
        const objStore = DB.transaction('citas').objectStore('citas');

        objStore.openCursor().onsuccess = e =>{
            const cursor = e.target.result;

            if(cursor){
                const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cursor.value;

                //Div contenedor
                const divCita = document.createElement('div');
                divCita.classList.add('cita', 'p-3');
                divCita.dataset.id = id;
    
                //Elementos del div
                const mascotaParrafo = document.createElement('h2');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.textContent = mascota;
    
                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.innerHTML = `<span class="font-weight-bolder"> Propietario: </span> ${propietario}`;
    
                const telefonoParrafo = document.createElement('p');
                telefonoParrafo.innerHTML = `<span class="font-weight-bolder"> Telefóno: </span> ${telefono}`;
    
                const fechaParrafo = document.createElement('p');
                fechaParrafo.innerHTML = `<span class="font-weight-bolder"> Fecha: </span> ${fecha}`;
    
                const horaParrafo = document.createElement('p');
                horaParrafo.innerHTML = `<span class="font-weight-bolder"> Telefóno: </span> ${hora}`;
    
                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.innerHTML = `<span class="font-weight-bolder"> Síntomas: </span> ${sintomas}`;
    
                //Botones
                const divBotones = document.createElement('div');
                divBotones.classList.add('contenedor-botones');
    
                const btnEliminar = document.createElement('button');
                btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
                btnEliminar.innerHTML = `ELIMINAR <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>`;
    
                btnEliminar.onclick = () => eliminarCita(id);
    
                const btnEditar = document.createElement('button');
                btnEditar.classList.add('btn', 'btn-success', 'mr-2');
                btnEditar.innerHTML = `EDITAR <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>`;
                const cita = cursor.value;
                btnEditar.onclick = () => cargarEdicion(cita);
    
                divBotones.appendChild(btnEliminar);
                divBotones.appendChild(btnEditar);
    
                //Agregar los parrafos al div cita
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(divBotones);
    
                //Render cita HTML
                contenedorCitas.appendChild(divCita);

                //Ir al siguiente elemento en la BD
                cursor.continue();
            }
        }
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

export default UI;