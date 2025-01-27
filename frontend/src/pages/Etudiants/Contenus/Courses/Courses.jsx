import React, {useContext, useEffect, useState} from "react";
import "./Courses.css"
import Chapter from "./Chapter/Chapters.jsx";
import {Header} from "../../Accueil/Header/Header.jsx";
import image from '../../../../assets/img.png'
import Filters from "./Filters/Filters.jsx";
import { data } from "../../../../data/courses.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Courses = ()=>{

    const [courses, setCourses] = useState(data)
    const [filters,setFilters]=useState([])
    const navigate = useNavigate()
    const [coursesProf,setCoursesProf]=useState([])
    console.log(localStorage)
    const {prof} = localStorage

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
    
    useEffect(()=>{
        axios.get('http://localhost:3000/courses/all/'+prof).then(response=>{
          setCoursesProf(response.data)
        })
    },[])

    return <>
        <Header/>
        <div className="flex w-full justify-between items-start">
          {/* <Filters setFilter={setFilter} /> */}
          
          <div className="flex flex-col gap-8 w-full h-[calc(100vh-16vh)] overflow-y-scroll p-12">
            {/* Section des cours principaux */}
            <h3>Cours gratuits</h3>
            <div className="flex flex-wrap gap-5">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="relative flex flex-col items-start gap-4 p-4 bg-white shadow-lg rounded-2xl transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                  onClick={() => navigation(`/courses/${course.titre}`)}
                  style={{ width: "18vw", height: "50vh" }}
                >
                  <img
                    src={image}
                    alt={course.langue}
                    className="w-full h-1/2 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between flex-grow">
                    <h3 className="text-lg font-bold">{course.titre}</h3>
                    <p className="text-sm text-gray-600">{course.description}</p>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold">Niveau: </span>
                      {course.niveau}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 mt-2">
                      {course.chapters.length * 4} heures
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section des cours abonnés */}
            {coursesProf.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Cours abonnés</h3>
                <div className="grid gap-4">
                  {coursesProf.map((cours) => (
                    <div
                      key={cours.id}
                      className="p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                      onClick={() => navigation(`/course/view/${cours.id}`,{state: {cours} })}
                    >
                      {cours.titre}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
    </>
}

export default Courses