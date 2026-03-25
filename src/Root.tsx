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
import { SimonesScene1 } from "./SimonesScene1";
import { SimonesScene2 } from "./SimonesScene2";
import { SimonesScene3 } from "./SimonesScene3";
import { SimonesScene4 } from "./SimonesScene4";
import { SimonesVideo, SIMONES_TOTAL_FRAMES } from "./SimonesVideo";
import { simonesSchema } from "./SimonesSchema";


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
          tagline: "moods brewed daily",
          neighborhood: "Honey Street",
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
          tagline: "moods brewed daily",
          neighborhood: "Honey Street",
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
          tagline: "moods brewed daily",
          neighborhood: "Honey Street",
          accentColor: "#7bb661",
          productImage: "matcha.png",
          logoImage: "bubble1.png",
        }}
      />
      <Composition
        id="SimonesVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Simone's",
          photoFolder: "SIMONES",
          photos: [
            "646418797_1468586038611091_7206347187926231118_n.jpg",
            "653062545_1479455094190852_8656525538161025741_n.jpg",
            "653358140_1481061464030215_7821472743304600534_n.jpg",
            "654300608_1484839580319070_8288790873785131178_n.jpg",
            "5b3970_424c96de57cc49fda1fa3ea2433531e1~mv2.avif",
            "5b3970_6af63a58d89e4c0698d8b764e862ad81~mv2.avif",
            "5b3970_6d93a0982aeb4fe6a618a1d40a977aaf~mv2.avif",
          ],
          productPhoto: "coldbrew.jpg",
          suggestedSpecial: "Vanilla Creme Cold Brew",
          draftPostCaption: "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
        }}
      />
      <Composition
        id="SimonesScene1"
        component={SimonesScene1}
        durationInFrames={100}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Simone's",
          photoFolder: "SIMONES",
          photos: [
            "646418797_1468586038611091_7206347187926231118_n.jpg",
            "653062545_1479455094190852_8656525538161025741_n.jpg",
            "653358140_1481061464030215_7821472743304600534_n.jpg",
            "654300608_1484839580319070_8288790873785131178_n.jpg",
            "5b3970_424c96de57cc49fda1fa3ea2433531e1~mv2.avif",
            "5b3970_6af63a58d89e4c0698d8b764e862ad81~mv2.avif",
            "5b3970_6d93a0982aeb4fe6a618a1d40a977aaf~mv2.avif",
          ],
          productPhoto: "coldbrew.jpg",
          suggestedSpecial: "Vanilla Creme Cold Brew",
          draftPostCaption: "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
        }}
      />
      <Composition
        id="SimonesScene2"
        component={SimonesScene2}
        durationInFrames={162}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Simone's",
          photoFolder: "SIMONES",
          photos: [],
          productPhoto: "coldbrew.jpg",
          suggestedSpecial: "Vanilla Creme Cold Brew",
          draftPostCaption: "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
        }}
      />
      <Composition
        id="SimonesScene3"
        component={SimonesScene3}
        durationInFrames={347}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Simone's",
          photoFolder: "SIMONES",
          photos: [],
          productPhoto: "coldbrew.jpg",
          suggestedSpecial: "Vanilla Creme Cold Brew",
          draftPostCaption: "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
        }}
      />
      <Composition
        id="SimonesScene4"
        component={SimonesScene4}
        durationInFrames={160}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Simone's",
          photoFolder: "SIMONES",
          photos: [],
          productPhoto: "coldbrew.jpg",
          suggestedSpecial: "Vanilla Creme Cold Brew",
          draftPostCaption: "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
        }}
      />
    </>
  );
};
