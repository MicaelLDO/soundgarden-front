const form = document.querySelector('form')

function findId(){
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    return id
}

async function getApi(){
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    const request = await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findId(), options)
    const response = await request.json()
    return response
}

async function putApi(data){
    const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
        const request = await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findId(), options)
        const response = await request.json()
        return response
}

function convertDateTime(dateTime) {
    const [day, month, yearTime] = dateTime.split('/');
    let convertDate = [month, day, yearTime].join('/');
    convertDate = new Date(convertDate);
    return convertDate.toISOString();
  }

form.onsubmit = async function(){
    try {
        event.preventDefault()

        const data = {
            name: document.querySelector('#nome').value,
            poster: document.querySelector('#banner').value,
            attractions: document.querySelector('#atracoes').value.split(','),
            description: document.querySelector('#descricao').value,
            scheduled: convertDateTime(document.querySelector('#data').value),
            number_tickets: Number(document.querySelector('#lotacao').value),

        }
        
        const response = await putApi(data)


        alert('Dado atualizado com sucesso!')
        window.location.pathname = "/admin.html"
    } catch (error) {
        debugger 
        console.error(error)
    }

}

async function getDetails(){
    const response = await getApi()
    const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    const date = new Date(response.scheduled)

    document.querySelector('#nome').value = response.name
    document.querySelector('#banner').value = response.poster
    document.querySelector('#atracoes').value = response.attractions
    document.querySelector('#descricao').value = response.description
    document.querySelector('#data').value = date.toLocaleString('pt-BR', options)
    document.querySelector('#lotacao').value = response.number_tickets

}


getDetails()