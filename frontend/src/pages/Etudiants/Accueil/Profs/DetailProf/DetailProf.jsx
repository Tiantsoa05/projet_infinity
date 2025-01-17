import React from "react";
import "./DetailProf.css"
import { Link } from "react-router-dom";

const DetailProf = ({prof})=>{
    return(
        <div className="detail-prof p-4 shadow-md rounded-md bg-white">
            <div className="image-prof-detail flex justify-center mb-4">
                <img 
                    src={prof.image} 
                    alt="image" 
                    className="detail-image rounded-full w-32 h-32 object-cover"
                />
            </div>
            <div className="names text-center mb-4">
                <h5 className="text-lg font-semibold">{prof.nom} {prof.prenom}</h5>
                <p className="text-sm text-gray-600">Diplome: {prof.diplome}</p>
                <p className="text-sm text-gray-600">Niveau de langue: {prof.niveau}</p>
                <p className="text-sm text-gray-600">Cout: {prof.cout}</p>
            </div>
            <div className="buttons flex justify-center gap-4">
                <Link to={"/payer"}>
                    <div className="btn-primary px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Suivre le prof</div>
                </Link>
                <div className="btn-primary px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">Ne pas suivre</div>
            </div>
        </div>
    )
}

export default DetailProf