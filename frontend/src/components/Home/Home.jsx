import React from "react";
import Particle from "../particle";
import "./HomeModule.css";
import TripForm from "../Form/TripForm";
import Earth from "./Earth.gif";
import Rocket from "./Rocket.gif";
import Alien from "./Alien.gif";

function Home() {
  return (
    <div className="home-container">
        <Particle/>
        <img src={Earth} className="earthGif"/>
        <img src={Rocket} className="rocketGif"/>
        <img src={Alien} className="alienGif"/>
        <h1 className="home-header">STARRY ESCAPE 🌌 ✨🚀</h1>
        <TripForm/>
    </div>
  );
}

export default Home;