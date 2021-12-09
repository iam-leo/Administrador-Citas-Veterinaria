import { datosCita, nuevaCita} from '../funciones.js';
import { mascotaInput,
         propietarioInput,
         telefonoInput,
         fechaInput,
         horaInput,
         sintomasInput,
         form
} from '../selectores.js';

class App{
    constructor(){
        this.initiApp();
    }

    initiApp(){
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        form.addEventListener('submit', nuevaCita);
    }
}

export default App;