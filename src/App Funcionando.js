/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useFormState, useEffect } from 'react'
import axios from 'axios'

//import './App.css'

//var listaGlobal = []

export default function App(props) {
  const [textoAPI, setTextoAPI] = useState('')
  var [arrayTratado, setArrayTratado] = useState([])
  var [listaGlobal, setListaGlobal] = useState([])

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
    const array_sem_iguais = response_data.split(iguais)

    const array_TEMP = array_sem_iguais.map((obj) => {
      return obj.split('==>')[1]
    })
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

    // array_via_map = array_TEMP.filter((obj) => {
    //   const parsed = JSON.parse(obj)
    //   return parsed.message

    // chatlist = chatlist
    // .filter((contact) => contact.title !== null)
    // .filter((contact) => contact.title !== "")
    // .filter((contact) => contact.title !== undefined)
    // .filter((contact) => contact.title.toLowerCase().includes(lowerBusca))

    // try {
    //   var parsed = undefined
    //   if (obj) {
    //     parsed = JSON.parse(obj)
    //     if (parsed.message) console.log(parsed)
    //     if (parsed.message.id) return parsed
    //   } else {
    //     console.log('obj invalido', obj)
    //   }
    // } catch (e) {
    //   console.log('Obj NAO OK:', '==>', parsed)
    // }
    // })

    console.log('return do get')
    console.log(array_via_map)
    return array_via_map
  }

  useEffect(async () => {
    const res = await get_an_URL('https://whatstv-api.herokuapp.com/logrobbu')
    console.log('useEffect')
    setListaGlobal(res)
  }, [])

  const form = {
    values: {
      ph: 0,
      calcio: 0,
      alkalinity: '',
      temperature: '',
    },
    onSubmit: (values) => {
      console.log('teste')
    },
  }

  const calcFt = (e) => {
    const factorTable = [
      { indice: 0, factor: 0 },
      { indice: 3, factor: 0.1 },
      { indice: 8, factor: 0.2 },
      { indice: 12, factor: 0.3 },

      { indice: 16, factor: 0.4 },
      { indice: 19, factor: 0.5 },
      { indice: 25, factor: 0.6 },
      { indice: 29, factor: 0.7 },
      { indice: 35, factor: 0.8 },
      { indice: 41, factor: 0.9 },
      { indice: 53, factor: 1 },
    ]

    var ft = 0
    var indiceIni = 0
    var indiceFim = 0
    for (var indice in factorTable) {
      const prop = factorTable[indice]
      if (prop.indice >= e) {
        indiceIni = indice - 1
        indiceFim = indice
        break
      }
    }
    var delta = factorTable[indiceFim].indice - factorTable[indiceIni].indice
    var deltaFt = factorTable[indiceFim].factor - factorTable[indiceIni].factor

    var x =
      (deltaFt * (e - factorTable[indiceIni].indice)) / delta +
      factorTable[indiceIni].factor

    x = Math.round(100 * x) / 100
    console.log('FT ----->', e, x)
    return x
  }

  //-----------------------------------------------

  const calcFa = (e) => {
    const factorTable = [
      { indice: 5, factor: 0.7 },
      { indice: 25, factor: 1.4 },
      { indice: 50, factor: 1.7 },
      { indice: 75, factor: 1.9 },

      { indice: 100, factor: 2 },
      { indice: 150, factor: 2.2 },
      { indice: 200, factor: 2.3 },
      { indice: 300, factor: 2.5 },
      { indice: 400, factor: 2.6 },
      { indice: 800, factor: 2.9 },
      { indice: 1000, factor: 3 },
    ]

    var fa = 0
    var indiceIni = 0
    var indiceFim = 0
    for (var indice in factorTable) {
      const prop = factorTable[indice]
      if (prop.indice >= e) {
        indiceIni = indice - 1
        indiceFim = indice
        break
      }
    }
    var delta = factorTable[indiceFim].indice - factorTable[indiceIni].indice
    var deltaFa = factorTable[indiceFim].factor - factorTable[indiceIni].factor

    var x =
      (deltaFa * (e - factorTable[indiceIni].indice)) / delta +
      factorTable[indiceIni].factor

    x = Math.round(100 * x) / 100
    console.log('FA ----->', e, x)
    return x
  }

  //-----------------------------------------------

  const calcFc = (e) => {
    const calcioFactorTable = [
      { indice: 5, factor: 0.3 },
      { indice: 25, factor: 1 },
      { indice: 50, factor: 1.3 },
      { indice: 75, factor: 1.5 },

      { indice: 100, factor: 1.6 },
      { indice: 150, factor: 1.8 },
      { indice: 200, factor: 1.9 },
      { indice: 300, factor: 2.1 },
      { indice: 400, factor: 2.2 },
      { indice: 800, factor: 2.5 },
      { indice: 1000, factor: 2.6 },
    ]

    var fc = 0
    var indiceIni = 0
    var indiceFim = 0
    for (var indice in calcioFactorTable) {
      const prop = calcioFactorTable[indice]
      if (prop.indice >= e) {
        indiceIni = indice - 1
        indiceFim = indice
        break
      }
    }
    var delta =
      calcioFactorTable[indiceFim].indice - calcioFactorTable[indiceIni].indice
    var deltaFc =
      calcioFactorTable[indiceFim].factor - calcioFactorTable[indiceIni].factor

    var x =
      (deltaFc * (e - calcioFactorTable[indiceIni].indice)) / delta +
      calcioFactorTable[indiceIni].factor

    x = Math.round(100 * x) / 100
    console.log('FC ----->', e, x)
    return x
  }

  const calculate = (e) => {
    const phFactorTable = [
      { indice: 6.5, factor: 0.11 },
      { indice: 7, factor: 0.22 },
      { indice: 7.2, factor: 0.26 },
      { indice: 7.4, factor: 0.3 },

      { indice: 7.6, factor: 0.33 },
      { indice: 7.8, factor: 0.35 },
      { indice: 8, factor: 0.36 },
      { indice: 8.5, factor: 0.38 },
    ]
    const fc = calcFc(e.calcio)
    const fa = calcFa(e.alkalinity)
    const ft = calcFt(e.temperature)

    const is = e.ph + fc + fa + ft - 12.1
    console.log(e.ph, fc, fa, ft, 12.1)
    console.log('IS ---> ', is)
    const ed = document.getElementById('labelResultado')
    ed.innerText = 'IS: ' + is
  }

  const handleApply = async (e) => {
    e.preventDefault()
    calculate(form.values)
  }

  const handleChange = (event) => {
    if (event.target.name === 'ph') {
      form.values.ph = parseFloat(event.target.value.replace(',', '.'))
    }
    if (event.target.name === 'calcio') {
      form.values.calcio = parseFloat(event.target.value)
    }
    if (event.target.name === 'alkalinity') {
      form.values.alkalinity = parseFloat(event.target.value)
    }
    if (event.target.name === 'temperature') {
      form.values.temperature = parseFloat(event.target.value)
    }
  }

  return (
    <div>
      {listaGlobal.map((obj) => (
        <>
          <p>{obj.message.id}</p>
          <p>{obj.message.direction}</p>
          <p>{obj.message.contact.name}</p>
        </>
      ))}
    </div>
  )
}

//export default App
