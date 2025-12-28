import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Signup } from "./(pages)/signup/signup";
import { Landing } from "./(pages)/home";
import Canvas from "./canvas";
import { Navbar } from "../components/navbar";

export default function Home() {
  return (

    <div className=" relative " >
      <div className=" z-10">
        <Navbar />
      </div>
      <Canvas />





    </div>
  );
}
