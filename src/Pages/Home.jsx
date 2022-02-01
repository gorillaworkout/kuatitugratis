import React ,{useState,useEffect} from 'react';
import '../Styles/Home.scss'
import Header from '../Components/Header/Header';
import Slider from '../Components/Slider/Slider'
import Gym from '../Assets/gym6.jpg'
import Cheers1 from '../Assets/cheers1.jpg'
import allStars1 from '../Assets/allstars.JPG'
import allStars from '../Assets/allstars5.JPG'
import Handstand from '../Assets/handstand.jpg'
import Ballet from '../Assets/ballet.jpg'
import ImgEffect from '../Components/Effect/img_effect';
import Slider2 from '../Assets/newgym.jpg'
import Slider3 from '../Assets/gym3.jpg'
import Slider4 from '../Assets/newgym2.jpg'
import Slider5 from '../Assets/gym.jpg'
import Footer from '../Components/Footer/Footer';
import {Link} from 'react-router-dom'
export default function Home(){

    var React = require('react');
    var ReactDOM = require('react-dom');
    var Carousel = require('react-responsive-carousel').Carousel;


    const onChangeImg=()=>{
        console.log('on change img')
    }
    const onClickItem=()=>{
        console.log('on click item')
    }
    const onClickThumb=()=>{
        console.log('on click thumb')
    }
    return (
        <>
            <div className="container-home">
                {/* <div className="container-header" > */}
                    <Header/>
                {/* </div> */}
                <div className="container-body">
                    <div className="scroller-img-box">
                        <Slider arr={{
                            img:[Slider2,Slider3,Slider5],
                            height:'100% !important',
                            interval:5000
                        }}/>
                        {/* <p className="title-home-scroller">A MEMBERSHIP PLAN LIKE NO <br/> OT<span>H</span>ER</p> */}
                        {/* <p className="title-home-description-scroller">Customized by You, <br/> starting from IDR 150,000 per month</p> */}
                    </div>
                    <div className="container-option-home">
                        <div className="main-option-title">
                            <p>WE HAVE <span>WHAT</span> YOU NEED</p>
                        </div>
                        <div className="main-option-motivation">
                            <p>Whether you’re just starting out or an old hand, you’ll find what you need for your  fitness journey.</p>
                        </div>
                        <div className="main-option-home">
                            <Link to={'/classes'} className="option-card">
                                <ImgEffect
                                    data={{
                                        img:Ballet,
                                        background:'#ccc',
                                        height:'100% !important'
                                    }}
                                />
                                <p className="title-card">CLASSES</p>
                                <p className="description-card"> Our clubs have cutting-edge fitness equipment to take your workout to the next level. </p>
                            </Link>
                            <div className="option-card">
                                <ImgEffect
                                    data={{
                                        img:Handstand,
                                        background:'#ccc',
                                        height:'100% !important'
                                    }}
                                />
                                <p className="title-card">CLUBS</p>
                                <p className="description-card">Our clubs have cutting-edge fitness equipment to take your workout to the next level. </p>
                            </div>
                            <div className="option-card">
                                <ImgEffect
                                    data={{
                                        img:Gym,
                                        background:'#ccc',
                                        height:'100% !important'
                                    }}
                                />
                                <p className="title-card">TIMETABLE</p>
                                <p className="description-card">Looking for a class to fit your schedule? Our comprehensive timetable is perfect for you.</p>
                            </div>
                        </div>
                    </div>
                    <div className="container-option-home">
                        <div className="main-option-title">
                            <p> OUR HI<span>GHL</span>IGHTS</p>
                        </div>
                        <div className="main-option-motivation">
                            <p>Join <span>US!</span>  You will became great athlete in <span>INDONESIA</span></p>
                        </div>
                        <div className="main-option-home">
                           <div className="box-slider-highlight">
                               
                                <Slider arr={{
                                    img:[Cheers1,allStars,allStars1],
                                    height:'510px !important',
                                    interval:1000
                                }}/>
                           </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}