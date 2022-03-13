import React from "react";
import { Link } from 'react-router-dom';
import './landingpage.css';

export default function LandingPage(){
    return(
        <div className="img">
            <h1 className="welcome">Welcome</h1>
            <Link to='/home'>
                <button className="button"> Start </button>
            </Link>
        </div>

    )
}