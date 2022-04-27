/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useFormState, useEffect } from 'react'
import axios from 'axios'

export default function App(props) {
  var [listaGlobal, setListaGlobal] = useState([])

  // FUNCAO ... faz a leitura e o tratamento
  async function get_an_URL(umaURL) {
    const response_data = await axios
      .create()
      .get(umaURL)
      .then((response) => response.data)
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err)
      })

    const iguais =
      '\n============================================================================================================================='

    // Cria um array separados e são separado onde há =====
    const array_sem_iguais = response_data.split(iguais)

    // Deste array toma-se a parte que interessa
    const array_TEMP = array_sem_iguais.map((obj) => {
      return obj.split('==>')[1]
    })

    // Deste array de STRINGs ... será transformado em
    // um ARRAY com objetos em JASON
    var array_via_map = []
    for (var i = 0; i < array_TEMP.length; i += 1) {
      try {
        var parsed = JSON.parse(array_TEMP[i])
        if (parsed.message) {
          array_via_map.push(parsed)
        }
      } catch (e) {
        console.log('Obj NAO OK:', '==>', parsed)
      }
    }
    //console.log('Return do get_A_URL')
    const size_ARRAY = array_via_map.length - 1
    console.log('Primeira Amostra:', array_via_map[1])
    console.log('Ultima amostra:', size_ARRAY, '::', array_via_map[size_ARRAY])

    return array_via_map
  }

  // os USEEFFECT
  useEffect(async () => {
    const res = await get_an_URL('https://whatstv-api.herokuapp.com/logrobbu')
    console.log('useEffect')
    setListaGlobal(res)
  }, [])

  // RETORNO DA PAGINA DO APP
  return (
    <div>
      <h3> Relatório </h3>
      {listaGlobal.map((obj) => (
        <>
          <p>==============================</p>
          <p>
            Origem: {obj.message.contact.name}
            &nbsp;Tipo: {obj.message.direction}
            &nbsp; Pais: {obj.message.source.countryCode}
            &nbsp; Texto: {obj.message.text}
          </p>
          {/*<p>{obj.message.direction}</p>*/}
        </>
      ))}

      {<p>Total: {listaGlobal.length}</p>}
    </div>
  )
}

//export default App
