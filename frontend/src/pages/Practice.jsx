import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Practice = () => {
    const [mot, setMot]= useState("")
    const navigate = useNavigate()
    const sendWord = async ()=>{
        const resp = await axios.get('https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/'+mot, 
            {
                headers:{
                    app_Id: 'be8a0b02',
                    app_key: 'e1c6b57610f256508f57b538c5d33df8'
                }
            }
        ).then(response=>response.json())

        console.log(resp)
    }
  return (
    <div>
        <input 
            type="text" 
            placeholder='Saisissez votre mot' 
            value={mot}
            onChange={(e)=>setMot(e.target.value)}
        /><br />
        <button onClick={sendWord}>Confirmer</button>
    </div>
  )
}

export default Practice