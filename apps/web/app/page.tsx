import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Signup } from "./(pages)/signup/signup";
import { Landing } from "./(pages)/home";
import Canvas from "./canvas";
import { Navbar } from "./components/navbar";
import { Suspense } from "react";
export default function Home() {
  return (
    <div>
      <Suspense fallback={<div className="p-10 text-center">Loading Application...</div>}>
        <Canvas />
      </Suspense>
    </div>
  );
}
