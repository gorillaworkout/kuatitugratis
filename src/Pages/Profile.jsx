import React, { useState,useEffect } from 'react';
import '../Styles/Profile.scss'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Handstand from '../Assets/handstand.jpg'

import YouTube from 'react-youtube';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useParams,useNavigate} from 'react-router-dom'
import CoursesDataService from '../Services/courses.services'
import { FullPageLoading } from '../Components/Loading/Loading'
export default function Profile(){
    toast.configure()
    const navigate = useNavigate()
    const opts = {
        height: '200',
        width: '200',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };


      const onReady=(event)=> {
        // access to player in all event handlers via event.target
            event.target.pauseVideo();
        }

        const [status,setStatus]=useState('Athlete')
        const [isLoading,setIsLoading]=useState(true)

        // CHECKING USER TYPE
        const [dataCustStorage,setDataCustStorage]=useState(undefined)
        const [isLogin,setIsLogin]=useState(false)
        const [loginHover,setLoginHover]=useState(false)
        const [allCourses,setAllCourses] =useState(undefined)

        const getAllCoursesFromFS =async()=>{
            let dataCust = JSON.parse(localStorage.getItem('loginGF'))
            const Courses = await CoursesDataService.getAllCourses()
            console.log(Courses)
            if(dataCust){
                console.log(Courses)
                setAllCourses(Courses.docs.map((doc)=>({...doc.data(),id:doc.id})))
                setIsLogin(true)
                setStatus(dataCust.status)
                setDataCustStorage(dataCust)
                setIsLoading(false)
            }else {
                setIsLogin(false)
                toast.error(`Login First!`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/')
                
            }

             
        }

        useEffect(()=>{
            if(dataCustStorage === undefined){
                
                getAllCoursesFromFS()
            }else {
                console.log('useeffect 71 else')
            }
        },[]) 
        // CHECKING USER TYPE END

        const renderVideo=()=>{
            
            return dataCustStorage.youtube.map((val,index)=>{
                return (
                    <YouTube videoId={val.youtube} opts={opts} onReady={onReady} />
                )
            })
        }

        const renderSkill=()=>{
            if(dataCustStorage){
                if(dataCustStorage.skill.length > 0){
                    return dataCustStorage.skill.map((val,index)=>{
                        return (
                            <div className="card-skill">
                                {val}
                            </div>
                        )
                    })
                }else {
                    return (
                        <>
                            <p>YOU HAVE NO SKILL! FIND YOUR CLASS AND GET YOUR SKILL </p>
                        </>
                    )
                }
            }else {
                console.log(dataCustStorage,' ini data cust storage else')
            }
        }

        const renderClassesAthlete=()=>{
           console.log(allCourses)

            return dataCustStorage.classes.map((val,index)=>{
                return allCourses.map((value,id)=>{
                    if(val === value.coursesID){
                        console.log(val,'ini val')
                        console.log(value.coursesID,'ini value')
                        return (
                            <Link to={`/detail/${value.coursesID}`} className="list-class">
                                <ul>
                                    <li>{value.coursesID}</li>
                                    <li>{value.title}</li>
                                    <li>{value.coach}</li>
                                    <li>{value.type}</li>
                                </ul>
                            </Link>
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
            <div className="container-profile">
                <div className="box-header">
                    <Header/>
                </div>
                <div className="box-main">
                    {status === 'Coach' ?
                        <div className="main-card">
                            <div className="top-main-detail">
                                <img src={Handstand} alt="" />
                                <div className="box-description-top">
                                    <div className="name-detail">
                                        <p>BAYU DARMAWAN</p>
                                        <div className="title-card">
                                            COACH
                                        </div>
                                    </div>
                                    <p className="skill">SKILL</p>
                                    <div className="skill-detail">
                                        {renderSkill()}
                                    </div>
                                </div>  
                            </div>
                            <div className="mid-main-detail">
                                <div className="box-for-upload">
                                    <div className="btn-upload-video">
                                        UPLOAD VIDEO
                                    </div>
                                    <div className="btn-upload-video">
                                        UPDATE SKILL
                                    </div>
                                </div>
                                <div className="list-video">
                                    {renderVideo()}
                                </div>
                            </div>
                        </div>
                    :
                        <div className="main-card">
                            <div className="top-main-detail">
                                <img src={Handstand} alt="" />
                                <div className="box-description-top">
                                    <div className="name-detail">
                                        <p>BAYU DARMAWAN</p>
                                        <div className="title-card">
                                            ATHLETE
                                        </div>
                                    </div>
                                    <p className="skill">Progress Skill</p>
                                    <div className="skill-detail">
                                        {renderSkill()}
                                    </div>
                                </div>  
                            </div>
                           <div className="mid-main-detail-athlete">
                                <p>Current Classes</p>
                                <div className="box-for-list-class">
                                    <div className="title">
                                        <ul>
                                            <li>ID</li>
                                            <li>Class</li>
                                            <li>Coach</li>
                                            <li>Type</li>
                                        </ul>
                                    </div>
                                    {renderClassesAthlete()}
                                 
                                </div>
                           </div>
                        </div>
                    }
                </div>
                <Footer/>
            </div>
        </>
    )
}