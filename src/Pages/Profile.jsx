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
import {GiStrong} from 'react-icons/gi'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function Profile(){
    toast.configure()
    const [key, setKey] = useState('home');
    const [isGantiNama,setIsGantiNama]=useState(false)
    const [isGantiEmail,setIsGantiEmail]=useState(false)
    const [namaProfile,setNamaProfile]=useState('')
    const [emailProfile,setEmailProfile]=useState('')
    const [openExperience,setOpenExperience]=useState(false)
    const [openSkill,setOpenSkill]=useState(false)
    const [openCourses,setOpenCourses]=useState(false)
    const [addExperience, setAddExperience]=useState('')
    const [addSkill,setAddSkill]=useState('')
    const [addImage,setAddImage]=useState(undefined)

    const [addCourses,setAddCourses]=useState('')
    const [addType,setAddType]=useState('')
    const [addYoutube,setAddYoutube]=useState('')
    const [addDescription,setAddDescription]=useState('')

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
        // const [idProfile,setIdProfile]=useState('')
        
        const getAllCoursesFromFS =async()=>{
            let dataCust = JSON.parse(localStorage.getItem('loginGF'))
            // setIdProfile(dataCust.id)
            const Courses = await CoursesDataService.getAllCourses()
            
            // console.log(Courses)
            if(dataCust){
                // console.log(Courses)
                const Auth = await AuthDataService.getAuth(dataCust.id)
                const allAuth = await AuthDataService.getAllAuth()
                var allAuthArr = []
                allAuth.docs.map((doc)=>(allAuthArr.push({...doc.data(),id:doc.id})))
                console.log(allAuthArr)
                let findIndexActive = allAuthArr.findIndex((val)=>{
                    console.log(val.id,dataCust.id)
                    return val.id === dataCust.id
                })
                console.log(findIndexActive)
                if(findIndexActive !== -1){
                    setDataCustStorage(allAuthArr[findIndexActive])
                    setAllCourses(Courses.docs.map((doc)=>({...doc.data(),id:doc.id})))
                    setStatus(allAuthArr[findIndexActive].status)
                    setNamaProfile(allAuthArr[findIndexActive].name)
                    setEmailProfile(allAuthArr[findIndexActive].email)
                    setIsLogin(true)
                    setIsLoading(false)
                    // setStatus(Auth.data().status)
                    // setNamaProfile(Auth.data().name)
                    // setEmailProfile(Auth.data().email)
                }
          
                
                
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
                            {/* <p>YOU HAVE NO SKILL! FIND YOUR CLASS AND GET YOUR SKILL </p> */}
                        </>
                    )
                }
            }else {
                console.log(dataCustStorage,' ini data cust storage else')
            }
        }

        const renderClassesAthlete=()=>{
           console.log(allCourses)

           if(dataCustStorage.classes){
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
           }else {
               console.log('masuk ke else render classes athlete')
           }
        }


        const renderExperience=()=>{
            if(dataCustStorage.experience){
                if(dataCustStorage.experience.length > 0){
                    return dataCustStorage.experience.map((val,index)=>{
                        return (
                            <div className="btn-experience">
                                {val}
                            </div>
                        )
                    })
                }else {
                    console.log('masuk ke else kosong')
                }
            }else {
                return (
                    <>

                    </>
                )
            }
        }
        const renderCoursesCoach=()=>{
            console.log(allCourses)
            
            if(allCourses && dataCustStorage){
                if(dataCustStorage.classes !== undefined){
                    console.log(allCourses !==undefined && dataCustStorage !== undefined)
                    return allCourses.map((val,index)=>{
                        return dataCustStorage.classes.map((value,id)=>{
                            if(val.coursesID === value){
                                return (
                                    <>
                                        <ul>
                                            <li>{val.coursesID}</li>
                                            <li>{val.title}</li>
                                            <li>{val.youtube}</li> 
                                            <li>{val.type}</li>
                                        </ul>
                                    </>
                                )
                            }
                        })
                    })

                }else {
                    return (
                        <>
                            <p>oops, you have no skill bro</p>
                        </>
                    )
                }
            }else {
                return (
                    <>
                        <p>oops, you have no skill bro</p>
                    </>
                )
            }
        }


        const ubahNama=()=>{
            setIsGantiNama(true)
        }
        const simpanNama=async()=>{
            console.log(namaProfile)
            const update = await AuthDataService.updateAuth(dataCustStorage.id,{name:namaProfile})
            toast.success(`${namaProfile} Berhasil disimpan`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setNamaProfile(namaProfile)
            setIsGantiNama(false)
        }


        // const addExperience=()=>{

        // }

        const finalSaveExp=async()=>{
            
            console.log(dataCustStorage)
            var allExp = dataCustStorage.experience
            allExp.push(addExperience)
            console.log(dataCustStorage.id,'id profile')
            
            const update = await AuthDataService.updateAuth(dataCustStorage.id,{experience:allExp})
            setOpenExperience(false)
            
        }

        const finalSaveSkill=async()=>{
            console.log(dataCustStorage)
            var allSkill = dataCustStorage.skill
            allSkill.push(addSkill)
            console.log(dataCustStorage.id,'id profile')
            
            const update = await AuthDataService.updateAuth(dataCustStorage.id,{skill:allSkill})
            toast.success(`${addSkill} Berhasil ditambahkan`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setOpenSkill(false)
        }

        const finalSaveCourses=async()=>{
            var allCoursesArr = allCourses
            let findCoursesID = allCoursesArr.length + 1

            let newCourses = {
                coach:'BAYU DARMAWAN',
                coachID:dataCustStorage.coachID,
                coursesID:findCoursesID,
                description:addDescription,
                imageCourses:addImage,
                price:'FREE',
                title:addCourses,
                type:addType,
                youtube:addYoutube
            }
            allCoursesArr.push(newCourses)
            let allClassAuth = dataCustStorage.classes
            allClassAuth.push(findCoursesID)
            const update = await CoursesDataService.addCourses(newCourses)
            const updateAuth = await AuthDataService.updateAuth(dataCustStorage.id,{classes:allClassAuth})
            toast.success(`${addCourses} Berhasil ditambahkan`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setOpenCourses(false)

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
                        {
                            status === 'Coach'?
                            <>
                            <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 tabs-coach"
                            >
                                <Tab eventKey="home" title="Biodata Diri" className="tab-item">
                                    <div className="new-box-item-tab">
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
                                                <p>{dataCustStorage.status}</p>
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
                                    <Modal isOpen={openExperience} className="modals-experience" centered toggle={() => setOpenExperience(false)}>
                                        <ModalHeader>
                                        Add Experience
                                        </ModalHeader>
                                        <ModalBody className="modal-body-exp" style={{height:'500px !important'}}>
                                            <div className="input-card" tabIndex={0}>
                                                <GiStrong className="icon-user"/>
                                                <input type="text" className="input-box-register" placeholder='Your Experience' onChange={(e)=>setAddExperience(e.target.value)}  />
                                            </div>
                                            <div className="btn-simpan-exp" onClick={finalSaveExp}>
                                                Save
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                        <div className="box-for-btn">
                                            {
                                                status === 'Coach'?
                                                <div className="btn-tambah-skill" onClick={()=>setOpenExperience(true)}>
                                                    Add Experience
                                                </div>
                                                :
                                                <>
                                                </>
                                            }
                                        </div>
                                        <div className="box-render-card">
                                            {renderExperience()}    
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="Skill" className="tab-item">
                                    <div className="box-item-tab">
                                        <Modal isOpen={openSkill} className="modals-experience" centered toggle={() => setOpenSkill(false)}>
                                            <ModalHeader>
                                            Add Skill
                                            </ModalHeader>
                                            <ModalBody className="modal-body-exp" style={{height:'500px !important'}}>
                                                <div className="input-card" tabIndex={0}>
                                                    <GiStrong className="icon-user"/>
                                                    <input type="text" className="input-box-register" placeholder='Your Experience' onChange={(e)=>setAddSkill(e.target.value)}  />
                                                </div>
                                                <div className="btn-simpan-exp" onClick={finalSaveSkill}>
                                                    Save
                                                </div>
                                            </ModalBody>
                                        </Modal>
                                        <div className="box-for-btn">
                                            {
                                                status  === 'Coach'?
                                                <div className="btn-tambah-skill" onClick={()=>setOpenSkill(true)}>
                                                    Add Skill
                                                </div>
                                            :
                                                <>
                                                </>
                                            }
                                        </div>
                                        <div className="box-render-card">
                                            {renderSkill()}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="Courses" title="Upload Courses" className="tab-item">
                                        <div className="box-item-tab">
                                            <Modal isOpen={openCourses} className="modals-experience" centered toggle={() => setOpenCourses(false)}>
                                                <ModalHeader>
                                                    Upload Courses
                                                </ModalHeader>
                                                <ModalBody className="modal-body-exp" style={{height:'500px !important'}}>
                                                    <div className="input-card" tabIndex={0}>
                                                        <GiStrong className="icon-user"/>
                                                        <input type="text" className="input-box-register" placeholder='Courses Title' onChange={(e)=>setAddCourses(e.target.value)}  />
                                                    </div>
                                                    <div className="input-card" tabIndex={0}>
                                                        <GiStrong className="icon-user"/>
                                                        <input type="text" className="input-box-register" placeholder='Your Youtube ID' onChange={(e)=>setAddYoutube(e.target.value)}  />
                                                    </div>
                                                    <div className="input-card" tabIndex={0}>
                                                        <GiStrong className="icon-user"/>
                                                        <input type="text" className="input-box-register" placeholder='Courses Type' onChange={(e)=>setAddType(e.target.value)}  />
                                                    </div>
                                                    <div className="input-card" tabIndex={0}>
                                                        <GiStrong className="icon-user"/>
                                                        <input type="text" className="input-box-register" placeholder='Description' onChange={(e)=>setAddDescription(e.target.value)}  />
                                                    </div>
                                                    <div className="input-card-file" tabIndex={0}>
                                                        {/* <GiStrong className="icon-user"/> */}
                                                        <input type="file" className="input-box-register-file" placeholder='Description' onChange={(e)=>setAddImage(e.target.value)}  />
                                                    </div>
                                                    <div className="btn-simpan-exp" onClick={finalSaveCourses}>
                                                        Save
                                                    </div>
                                                </ModalBody>
                                            </Modal>
                                            <div className="box-for-btn">
                                                <div className="btn-tambah-skill" onClick={()=>setOpenCourses(true)}>
                                                    Add Courses
                                                </div>
                                            </div>
                                            <div className="box-render-card-courses">
                                                <div className="box-detail-courses">
                                                    <ul>
                                                        <li>ID</li>
                                                        <li>COURSES</li>
                                                        <li>YOUTUBE ID</li> 
                                                        <li>TYPE</li>
                                                    </ul>
                                                </div>
                                                <div className="box-render-courses">
                                                    {renderCoursesCoach()}
                                                </div>
                                            </div>
                                        </div>
                                </Tab>
                            </Tabs>
                            </>
                            :
                            <>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3 tabs-coach"
                                >
                                <Tab eventKey="home" title="Biodata Diri" className="tab-item">
                                    <div className="new-box-item-tab">
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
                                                <p>{dataCustStorage.status}</p>
                                                {/* <p>Ubah</p> */}
                                            </div>

                                            <div className="btn-password">
                                                Ganti Password
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="Skill" className="tab-item">
                                    <div className="box-item-tab">
                                        <Modal isOpen={openSkill} className="modals-experience" centered toggle={() => setOpenSkill(false)}>
                                            <ModalHeader>
                                            Add Skill
                                            </ModalHeader>
                                            <ModalBody className="modal-body-exp" style={{height:'500px !important'}}>
                                                <div className="input-card" tabIndex={0}>
                                                    <GiStrong className="icon-user"/>
                                                    <input type="text" className="input-box-register" placeholder='Your Experience' onChange={(e)=>setAddSkill(e.target.value)}  />
                                                </div>
                                                <div className="btn-simpan-exp" onClick={finalSaveSkill}>
                                                    Save
                                                </div>
                                            </ModalBody>
                                        </Modal>
                                        {/* <div className="box-for-btn">
                                            {
                                                status  === 'Coach'?
                                                <div className="btn-tambah-skill" onClick={()=>setOpenSkill(true)}>
                                                    Add Skill
                                                </div>
                                            :
                                                <>
                                                </>
                                            }
                                        </div> */}
                                        <div className="box-render-card">
                                            {renderSkill()}
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="Classes" title="Class" className="tab-item">
                                    <div className="box-item-tab">
                                        {renderClassesAthlete()}
                                    </div>
                                </Tab>
                            </Tabs>
                            </>
                        }

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