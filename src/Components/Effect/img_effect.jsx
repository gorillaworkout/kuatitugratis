import React, { useState } from 'react'
import './img_effect.css'
// import {motion} from 'framer-motion/dist/es/index'
import { motion } from "framer-motion"

export default function ImgEffect(data){
    const [imageLoading, setImageLoading] = useState(true);
    const [pulsing, setPulsing] = useState(true);
  
    const imageLoaded = () => {
      setImageLoading(false);
      setTimeout(() => setPulsing(false), 600);
    };
    return (
        <>
            <div className={`${pulsing ? "pulse" : ""} loadable`}
                style={{ width: "100%", background:data.data.background }}
                alt={data.data.img}
                >
                <motion.img
                initial={{ height: "100%", opacity: 0 }}
                // style={{ height: imageLoading ? "6rem" : "auto" }}
                animate={{
                    height: imageLoading ? "100%" : "",
                    opacity: imageLoading ? 0 : 1
                }}
                transition={
                    ({ height: { delay: 0, duration: 0.4 } },
                    { opacity: { delay: 0.7, duration: 0.4 } })
                }
                onLoad={imageLoaded}
                width="100%"
                height={data.data.height}
                alt={data.data.img}
                src={data.data.img}
                />
            </div>
        </>
    )
}