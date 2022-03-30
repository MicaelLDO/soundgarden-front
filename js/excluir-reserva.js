const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const form = document.querySelector('form');




form.onsubmit = async function() {
    try {
        event.preventDefault()
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

       
        
        const request = await fetch(`${BASE_URL}/bookings/` + findId(), options)
        alert('Deletado com sucesso!')
        location.replace(document.referrer);
        
    } catch (error) {
        alert('Ocorreu um erro inesperado')
    }
   
}

async function getDetails(){
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    

    const request = await fetch(`${BASE_URL}/bookings/` + findId(), options)
    const resposta = await request.json();

    document.querySelector('#reserva-nome').value = resposta.owner_name;
    document.querySelector('#reserva-email').value = resposta.owner_email;
    document.querySelector('#reserva-evento').value = resposta.event.name;
    document.querySelector('#reserva-ingressos').value = resposta.number_tickets;

    


}

getDetails();

function findId(){
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    return id
}
