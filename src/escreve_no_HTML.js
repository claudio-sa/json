import ReactDOM from 'react-dom'

import './styles.css'

function App() {
  const DADOS = [
    {
      message: {
        receivedAt: '2021-11-25T10:50:18',
        direction: 'incoming',
        id: '300020829745613',
        channel: '3',
        text: 'TESTE',
        source: { countryCode: '55', phoneNumber: '4799643507' },
        destination: { countryCode: '55', phoneNumber: '1231041212' },
        contact: {
          robbuid: '171655600128',
          name: 'Eduardo Bento',
          mainWhatsapp: { countryCode: '55', phoneNumber: '4799643507' },
          mainSMS: { countryCode: '55', phoneNumber: '4799643507' },
        },
        digitalPostman: 'false',
      },
    },
    {
      receivedAt: '2021-11-25T10:50:18',
      direction: 'incoming',
      id: '300020829745613',
      channel: '3',
      text: 'TESTE',
      source: { countryCode: '55', phoneNumber: '4799643507' },
      destination: { countryCode: '55', phoneNumber: '1231041212' },
      contact: {
        robbuid: '171655600128',
        name: 'Eduardo Bento',
        mainWhatsapp: { countryCode: '55', phoneNumber: '4799643507' },
        mainSMS: { countryCode: '55', phoneNumber: '4799643507' },
      },
      digitalPostman: 'false',
    },
  ]

  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      <p>{DADOS[0].message.direction}</p>
      <ol>{DADOS[0].message.receivedAt}</ol>
      <ol>{DADOS[0].message.contact.name}</ol>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
