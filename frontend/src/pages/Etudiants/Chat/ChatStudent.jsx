import React, { useEffect, useState } from "react";
import { ChatMessages } from "../../../data/Chat.js";
import { IoSend } from "react-icons/io5";
import socket from "../../../tools/socket-io.js";
import { Header } from "../Accueil/Header/Header.jsx";
import './Chat.css'
import axios from "axios";

const ChatStudent = () => {
    const [messages, setMessages] = useState([])
    const [chat,setChat] = useState("")
    const [profUser,setProfUser]=useState({})
    const {prof,userId} = localStorage

    useEffect(()=>{

        axios.post('http://localhost:3000/messenger/discussions',
            {
                id_prof: parseInt(prof),
                id_etudiant: parseInt(userId)
            }
        ).then(data=>setMessages(data.data))

        axios.get('http://localhost:3000/all/prof/'+prof).then(data=>setProfUser(data.data))

    },[])

    socket.on("message-prof", (data)=>{
        console.log(data)
    })

    return (
        <>
            <Header/>
            <div className="chat-body">
                <div className="menu-chat">
                    <div className="group-chat">
                        <div className="group-profile">
                            <img 
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
                                alt="image" 
                                className="menu-chat-picture"
                            />
                            <span className="group-name">{profUser.nom_prof +" "+ profUser.prenom_prof}</span>
                        </div>
                    </div>
                </div>
                <div className="chat-card">
                    {/* <div className="chat-sender">
                        <div className="sender-image">
                            <img src={sender.picture} alt="image" />
                        </div>
                        <div className="sender-name">
                            <span>{sender.name}</span>
                        </div>
                    </div> */}
                    <div className="chat-content">
                        {
                            messages.map((msg, index)=>(
                                <div key={index} className={`chat-message ${msg.send_type === 1 ? 'sender-message bg-green-400 text-white' : 'receiver-message bg-gray-300 text-black'}`}>
                                    {msg.message}
                                </div>
                            ))
                        }
                    </div>
                    <div className="chat-input">
                        <input 
                            type="text" 
                            placeholder="Ecrivez votre message" 
                            value={chat}
                            onChange={(e)=>setChat(e.target.value)}
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div 
                            className="send-message"
                            onClick={(e)=>{
                                e.preventDefault()
                                let mp = {
                                    id_prof:parseInt(prof),
                                    id_etudiant:parseInt(userId),
                                    send_type: 1,
                                    message: chat
                                }
                                socket.emit("message-etudiant",mp)
                                setMessages([...messages,mp])
                                setChat("")
                            }}
                        >
                            <IoSend
                                size={30}
                                color="blue"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChatStudent;