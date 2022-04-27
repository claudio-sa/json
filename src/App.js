/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useFormState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import './App.css'
import moment from 'moment' // para formatar datas etc

export default function App(props) {
  var [listaGlobal, setListaGlobal] = useState([])
  var [busca, setBusca] = useState('')
  var [data_01, setData_01] = useState('') // da pagina do HTML
  var [data_02, setData_02] = useState('') // da pagina do HTML

  const lowerBusca = busca.toLowerCase()

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
    console.log(
      '....',
      moment(array_via_map[1].message.receivedAt).format('DD/MM/YYYY'),
    )
    return array_via_map
  }

  // os USEEFFECT

  listaGlobal = listaGlobal
    .filter((contactItem) => contactItem.message.contact.name !== null)
    .filter((contactItem) => contactItem.message.contact.name !== '')
    .filter((contactItem) => contactItem.message.contact.name !== undefined)
    // .filter(
    //   (contactItem) =>
    //     moment(contactItem.message.receivedAt).format('DD/MM/YYYY') >=
    //     moment(data_01).format('DD/MM/YYYY'),
    // )
    ////
    .filter(
      (contactItem) =>
        new Date(moment(contactItem.message.receivedAt).format('DD/MM/YYYY')) >=
        new Date(moment(data_01).format('DD/MM/YYYY')),
    )
    // .filter((contactItem) => contactItem.deliveredAt >= data_02)
    // moment(array_via_map[1].message.receivedAt).format('DD/MM/YYYY'),
    .filter(
      (contactItem) =>
        contactItem.message.contact.name.toLowerCase().includes(lowerBusca),
      //contactItem.message.contact.name.toLowerCase() === lowerBusca,

      //  .filter((contactItem) =>
      //       (contactItem) =>contactItem.message.receivedAt.includes(data_01)
    )

  // testes.message.contact.name === 'Eduardo Bento',

  useEffect(() => {
    var data = moment(data_01).format('DD-MM-YYYY')

    console.log('useEffect ', data)
    // console.log(
    //   'useEffect ',
    //   new Date(data_01.getDay(), data_01.getMonth(), data_01.getYear()),
    // )
  }, [data_01])

  useEffect(async () => {
    const res = await get_an_URL('https://whatstv-api.herokuapp.com/logrobbu')
    console.log('useEffect')
    setListaGlobal(res)
  }, [])

  // RETORNO DA PAGINA DO APP
  return (
    <div className="main">
      <header className="logHeader">
        <h1> Relatório Invemio - TV Aparecida </h1>

        <div className="logFilter">
          <label for="busca"> Busca: </label>
          <input
            type="search"
            placeholder="Busca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="dataFilter">
          <label for="busca"> Data 01: </label>
          <input
            type="date" // "datetime-local"  funciona tambem
            placeholder="Data Inicial"
            // value={data_01}
            onChange={(e) => setData_01(e.target.value)}
          />
        </div>
      </header>
      <div className="content">
        {listaGlobal.map((obj) => (
          <div className="item">
            <p>Origem: {obj.message.contact.name}</p>
            <p>
              Telefone: {obj.message.contact.mainWhatsapp.countryCode}
              {obj.message.contact.mainWhatsapp.phoneNumber}
            </p>
            <p>Tipo: {obj.message.direction} </p>
            <p>
              Data: {moment(obj.message.receivedAt).format('DD/MM/YYYY')} Hora:{' '}
              {moment(obj.message.receivedAt).format('hh:mm:ss')}
            </p>
            <p>Texto: {obj.message.text}</p>
          </div>
        ))}

        {<p>Total: {listaGlobal.length}</p>}
      </div>
    </div>
  )
}

//export default App
