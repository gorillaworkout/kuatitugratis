import React, { Component } from 'react';
import '../../Styles/Card.scss'
import ImgEffect from '../Effect/img_effect';
import Handstand from '../../Assets/handstand.jpg'
import {FiVideo} from 'react-icons/fi'
import {BiTime} from 'react-icons/bi'
export default function CardPersegiPanjang({arr}){
console.log(arr)
    return (
        <>
            <div className="card-item">
                <div className="img-card">
                    <ImgEffect
                        data={{
                            img:arr.img,
                            background:'#ccc',
                            height:'100% !important'
                        }}
                    />
                </div>
                <div className="card-title">
                    <div className="title-top">
                        <div className="img-small">
                            <img src={arr.imgCoach} alt="" />
                        </div>
                        <p> Coach <span>{arr.coach}</span> </p>
                    </div>
                    <p>{arr.title}</p>
                    <div className="title-mid">
                        <p> <FiVideo className="icon-video"/>  1 Video </p>
                        <p> <BiTime className="icon-video"/>  1 Hours </p>
                        <p className="free">{arr.price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}