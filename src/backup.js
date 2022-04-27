//import logo from './logo.svg'
import React, { useState, useEffect } from 'react'
//import ReactDOM from 'react-dom'
import './App.css'
import axios from 'axios'
//import stringifyObject from 'stringify-object'

export default App //
//export { array_obj }

// function data_hora() {
//   var dt = new Date()
//   console.log(dt)
//   return dt.toString()
// }

/*
MOSTRA A URL
  fetch_an_URL().catch((error) => {
  //error.message // 'An error has occurred: 404'
  console.log('Error here', error.message)
})
*/

///////////////////////////////

function App() {
  const [textoAPI, setTextoAPI] = useState('')
  // nao usei
  var [arrayTratado, setArrayTratado] = useState([])
  //var arrayTratado = []
  // para ser global por aqui ... criando com 2 jason OK
  var array_obj = []

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

  // async function fetch_an_URL(an_URL) {
  //   const response = await fetch(an_URL)

  //   if (!response.ok) {
  //     const message = `An error has occured: ${response.status}`
  //     // console.log('Error here :', response.ok, message)
  //     throw new Error(message)
  //   }
  //   const text = await response.text()
  //   setTextoAPI(text)
  //   //console.log(text)
  //   // inicio do tratamento
  //   montaOArray(text) // Chamada principal
  //   // remove_cabecalho(textoAPI) //feito
  //   // setArrayTratado(textoAPI)

  //   // console.log(' ==> ', text) // tem que consumir para vir...
  //   // Expressao regular
  //   //var varios_iguais = '/[^=]\n/g'
  //   //var varios_iguais =
  //   //  '=============================================================================================================================\n'
  //   //console.log(text)
  //   //const array_sem_iguais = text.split(varios_iguais)

  //   // console.log(' ==> ', array_sem_iguais)
  //   // return array_sem_iguais
  //   //return text
  // }

  const teste = [
    { id: 1, name: 'pereira 1' },
    { id: 2, name: 'pereira 2' },
    { id: 2, name: 'pereira 3' },
    { id: 4, name: 'pereira 4', age: '33' },
    { erro: '27' },
  ]

  // const testeParse = JSON.parse([{ id: 1, name: 'pereira 1' }])
  const teste2 = [{ receivedAt: '2021-11-25T10:50:18', direction: 'incoming' }]
  const teste3 = [
    {
      message: {
        receivedAt: '2021-11-25T10:50:18',
        direction: 'incoming',
        id: '300020829745613',
        channel: '3',
        text: 'TESTE',
        source: {
          countryCode: '55',
          phoneNumber: '4799643507',
        },
        destination: {
          countryCode: '55',
          phoneNumber: '1231041212',
        },
        contact: {
          robbuid: '171655600128',
          name: 'Eduardo Bento',
          mainWhatsapp: {
            countryCode: '55',
            phoneNumber: '4799643507',
          },
          mainSMS: {
            countryCode: '55',
            phoneNumber: '4799643507',
          },
        },
        digitalPostman: 'false',
      },
    },
  ]

  //console.log(array_obj)
  /* 
  Idéia usada:
  o. Separar o arquivao ... em um array sem os =====
  o. Filtrar as mensagens de interesse
  o. Remover a sujeira no prefixo de cada item no array
  o. Stringfy ===> voltou UMA string novamente .... ( mudar a partir daqui )
  o 
  */

  function montaOArray(umaString) {
    // uma string sem contra-barras
    //console.log('Bruto:', umaString)
    // const sem_contra_barras = umaString.replace(/[\\]/g, ' ')
    var unquoted = umaString
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/\uFFFF/g, '\\')
    // //const unquoted = unquoted1.replace(/'/g, ' ')
    // .replace(/\uFFFF/g, '\\')

    const iguais =
      '\n============================================================================================================================='
    // monta um array inicial de todos os registros como STRINGS em cada célula

    // const replaceWith = ',\n';
    // const todo_ARQ_sem_IGUAIS = umaString.split(iguais).join(replaceWith);
    // console.log("ALL_arq", todo_ARQ_sem_IGUAIS)

    const array_sem_iguais = umaString.split(iguais)
    //const array_sem_iguais = umaString.split(iguais)
    console.log(
      'Quantos (array_sem_iguais)? ====>>> ...........',
      array_sem_iguais.length,
    )

    // Removendo o último elemento devido a divisão do SPLIT que gera um último elemento
    // vazio ... devido o split anterior
    //array_2.slice(0,-1);  // returned --> [1,2,3]  array_2 = [1,2,3,4]
    var array_TEMP = array_sem_iguais.slice(0, -1) // removeu o ultimo elemento
    //console.log('O último válido OK: ', array_TEMP[array_TEMP.length - 1])

    // Faz mais uma divisão do array inicial, descartando  a posição [0] :: trash
    var array_via_map = array_TEMP.map((obj) => {
      return obj.split('==>')[1]
    })

    //console.log('TODO ARRAY antes o Json: ', array_via_map)
    console.log('Quantos no array ? ====>>> ...........', array_via_map.length)
    // Montar um novo array de strings com as válidas -- sem erro

    // for (var i = 0; i < array_via_map.length; i += 1) {
    for (var i = 0; i < 3; i += 1) {
      //array_obj.push(JSON.parse(JSON.stringify(array_via_map[i])))
      //array_obj.push(array_via_map[i])
      // convertendo INDIVIDUALMENTE
      console.log('Antes Json:', i, ': ', array_via_map[i])
      array_obj[i] = JSON.parse(jsonEscape(array_via_map[i]))

      //console.log('Em  Json', array_obj[i])
    }
    console.log('Em  Json:', array_obj)
    // //push de um jason diretamente ...
    // array_obj.push({ ultimo: 'manualmente vai dar certo ......' })
    // array_obj.push({ ultimo: 'FIM manualmente vai dar certo ......' })

    // testar
    var comp_OBJ = array_obj.length
    for (var i = 0; i < comp_OBJ; i += 1) {
      try {
        // apenas testa se OK este JASON
        JSON.parse(JSON.stringify(array_obj[i]))
        console.log('JASON OK de origem =>', array_obj[i])
      } catch (e) {
        console.log('Obj NAO OK:', e, i, '==>', array_obj[i])
      }
      //console.log('+')
    }

    //var invalidos = 0
    // const array_obj = array_via_map.map((obj) => {
    //   var ed = undefined
    //   //if (!JSON.parse(obj)) {
    //   try {
    //     ed = JSON.parse(obj)
    //   } catch (e) {
    //     console.log('ERRO no obj do JASON de origem =>', obj)
    //     console.log('\n MSG de erro no Jason ::')
    //     invalidos = invalidos + 1
    //     ed = '{message:{msg:"INVALIDA"}}'
    //   }
    //   return ed
    // })
    // setter
    //saveData(array_via_map)

    let temp_data = JSON.stringify(array_obj, null, 4)
    console.log('Um Jason bonitinho para o FORMATADOR ONLINE:\n', temp_data)

    // console.log(
    //   'Quantos  (array_obj.length) - INCLUINDO OS INVALIDOS? ',
    //   array_obj.length,
    // )
    // //console.log('Quantos  INVALIDOS? ', invalidos)
    //print all
    // array_obj.map((obj, key) => {
    //   console.log(key, '..===>> ..', obj)
    // })

    // var i = 0
    // while (i < 10) {
    //   console.log('_obj:', i, '|', array_obj[i])
    //   console.log(' array_:', i, '|', array_via_map[i])
    //   i++
    // }

    // console.log('\n PRIMEIRO', array_obj[0])
    // console.log('\n SEGUNDO', array_obj[1])
    // var ultimo = array_obj.length - 1
    // console.log('\n ULTIMO e quem é ele:', ultimo, array_obj[ultimo])

    //console.log('O TIPO: ', typeof array_obj)
    //console.log('COMP (ESTA INCLUINDO OS INVALIDOS) ====>>> ', array_obj.length)
    console.log('T1 ====>>>', array_obj[1].message.receivedAt)
    //console.log('T2====>>>', array_obj[10].message.direction)
    //teste_string = JSON.parse(JSON.stringify(array_obj[10].message.receivedAt))

    //console.log('All array OBJ antes do setArray', array_obj)
    // arrayTratado = JSON.parse(array_obj)
    // var temp_array_obj = JSON.stringify(array_obj, null, 4)
    // arrayTratado = JSON.parse(temp_array_obj)

    // teste_string = JSON.stringify(teste)
    // console.log('arrayTratado: ======>', teste_string)
    // arrayTratado = JSON.parse(teste_string)

    // console.log('t em str', arrayTratado)
    //
    // var newData = JSON.stringify(array_obj)
    //console.log('teste: ======>', array_obj)
    //arrayTratado = JSON.parse(JSON.stringify(array_obj))
    arrayTratado = array_obj
    //array_bruto = array_via_map
    //console.log('item ok aqui : ======>', arrayTratado[0].message.id)
    //teste_string = arrayTratado[0].message.id
    // arrayTratado.map((item, key) => {
    //   {
    //     //arrayTratado[key].message.direction &&
    //     //console.log('item =>', arrayTratado[key].message.direction)
    //     console.log('item =>', item.message.receivedAt)
    //   }
    // })

    //console.log('ALL_OBJ: ======>', array_obj)
  }
  /*  
   FIM DO APP ... codigo
  */
  // useEffect(() => {
  //   remove_iguais(textoAPI)
  // }, [textoAPI])
  useEffect(() => {
    // fetch_an_URL('https://whatstv-api.herokuapp.com/logrobbu')
    get_an_URL('https://whatstv-api.herokuapp.com/logrobbu')

    //   .then((res) => {
    //   console.log(res)
    //   const ed = document.getElementById('labelResultado')
    //   const lista = res.map(
    //     (obj) => JSON.stringify(obj?.message?.contact?.name) + '\n',
    //   )
    //   ed.innerText = lista
    // })
  }, [])

  // da WEB ...substituicoes de tabulacoes, escape e newline
  function jsonEscape(str) {
    return str
      .replace(/\n/g, '\\\\n')
      .replace(/\r/g, '\\\\r')
      .replace(/\t/g, '\\\\t')
  }

  //   [
  //   { id: 1, name: 'pereira 1', besteira: 'pouca eh bobagem' },
  //   { id: 2, name: 'pereira 2', outra_besteira: 'pouca eh bobagem' },
  // ] // tem que ser []

  return (
    <div className="container">
      <div className="content">
        <p>
          ... SAIDA AQUI. {teste2[0].receivedAt}:: {teste[0].name} :: ... SAIDA
          AQUI. {teste3[0].message.receivedAt} :===:{' '}
          {teste3[0].message.direction} :===:{array_obj}
        </p>

        <div>
          AQUI 1: {array_obj[1].message.receivedAt}
          {array_obj.map((item, key) => (
            <p> {item.message.id} ++++ </p>
          ))}
        </div>
        <div>
          AQUI 2: {arrayTratado}
          {arrayTratado.map((item, key) => (
            <p>{item} x ===</p>
          ))}
        </div>
        {/*
        <button onClick={saveData}> Aperte ai para salvar!</button>
        {arrayTratado[0].message.receivedAt} ::
         {arrayTratado[0].message.phoneNumber}::
          {arrayTratado[0].message.receivedAt}::
              
         {teste2} <div>
          {teste.map((item, key) => (
            <p>{item.name}</p>
          ))}
        </div> {teste_string} 
         
        */}

        <p>... FIM AQUI</p>
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////
