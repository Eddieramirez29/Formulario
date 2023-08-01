const buttonEliminar = document.querySelector('#delete');
const buttonEnviar = document.querySelector('#send');
const buttonEliminarDOM = document.querySelector('#deleteDOM');



// Obtener el elemento padre que contiene los botones
const contenedor = document.querySelector(".list-group");

// Adjuntar un evento click al elemento padre
contenedor.addEventListener("click", function(event) 
{
  // Verificar si el evento proviene de un botón
  if (event.target && event.target.matches(".list-group-item")) {
    // El botón ha sido presionado
    const botonPresionado = event.target;
    console.log("Botón presionado:", botonPresionado.textContent);
  }

  for(let cont = 4; cont >= 0; cont--)
        {
            eliminar(cont);
        }
});

//Evento del botón eliminar base de datos
buttonEliminar.addEventListener('click', (event) => {
    event.preventDefault();    

    deleteData();

});




function eliminar(cont)
{
    const elementosEliminar = document.getElementsByClassName('list-group-item');
        console.log(elementosEliminar);
    if (elementosEliminar.length > 0) 
    {
      const elementoEliminar = elementosEliminar[cont]; // Aquí puedes implementar la lógica para seleccionar el elemento que desees eliminar
      elementoEliminar.remove();
      
    } 
    else
    {
      alert('No hay elementos para eliminar.');
    }
}
 
//Evento del botón enviar. Envia un dato a la base de datos
buttonEnviar.addEventListener('click', (event) => {
    event.preventDefault();    

    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const birthdate = document.querySelector('#birthdate');
    const country = document.querySelector('#country');


    const persona = 
    {
        firstName: firstName.value,
        lastName:lastName.value,
        birthdate:birthdate.value,
        country:country.value,
        
    };
    //Manda la información a la base de datos
    
    createData(persona);
    

    // //Espera 1.5 segs después de enviar la información
     setTimeout(eliminarCamposDeTextoDespuesDeEnviar, 1500);

    // //Método que realiza la operación de mostrar los datos en el DOM
    mostrarDatosEnElDOM(persona);
    

});

//Funcion para mostrar los datos en el DOM
function  mostrarDatosEnElDOM(persona) 
{
    crearBotonEliminar();

    //Recorre todo el objeto persona para imprimirlos en la lista
    Object.keys(persona).forEach((item) =>
    {
        const lista = document.querySelector('.list-group');
        const nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = persona[item];
     // Paso 4: Agregar la clase "list-group-item" al nuevo elemento <li>
        nuevoElemento.classList.add('list-group-item');
        lista.appendChild(nuevoElemento);
        
    }
    )

    
}

function crearBotonEliminar()
{
        const lista = document.querySelector('.list-group');
        const nuevoBoton = document.createElement('button');
        
        nuevoBoton.textContent = "Eliminar";
        nuevoBoton.style.background = "red";
     // Paso 4: Agregar la clase "list-group-item" al nuevo elemento <li>
        nuevoBoton.classList.add('list-group-item');
        lista.appendChild(nuevoBoton);
        
}


// //Eliminar datos del DOM
// function eliminarDatosDelDOM()
// {
   
        
        
// }


//Función para eliminar los campos de text después del click en el botón enviar
function eliminarCamposDeTextoDespuesDeEnviar()
{
    firstName.value = "";
    lastName.value = "";
    birthdate.value = "";
    country.value = "";
}

//La función tiene que ser asincrona
//Envia datos a la base de datos
const createData = async(persona) =>
{
    /*El primer argumento es el endpoint
    El proceso a esperar sera el "fetch"*/
    const response = await fetch("https://kodemiajs26-default-rtdb.firebaseio.com/.json", 
    {
        method: "POST",
        /*Indica que lo que se va a pasar en el body, será convertido a JSON
        Si no se agrega, este será agregado en automatico*/
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        },

        
        body: JSON.stringify(persona),


    });
};



//Lee los datos de la base de datos

const getData = async() =>
{
    const response = await fetch("https://kodemiajs26-default-rtdb.firebaseio.com/.json", 
    {
        //Leer
        method: "GET",    
    });

    const data = await response.json();

    const array = await Object.entries(data);

    array.map((item) => {
        const object = {
            id: item[0],
            age: item[1].age,
            name: item[1].name
        };
        console.log("Datos: " + object.id);

        //Guarda el ID del usuario de la base de datos.
        arregloIdUsuario[contIdUsuario] = object.id;
        contIdUsuario++;
        
    
    });

};
// createData();
getData();

//Extraer información de algo en especifico -NaTxaty7ENR8Z3_ER8U
const getDataById= async() =>
{
    const response = await fetch("https://kodemiajs26-default-rtdb.firebaseio.com/-NaTxaty7ENR8Z3_ER8U.json", 
    {
        //Leer
        method: "GET",    
    });
    const data = await response.json();
    console.log(data);//Devuelve un objeto
}


// getDataById();



 //Modificar un elemento
 const updateDataById= async() =>
{
    const response = await fetch("https://kodemiajs26-default-rtdb.firebaseio.com/-NaTxaty7ENR8Z3_ER8U.json", 
    {
        //Leer
        method: "PUT",    
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({name: "Actualizado"}),
    });

    const data = await response.json();

    console.log(data);
    
}

//updateDataById();


//Eliminar toda la base de datos

const deleteData = async() =>
{
    /*El primer argumento es el endpoint
    El proceso a esperar sera el "fetch"*/
    const response = await fetch("https://kodemiajs26-default-rtdb.firebaseio.com/.json", 
    {
        method: "PUT",
        /*Indica que lo que se va a pasar en el body, será convertido a JSON
        Si no se agrega, este será agregado en automatico*/
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({}),
    });
    const data = await response.json();

};

//Eliminar un solo usuario por su id
//Eliminar toda la base de datos

const deleteDataOneUser = async() =>
{
    /*El primer argumento es el endpoint
    El proceso a esperar sera el "fetch"*/
    //Fusionar la url con el id del usuario a borrar
    const response = await fetch("https://kodemiajs26-default-rtdb.firebaseio.com/.json", 
    {
        method: "PUT",
        /*Indica que lo que se va a pasar en el body, será convertido a JSON
        Si no se agrega, este será agregado en automatico*/
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({}),


    });

    const data = await response.json();

    console.log(data);
};


