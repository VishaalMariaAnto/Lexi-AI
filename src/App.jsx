import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';


function App() {
  const [Question, setQuestion] = useState("")
  const [Answer, setAnswer] = useState("")
  const apiKey = import.meta.env.VITE_API_KEY;
  
  async function generateAnswer(){
    setAnswer("Loading..")
    const response = await axios({
      url: axios.get(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`),
      method:"post",
      data:{"contents":
        [{"parts":[{"text":Question}]}
      ]
    }
    })
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    setQuestion('')
    
  }

  return (
    <>
      <h1>Lexi</h1>
      <textarea value={Question} onChange={(e)=>setQuestion(e.target.value)} cols="30" rows="10" placeholder='Ask anything'></textarea>
      <button onClick={generateAnswer}>Generate</button>
      
      <pre>{Answer}</pre>
      
    </>
  )
}

export default App
