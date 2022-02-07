import React, { useState,useEffect } from 'react';
import '../Styles/RegLog.scss'
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import {OathClientId} from '../Helpers/OathGoogle'
import {FiUser} from 'react-icons/fi'
import {BsEyeSlash,BsEye} from 'react-icons/bs'
import {AiOutlineHome} from 'react-icons/ai'
import {Link,useParams,useNavigate} from 'react-router-dom'
import { FullPageLoading } from '../Components/Loading/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LoginRedux} from '../redux/Actions/AuthActions'
import {useDispatch,useSelector} from 'react-redux'
import AuthDataService from '../Services/auth.services'
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../firebase-config'
import {FcGoogle} from 'react-icons/fc'
export default function NewRegLog(){
    toast.configure()
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const {status} = useParams()
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const [isRegister,setIsRegister]=useState(true)
    const [isLoading,setIsLoading]=useState(true)

    const [emailCustomer,setEmailCustomer]=useState('')
    const [passwordCustomer,setPasswordCustomer]=useState('')
    const [statusSignUp, setStatusSignUp]=useState('athlete')

    const [dataCustStorage,setDataCustStorage]=useState(undefined)

    const [isSignIn,setIsSignIn]=useState(true)



    useEffect(()=>{
        if(dataCustStorage === undefined){
            let dataCust = JSON.parse(localStorage.getItem('loginGF'))
            if(dataCust){
                toast.error(`Welcome to the Club ${"\n"} ${dataCust.name}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/')
                setDataCustStorage(dataCust)
            }else {

                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
            }
        }
    },[dataCustStorage, navigate])

    useEffect(()=>{
        if(status === 'register_coach'){
            setIsSignIn(false)
            setStatusSignUp('Coach')


        }else if (status === 'register_athlete'){
            setIsSignIn(false)
            setStatusSignUp('Athlete')
        }
        else if ( status === 'login'){
            setIsSignIn(true)
        }else {
            navigate('/')
        }
    },[navigate, status])

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        }
    const onInputEmail=(value,status)=>{
        var checking_email = validateEmail(value)

        if(checking_email){
            if(status === 'register'){
                setEmailCustomer(value)
                
            }else if ( status === 'login'){
                console.log(value,status)
                
            }
        }else {
        }

    }
    const onInputPassword=(value,status)=>{
        setPasswordCustomer(value)
       
    }
    const loginCustomer=async()=>{
        console.log(emailCustomer)
        console.log(passwordCustomer)
        const data  = await AuthDataService.getAllAuth();
        let arrFireStore = data.docs.map((doc)=>({...doc.data(),id:doc.id})) // data dari firestore
        console.log(arrFireStore)
        var filter = arrFireStore.findIndex((val)=>{
            console.log(val)
            return val.email === emailCustomer && val.password === passwordCustomer
        })
        if(filter !== -1){
            var stringify = JSON.stringify({id:arrFireStore[filter].id})
            localStorage.setItem('loginGF',stringify)
            navigate('/')
            toast.error(`Selamat Datang ${emailCustomer}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else {
            toast.error('Username/Password Salah', {
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
    const registerCustomer=async()=>{
        var arr = {
            email:emailCustomer,
            familyname:emailCustomer,
            givenName:emailCustomer,
            googleId:'registerWithoutGoogle',
            imageUrl:"https://lh3.googleusercontent.com/a/AATXAJwkYxgGG1SZCEz1wcoU7tuB0WQKf_1hAEdsCKp6=s96-c",
            loginWithGoogle:false,
            name:emailCustomer,
            skill:[],
            status:statusSignUp,
            youtube:[],
            password:passwordCustomer,
            classes:[]
        }
        // console.log('Login Success:', res.profileObj);
       
        const data  = await AuthDataService.getAllAuth();
        let arrFireStore = data.docs.map((doc)=>({...doc.data(),id:doc.id})) // data dari firestore
        var allAuthArr = []
        data.docs.map((doc)=>{
            allAuthArr.push({...doc.data(),id:doc.id})
        })
        let findIndexNewRegister = allAuthArr.length+1
        var filter = arrFireStore.findIndex((val)=>{
            console.log(val)
            return val.email === arr.email
        })
        if(filter !== -1){
            var stringify = JSON.stringify({id:arrFireStore[filter].id})
            localStorage.setItem('loginGF',stringify)
            navigate('/')
            setShowloginButton(false);
            setShowlogoutButton(true);
        }else {

            if(emailCustomer !== '' && passwordCustomer !==''){
                const dataCustomer = arr
                dataCustomer.status= statusSignUp
                dataCustomer.skill =[]
                dataCustomer.youtube=[]
                dataCustomer.loginWithGoogle = true
                dataCustomer.classes = []
                var findCoachId = arrFireStore.length + 1
                dataCustomer.coachID = findCoachId
                var addAuth = await AuthDataService.addAuth(dataCustomer)
                // console.log(addAuth._key.path.segments[1])
                let idCustomer = addAuth._key.path.segments[1]
                var stringify = JSON.stringify({id:idCustomer})
                localStorage.setItem('loginGF',stringify)
                navigate('/')
                setShowloginButton(false);
                setShowlogoutButton(true);
                toast.error(`Welcome to the Club \n ${emailCustomer}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else {
                toast.error('Username/Password is empty', {
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
        
    }

    const SignInGoogle=async(params)=>{
        // let loginFirst = await signInWithGoogle(params)
        // console.log(loginFirst,params)
        signInWithPopup(auth,provider)
        .then(async(res)=>{
            let googleData = res.user.reloadUserInfo
            // console.log(res.user.reloadUserInfo.localId)
            const data  = await AuthDataService.getAllAuth();
            let arrFireStore = data.docs.map((doc)=>({...doc.data(),id:doc.id})) // data dari firestore
            let countingID = arrFireStore.length+1
            let filterUser = arrFireStore.findIndex((val)=>{
                return val.googleId === res.user.reloadUserInfo.localId
            })
            if(filterUser !== -1){ // kalo bukan -1 berarti user udh ada tinggal login
                let stringify = JSON.stringify({id:arrFireStore[filterUser].id})
                localStorage.setItem('loginGF',stringify)

            }else { // user -1 berarti blm kedaftar, register 

                let dataToAuth = {
                    name:googleData.displayName,
                    givenName:googleData.displayName,
                    familyName:googleData.displayName,
                    googleId:googleData.localId, // bisa juga PAKE UID dr google
                    coachID:countingID,
                    email:googleData.email,
                    imageUrl:googleData.photoUrl,
                    password:'4kuL4p4rTapiMalesB3l!',
                    status:params,
                    youtube:[],
                    experience:[],
                    classes:[],
                    skill:[],
                    loginWithGoogle:true
                }
                let addAuth = await AuthDataService.addAuth(dataToAuth)
                const Auth = await AuthDataService.getAllAuth()
                var allAuthFromFireStore = []
                Auth.docs.map((doc)=>{
                    allAuthFromFireStore.push({...doc.data(),id:doc.id})
                })
    
                let findIndexNew = allAuthFromFireStore.findIndex((val)=>{
                    return val.email === googleData.email
                })

                if(findIndexNew !== -1 ){
                    let stringify = JSON.stringify({id:allAuthFromFireStore[findIndexNew].id})
                    localStorage.setItem('loginGF',stringify)
                }else {
                    console.log('msk ke else')
                }
                
            }
            toast.error(`Welcome to the Club ${"\n"} ${googleData.displayName}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/')
        }).catch((err)=>{
            console.log(err)
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
            <div className="container-relog">
                {
                    isSignIn? // FOR LOGIN FOR BOTH
                    <div className="reglog-card">
                            <p> <span>GORILLA</span>  FITNESS</p>
                            <p>Sign in</p>
                            <div className="box-input-register">
                                <div className="input-card" tabIndex={0}>
                                    <FiUser className="icon-user"/>
                                    <input type="text" className="input-box-register" placeholder='Email' onChange={(e)=>onInputEmail(e.target.value,'login')} />
                                </div>
                                <div className="input-card">
                                    <BsEyeSlash className="icon-user"/>
                                    <input type="password" className="input-box-register" placeholder='Password'  onChange={(e)=>onInputPassword(e.target.value,'login')}/>
                                </div>
                            </div>
                            <div className="btn-register" onClick={loginCustomer}>
                                <p>LOGIN</p>
                            </div>
                            <div className="box-login-google">
                                <button onClick={()=>SignInGoogle('Login')} className="btn-google">
                                    <FcGoogle className="icon-google"/>
                                    Sign in With Google
                                </button>
                            </div>
                            <div className="box-to-login">
                                <Link to={'/account/register_athlete'} style={{textDecoration:'none'}}>
                                    <p>Register as Athlete</p>

                                </Link>
                                <Link to={'/'} style={{textDecoration:'none'}}>
                                    <p> <AiOutlineHome className="icon-user"/></p>
                                </Link>
                            </div>
                    </div>
                    :
                    <>    
                    {statusSignUp === 'Coach'  ?  // REGISTER AS COACH
                    <div className="reglog-card">
                         <p> <span>GORILLA</span>  FITNESS</p>
                             <p>Sign up as <span>Coach</span>  </p>
                         <div className="box-input-register">
                             <div className="input-card" tabIndex={0}>
                                 <FiUser className="icon-user"/>
                                 <input type="text" className="input-box-register" placeholder='Email' onChange={(e)=>onInputEmail(e.target.value,'register')} />
                             </div>
                             <div className="input-card">
                                 <BsEyeSlash className="icon-user"/>
                                 <input type="password" className="input-box-register" placeholder='Password' onChange={(e)=>onInputPassword(e.target.value,'register')} />
                             </div>
                         </div>
                         <div className="btn-register" onClick={registerCustomer}>
                             <p>REGISTER</p>
                         </div>
                         <div className="box-login-google">
                            <button onClick={()=>SignInGoogle('Coach')} className="btn-google">
                                <FcGoogle className="icon-google"/>
                                Sign in With Google
                            </button>
                         </div>

             
                         <div className="box-to-login">
                            <Link to={'/newaccount/register_athlete'} style={{textDecoration:'none'}} onClick={()=>setStatusSignUp('Athlete')}>
                                <p>Sign up as Athlete</p>
                            </Link>
                             <p> <AiOutlineHome className="icon-user"/></p>
                             <Link to={'/newaccount/login'} style={{textDecoration:'none'}}>
                                 <p>Already have account</p>
                             </Link>
                         </div>
                    </div> 
                    :
                    // REGISTER AS ATHLETE
                    <div className="reglog-card"> 
                        <p> <span>GORILLA</span>  FITNESS</p>
                            <p>Sign up as <span>Athlete</span>  </p>
                        <div className="box-input-register">
                            <div className="input-card" tabIndex={0}>
                                <FiUser className="icon-user"/>
                                <input type="text" className="input-box-register" placeholder='Email' onChange={(e)=>onInputEmail(e.target.value,'register')} />
                            </div>
                            <div className="input-card">
                                <BsEyeSlash className="icon-user"/>
                                <input type="password" className="input-box-register" placeholder='Password' onChange={(e)=>onInputPassword(e.target.value,'register')} />
                            </div>
                        </div>
                        <div className="btn-register" onClick={registerCustomer}>
                            <p>REGISTER</p>
                        </div>
                        <div className="box-login-google">
                            <button onClick={()=>SignInGoogle('Athlete')} className="btn-google">
                                <FcGoogle className="icon-google"/>
                                Sign in With Google
                            </button>
                        </div>
                        <div className="box-to-login">
                            <Link to={'/newaccount/register_coach'} style={{textDecoration:'none'}} onClick={()=>setStatusSignUp('Coach')}>
                                <p>Sign up as Coach</p>
                            </Link>
                            <p> <AiOutlineHome className="icon-user"/></p>
                            <Link to={'/newaccount/login'} style={{textDecoration:'none'}}>
                                <p>Already have account</p>
                            </Link>
                        </div>
                    </div>    
                    
                    }
                    </>        
                }
            </div>
        </>
    )
}