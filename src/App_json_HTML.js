//import logo from './logo.svg';
import './App.css'

export default App //
function App() {
  const test = 'SAIDAS NA CONSOLE'
  //console.log(test)
  //vamos armazenar a URL do JSON
  //var requestURL = 'https://whatstv-api.herokuapp.com/logrobbu'
  //var requestURL = 'https://api.github.com/'

  var requestURL =
    'https://raw.githubusercontent.com/claudiosa/CCS/master/javascript/sample.jason'
  console.log('Origem da url:' + requestURL)

  // precisamos criar uma nova instância de objeto de solicitação a partir do construtor XMLHttpRequest
  var request = new XMLHttpRequest()

  // prepara uma solicitação
  request.open('GET', requestURL)

  //responseType como JSON, para que o XHR saiba que o servidor retornará o JSON
  request.responseType = 'json'

  //envia a solicitação...
  request.send()
  // console.log(request)

  //aguardar a resposta retornar do servidor e, em seguida, lidar com ela
  request.onload = function () {
    //console.log("readyState = " + this.readyState + ", status = " + this.status);

    var Robbu_Jason = request.response

    let str = JSON.stringify(Robbu_Jason)
    // convert it to an object again
    let obj_Jason = JSON.parse(str)
    // NA HTML
    print_names_pets(obj_Jason)

    //print_Robbu(Robbu_Jason)
    //console.log(str);
    console.log('=================================')
    //alert(Robbu_data)
    console.log(test)
    console.log('Saida 0 - BRUTA : ' + Robbu_Jason)
    console.log('Saida 1 - JASON : ' + obj_Jason)
    console.log('Saida 2 - STR : ' + str)

    //console.log('Saida 2 : ' + Robbu_data)
    console.log('END')
  } //  terminou aqui o REQUEST

  // populateHeader( Robbu_data );
  // showHeroes( Robbu_data);
  // <!-- como chamar uma function aqui ... -->
  function data_hora() {
    var dt = new Date()
    console.log(dt)
    return dt.toString()
    //document.getElementById('date-time').innerHTML = window.dt
    //document.getElementById("demo").innerHTML = window.myFunction(10, 2);
  }
  const dt_real = data_hora()

  //chamar para invocar
  return (
    //<h1>{test}</h1>
    //document.getElementById("demo_Robbu").innerHTML = window.data_hora()
    //<div>{resultado}</div>
    <h3>
      <p id="demo_Robbu"> </p>
      <div>{dt_real}</div>
      Done it x! Creating .... x Current Date and Time is:
      <script>print_names_pets(obj_Jason)</script>
    </h3>
  )
}

////////////////////////////////////////////////////////////

function print_Robbu(Robbu_data) {
  //var Robbu_data = JSON.parse(this.responseText)
  /*
  let text = "<table border='2'>"
  for (let i in Robbu_data) {
    text +=
      '<tr><td>' +
      '  ==>  ' +
      Robbu_data[i].current_user_url +
      "'  xxx   '" +
      Robbu_data[i].commit_search_url +
      '</td></tr>'
  }
  text += '</table>'
   document.getElementById('demo_Robbu').innerHTML = text
   */
  document.getElementById('demo_Robbu').innerHTML = Robbu_data
  //Robbu_data[0].current_user_url

  /*
  var myList = document.createElement('ul')
  for (var j = 0; j < Robbu_data.length; j++) {
    var listItem = document.createElement('li')
    listItem.textContent = Robbu_data[j]
    myList.appendChild(listItem)
  }
*/
}
////////////////////////////////////////////////////////////
function print_names_pets(obj) {
  let text_tab = "<table border='2'>"
  for (let i in obj.pets) {
    text_tab +=
      '<tr><td>' +
      '  ==>  ' +
      obj.pets[i].name +
      ' | ' +
      obj.pets[i].animal +
      ' | ' +
      obj.pets[i].colour +
      '</td></tr>'
  }
  text_tab += '</table>'
  // DUVIDA AQUI .... como pegar este IDENTIFICADOR de pagina ?
  document.getElementById('demo_Robbu').innerHTML = text_tab
}
////////////////////////////////////////////////////////////
