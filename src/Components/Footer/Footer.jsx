import React, { Component } from 'react';
import '../../Styles/Footer.scss'
import {GrInstagram,GrFacebookOption,GrLinkedin} from 'react-icons/gr'
export default function Footer(){

    return (
        <>
            <div className="container-footer">
                <div className="box-footer">
                    <div className="small-box-footer-option">
                        <a href="https://www.instagram.com/gorillaworkout/"target="_blank" >
                            <GrInstagram className="icon-footer"/>
                            <span>Instagram</span>
                        </a>
                    </div>
                    <div className="small-box-footer-option">
                        <a href="https://www.facebook.com/bayu.darmawan02/"target="_blank">
                            <GrFacebookOption className="icon-footer"/>
                            <span>Instagram</span>
                        </a>
                    </div>
                    <div className="small-box-footer-option">
                        <a href="https://www.linkedin.com/in/bayu-darmawan-09470a1b8/" target="_blank">
                            <GrLinkedin className="icon-footer"/>
                            <span>Instagram</span>
                        </a>
                    </div>
                    <div className="small-box-footer-top">
                        <p>BACK TO TOP</p>
                    </div>
                </div>
                <div className="box-footer-2">
                    <div className="footer-2-left">
                        <ul>
                            <li>
                                 Terms of use 
                            </li>
                            <li>
                                 Term of sales 
                            </li>
                            <li>
                                  Made by  My <span> SKILL</span> 
                            </li>
                        </ul>
                    </div>
                    <div className="footer-2-right">
                        <ul>
                            <li>
                                 Cookie policy 
                            </li>
                            <li>
                                 Legal notices  
                            </li>
                            <li>
                                  Data processing policy
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}