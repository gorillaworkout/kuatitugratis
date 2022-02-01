import React, { Component } from 'react';
import '../Styles/ClassDetail.scss'
import Handstand from '../Assets/handstand.jpg'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import YouTube from 'react-youtube';
export default function ClassDetail(){

    const opts = {
        height: '390',
        width: '700px',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const onReady=(event)=> {
    // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    
    return (
        <>
          <div className="container-detail">
            <div className="box-header">
                <Header/>
            </div>
            <div className="box-main">
                <div className="youtube-box">
                    <YouTube videoId="gJP_WJ8b6Uk" opts={opts} onReady={onReady} />
                </div>
                <div className="detail-classes">
                    <div className="card-detail-class">
                        <div className="title-class">
                            <p>CHEERLEADING CLASS TEEN</p>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis fugit corrupti vel totam deserunt voluptatem architecto dolore doloribus nam, velit consectetur repellat accusamus ad incidunt doloremque atque. Obcaecati, dignissimos illo!
                        </p>
                    </div>
                    <div className="coach-detail-class">
                        <div className="box-img-coach">
                            <img src={Handstand} alt="" />
                        </div>
                        <div className="coach-skill">
                            <p>EXPERIENCE</p>
                            <div className="box-render-achievement">
                                <ul>
                                    <li>5 Tahun HEADCOACH ICC ALLSTARS</li>
                                    <li>5 Tahun HEADCOACH ICC ALLSTARS</li>
                                    <li>5 Tahun HEADCOACH ICC ALLSTARS</li>
                                    <li>5 Tahun HEADCOACH ICC ALLSTARS</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box-footer">
                <Footer/>
            </div>
          </div>    
        </>
    )
}