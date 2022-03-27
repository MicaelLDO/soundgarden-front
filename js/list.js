
function showEvents(events) {
    const list = document.querySelector('tbody');

    

    events.forEach( (element, index) => {
        const date = new Date(element.scheduled)

        list.innerHTML = list.innerHTML + `<tr>
        <th scope="row">${index+1}</th>
        <td>${date.toLocaleString('pt-BR')}</td>
        <td>${element.name}</td>
        <td>${element.attractions}</td>
        <td>
            <a href="reservas.html" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html?id=${element._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${element._id}" class="btn btn-danger">excluir</a>
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