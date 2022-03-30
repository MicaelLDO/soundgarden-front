const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector("#nome");
const inputDescricao = document.querySelector("#descricao");
const inputAtracoes = document.querySelector("#atracoes");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const inputImagem = document.querySelector("#poster");

const form = document.querySelector("form");


form.onsubmit = async (evento) => {
  evento.preventDefault();

  try {

  const strAtracoes = inputAtracoes.value.split(',');
  const fullDateTime = convertDateTime(inputData.value);


    const newEvent = {
      name: inputNome.value,
      poster: inputImagem.value,
      attractions: strAtracoes,
      description: inputDescricao.value,
      scheduled: fullDateTime.toISOString(),
      number_tickets: parseInt(inputLotacao.value)
    };

    
        const options = {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const resposta = await fetch(`${BASE_URL}/events`, options);
    const conteudoResposta = await resposta.json();
    alert('Evento cadastrado com sucesso!')
    form.reset();
  
  } catch (error) {
    alert('Erro inesperado');
  }
}

    function convertDateTime(dateTime) {
      const [day, month, yearTime] = dateTime.split('/');
      const convertDate = new Date([month, day, yearTime]);
      return convertDate;
    }