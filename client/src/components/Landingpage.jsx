import React from "react";
import { Link } from 'react-router-dom';
import './landingpage.css';

export default function LandingPage(){
    return(
        <div className="imglanding">
            {/* <h1 className="welcome">Welcome</h1> */}
            <Link to='/home'>
                <button className="button"> Welcome to the Countries page </button>
            </Link>
        </div>

    )
}