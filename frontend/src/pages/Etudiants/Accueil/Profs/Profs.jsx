import React,{ useState } from "react";
import { CardProf } from "./CardProf/CardProf.jsx";
import "./Profs.css"

export const Profs = ({profs,setProf}) => {
    
    return (
        <div className="liste-prof flex flex-col gap-2 overflow-x-hidden">
            {
                profs.map((prof)=>(
                    <CardProf 
                        prof={prof} 
                        key={prof.nom_prof}
                        setProf={setProf}
                    />
                ))
            }
                
        </div>   
    )
}