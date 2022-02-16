import App from "./classes/App.js";
import crearDB from "./indexedDB.js";

window.onload = () =>{
    const app = new App();
    crearDB();
}

// eventListeners()

// function eventListeners(){
//     mascotaInput.addEventListener('input', datosCita);
//     propietarioInput.addEventListener('input', datosCita);
//     telefonoInput.addEventListener('input', datosCita);
//     fechaInput.addEventListener('input', datosCita);
//     horaInput.addEventListener('input', datosCita);
//     sintomasInput.addEventListener('input', datosCita);

//     form.addEventListener('submit', nuevaCita);
// }