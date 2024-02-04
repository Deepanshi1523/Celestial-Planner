import React from "react";
import Particle from "../particle";
import { Container, Row, Col } from "react-bootstrap";
import "./HomeModule.css";
import TripForm from "../Form/TripForm";

function Home() {
  return (
    <div className="home-container">
        <Particle/>
        <h1 className="home-header">Plan your celestial trip</h1>
        <TripForm/>
    </div>
  );
}

export default Home;