import React,{useEffect,useState}from 'react';
import '../../Styles/Header.scss'
import Logo1 from '../../Assets/gorillalogops.png'
import Logo2 from '../../Assets/newbggw.png'
import {FiUser} from 'react-icons/fi'
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    
  } from "reactstrap";
  import Gym from '../../Assets/gym4.jpg'
  import { Tabs, Tab, Row, Nav } from "react-bootstrap";
export default function Header(){


    //   SCROLL EFFECT HEADER START
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHeaderScroll,setIsHeaderScroll] = useState(false)
    const [toggleMenu,setToggleMenu]=useState(false)
    const handleScroll = () => {
        const position = window.pageYOffset;
        if(position > 0 ){
            if(toggleMenu){
                console.log('masuk ke else if ',toggleMenu)
                setIsHeaderScroll(true)
                // setToggleMenu(true)
            }else {
                console.log('header scroll jadi false  dari handle scroll')
                setIsHeaderScroll(true)
            }
        }else if (position === 0){
            console.log(toggleMenu,'ini toggle menu')
            if(toggleMenu){
                console.log('masuk ke else if ',toggleMenu)
                setIsHeaderScroll(true)
                // setToggleMenu(true)
            }else {
                console.log('header scroll jadi false  dari handle scroll')
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
            console.log('header scroll is false')
              setIsHeaderScroll(false)
          }else {
                console.log('header scroll is true')
            setIsHeaderScroll(true)
          }

        if(toggleMenu){
            console.log('toggle menu is false')
            setToggleMenu(false)
        }else {
            console.log('toggle menu is true')
            console.log('header scroll is true')
            setToggleMenu(true)
            setIsHeaderScroll(true)
        }
        
      }
    // ON MOUSE ENTER / LEAVE END


    const [dataCustStorage,setDataCustStorage]=useState(undefined)
    const [isLogin,setIsLogin]=useState(false)
    useEffect(()=>{
        if(dataCustStorage === undefined){
            let dataCust = JSON.parse(localStorage.getItem('loginGF'))
            console.log(dataCust)

            if(dataCust){
                setIsLogin(true)
                // navigate('/')
                setDataCustStorage(dataCust)
            }else {
                setIsLogin(false)
            }
        }
    },[])


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
                                    <Link to={'#'} style={{textDecoration:'none'}}>
                                        <FiUser className="icon-header"/>
                                        <span>{dataCustStorage.name}</span>
                                    </Link>
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
                                    <Link to={'#'} style={{textDecoration:'none'}}>
                                        <FiUser className="icon-header"/>
                                        <span>{dataCustStorage.name}</span>
                                    </Link>
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