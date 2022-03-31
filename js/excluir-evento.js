const form = document.querySelector('form')

function findId(){
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    return id
}

form.onsubmit = async function() {
    try {
        event.preventDefault()
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

       
        
        const request = await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findId(), options)
        alert('Deletado com sucesso!')
        window.location.pathname = "/soundgarden-front/admin.html"
        
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
    

    const request = await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findId(), options)
    const event = await request.json()

    const date = new Date(event.scheduled)

    document.querySelector('#nome').value = event.name
    document.querySelector('#banner').value = event.poster
    document.querySelector('#atracoes').value = event.attractions
    document.querySelector('#descricao').value = event.description
    document.querySelector('#data').value = date.toLocaleString()
    document.querySelector('#lotacao').value = event.number_tickets

}

getDetails()
