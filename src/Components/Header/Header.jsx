import React,{useEffect,useState}from 'react';
import '../../Styles/Header.scss'
import Logo1 from '../../Assets/gorillalogops.png'
import Logo2 from '../../Assets/newbggw.png'
import {FiUser} from 'react-icons/fi'
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose,AiOutlineLogout} from 'react-icons/ai'

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    
  } from "reactstrap";
  import Gym from '../../Assets/gym4.jpg'
  import {useDispatch,useSelector} from 'react-redux'
  import { Tabs, Tab, Row, Nav } from "react-bootstrap";
  import {Link,useParams,useNavigate} from 'react-router-dom'
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import AuthDataService from '../../Services/auth.services'
  import { FullPageLoading } from '../../Components/Loading/Loading'
export default function Header(){
    toast.configure()
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const Auth = useSelector(state=>state.Auth)
    //   SCROLL EFFECT HEADER START
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHeaderScroll,setIsHeaderScroll] = useState(false)
    const [toggleMenu,setToggleMenu]=useState(false)

    const [isLoading,setIsLoading] =useState(false)



    const handleScroll = () => {
        const position = window.pageYOffset;
        if(position > 0 ){
            if(toggleMenu){
                setIsHeaderScroll(true)
            }else {
                setIsHeaderScroll(true)
            }
        }else if (position === 0){
            if(toggleMenu){
                setIsHeaderScroll(true)
            }else {
                setIsHeaderScroll(false)
                setToggleMenu(false)
            }
        }
        setScrollPosition(position);
      };
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    //   SCROLL EFFECT HEADER 
    
    // ON MOUSE ENTER /  LEAVE
      
      const onMouseEnter=()=>{
          if(isHeaderScroll){
              setIsHeaderScroll(false)
          }else {
            setIsHeaderScroll(true)
          }

        if(toggleMenu){
            setToggleMenu(false)
        }else {
            setToggleMenu(true)
            setIsHeaderScroll(true)
        }
        
      }
    // ON MOUSE ENTER / LEAVE END


    const [dataCustStorage,setDataCustStorage]=useState(undefined)
    const [isLogin,setIsLogin]=useState(false)
    const [loginHover,setLoginHover]=useState(false)

    const fetchingUser=async()=>{
        let dataCust = JSON.parse(localStorage.getItem('loginGF'))
        if(dataCust){
            // navigate('/')
            if(dataCust.status === 'Athlete'){
                
            }else if (dataCust.status === 'Coach'){
                
            }else {
                dataCust.status = 'Athlete'
            }
            const Auth = await AuthDataService.getAuth(dataCust.id)
            var allAuth = Auth.data()
            setDataCustStorage(Auth.data())
            setIsLoading(false)
            setIsLogin(true)
        }else {
            setIsLogin(false)
        }
    }
    useEffect(()=>{
        if(dataCustStorage === undefined){
            
            fetchingUser()
        }else if (dataCustStorage) {
            setIsLogin(true)
        }
    },[])

    const renderNameAfterLogin=()=>{
      
    //     <FiUser className="icon-header"/>
    // <span>{dataCustStorage.name}</span>
    } 


    const onMouseLeave=()=>{
        setLoginHover(false)

    }
    const onMouseHover=()=>{
        setLoginHover(true)
    }

    const logout = () =>{
        localStorage.removeItem('loginGF')
        toast.error(`Dont Leave me ${dataCustStorage.name}.... ok bye`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigate('/')
        setIsLogin(false)
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
            <div className="container-header-box">
                {
                    isHeaderScroll?
                    <div className="box-onscroll-header">
                        <div className="box-icon">
                            <Link to={'/'}>
                                <img src={Logo2} alt="" />
                            </Link>
                            {/* <p>Gorilla Fitness</p> */}
                        </div>
                        <div className="box-login">
                            <p>
                                {
                                    isLogin ? 

                                    <div  style={{textDecoration:'none'}}>
                                        {
                                            loginHover ?
                                            <>
                                            <div className="logout-box"  
                                                 onClick={logout}
                                                onMouseLeave={onMouseLeave} >
                                                <AiOutlineLogout className="icon-header"/>
                                                <span>Logout</span>
                                            </div>
                                            </>
                                            :
                                            <>
                                                <div className="successlogin" 
                                                onMouseOver={onMouseHover} 
                                                >
                                                    <FiUser className="icon-header"/>
                                                    <span>{dataCustStorage.name}</span>

                                                </div>
                                            </>
                                        }
                                        
                                    </div>
                                    :
                                    <Link to={'/account/login'} style={{textDecoration:'none'}}>
                                        <FiUser className="icon-header"/>
                                        <span>Sign In</span>
                                    </Link>
                                }
                            </p>
                            <div className="box-icon-menu" onClick={()=>onMouseEnter()}>
                                <Dropdown
                                    isOpen={toggleMenu}
                                    >
                                    <DropdownToggle caret className="border-bar">
                                        {toggleMenu?
                                            <AiOutlineClose className="icon-header"/>
                                            :
                                            <FaBars className="icon-header" />
                                        }
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-toggle-allcategory">
                                    
                                    
                                        <Tab.Container defaultActiveKey={1}>
                                            <Nav variant="pills" className="flex-column">
                                                <Row>        
                                                    {/* <p>ROW JUDUL</p> */}
                                                </Row>
                                            </Nav>

                                            <Tab.Content>
                                                {/* {render_isi_allCategory()} */}
                                                <div className="box-content-hover">
                                                    <div className="content-hover-left">
                                                        <div className="hover-left-card">
                                                            <ul>
                                                                <li className="title-left-card">
                                                                    NEW TO GYM?
                                                                </li>
                                                                <li>
                                                                    <Link to={'/classes'} style={{textDecoration:'none'}}>
                                                                        Classes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    Personal Training
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="hover-left-card">
                                                            <ul>
                                                                <li className="title-left-card">
                                                                    HIT THE GYM
                                                                </li>
                                                                <li>
                                                                    CLUBS
                                                                </li>
                                                                <li>
                                                                    TIMETABLE
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="hover-left-card">
                                                            <ul>
                                                                <li className="title-left-card">
                                                                    MEMBERSHIP
                                                                </li>
                                                                <li>
                                                                    <Link to={'/account/register_coach'} style={{textDecoration:'none'}}>
                                                                        JOIN ONLINE AS COACH
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={'/account/register_athlete'} style={{textDecoration:'none'}}>
                                                                        JOIN ONLINE AS ASTHLETE
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={'newaccount/register_athlete'} style={{textDecoration:'none'}}>
                                                                        Login  by Google firebase
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="hover-left-card">
                                                            <ul>
                                                                <li className="title-left-card">
                                                                    Profile
                                                                </li>
                                                                <li>
                                                                    <Link to={'/profile'} style={{textDecoration:'none'}}>
                                                                        Update Profile
                                                                    </Link>
                                                                </li>
                                                                
                                                              
                                                            </ul>
                                                        </div>
                                                        

                                                    </div>
                                                    <div className="content-hover-right">
                                                        <p>Make Fit Happen 2022 Returns With Inspiring Winners</p>
                                                        <img src={Gym} alt="" />
                                                        <p>They are finally here to inspire and motivate you on your fitness journey. Meet Suryadi, Silfiana, and Joane, winners of Make Fit Happen 2021 and their inspiring stories.</p>
                                                    </div>
                                                </div>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </DropdownMenu>
                                </Dropdown> 
                            </div>
                        </div>
                    </div>
                    :
                    <div className="box-scroll-header">
                        <div className="box-icon">
                            <Link to={'/'}>
                                <img src={Logo2} alt="" />
                            </Link>
                        </div>
                        <div className="box-login">
                            <p>
                            {
                                    isLogin ? 
                                    <div style={{textDecoration:'none'}}>
                                             {
                                            loginHover ?
                                            <>
                                            <div className="logout-box"  
                                                 onClick={logout}
                                                onMouseLeave={onMouseLeave} >
                                                <AiOutlineLogout className="icon-header"/>
                                                <span>Logout</span>
                                            </div>
                                            </>
                                            :
                                            <>
                                                <div className="successlogin" 
                                                onMouseOver={onMouseHover} 
                                                >
                                                    <FiUser className="icon-header"/>
                                                    <span>{dataCustStorage.name}</span>

                                                </div>
                                            </>
                                        }
                                        
                                    </div>
                                    :
                                    <Link to={'/account/login'} style={{textDecoration:'none'}}>
                                        <FiUser className="icon-header"/>
                                        <span>Sign In</span>
                                    </Link>
                                }
                            </p>
                            <div className="box-icon-menu" onClick={()=>onMouseEnter()}>
                                
                                <Dropdown
                                    isOpen={toggleMenu}>
                                    <DropdownToggle caret className="border-bar">
                                        {/* <p onClick={open_semua_kategori}>Semua  Kategori</p> */}
                                        <FaBars className="icon-header" 
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-toggle-allcategory">
                                    
                                    
                                        <Tab.Container defaultActiveKey={1}>
                                            <Nav variant="pills" className="flex-column">
                                                <Row>        
                                                    <p>ROW JUDUL</p>
                                                </Row>
                                            </Nav>

                                            <Tab.Content>
                                                <p>CONTENT</p>
                                                {/* {render_isi_allCategory()} */}
                                            </Tab.Content>
                                        </Tab.Container>
                                    </DropdownMenu>
                                </Dropdown> 
                            </div>
                        </div>
                    </div>
                }
                   

            </div>
                    
        </>
    )
}