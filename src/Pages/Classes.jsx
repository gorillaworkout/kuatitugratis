import React, { useEffect,useState } from 'react';
import '../Styles/Classes.scss'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ImgEffect from '../Components/Effect/img_effect';
import Handstand from '../Assets/handstand.jpg'
import {FiVideo} from 'react-icons/fi'
import {BiTime} from 'react-icons/bi'
import { FullPageLoading } from '../Components/Loading/Loading';
import CardPersegi from '../Components/Card/CardPersegi';
import CardPersegiPanjang from '../Components/Card/CardPersegiPanjang';

import CoursesDataService from '../Services/courses.services'
import AuthDataService from '../Services/auth.services'
import {Link,useParams,useNavigate} from 'react-router-dom'

export default function Classes(){

    const [dataCustStorage,setDataCustStorage]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [allCourses,setAllCourses] =useState(undefined)
    const [allAuth,setAllAuth]=useState(undefined)
    
    // const [isAdd,setIsAdd]=useState(false)


    const getAllCourses=async()=>{
        let dataCust = JSON.parse(localStorage.getItem('loginGF'))
        console.log(dataCust,' ini dataCust')
        setDataCustStorage(dataCust)
        const Courses = await CoursesDataService.getAllCourses()
        const Auth = await AuthDataService.getAllAuth()
        if(Courses && Auth){
            setAllCourses(Courses.docs.map((doc)=>({...doc.data(),id:doc.id})))
            setAllAuth(Auth.docs.map((doc)=>({...doc.data(),id:doc.id})))
            setIsLoading(false)
        }else {

        }
    }
    useEffect(()=>{
        if(allCourses === undefined){
            getAllCourses()
        }else {

        }
    },[])



    const renderAmazingCourses=()=>{


        return allCourses.map((val,index)=>{
            return (
                <CardPersegi arr={{
                    img:val.imageCourses,
                    title:val.title,
                    description:val.description,
                    price:val.price,
                    link:val.coursesID

                }}/>
            )
        })
    }

    const popularCourses=()=>{

        return allCourses.map((val,index)=>{
            return allAuth.map((item,id)=>{
                if(val.coachID === item.coachID){
            
                    return (
                        <>
                            <CardPersegiPanjang arr={{
                                img:val.imageCourses,
                                imgCoach:item.imageUrl,
                                coach:val.coach,
                                price:val.price,
                                title:val.title,
                                link:val.coursesID
                            }}/>
                        </>
                    )
                }
            })
        })
    }

    
    if(isLoading){
        return (
            <>
              <div className="box-loading">
                  <FullPageLoading/>
              </div>
            </>
        )
    }




    

    return (
        <>
            <div className="container-classes">
                <Header/>
                <div className="container-body-classes">
                    <div className="body-main">
                        <div className="amazing-course">
                            <p>Amazing Courses</p>
                            <div className="box-card-amazing">
                                {renderAmazingCourses()}
                            </div>
                        </div>

                        <div className="amazing-course-2">
                            <div className="courses-left">
                                <div className="title-left">
                                    <p>Popular Courses</p>
                                </div>
                                <div className="card-left-box">
                                    {popularCourses()}
                                </div>
                            </div>
                            <div className="courses-right">
                                <div className="title-left">
                                    <p>Latest Courses</p>
                                </div>
                                <div className="card-left-box">
                                   {popularCourses()}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="footer-classes">
                    <Footer/>
                </div>
            </div>
        </>
    )
}