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
import {signInWithGoogle} from '../firebase-config'
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
            console.log(dataCust)

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
                console.log('masuk ke else 101')
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
            }
        }
    },[dataCustStorage, navigate])

    useEffect(()=>{
        if(status === 'register_coach'){
            console.log('226')
            setIsSignIn(false)
            setStatusSignUp('Coach')


        }else if (status === 'register_athlete'){
            console.log('231')
            setIsSignIn(false)
            setStatusSignUp('Athlete')
        }
        else if ( status === 'login'){
            console.log('237')
            setIsSignIn(true)
        }else {
            navigate('/')
        }
    },[navigate, status])

    const onInputEmail=(value,status)=>{

    }
    const onInputPassword=(value,status)=>{

    }
    const loginCustomer=()=>{

    }
    const registerCustomer=()=>{

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
                                <button onClick={signInWithGoogle}>Sign in With Google</button>
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
                             <button onClick={signInWithGoogle}>Sign in With Google</button>
                         </div>

             
                         <div className="box-to-login">
                            <Link to={'/account/register_athlete'} style={{textDecoration:'none'}} onClick={()=>setStatusSignUp('Athlete')}>
                                <p>Sign up as Athlete</p>
                            </Link>
                             <p> <AiOutlineHome className="icon-user"/></p>
                             <Link to={'/account/login'} style={{textDecoration:'none'}}>
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
                            <button onClick={signInWithGoogle}>Sign in With Google</button>
                        </div>
                        <div className="box-to-login">
                            <Link to={'/account/register_coach'} style={{textDecoration:'none'}} onClick={()=>setStatusSignUp('Coach')}>
                                <p>Sign up as Coach</p>
                            </Link>
                            <p> <AiOutlineHome className="icon-user"/></p>
                            <Link to={'/account/login'} style={{textDecoration:'none'}}>
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