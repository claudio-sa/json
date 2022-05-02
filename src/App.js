/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import axios from "axios"
import moment from "moment" // para formatar datas etc
import "./App.css"

moment.locale("pt-br")

export default function App(props) {
  var [listaGlobal, setListaGlobal] = useState([])
  var [busca, setBusca] = useState("")
  var [filterReceived, setFilterReceived] = useState(false)
  var [filterSent, setFilterSent] = useState(false)
  var [dataIni, setDataIni] = useState(null)
  var [dataFim, setDataFim] = useState(null)
  const refdataIni = useRef()
  const refdataFim = useRef()

  const lowerBusca = busca.toLowerCase()

  async function get_an_URL(umaURL) {
    const response_data = await axios
      .create()
      .get(umaURL)
      .then((response) => response.data)
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err)
      })

    const iguais =
      "\n============================================================================================================================="
    const array_sem_iguais = response_data.split(iguais)

    // console.log("array_sem_iguais", array_sem_iguais)

    const array_TEMP = array_sem_iguais.map((obj) => {
      return obj.split("==>")[1]
    })

    // console.log("array_TEMP", array_TEMP)

    var array_via_map = []
    for (var i = 0; i < array_TEMP.length; i += 1) {
      try {
        var parsed = JSON.parse(array_TEMP[i])
        if (parsed.message) {
          array_via_map.push(parsed)
        }
      } catch (e) {
        console.log("Obj NAO OK:", "==>", parsed)
        console.count("Numero de Chats: ")
      }
    }
    const size_ARRAY = array_via_map.length - 1

    // console.log("array_via_map", array_via_map)

    return array_via_map
  }

  function compare(a, b) {
    var dataA = ""
    var dataB = ""

    if (a.message.receivedAt) {
      dataA = a.message.receivedAt
    } else {
      dataA = a.message.sentAt
    }
    if (b.message.receivedAt) {
      dataB = b.message.receivedAt
    } else {
      dataB = b.message.sentAt
    }

    if (dataA > dataB) return -1
    if (dataA < dataB) return 1
    return 0

    // if (
    //   a.message.receivedAt > b.message.receivedAt ||
    //   a.message.sentAt > b.message.sentAt
    // )
    //   return -1
    // if (
    //   a.message.receivedAt < b.message.receivedAt ||
    //   a.message.sentAt < b.message.sentAt
    // )
    //   return 1
    // return 0
  }

  function converteData(DataDDMMYY) {
    const dataSplit = DataDDMMYY.split("-")
    const novaData = new Date(
      parseInt(dataSplit[2], 10),
      parseInt(dataSplit[1], 10) - 1,
      parseInt(dataSplit[0], 10)
    )
    return novaData
  }

  listaGlobal = listaGlobal
    // .sort(compare)
    .filter((contactItem) => contactItem.message.contact.name !== null)
    .filter((contactItem) => contactItem.message.contact.name !== "")
    .filter((contactItem) => contactItem.message.contact.name !== undefined)
    .filter((contactItem) =>
      contactItem.message.contact.name.toLowerCase().includes(lowerBusca)
    )

  if (dataIni) {
    listaGlobal = listaGlobal.filter(
      (contactItem) =>
        contactItem.message.receivedAt >= dataIni ||
        contactItem.message.sentAt >= dataIni
    )
  }
  if (dataFim) {
    listaGlobal = listaGlobal.filter(
      (contactItem) =>
        contactItem.message.receivedAt <= dataFim ||
        contactItem.message.sentAt <= dataFim
    )
  }
  if (filterReceived) {
    listaGlobal = listaGlobal.filter(
      (contactItem) => contactItem.message.direction === "incoming"
    )
  }
  if (filterSent) {
    listaGlobal = listaGlobal.filter(
      (contactItem) => contactItem.message.direction === "outgoing"
    )
  }

  useEffect(() => {
    console.log(new Date(dataIni).getDate())
    console.log(new Date("2022-04-29T00:41:23").getDate())
    console.log(converteData("2022-04-29T16:52:49"))
    console.log(dataIni)
    console.log(dataFim)
  }, [dataIni, dataFim])

  useLayoutEffect(async () => {
    const res = await get_an_URL("https://whatstv-api.herokuapp.com/logrobbu")
    setListaGlobal(res)
  }, [])

  return (
    <div className="main">
      <header className="logHeader">
        <h2> Log de Mesagens: {listaGlobal.length} </h2>
        <div className="logFilter">
          <div className="">
            <div className="filterReceived">
              <input
                type="checkbox"
                onChange={(e) => {
                  setFilterReceived(!filterReceived)
                }}
              />
              <label>Somente Recebidas</label>
            </div>
            <div className="filterReceived">
              <input
                type="checkbox"
                onChange={(e) => {
                  setFilterSent(!filterSent)
                }}
              />
              <label>Somente Enviadas</label>
            </div>
          </div>
          <input
            type="search"
            placeholder="Nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <input
            type="text"
            ref={refdataIni}
            placeholder="Data Inicial"
            onFocus={() => (refdataIni.current.type = "date")}
            onBlur={() =>
              refdataIni.current.value
                ? (refdataIni.current.type = "date")
                : (refdataIni.current.type = "text")
            }
            onChange={(e) => setDataIni(e.target.value)}
          />
          <input
            type="text"
            ref={refdataFim}
            onFocus={() => (refdataFim.current.type = "date")}
            onBlur={() =>
              refdataFim.current.value
                ? (refdataFim.current.type = "date")
                : (refdataFim.current.type = "text")
            }
            placeholder="Data Final"
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
      </header>
      <div className="content">
        {listaGlobal
          .slice(0)
          .reverse()
          .map((obj) => (
            <div className="item">
              <p>{obj.message.contact.name}</p>
              <p>
                {obj.message.contact.mainWhatsapp.countryCode}
                {obj.message.contact.mainWhatsapp.phoneNumber}
              </p>
              <p> {obj.message.direction} </p>

              {obj.message.receivedAt ? (
                <p>
                  {moment(obj.message.receivedAt).format("DD/MM/YYYY")}{" "}
                  {moment(obj.message.receivedAt).format("hh:mm:ss a")}
                </p>
              ) : (
                <p>
                  {moment(obj.message.sentAt).format("DD/MM/YYYY")}{" "}
                  {moment(obj.message.sentAt).format("hh:mm:ss a")}
                </p>
              )}

              <p className="itemMessage"> {obj.message.text}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
