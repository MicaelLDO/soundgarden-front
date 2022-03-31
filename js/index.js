//Constante de URL Base
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

//Constantes para Lista de Artigos
const getArticles = document.getElementsByTagName('article');
const dateOptions = {day: 'numeric', month: 'numeric', year:'numeric', hour: 'numeric', minute: 'numeric'};

//Constantes para Adicionar Reservas
const form = document.querySelector('form');
const bookingNome = document.querySelector('#form-nome');
const bookingEmail = document.querySelector('#form-email');
const bookingIngressos = document.querySelector('#form-ingressos');

//Constantes para Formulário Modal
const modalMain = document.querySelector('#modal');
const modalBtn = document.querySelectorAll('.open-modal');
const modalBtnClose = document.querySelector('#btn-close');
const modalBtnCancel = document.querySelector('#btn-cancel');



//Pega Lista de Eventos
async function getEvents (){
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const request = await fetch(`${BASE_URL}/events`, options)
    const events = await request.json();
    eventsArticles(events);
    
}

getEvents();

//Função para Adicionar alguns eventos para o Index
function eventsArticles(events) {

    for (let i = 0; i < 3; i++) {
        let eventoData = new Date(events[i].scheduled).toLocaleString('pt-BR', dateOptions);

        getArticles[i].querySelector('h2').innerText = `${events[i].name} - ${eventoData}`;
        getArticles[i].querySelector('h4').innerText = `${events[i].attractions}`;
        getArticles[i].querySelector('p').innerText = `${events[i].description}`;
        getArticles[i].querySelector('a').href = `#modal?id=${events[i]._id}`;
    }
    
}



//Função Async para adicionar Reserva
form.onsubmit = async function(evento) {
    evento.preventDefault();
    
    try {
        const newBooking = {
            owner_name: bookingNome.value,
            owner_email: bookingEmail.value,
            number_tickets: bookingIngressos.value,
            event_id: findId()
        };

        const options = {
            method: "POST",
            body: JSON.stringify(newBooking),
            headers: {
              "Content-Type": "application/json"
            }
        };
        const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings`, options);
        const conteudoResposta = await resposta.json();
        console.log(conteudoResposta);
        alert('Reserva efetuada!')
        form.reset();
      
      } catch (error) {
      alert('Ocorreu um erro inesperado.');
      }
}


//Função para pegar ID do Evento para Reserva
function findId(){
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('=')+1);
    return id
}



//Funções para o Modal
modalBtn.forEach( (valor, index) => {
    modalBtn[index].addEventListener ('click', () => {
        modalMain.style.display = 'block';
    })
})

modalBtnClose.addEventListener ('click', () => {
    
    modalMain.style.display = 'none';
})

modalBtnCancel.addEventListener('click', () => {
    
    modalMain.style.display = 'none';
})

window.addEventListener('click', (evento) => {
    if(evento.target == modalMain) {
        modalMain.style.display = 'none';
    }
})

