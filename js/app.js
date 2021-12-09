//Variables
const mascotaInput = document.querySelector('#mascota'),
      propietarioInput = document.querySelector('#propietario'),
      telefonoInput = document.querySelector('#telefono'),
      fechaInput = document.querySelector('#fecha'),
      horaInput = document.querySelector('#hora'),
      sintomasInput = document.querySelector('#sintomas');

const form = document.querySelector('#nueva-cita'),
      contenedorCitas = document.querySelector('#citas');

let editando;

class Citas {
    constructor(){
        this.citas = []
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

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

    imprimirCitas({citas}){
        this.limpiarHTML();
        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

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

        });
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

//Instancias
const ui = new UI();
const administrarCitas = new Citas();
//Funciones
eventListeners()

function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    form.addEventListener('submit', nuevaCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a la clase Cita
function nuevaCita(e){
    e.preventDefault();

    //Extraer info del citaObj
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios.', 'error');
        return;
    }

    if(editando){
        ui.mostrarAlerta('Editado correctamente.', 'success');

        //Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj})

        //Regresar el texto del boton a "Crear cita"
        form.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //quitar modo edición
        editando = false;

    }else{
        //Generar id para cada cita
        citaObj.id = Date.now();

        //Creando nueva cita
        administrarCitas.agregarCita({...citaObj}) //Pasar copia del objeto, sino reescribiria el obj

        //Alerta correcto
        ui.mostrarAlerta('La cita se agregó correctamente.', 'success')
    }

    reiniciarObj();

    //Resetear Form
    form.reset();

    //Mostrar HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

//Reiniciar objeto
function reiniciarObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id){
    //Eliminar cita
    administrarCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.mostrarAlerta('La cita se eliminó correctamente.', 'success');

    //Refrescar citas
    ui.imprimirCitas(administrarCitas);
}

//Cargar datos y modo edicion
function cargarEdicion(cita){
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