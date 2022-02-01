import React, { Component } from 'react';
import '../Styles/Classes.scss'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ImgEffect from '../Components/Effect/img_effect';
import Handstand from '../Assets/handstand.jpg'
import {FiVideo} from 'react-icons/fi'
import {BiTime} from 'react-icons/bi'
import { FullPageLoading } from '../Components/Loading/Loading';
import CardPersegi from '../Components/Card/CardPersegi';
import CardPersegiPanjang from '../Components/Card/CardPersegiPanjang';

export default function Classes(){

    return (
        <>
            <div className="container-classes">
                <Header/>
                <div className="container-body-classes">
                    <div className="body-main">
                        <div className="amazing-course">
                            <p>Amazing Courses</p>
                            <div className="box-card-amazing">
                                <CardPersegi/>
                                <CardPersegi/>
                                <CardPersegi/>
                                <CardPersegi/>
                            </div>
                        </div>

                        <div className="amazing-course-2">
                            <div className="courses-left">
                                <div className="title-left">
                                    <p>Popular Courses</p>
                                </div>
                                <div className="card-left-box">
                                    <CardPersegiPanjang/>
                                    <CardPersegiPanjang/>
                                    <CardPersegiPanjang/>
                                    <CardPersegiPanjang/>
                                </div>
                            </div>
                            <div className="courses-right">
                                <div className="title-left">
                                    <p>Latest Courses</p>
                                </div>
                                <div className="card-left-box">
                                    <CardPersegiPanjang/>
                                    <CardPersegiPanjang/>
                                    <CardPersegiPanjang/>
                                    <CardPersegiPanjang/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="footer-classes">
                    <Footer/>
                </div>
            </div>
        </>
    )
}