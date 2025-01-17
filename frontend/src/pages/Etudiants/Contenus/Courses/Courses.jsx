import React, {useContext, useState} from "react";
import "./Courses.css"
import Chapter from "./Chapter/Chapters.jsx";
import {Header} from "../../Accueil/Header/Header.jsx";
import image from '../../../../assets/img.png'
import Filters from "./Filters/Filters.jsx";
import { data } from "../../../../data/courses.js";
import { Link, useNavigate } from "react-router-dom";

const Courses = ()=>{

    const [courses, setCourses] = useState(data)
    const [filters,setFilters]=useState([])
    const navigate = useNavigate()

    useContext(()=>{

    },[])

    const setFilter = (value) =>{
    
        let actual = [...filters] 

        if(actual.includes(value)){
            actual = actual.filter(filter=>filter!==value)
            setFilters([...actual])
        }else{
            actual.push(value)
            setFilters([...filters,value])
        }
        console.log(actual)
        setCourses(data.filter(course=>actual.includes(course.titre.toLocaleLowerCase()))); //)))
        

    }

    const navigation = (path)=>{
        navigate(path)
    }
    
    return <>
        <Header/>
        <div className="courses ">
            <Filters setFilter={setFilter} />
            <div className="courses-list">
                {courses.map(course=>(
                   
                    <div className="card card-course"  key={course.id} onClick={()=>navigation(`/courses/${course.titre}`)}>
                        <img src={image} className="card-img-top img-course" alt={course.langue}/>
                        <div className="card-body card-body-course">
                            <div className="bold">{course.titre}</div>
                            <p className="card-text">{course.description}.</p>
                            <div className="card-text-level"><span>Niveau: </span>{course.niveau}</div>
                            <div className="time-estimation">{course.chapters.length * 4} heures</div>
                        </div>
                    </div>
                  
                ))}
            </div>  
        </div>
    </>
}

export default Courses