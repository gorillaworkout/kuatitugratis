import React from 'react'
import { css } from "@emotion/react";
import { DotLoader, PulseLoader } from "react-spinners";
import Pokeball from '../../Assets/gorillalogops.png'

import './Loading.scss'
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

const newCss = css `
display:flex;
justify-content:center;
align-items:center;

`

export const FullPageLoading=(loading,size,color)=>{
    return (
        <div className="sweet-loading" css={newCss} >
        {/* <DotLoader
            css={override}
            size={size}
            color={color}
            loading={loading}
        /> */}
        <img src={Pokeball} alt=""className="rotate" />
        <p>KUAT ITU <span>GRATIS</span> </p>
      </div>
    )
}

export const ButtonLoading=(loading,size,color)=>{
    return (
        <div className="sweet-loading">
        <PulseLoader
            css={override}
            size={size}
            color={color}
            loading={loading}
        />
        
      </div>
    )
}
