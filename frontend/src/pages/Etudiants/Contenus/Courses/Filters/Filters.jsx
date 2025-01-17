import React, { useState } from "react";

const Filters = ({ setFilter }) => {
    const [debLevel, setDebLevel] = useState(false);
    const [intLevel, setIntLevel] = useState(false);
    const [advLevel, setAdvLevel] = useState(false);
    const [grammar,setGrammar] = useState(false);
    const [vocabulary, setVocabulary] = useState(false);
    const [conjugaison, setConjugaison] = useState(false);

    return (
        <div className="filter-courses">
            
            <div className="levels">
                <h3>Niveaux</h3>
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        name="débutant" 
                        id="débutant" 
                        className="form-check-input"
                        ckecked={debLevel} 
                        onChange={(e) =>{
                            setDebLevel(!debLevel)
                            if(e.target.checked){
                                setFilter(e.target.name)
                            }
                        }} 
                    />
                    <label htmlFor="niveau" className="form-check-label">
                        Débutant
                    </label>
                </div>
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        name="intermédiaire" 
                        id="intermédiaire" 
                        className="form-check-input"
                        ckecked={intLevel} 
                        onChange={(e) =>{
                            setIntLevel(!intLevel)
                            if(e.target.checked){
                                setFilter(e.target.name)
                                if(e.target.checked){
                                    setFilter(e.target.name)
                                }
                            }
                        }}
                    />
                    <label htmlFor="niveau" className="form-check-label">
                        Intermédiaire
                    </label>
                </div>
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        name="avancé" 
                        id="avancé" 
                        className="form-check-input"
                        ckecked={advLevel} 
                        onChange={(e) =>{
                            setAdvLevel(!advLevel)
                            if(e.target.checked){
                                setFilter(e.target.name)
                            }
                        }}
                    />
                    <label htmlFor="niveau" className="form-check-label">
                        Avancé
                    </label>
                </div>
            </div>
            <div className="chapters-filter">
                <h3>Chapitres</h3>
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        name="grammaire" 
                        id="grammaire" 
                        ckecked={grammar} 
                        onChange={(e) =>{
                            setGrammar(!grammar)
                            if(e.target.checked){
                                setFilter(e.target.name)
                            }
                        }}
                        className="form-check-input"
                    />
                    <label htmlFor="grammaire" className="form-check-label">
                        Grammaire
                    </label>
                </div>
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        name="vocabulaires" 
                        id="vocab" 
                        className="form-check-input"
                        ckecked={vocabulary} 
                        onChange={(e) =>{
                            setVocabulary(!vocabulary)
                            if(e.target.checked){
                                setFilter(e.target.name)
                            }
                        }}
                    />
                    <label htmlFor="vocab" className="form-check-label">
                        Vocabulaires
                    </label>
                </div>
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        name="conjugaison" 
                        id="conjugaison" 
                        className="form-check-input"
                        ckecked={conjugaison} 
                        onChange={(e) =>{
                            setConjugaison(!conjugaison)
                            if(e.target.checked){
                                setFilter(e.target.name)
                            }
                        }}
                    />
                    <label htmlFor="conjug" className="form-check-label">
                        Conjugaison
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Filters