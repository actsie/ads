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
        id="WitchsCottageVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "The Witch's Cottage",
          photoFolder: "WITCHCOTTAGE",
          photos: [
            "476359942_122116785176681230_7052342118881319769_n.jpg",
            "557743220_122148074936681230_314570420331584358_n.jpg",
            "561566769_122148802358681230_2915470312944486006_n.jpg",
            "562348204_17885296263381738_4358557765492544552_n.jpg",
          ],
          productPhoto: "pumpkinspicelatte.jpg",
          suggestedSpecial: "Pumpkin Spice Latté",
          draftPostCaption: "Something wicked this way brews 🎃🧙 Pumpkin Spice Latté and a Tequila Based Cocktail — pick your potion. Come in before they disappear.",
        }}
      />
      <Composition
        id="TradeCoffeeVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "The Trade",
          photoFolder: "TRADECOFFEE",
          photos: [
            "trade1.png",
            "trade2.png",
            "trade3.png",
          ],
          productPhoto: "spicedorangelatte.png",
          suggestedSpecial: "Spiced Orange Latte",
          draftPostCaption: "Spice up your day ☕🍊 Our Spiced Orange Latte is warm, bright, and just the right kind of bold. Come get yours.",
        }}
      />
      <Composition
        id="MentalBarVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "The Mental Bar",
          photoFolder: "MENTALBAR",
          photos: [
            "630116506_18303102907273663_2266682730110961936_n.jpg",
            "631503558_18302617039273663_2275763246930327476_n.jpg",
            "641665379_18305231629273663_5583976111123888365_n.jpg",
            "641782131_18304655401273663_6297599026826235449_n.jpg",
            "646158541_18305439064273663_5621118318309397307_n.jpg",
            "651912908_18307060726273663_6960842075677662510_n.jpg",
          ],
          productPhoto: "gengerchaichill.jpg",
          suggestedSpecial: "Ginger Chai Chill",
          draftPostCaption: "A creamy, icy chai frappe blended with bold ginger for a perfectly spiced, refreshing sip.",
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
        durationInFrames={202}
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
