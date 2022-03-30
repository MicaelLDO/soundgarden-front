//Declaração de Constantes
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const attractionId = findId();
const alertButton = document.querySelector('#alertbtn');
const alertDiv = document.querySelector('#alertdiv');
const alertClose = document.querySelector('#alertclose');
const getDelete = document.querySelectorAll('a');
const getTitulo = document.querySelector('#reserva-titulo');


//Função para listar reservas 
function showBookings(evento) {
    const list = document.querySelector('tbody');
    console.log(evento);
    getTitulo.innerText = `Gerenciamento de reservas - ${evento[0].event.name}`;
    evento.forEach( (elemento, index) => {

            list.innerHTML = list.innerHTML + `<tr>
            <th scope="row">${index+1}</th>
            <td>${elemento.owner_name}</td>
            <td>${elemento.number_tickets}</td>
            <td>
            <a href="excluir-reserva.html?id=${elemento._id}" class="btn btn-danger">excluir</a>
            </td>
            </tr>` 
        
        
     })

}

async function getReservas (){
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const request = await fetch(`${BASE_URL}/bookings/event/${attractionId}`, options)
    const evento = await request.json()
     showBookings(evento);

    
}

getReservas() 

function findId(){
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('=')+1);
    return id
}


