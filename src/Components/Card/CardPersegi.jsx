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
                            img:arr.img,
                            background:'#ccc',
                            height:'100% !important'
                        }}
                    />
                    <p>{arr.title}</p>
                    <p>
                        {/* {arr.description} */}
                    </p>
                    <div className="price-tag">
                        <p>{arr.price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}