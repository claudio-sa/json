//import logo from './logo.svg'
import React, { useState, useEffect } from 'react'
//import ReactDOM from 'react-dom'
import './App.css'
import axios from 'axios'
//import stringifyObject from 'stringify-object'

export default App //
//ReactDOM.render(<App />, document.getElementById('app'))

// function data_hora() {
//   var dt = new Date()
//   console.log(dt)
//   return dt.toString()
// }

/*
MOSTRA A URL
read_an_URL().catch((error) => {
  //error.message // 'An error has occurred: 404'
  console.log('Error here', error.message)
})
*/

///////////////////////////////

function App() {
  const [textoAPI, setTextoAPI] = useState('')
  // nao usei
  const [arrayTratado, setArrayTratado] = useState([])

  const saidas = 'SAIDAS NA CONSOLE'

  // const api = axios.create({
  //   baseURL: 'https://api.github.com',
  // })

  async function get_an_URL(umaURL) {
    const response_data = await axios
      .create()
      .get(umaURL)
      .then((response) => response.data)
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err)
      })

    //const text = await response
    //setArrayTratado(response_data)
    //console.log(arrayTratado)

    //console.log(response_data)
    //console.log('....==> OK ateh aqui')
    montaOArray(response_data)
  }
  /*
  async function read_an_URL(an_URL) {
    const response = await fetch(an_URL)

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      // console.log('Error here :', response.ok, message)
      throw new Error(message)
    }
    const text = await response.text()
    setTextoAPI(text)
    //console.log(text)
    // inicio do tratamento
    montaOArray(text) // Chamada principal
    // remove_cabecalho(textoAPI) //feito
    // setArrayTratado(textoAPI)

    // console.log(' ==> ', text) // tem que consumir para vir...
    // Expressao regular
    //var varios_iguais = '/[^=]\n/g'
    //var varios_iguais =
    //  '=============================================================================================================================\n'
    //console.log(text)
    //const array_sem_iguais = text.split(varios_iguais)

    // console.log(' ==> ', array_sem_iguais)
    // return array_sem_iguais
    //return text
  }
*/
  const teste = [
    { id: 1, name: 'pereira 1' },
    { id: 2, name: 'pereira 2' },
    { id: 2, name: 'pereira 3' },
    { id: 4, name: 'pereira 3', age: '33' },
    { erro: '27' },
  ]

  // const testeParse = JSON.parse([{ id: 1, name: 'pereira 1' }])
  const teste2 = [{ receivedAt: '2021-11-25T10:50:18', direction: 'incoming' }]
  /* 
  Idéia usada:
  o. Remove ASPAS 
  o. Remove \ a mais
  o. Separar o arquivao ... em um array sem os =====
  o. Filtrar as mensagens de interesse
  o. Remover a sujeira no prefixo de cada item no array
  o. Stringfy ===> voltou UMA string novamente .... ( mudar a partir daqui )
  o 
  */
  function montaOArray(umaString) {
    // NAO FUNCIONOU MUITO BEM ....
    // let pattern = /[^=\n]/g // sequencia de iguais
    // serah uma Exp Regular
    //const result_temp = umaString.match(pattern)
    //const result_temp = umaString.replace(/[=]*\\n|/g, '++')
    //const result_temp = umaString.replaceAll('=*\n', '')

    // FUNCIONA let res = umaString.replace(/"|:|&|{|\=|\-|\/|[a-z]|[0-9]*|/g , "");
    // remove linhas ====== e o ultimo }+\n  e retorna um array
    // se, ""

    //const unquoted = umaString
    //  .replace(/"([^"]+)":/g, '$1:')
    //  .replace(/\uFFFF/g, '\\"')
    // sem contra-barras
    const sem_contra_barras = umaString.replace(/[\\]/g, ' ')

    const iguais =
      '\n============================================================================================================================='
    const array_sem_iguais = sem_contra_barras.split(iguais)
    // monta um array inicial

    //const array_sem_iguais = result_temp.split(' ')
    // OK ... let res = str.replace(/"|:|&|{|\=|\-|\/|[a-z]|[0-9]*|/g , "");
    //console.log('Func. Limpeza: ', array_sem_iguais)
    //console.log('o 24: ', array_sem_iguais[23])
    //console.log('Num_Elemtos: sem iguais ', array_sem_iguais.length)

    // Filtra o que interessa
    //var arraySohMessages = array_sem_iguais.filter(function (itemCORRENTE) {
    // Seleciona este padrão de busca '==> {"message"'
    //search() method returns -1 if no match is found
    //
    //  if (itemCORRENTE.search(/==> {message/) !== -1) return itemCORRENTE
    //})

    // console.log('Apos o filtro: ', arraySohMessages.length)

    //remover parte inicial do Array
    //var array_via_map = arraySohMessages.map(function (itemCORRENTE) {
    //distancia até o inicio desta sequencia
    //  const distAtehMessage = itemCORRENTE.indexOf(' ==> ') // prefixo do corte

    //  const tamanho = itemCORRENTE.length // tam de cada item
    //   const sem_inicio_e_chave_final = itemCORRENTE.slice(
    //    distAtehMessage + 14, // ponto inicial .... remove " ==> {"message":"
    //    tamanho - 1, // ponto final
    //    )
    // atualiza modificacoes
    //   itemCORRENTE = sem_inicio_e_chave_final
    //    return itemCORRENTE //retorna o item via callback
    //  })

    var array_via_map = array_sem_iguais.map((obj) => {
      return obj.split('==>')[1]
    })

    var array_obj = array_via_map.map((obj) => {
      var ed = undefined
      try {
        ed = JSON.parse(obj)
      } catch (e) {
        console.log('ERRO no JASON de origem =>', obj)
      }
      return ed
    })
    console.log('COMP ====>>> ...........')
    console.log('====>>>', array_obj[10].message.receivedAt)
    setArrayTratado(array_obj)
    //JSON.parse(temp1[0].split("==>")[1])

    //console.log('====>>>', array_via_map[4])
    //console.log('====>>>', JSON.parse(array_via_map[4]))

    //console.log('Resp do  MAP:', testa_map)
    //array_via_map.map(function (itemCORRENTE) {
    //  console.log('\n **==>', itemCORRENTE)
    //})
    //console.log('Num_REGs: ', array_via_map.length)
    //console.log('Para irem para o Json: ', array_via_map)

    //console.log('UM DELES -> 0: ', array_via_map[0])
    //console.log('UM DELES -> 10: ', array_via_map[10])
    //console.log('O ULTIMO: ', array_via_map[array_via_map.length - 1])

    //console.log('O TIPO de array_via_map:', typeof array_via_map)
    //console.log('Quantos vão para HTML: ', array_via_map.length)

    //console.log('Primeiro do ARRAY DIRECTION', array_via_map[0].direction)
    //console.log('O TIPO do obj Jason:', typeof objEmJason)
    //console.log('.... stringfy', stringJason)
    //console.log('===>>>', objEmJason[4].direction)

    // setArrayTratado(objEmJason)

    /*
    //transformando em Array -> Jason
    //const arqJason = montaArqJason(array_via_map)
    //const arqJason = JSON.stringify(Object.assign({}, array_via_map))
    //console.log('almost JASON', array_via_map)

    //
    //const stringJason = JSON.stringifyObject(array_via_map)
    //const objEmJason = JSON.parse(stringJason) // OK
  
    //const stringJason = cleanIt(array_via_map)
    console.log('JASON_UN', sem_contra_barras)
    // [ "UMA STRING UNICA "] ==  [o1,o2]   ["o1, o2"]
    console.log('O TIPO', typeof sem_contra_barras)

    var um_array = sem_contra_barras.split('","')
    ////??????
    ///const ainda_STR = sem_contra_barras.slice(0, sem_contra_barras.length - 1)
    //um_array = um_array.slice(1, um_array.length - 1)
    //console.log('um ARRAY', um_array)

    console.log('Primeiro do ARRAY', um_array[0])
    console.log('Comprimento do ARRAY', um_array.length)
    
    console.log('Ultimo do ARRAY', um_array[um_array.length - 1])

    console.log('O TIPO', typeof um_array)
    console.log('O TIPO P', typeof teste)
    console.log('TESTE', teste)
    // ["{item 1}, { item 2 }"]
    
    //console.log('JASON', objEmJason)
   */
    //
    //console.log('JASON.... OK')
    //console.log('JASON', arrayTratado)
  }

  /*  
 
  */
  // useEffect(() => {
  //   remove_iguais(textoAPI)
  // }, [textoAPI])
  useEffect(() => {
    //read_an_URL('https://whatstv-api.herokuapp.com/logrobbu')
    get_an_URL('https://whatstv-api.herokuapp.com/logrobbu')
  }, [])

  return (
    <div>
      <p>...SAIDA AQUI</p>
      <div>algo aqui: {teste[3].age}</div>
      <div>algo aqui: {teste[3].name}</div>
      <div>SAIDAS R: {arrayTratado[10].message.receivedAt}</div>
      <div>SAIDAS D: {arrayTratado[10].message.direction}</div>

      {/* <p>{arrayTratado.login}</p>
      {<div>SAIDAS ALL: {arrayTratado}</div>}
      <p>{arrayTratado.url}</p>
      <div>teste 2: {arrayTratado[0].direction}</div>
      */}
      {/* <p>Aqui: {teste2[0].direction}</p> */}

      {/* */}
      {/* <div>{teste}</div> */}
      {/* <div>{teste.map((item, key) => console.log(item.name))}</div> */}

      <p>... FIM AQUI</p>
    </div>

    /* <div className="chatlist">
    {chatlist.map(
      (item, key) => (
        console.log("ChatItem: ", item.tagName, item.title),
        (
          <ChatListItem
            key={key}
            data={item}
            active={activeChat.chatid === chatlist[key].chatid}
            onClick={() => setActiveChat(chatlist[key])}
            chatlist={chatSearch}
            setChatSearch={setChatSearch}
            tagFilter={tagFilter}
          />
        )
      )
    )}
    </div> */

    //<h1>{test}</h1>
    // <div>{a_text}</div>
    //<div>{textoAPI}</div>
    // {textoAPI.map((item_name) => (
    //  <h3>{item_name}</h3>
    //  ))}
  )
}

////////////////////////////////////////////////////////////
