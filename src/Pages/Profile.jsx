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
import AuthDataService from '../Services/auth.services'
import { FullPageLoading } from '../Components/Loading/Loading'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Bayu from '../Assets/bayu.JPG'
export default function Profile(){
    toast.configure()
    const [key, setKey] = useState('home');
    const [isGantiNama,setIsGantiNama]=useState(false)
    const [isGantiEmail,setIsGantiEmail]=useState(false)
    const [namaProfile,setNamaProfile]=useState('')
    const [emailProfile,setEmailProfile]=useState('')

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
                const Auth = await AuthDataService.getAuth(dataCust.id)
                setDataCustStorage(Auth.data())
                setAllCourses(Courses.docs.map((doc)=>({...doc.data(),id:doc.id})))
                setIsLogin(true)
                setStatus(Auth.data().status)
                setIsLoading(false)
                setNamaProfile(Auth.data().name)
                setEmailProfile(Auth.data().email)
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
                            <div className="btn-experience">
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


        const renderExperience=()=>{
            return dataCustStorage.experience.map((val,index)=>{
                return (
                    <div className="btn-experience">
                        {val}
                    </div>
                )
            })
        }


        const ubahNama=()=>{
            setIsGantiNama(true)
        }
        const simpanNama=async()=>{
            console.log(namaProfile)
            // const getData = await AuthDataService.getAuth(dataCustStorage.id)
            // console.log(getData)
            // console.log(getData.data())
            // var validData = getData.data()
            // validData.nama
            // console.log(dataCustStorage.id)
            const update = await AuthDataService.updateAuth(dataCustStorage.id,{name:namaProfile})
            console.log(update)
            setIsGantiNama(false)
        }


        const onHandleName=(value)=>{
            setNamaProfile(value)
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
            <div className="new-container-profile">
                <div className="container-header">
                    <Header/>
                </div>
                <div className="container-body">
                    <div className="card-profile">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 tabs-coach"
                            >
                            <Tab eventKey="home" title="Biodata Diri" className="tab-item">
                                <div className="box-item-tab">
                                    <div className="item-left-profile">
                                        <div className="shadowbox-img">
                                            <img src={dataCustStorage.imageUrl} alt="" />
                                            <div className="btn-changeimg">
                                                Pilih Foto
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-right-profile">
                                        <p className="title-bio">Ubah Biodata Diri</p>
                                        <div className="card-name">
                                            <p>Nama</p>
                                            {
                                                isGantiNama ? 
                                                <>
                                                    <input type="text"  defaultValue={namaProfile} className="input-profile" onChange={(e)=>onHandleName(e.target.value)} />
                                                    <p onClick={simpanNama}>Simpan</p>
                                                </>
                                                :
                                                <>
                                                    <p>{dataCustStorage.name}</p>
                                                    <p onClick={ubahNama}>Ubah</p>
                                                </>
                                            }
                                        </div>
                                        <div className="card-name">
                                            <p>Email</p>
                                                
                                                <>
                                                    <p>{dataCustStorage.email}</p>
                                                    {/* <p onClick={ubahEmail}>Ubah</p> */}
                                                </>
                                            
                                        </div>
                                        <div className="card-name">
                                            <p>Status</p>
                                            <p>Athlete</p>
                                            {/* <p>Ubah</p> */}
                                        </div>

                                        <div className="btn-password">
                                            Ganti Password
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Experience" className="tab-item">
                                <div className="box-item-tab">
                                    {renderExperience()}
                                </div>
                            </Tab>
                            <Tab eventKey="contact" title="Skill" className="tab-item">
                                <div className="box-item-tab">
                                    {renderSkill()}
                                </div>
                            </Tab>
                            {
                            status === 'Coach' ? 
                            <>
                            </>
                            :
                            <>
                                <Tab eventKey="contact" title="Class" className="tab-item">
                                    <div className="box-item-tab">
                                        {renderClassesAthlete()}
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="Youtube" className="tab-item">
                                    <div className="box-item-tab">
                                        {renderVideo()}
                                    </div>
                                </Tab>
                            </>
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
            
        </>
    )


    // return (
    //     <>
    //         <div className="container-profile">
    //             <div className="box-header">
    //                 <Header/>
    //             </div>
    //             <div className="box-main">
    //                 {status === 'Coach' ?
    //                     <div className="main-card">
    //                         <div className="top-main-detail">
    //                             <img src={Handstand} alt="" />
    //                             <div className="box-description-top">
    //                                 <div className="name-detail">
    //                                     <p>BAYU DARMAWAN</p>
    //                                     <div className="title-card">
    //                                         COACH
    //                                     </div>
    //                                 </div>
    //                                 <p className="skill">SKILL</p>
    //                                 <div className="skill-detail">
    //                                     {renderSkill()}
    //                                 </div>
    //                             </div>  
    //                         </div>
    //                         <div className="mid-main-detail">
    //                             <div className="box-for-upload">
    //                                 <div className="btn-upload-video">
    //                                     UPLOAD VIDEO
    //                                 </div>
    //                                 <div className="btn-upload-video">
    //                                     UPDATE SKILL
    //                                 </div>
    //                             </div>
    //                             {/* <div className="list-video">
    //                                 {renderVideo()}
    //                             </div> */}
    //                             <div className="list-experience">
    //                                 <p>EXPERIENCE</p>   
    //                                 <div className="box-list-experience">
    //                                     <ul>
    //                                        {renderExperience()}
    //                                     </ul>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 :
    //                     <div className="main-card">
    //                         <div className="top-main-detail">
    //                             <img src={dataCustStorage.imageUrl} alt="" />
    //                             <div className="box-description-top">
    //                                 <div className="name-detail">
    //                                     <p>BAYU DARMAWAN</p>
    //                                     <div className="title-card">
    //                                         ATHLETE
    //                                     </div>
    //                                 </div>
    //                                 <p className="skill">Progress Skill</p>
    //                                 <div className="skill-detail">
    //                                     {renderSkill()}
    //                                 </div>
    //                             </div>  
    //                         </div>
    //                        <div className="mid-main-detail-athlete">
    //                             <p>Current Classes</p>
    //                             <div className="box-for-list-class">
    //                                 <div className="title">
    //                                     <ul>
    //                                         <li>ID</li>
    //                                         <li>Class</li>
    //                                         <li>Coach</li>
    //                                         <li>Type</li>
    //                                     </ul>
    //                                 </div>
    //                                 {renderClassesAthlete()}
    //                             </div>
    //                        </div>
    //                     </div>
    //                 }
    //             </div>
    //             <Footer/>
    //         </div>
    //     </>
    // )
}