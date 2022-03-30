
const inputNome = document.querySelector("#nome");
const inputDescricao = document.querySelector("#descricao");
const inputAtracoes = document.querySelector("#atracoes");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const inputImagem = document.querySelector("#poster");

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const form = document.querySelector("form");
const loading = document.querySelector("#loading");



form.onsubmit = async (evento) => {
  evento.preventDefault();

  try {

  const strAtracoes = inputAtracoes.value.split(',');
  const fullDateTime = convertDateTime(inputData.value);

  const imageURL = checkImgUrl(inputImagem.value);



    const newEvent = {
      name: inputNome.value,

      poster: imageURL,
      attractions: strAtracoes,
      description: inputDescricao.value,
      scheduled: fullDateTime.toISOString(),
      number_tickets: inputLotacao.value

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
    form.reset();
  
  } catch (error) {
  alert('error!');
  }
}

    function convertDateTime(dateTime) {
      const [day, month, yearTime] = dateTime.split('/');

      let convertDate = [month, day, yearTime].join('/');
      convertDate = new Date(convertDate);
      return convertDate;
    }

    function checkImgUrl (url) {
      const imageExt = url.substring(url.lastIndexOf('.')+1);
      if (imageExt !== 'jpeg' && imageExt !== 'jpg' && imageExt !== 'png') {
        url = 'img/blank.png';
        return url;    
      } else {
        return url;
      }

    }