import React, { Component } from 'react';
import '../../Styles/Card.scss'
import ImgEffect from '../Effect/img_effect';
import Handstand from '../../Assets/handstand.jpg'
import {FiVideo} from 'react-icons/fi'
import {BiTime} from 'react-icons/bi'
export default function CardPersegiPanjang(){

    return (
        <>
            <div className="card-item">
                <div className="img-card">
                    <ImgEffect
                        data={{
                            img:Handstand,
                            background:'#ccc',
                            height:'100% !important'
                        }}
                    />
                </div>
                <div className="card-title">
                    <div className="title-top">
                        <div className="img-small">
                            <img src={Handstand} alt="" />
                        </div>
                        <p> Coach <span>Bayu Darmawan</span> </p>
                    </div>
                    <div className="title-mid">
                        <p> <FiVideo className="icon-video"/>  6 Video </p>
                        <p> <BiTime className="icon-video"/>  8 Hours </p>
                    </div>
                    <p className="free">FREE</p>
                </div>
            </div>
        </>
    )
}