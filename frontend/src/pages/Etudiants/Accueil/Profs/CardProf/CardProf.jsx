import React from "react";


export const CardProf = ({ prof, setProf }) => {
  return (
    <div 
        className="card-prof-profile cursor-pointer p-4 hover:shadow-lg transition-shadow" 
        onClick={()=>setProf(prof)}
    >
        <div className="card-group flex items-center gap-4">
            <div className="image-prof">
                <img 
                    src={prof.image} 
                    alt="image" 
                    className="img-fluid rounded-full w-16 h-16 object-cover" 
                />
            </div>
            <div className="names">
                <h5 className="text-lg font-semibold">{prof.nom} {prof.prenom}</h5>
            </div>
        </div>
        <div className="description mt-4 text-gray-700">
            <div>{prof.diplome}</div>
            <div>{prof.niveau}</div>
            <div>{prof.cout}</div>
        </div>
    </div>
  );
};