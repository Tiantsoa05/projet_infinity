import React, { useEffect, useState } from "react";
import { ChatMessages } from "../../../data/Chat.js";
import { IoSend } from "react-icons/io5";
import socket from "../../../tools/socket-io.js";
import { Header } from "../Accueil/Header/Header.jsx";
import './Chat.css'
import axios from "axios";

const ChatStudent = () => {
    const [messages, setMessages] = useState([
        {
            id_prof:1,
            id_etudiant:3,
            send_type: 1,
            message: "Bonjour Monsieur",
            date_sent: "2023-03-01 12:00:00",
        },
        {
            id_prof:1,
            id_etudiant:3,
            send_type: 2,
            message: "Bonjour",
            date_sent: "2023-03-01 12:05:00",
        }
    ])
    const [chat,setChat] = useState("")

    useEffect(()=>{
        axios.post('http://localhost:3000/messages/get',
            {
                id_prof: 1,
                id_etudiant: 3
            }
        ).then(resp=>resp.json()).then(data=>setMessages(data))
    },[])

    socket.on("message-client", (data)=>{
        setMessages([...messages,data])
    })

    const handleSubmit = async ()=>{
        const send = await axios.post('http://localhost:3000/messages/save',
            {
                id_prof: 1,
                id_etudiant: 3,
                send_type: 1,
                contenu: chat
            }
        )
        console.log(send)
    }
    return (
        <>
            <Header/>
            <div className="chat-body">
                <div className="menu-chat">
                    <div className="group-chat">
                        <div className="group-profile">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="image" className="menu-chat-picture"/>
                            <span className="group-name">Français niveau 1</span>
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
                                setMessages([...messages,{
                                    id_prof:1,
                                    id_etudiant:3,
                                    send_type: 1,
                                    contenu: chat
                                }])
                                socket.emit("message-client",{
                                    id_prof:1,
                                    id_etudiant:3,
                                    send_type: 1,
                                    contenu: chat
                                })
                                handleSubmit()
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