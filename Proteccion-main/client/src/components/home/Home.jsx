import React from "react";
import { SpinnerCircular } from "spinners-react";
import Carrusel from "../carousel/Carousel";
import NavBar from "../navbar/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      Home
      <Carrusel />
    </div>
  );
}
