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

  function incrementDate(date) {
    var dataAnoMesDia = String(date).split("-")
    dataAnoMesDia[2] = String(Number(dataAnoMesDia[2]) + 1)

    var day = dataAnoMesDia[2]
    var month = dataAnoMesDia[1]
    var year = dataAnoMesDia[0]

    if (day <= 9) {
      day = "0" + day
    }
    var newData = year + "-" + month + "-" + day
    setDataFim(newData)
  }

  async function getAnURL(umaURL) {
    const response_data = await axios
      .create()
      .get(umaURL)
      .then((response) => response.data)
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err)
      })

    const iguais =
      "\n============================================================================================================================="
    const arraySemIguais = response_data.split(iguais)

    const arrayTemp = arraySemIguais.map((obj) => {
      return obj.split("==>")[1]
    })

    var arrayViaMap = []
    for (var i = 0; i < arrayTemp.length; i += 1) {
      try {
        var parsed = JSON.parse(arrayTemp[i])
        if (parsed.message) {
          arrayViaMap.push(parsed)
        }
      } catch (e) {
        console.log("Obj NAO OK:", "==>", parsed)
        console.count("Numero de Chats: ")
      }
    }
    const sizeArray = arrayViaMap.length - 1

    return arrayViaMap
  }

  listaGlobal = listaGlobal
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
    if (dataIni && dataFim && dataIni === dataFim) {
      incrementDate(dataFim)
    }

    if (dataFim && dataIni > dataFim) {
      setDataFim(dataIni)
    }
  }, [dataIni, dataFim])

  useLayoutEffect(async () => {
    const res = await getAnURL("https://whatstv-api.herokuapp.com/logrobbu")
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
            value={dataIni}
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
            type="text" //"date"
            value={dataFim}
            ref={refdataFim}
            min={dataIni}
            placeholder="Data Final"
            onFocus={() => (refdataFim.current.type = "date")}
            onBlur={() =>
              refdataFim.current.value
                ? (refdataFim.current.type = "date")
                : (refdataFim.current.type = "text")
            }
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
                {obj.message.contact.mainWhatsapp.countryCode}{" "}
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
