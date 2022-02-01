import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import {Routes,Route} from 'react-router-dom'
import RegLog from './Pages/RegLog';
import Classes from './Pages/Classes';
import ClassDetail from './Pages/ClassDetail';
import Profile from './Pages/Profile';
import AuthDataService from './Services/auth.services'
import CoursesDataService from './Services/courses.services'
// import { ListGroupItem } from 'reactstrap';
// import { doc } from 'firebase/firestore';
// import { QuerySnapshot } from '@firebase/firestore';



function App() {

  


  const [gorillaFitness,setGorillaFitness]= useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [allAuth,setAllAuth]=useState([])
  const [allCourses,setAllCourses]=useState([])

  // const ref = firebase.firestore().collection('gorillaFitness')

  const getData= async ()=>{
    
   const data  = await AuthDataService.getAllAuth();
   var arr = data.docs.map((doc)=>({
     ...doc.data(), id:doc.id
   }))
   setAllAuth(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

   const Courses = await CoursesDataService.getAllCourses()
   var arrCourses = Courses.docs.map((doc)=>({
     ...doc.data(),id:doc.id
   }))
   setAllCourses(arrCourses.docs.map((doc)=>({...doc.data(),id:doc.id})))
  }
    useEffect(()=>{
      getData()
    },[])
  if(isLoading){
    return (
      <>
        <p></p>       
      </>

    )
  }

  return (
    <Routes>
      <Route exact path ='/' element={<Home/>}/>
      <Route exact path ='/account/:status' element={<RegLog/>}/>
      <Route exact path ='/classes' element={<Classes/>}/>
      <Route exact path ='/detail/:code' element={<ClassDetail/>}/>
      <Route exact path ='/profile' element={<Profile/>}/>
    </Routes>
  );
}

export default App;
