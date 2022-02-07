import React, { useState,useEffect } from 'react';
import '../Styles/ClassDetail.scss'
import Handstand from '../Assets/handstand.jpg'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import YouTube from 'react-youtube';
import { FullPageLoading } from '../Components/Loading/Loading';
import CoursesDataService from '../Services/courses.services'
import {Link,useParams,useNavigate} from 'react-router-dom'
import AuthDataService from '../Services/auth.services'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ClassDetail(){
    toast.configure()
    const {code} = useParams()
    const opts = {
        height: '350px',
        width: '500px',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const onReady=(event)=> {
    // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    const [dataCustStorage,setDataCustStorage]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [allCourses,setAllCourses] =useState(undefined)
    
    // const [isAdd,setIsAdd]=useState(false)


    const getAllCourses=async()=>{
        let dataCust = JSON.parse(localStorage.getItem('loginGF'))

        if(dataCust){ // berarti udah login
            const Auth = await AuthDataService.getAuth(dataCust.id)
            setDataCustStorage(Auth.data())
            const Courses = await CoursesDataService.getAllCourses()
            if(Courses){
                setAllCourses(Courses.docs.map((doc)=>({...doc.data(),id:doc.id})))
                setIsLoading(false)
            }else {
                // no courses from firestore
            }
        }else {
            // blm login gpp. 
        }
    }
    useEffect(()=>{
        if(allCourses === undefined){
            getAllCourses()
        }else {

        }
    },[])

    const tambahSkill=async()=>{
        let idProfile = JSON.parse(localStorage.getItem('loginGF'))
        let idCourses= code
        let coursesArr = dataCustStorage.classes
        let skillArr = dataCustStorage.skill

        let findIndex = coursesArr.findIndex((val)=>{
            return val === code
        })
        let findIndexCourses = allCourses.findIndex((val,index)=>{
            return code === val.coursesID
        })
        
        if(findIndex !== -1){
            toast.error(`Class has been added`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else {
            coursesArr.push(code)
            const update = await AuthDataService.updateAuth(idProfile.id,{classes:coursesArr})
            let skillToAdd = allCourses[findIndexCourses].type
            let arrSkillTotal = dataCustStorage.skill
            
            if(arrSkillTotal){
                let findIndexSkill = arrSkillTotal.findIndex((val)=>{
                    return val === skillToAdd
                })
                if(findIndexSkill !== -1){
                    console.log('skill udh ada. gausah ditambah')
                }else {
                    skillArr.push(allCourses[findIndexCourses].type)
                    const updateCourses = await AuthDataService.updateAuth(idProfile.id,{skill:skillArr})

                }
            }else {
                skillArr.push(allCourses[findIndexCourses].type)
                const updateCourses = await AuthDataService.updateAuth(idProfile.id,{skill:skillArr})
            }

            
            toast.success(` Berhasil ditambahkan`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }

    const renderTitle=()=>{
        let isAdd = false
        let findIndex = allCourses.findIndex((val,index)=>{
            console.log(val,val.coursesID)
            return code == val.coursesID
        })
        console.log(allCourses[findIndex])

        return (
            <>
                 <div className="youtube-box">
                     <div className="card-yt">
                        <YouTube videoId={allCourses[findIndex].youtube} opts={opts} onReady={onReady} />
                        <div className="coach-detail-class">
                            <div className="button-add" onClick={tambahSkill}>
                                Tambahkan Class
                            </div>
                        </div>
                     </div>
                </div>
                <div className="detail-classes">
                    <div className="card-detail-class">
                        <div className="title-class">
                            <p>{allCourses[findIndex].title}</p>
                        </div>
                        <p>
                            {allCourses[findIndex].description}
                        </p>
                    </div>
                    {/* <div className="coach-detail-class">
                            <p>BADGE</p>
                     
                    </div> */}
                </div>
            </>
        )

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
          <div className="container-detail">
            <div className="box-header">
                <Header/>
            </div>
            <div className="box-main">
                {renderTitle()}
            </div>
            {/* <div className="box-footer">
                <Footer/>
            </div> */}
          </div>    
        </>
    )
}