import React, { useState,useEffect } from 'react';
import '../Styles/Profile.scss'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Handstand from '../Assets/handstand.jpg'

import YouTube from 'react-youtube';
export default function Profile(){
    const opts = {
        height: '200',
        width: '200',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };


      const onReady=(event)=> {
        // access to player in all event handlers via event.target
            event.target.pauseVideo();
        }

        const [status,setStatus]=useState('Athlete')
        

    return (
        <>
            <div className="container-profile">
                <div className="box-header">
                    <Header/>
                </div>
                <div className="box-main">
                    {status === 'Coach' ?
                        <div className="main-card">
                            <div className="top-main-detail">
                                <img src={Handstand} alt="" />
                                <div className="box-description-top">
                                    <div className="name-detail">
                                        <p>BAYU DARMAWAN</p>
                                        <div className="title-card">
                                            COACH
                                        </div>
                                    </div>
                                    <p className="skill">SKILL</p>
                                    <div className="skill-detail">
                                        <div className="card-skill">
                                            Parkour
                                        </div>
                                        <div className="card-skill">
                                            Cheerleading
                                        </div>
                                        <div className="card-skill">
                                            Futsal
                                        </div>
                                        <div className="card-skill">
                                            StreetWorkout
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <div className="mid-main-detail">
                                <div className="box-for-upload">
                                    <div className="btn-upload-video">
                                        UPLOAD VIDEO
                                    </div>
                                    <div className="btn-upload-video">
                                        UPDATE SKILL
                                    </div>
                                </div>
                                <div className="list-video">
                                    <YouTube videoId="gJP_WJ8b6Uk" opts={opts} onReady={onReady} />
                                    <YouTube videoId="gJP_WJ8b6Uk" opts={opts} onReady={onReady} />
                                    <YouTube videoId="gJP_WJ8b6Uk" opts={opts} onReady={onReady} />
                                    <YouTube videoId="gJP_WJ8b6Uk" opts={opts} onReady={onReady} />
                                    <YouTube videoId="gJP_WJ8b6Uk" opts={opts} onReady={onReady} />
                                </div>
                            </div>
                        </div>
                    :
                        <div className="main-card">
                            <div className="top-main-detail">
                                <img src={Handstand} alt="" />
                                <div className="box-description-top">
                                    <div className="name-detail">
                                        <p>BAYU DARMAWAN</p>
                                        <div className="title-card">
                                            ATHLETE
                                        </div>
                                    </div>
                                    <p className="skill">Progress Skill</p>
                                    <div className="skill-detail">
                                        <div className="card-skill">
                                            Parkour
                                        </div>
                                        <div className="card-skill">
                                            Cheerleading
                                        </div>
                                        <div className="card-skill">
                                            Futsal
                                        </div>
                                        <div className="card-skill">
                                            StreetWorkout
                                        </div>
                                    </div>
                                </div>  
                            </div>
                           <div className="mid-main-detail-athlete">
                                <p>Current Classes</p>
                                <div className="box-for-list-class">
                                    <div className="title">
                                        <ul>
                                            <li>ID</li>
                                            <li>Class</li>
                                            <li>Coach</li>
                                            <li>Type</li>
                                        </ul>
                                    </div>
                                    <div className="list-class">
                                        <ul>
                                            <li>Courses-1</li>
                                            <li>Cheerleading Teen</li>
                                            <li>BAYU DARMAWAN</li>
                                            <li>Cheerleading</li>
                                        </ul>
                                    </div>
                                    <div className="list-class">
                                        <ul>
                                            <li>Courses-1</li>
                                            <li>Cheerleading Teen</li>
                                            <li>BAYU DARMAWAN</li>
                                            <li>Cheerleading</li>
                                        </ul>
                                    </div>
                                    <div className="list-class">
                                        <ul>
                                            <li>Courses-1</li>
                                            <li>Cheerleading Teen</li>
                                            <li>BAYU DARMAWAN</li>
                                            <li>Cheerleading</li>
                                        </ul>
                                    </div>
                                </div>
                           </div>
                        </div>
                    
                    }
                </div>
                <Footer/>
            </div>
        </>
    )
}