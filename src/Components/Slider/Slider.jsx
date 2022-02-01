import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Slider.css'
import Slider2 from '../../Assets/gym2.jpg'
import Slider3 from '../../Assets/gym3.jpg'
import Slider5 from '../../Assets/gym.jpg'
import ImgEffect from '../../Components/Effect/img_effect'

export default function SliderImg({arr}){

    const [allImage,setAllImage]=useState(undefined)
    console.log(arr)
    const renderImage=()=>{
        return (
            <>
             <Carousel className="carousel-slider-box" touch={true}>
                 {
                    arr.img.map((val,index)=>{
                        return (
                            <Carousel.Item interval={arr.interval}>
                                <div className="box-slider-img">
                                    <ImgEffect
                                        data={{
                                            img:val,
                                            background:'#ccc',
                                            height:arr.height
                                        }}
                                    />
                                </div>   
                            </Carousel.Item>
                        )
                    }
                     )
                 }
            </Carousel>
            </>
        )
     
    }

    return (
        <>
        <div className="box-slider">
          {renderImage()}
        </div>

        </>
    )
}