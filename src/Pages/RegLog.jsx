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
export default function RegLog(){
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

    const [dataCustStorage,setDataCustStorage]=useState('athlete')

    const [isSignIn,setIsSignIn]=useState(true)
    
    
    // dispatch(LoginRedux(token))

    const onLoginSuccess = async(res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
        const data  = await AuthDataService.getAllAuth();
        let arrFireStore = data.docs.map((doc)=>({...doc.data(),id:doc.id})) // data dari firestore
        console.log(arrFireStore)
        var filter = arrFireStore.findIndex((val)=>{
            console.log(val)
            console.log(val.googleId, res.googleId)
            return val.googleId === res.googleId
        })
        console.log(filter)

        if(filter !== -1){
            console.log('data ada')
            console.log(filter)
            console.log(arrFireStore[filter])
            var stringify = JSON.stringify(arrFireStore[filter])
            localStorage.setItem('loginGF',stringify)

        }else {
            console.log('masuk ke else')
            const dataCustomer = res.profileObj
            var statusUser = statusSignUp
            if(statusSignUp === 'register_athlete'){
                statusUser = 'Athlete'
            }else {
                statusUser = 'Coach'
            }
            dataCustomer.status= statusUser
    
            // dispatch(LoginRedux(dataCustomer,'google'))
        }


        
        


    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    useEffect(()=>{
        if(dataCustStorage === undefined){
            let dataCust = JSON.parse(localStorage.getItem('loginGF'))
            console.log(dataCust)

            if(dataCust){
                toast.error(`Selamat Datang ${dataCust.name}`, {
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
            setIsSignIn(false)
            setStatusSignUp('register_coach')


        }else if (status === 'register_athlete'){
            setIsSignIn(false)
            setStatusSignUp('register_athlete')
        }
        else if ( status === 'login'){
            setIsSignIn(true)
        }else {
            navigate('/')
        }
    },[navigate, status])

  

    const loadingsedetik=()=>{
    }

    const onSignoutSuccess = () => {
        //   alert("You have been logged out successfully");
        //   toast.error('Berhasil Logout', {
        //     position: "top-center",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
          console.clear();
          setShowloginButton(true);
          setShowlogoutButton(false);
      };


    //   REGISTER   

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
        }
    const onInputEmail=(value,status)=>{
        var checking_email = validateEmail(value)

        if(checking_email){
            if(status === 'register'){
                console.log(value,status)
            }else if ( status === 'login'){
                console.log(value,status)
            }
        }else {
            console.log('format email salah')
        }

    }
    const onInputPassword=(value,status)=>{
        setPasswordCustomer(value)
       
    }

    const registerCustomer=()=>{

    }

    const loginCustomer=()=>{
        console.log('function login customer jlana')
    }
    // REGISTER LOGIN END

    

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
                                {
                                    showloginButton ? 
                                    <GoogleLogin
                                        clientId={OathClientId}
                                        buttonText="Sign in with Google"
                                        onSuccess={onLoginSuccess}
                                        onFailure={onLoginFailure}
                                        cookiePolicy={'single_host_origin'}
                                        className="btn-google-real"
                                    /> : null

                                }
                                {showlogoutButton ? 
                                    <GoogleLogout
                                    clientId={OathClientId}
                                    buttonText="Sign Out"
                                    onLogoutSuccess={onSignoutSuccess}
                                    className="btn-google-real"
                                    >
                                    </GoogleLogout>
                                    : 
                                    null
                                }

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
                    {statusSignUp === 'register_coach'  ?  // REGISTER AS COACH
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
                             {
                                 showloginButton ? 
                                 <GoogleLogin
                                     clientId={OathClientId}
                                     buttonText="Register with Google"
                                     onSuccess={onLoginSuccess}
                                     onFailure={onLoginFailure}
                                     cookiePolicy={'single_host_origin'}
                                     className="btn-google-real"
                                 /> : null

                             }
                             {showlogoutButton ? 
                                 <GoogleLogout
                                 clientId={OathClientId}
                                 buttonText="Sign Out"
                                 onLogoutSuccess={onSignoutSuccess}
                                 className="btn-google-real"
                                 >
                                 </GoogleLogout>
                                 : 
                                 null
                             }

                         </div>

             
                         <div className="box-to-login">
                            <Link to={'/account/register_athlete'} style={{textDecoration:'none'}} onClick={()=>setStatusSignUp('register_athlete')}>
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
                            {
                                showloginButton ? 
                                <GoogleLogin
                                    clientId={OathClientId}
                                    buttonText="Register with Google"
                                    onSuccess={onLoginSuccess}
                                    onFailure={onLoginFailure}
                                    cookiePolicy={'single_host_origin'}
                                    className="btn-google-real"
                                /> : null

                            }
                            {showlogoutButton ? 
                                <GoogleLogout
                                clientId={OathClientId}
                                buttonText="Sign Out"
                                onLogoutSuccess={onSignoutSuccess}
                                className="btn-google-real"
                                >
                                </GoogleLogout>
                                : 
                                null
                            }

                        </div>

            
                        <div className="box-to-login">
                            <Link to={'/account/register_coach'} style={{textDecoration:'none'}} onClick={()=>setStatusSignUp('register_coach')}>
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