import React, { Component } from 'react';
import '../../Styles/Card.scss'
import ImgEffect from '../Effect/img_effect';
import Handstand from '../../Assets/handstand.jpg'
export default function CardPersegi({arr}){

    return (
        <>
            <div className="card-amazing">
                <div className="box-img">
                    <ImgEffect
                        data={{
                            img:Handstand,
                            background:'#ccc',
                            height:'100% !important'
                        }}
                    />
                    <p>Basic Cheerleading Kids</p>
                    <p>
                        this class only for kids around 3-10Years old,<br/>
                        learning how to do stunts,jumps,motion, dance
                    </p>
                    <div className="price-tag">
                        <p>FREE</p>
                    </div>
                </div>
            </div>
        </>
    )
}