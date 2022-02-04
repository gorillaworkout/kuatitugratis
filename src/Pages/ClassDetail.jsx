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
export default function ClassDetail(){

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

            console.log(dataCust,' ini dataCust')
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

    const tambahSkill=()=>{

    }

    const renderTitle=()=>{
        let isAdd = false
        let findIndex = allCourses.findIndex((val,index)=>{
            return code === val.coursesID
        })
        console.log(allCourses)
        console.log(allCourses[findIndex].youtube)
        console.log(dataCustStorage)

        if(dataCustStorage.status === 'Athlete'){
           
            var findIndexClass = dataCustStorage.classes.findIndex((val,index)=>{
                return code === val
            })
            console.log(findIndexClass)
            if(findIndexClass !== -1){
                // setIsAdd(false)
                isAdd = false
            }else {
                // setIsAdd(true)
                isAdd = true
            }
        }else {

            isAdd = false
        }


        return (
            <>
                 <div className="youtube-box">
                     <div className="card-yt">
                        <YouTube videoId={allCourses[findIndex].youtube} opts={opts} onReady={onReady} />
                        <div className="coach-detail-class">
                            {
                                isAdd ?
                                <div className="button-add" onClick={tambahSkill}>
                                    Tambahkan Class
                                </div>
                                :
                                <>
                                </>
                            }
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