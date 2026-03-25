import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { MellowCupScene1 } from "./MellowCupScene1";
import { MellowCupScene2 } from "./MellowCupScene2";
import { MellowCupScene4 } from "./MellowCupScene4";
import { mellowCupSchema } from "./MellowCupSchema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Scene1"
        component={Scene1}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="Scene2"
        component={Scene2}
        durationInFrames={102}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="Scene3"
        component={Scene3}
        durationInFrames={445}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="Scene4"
        component={Scene4}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="MellowCupScene1"
        component={MellowCupScene1}
        durationInFrames={170}
        fps={30}
        width={1080}
        height={1080}
        schema={mellowCupSchema}
        defaultProps={{
          shopName: "Mellow Cup",
          hook: "Your Monday doesn't have to feel like a Monday.",
          productName: "New Matcha Latte",
          price: "1.50",
          tagline: "Specialty coffee.",
          neighborhood: "Your neighborhood.",
          accentColor: "#7bb661",
          productImage: "matcha.png",
          logoImage: "bubble1.png",
        }}
      />
      <Composition
        id="MellowCupScene2"
        component={MellowCupScene2}
        durationInFrames={155}
        fps={30}
        width={1080}
        height={1080}
        schema={mellowCupSchema}
        defaultProps={{
          shopName: "Mellow Cup",
          hook: "Your Monday doesn't have to feel like a Monday.",
          productName: "New Matcha Latte",
          price: "1.50",
          tagline: "Specialty coffee.",
          neighborhood: "Your neighborhood.",
          accentColor: "#7bb661",
          productImage: "matcha.png",
          logoImage: "bubble1.png",
        }}
      />
<Composition
        id="MellowCupScene4"
        component={MellowCupScene4}
        durationInFrames={155}
        fps={30}
        width={1080}
        height={1080}
        schema={mellowCupSchema}
        defaultProps={{
          shopName: "Mellow Cup",
          hook: "Your Monday doesn't have to feel like a Monday.",
          productName: "New Matcha Latte",
          price: "1.50",
          tagline: "Specialty coffee.",
          neighborhood: "Your neighborhood.",
          accentColor: "#7bb661",
          productImage: "matcha.png",
          logoImage: "bubble1.png",
        }}
      />
    </>
  );
};
