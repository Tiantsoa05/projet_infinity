import React, {useEffect, useState} from "react";
import "./Accueil.css"
import { Header } from "./Header/Header.jsx";
import { Profs } from "./Profs/Profs.jsx";
import { Menus } from "./Menus/Menus.jsx";
import DetailProf from "./Profs/DetailProf/DetailProf.jsx";
import { Lessons } from "./Lessons/Lessons.jsx";
import { Exercice } from "./Exercice/Exercice.jsx";
import Post from "./Post/Post.jsx";
import axios from "axios";

const Accueil = ()=>{
    const data = [
        {
            nom: "Thierry",
            prenom: "John",
            image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            langue: "Français",
            diplome: "Doctorat",
            numero: "123456789",
            niveau:"debutant",
            cout:"20$"
        },
        {
            nom: "Gérard",
            prenom: "Darmanin",
            image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            langue: "Français",
            diplome: "Doctorat",
            numero: "123456789",
            niveau:"debutant",
            cout:"20$"
        },
        {
            nom: "César",
            prenom: "Gonzales",
            image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            langue: "Francais",
            diplome: "Doctorat",
            numero: "123456789",
            niveau:"debutant",
            cout:"20$"
        },
        {
            nom: "Julien",
            prenom: "Le Roux",
            image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            langue: "Anglais",
            diplome: "Licence",
            numero: "123456789",
            niveau:"debutant",
            cout:"20$"
        },
        {
            nom: "Marie",
            prenom: "Dubois",
            image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            langue: "Anglais",
            diplome: "Licence",
            numero: "123456789",
            niveau:"debutant",
            cout:"20$"
        }
    ]
    const [profs,setProfs] = useState(data)
    const [valueSearch,setValueSearch] = useState('')
    const [cliquedProf,setCliquedProf] = useState(null)
    const [lessons,DisplayLessons] = useState(false)
    const [exercice,DisplayExercice] = useState(false)

    const setProf = (prof) =>{
        setCliquedProf(prof)
        DisplayExercice(false)
        DisplayLessons(false)
    }

    const setExercice=()=>{
        DisplayExercice(true)
        setCliquedProf(null)
        DisplayLessons(false)
    }

    const setLessons=()=>{
        DisplayLessons(true)
        setCliquedProf(null)
        DisplayExercice(false)
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/all/profs').then(data=>setProfs(data.data))
    },[])

    return (
        <div className="accueil justify-content-center align-items-center w-100 h-100">
            <Header/>
            <div className="card-group flex items-center justify-between mt-6 bg-white">
                <div className="liste-profs">
                    <div className="intro bg-white p-2 border-b border-black w-[24vw] h-[18vh] ml-[-1.5vw]">
                        <div className="texte">Liste des professeurs</div>
                        <input 
                            type="text" 
                            className="form-control search-prof mt-1 mb-4 w-4/5 mx-auto p-2 border rounded"
                            value={valueSearch}
                            onChange={(e)=>{

                                setValueSearch(e.target.value)

                                if(e.target.value.trim() !== ''){
                                    data.forEach(d=>{
                                        if(d.nom.includes(e.target.value)){
                                            setProfs([d])
                                        }
                                    })
                                }else{
                                    setProfs(data)
                                }

                            }}
                        />
                    </div>
                    <div className="list">
                        <Profs profs={profs} setProf={setProf}/>
                    </div>
                </div>
                <div className="details liste-profs h-[50vh] overflow-y-scroll overflow-x-hidden flex-1">
                    {
                        (cliquedProf !== null) && <DetailProf prof={cliquedProf}/>
                    }
                    {
                        (exercice) && <Exercice/>
                    }
                    {
                        (lessons) && <Lessons/>
                    }
                    <Post/>
                </div>
                <div className="menu liste-profs">
                    <Menus setLessons={setLessons} setExercice={setExercice}/>
                </div>
            </div>
        </div>
    );
}

export default Accueil