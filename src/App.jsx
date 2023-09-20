import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './App.css';
import api from './api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  
  async function handleSearch(){
    // 01310930/json

    if(input == '') {
      alert('Preencha algum cep!')
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
    }catch{
      alert('Erro ao buscar')
    setInput("")
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador CEP</h1>

      <div className='containerInput'>
        <input 
        type="text"
        placeholder='Digite seu cep'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='white'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main>
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Estado: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  )
}

export default App
