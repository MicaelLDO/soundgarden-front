
function showEvents(events) {
    const list = document.querySelector('tbody');

    

    events.forEach( (element, index) => {
        const date = new Date(element.scheduled)

        list.innerHTML = list.innerHTML + `<tr>

        <th class='remove' scope="row">${index+1}</th>
        <td class='remove'>${date.toLocaleString('pt-BR')}</td>
        <td>${element.name}</td>
        <td class='remove'>${element.attractions}</td>
        <td>
            <a href="reservas.html" class="btn btn-dark w-100">ver reservas</a>
            <a href="editar-evento.html?id=${element._id}" class="btn btn-secondary w-100">editar</a>
            <a href="excluir-evento.html?id=${element._id}" class="btn btn-danger w-100">excluir</a>

        </td>
        </tr>`

        

        
    });
    
}

async function getEvents (){
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const request = await fetch('https://xp41-soundgarden-api.herokuapp.com/events', options)
    const events = await request.json()
    showEvents(events)

    
}


getEvents() 