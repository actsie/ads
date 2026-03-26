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
import { POSVideo, POS_TOTAL_FRAMES } from "./POSVideo";
import { posSchema } from "./POSSchema";
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
        id="CafeVidaVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Cafe Vida",
          photoFolder: "CAFEVIDA",
          photos: [
            "29.png",
            "30.png",
            "31.png",
            "32.png",
            "33.png",
            "34.png",
          ],
          productPhoto: "29.png",
          suggestedSpecial: "Banana Berries Juice",
          draftPostCaption: "Sweet, fresh, and blended just right. 🍌🍓 Banana Berries Juice is today's special — come get yours.",
          perishableAlert: "Fresh bananas expire in 2 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="CafeNidoVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Cafe Nido",
          photoFolder: "CAFENIDO",
          photos: [
            "21.png",
            "22.png",
            "23.png",
            "24.png",
            "25.png",
            "26.png",
          ],
          productPhoto: "23.png",
          suggestedSpecial: "Strawberry Cream Matcha",
          draftPostCaption: "Sweet strawberry, earthy matcha, silky cream. 🍓🍵 Strawberry Cream Matcha is today's special — come get yours.",
          perishableAlert: "Fresh strawberries expire in 2 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="CafeDulceVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Cafe Dulce",
          photoFolder: "CAFEDULCE",
          photos: ["14.png", "15.png", "16.png", "17.png", "18.png", "19.png"],
          productPhoto: "14.png",
          suggestedSpecial: "Sprownie",
          draftPostCaption:
            "Some days just call for a Sprownie. ☁️ Today's special — come get yours.",
          perishableAlert:
            "A fresh batch of chocolate ganache expires in 2 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="CafeCodaChicoVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Cafe Coda Chico",
          photoFolder: "CAFECODA",
          photos: [
            "141377835_1823053194526473_1263838001914431102_n.jpg",
            "475022937_2957918531039928_35575547156555566_n.jpg",
            "475729363_2962686523896462_4775967282374387584_n.jpg",
            "481264189_2984944145004033_336065755955468767_n.jpg",
            "488951697_1425556168748110_1084671918610591007_n.jpg",
            "490114152_18173154148323354_5643771024528637862_n.jpg",
          ],
          productPhoto: "VeganChilaquiles.jpg",
          suggestedSpecial: "Vegan Chilaquiles 2.0",
          draftPostCaption:
            "Crispy tortillas, bold salsa, all the good stuff — zero compromise. 🌿 Vegan Chilaquiles 2.0 is today's special. Come get yours.",
          perishableAlert:
            "A batch of fresh tomatillos expires in 2 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="AlchemyCafeVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Alchemy Cafe",
          photoFolder: "ALCHEMYCAFE",
          photos: ["8.png", "9.png", "10.png", "11.png", "12.png", "13.png"],
          productPhoto: "8.png",
          suggestedSpecial: "Pumpkin Bread Pudding",
          draftPostCaption:
            "Warm, spiced, and just the right amount of indulgent. 🎃 Pumpkin Bread Pudding is today's special — come get it while it's fresh.",
          perishableAlert:
            "A batch of fresh pumpkin puree expires in 2 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="27ClubCoffeeVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "27 Club Coffee",
          photoFolder: "27CLUB",
          photos: [
            "651921861_18318242548265673_7621978755663340608_n.jpg",
            "652590303_18318242530265673_5510019149737410481_n.jpg",
            "653352259_18318242557265673_3302946641562928770_n.jpg",
            "653458134_18318242518265673_4644632358168964480_n.jpg",
            "653765502_18319129483265673_9062101963145295377_n.jpg",
            "653905121_18319129465265673_1256889901545683181_n.jpg",
          ],
          productPhoto: "espressomartini.jpg",
          suggestedSpecial: "Espresso Martini",
          draftPostCaption:
            "Bold espresso. Smooth vodka. Shaken cold. ☕🍸 The Espresso Martini is today's special — come get yours.",
          perishableAlert:
            "1 bottle of espresso liqueur expires in 4 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="FrostMeCafeVideo"
        component={SimonesVideo}
        durationInFrames={SIMONES_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={simonesSchema}
        defaultProps={{
          shopName: "Frost Me Cafe and Bakery",
          photoFolder: "FROSTME",
          photos: [
            "505459873_18507180859018266_4633803666203142650_n.jpg",
            "530845129_18518104696018266_9183145574327834941_n.jpg",
            "598123350_18542997214018266_7331989447574512229_n.jpg",
            "610950069_18546843424018266_2396785327955321411_n.jpg",
            "611651232_18548035918018266_4262294001436202448_n.jpg",
            "616855590_18548818234018266_4882273166892887012_n.jpg",
          ],
          productPhoto: "latte.jpg",
          suggestedSpecial: "Ube Lavender Latte",
          draftPostCaption:
            "Earthy ube, soft lavender, steamed just right. ☕💜 The Ube Lavender Latte is today's special — come get yours before it's gone.",
          perishableAlert:
            "1 carton of whole milk expires in 3 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="FrontsideCafeVideo"
        component={POSVideo}
        durationInFrames={POS_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={posSchema}
        defaultProps={{
          shopName: "Frontside Cafe",
          photoFolder: "FRONTSIDE",
          photos: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
          productPhoto: "4.png",
          lowStockItem: "albacore tuna",
          salesTrend: "up 40% this week",
          reorderItem: "Line-Caught Albacore Tuna — 2kg",
          supplierName: "Coastal Catch Co.",
          supplierPhone: "+1 (555) 078-9012",
        }}
      />
      <Composition
        id="POSVideoDemo"
        component={POSVideo}
        durationInFrames={POS_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={posSchema}
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
          lowStockItem: "cold brew concentrate",
          salesTrend: "up 40% this week",
          reorderItem: "Cold Brew Concentrate — 2 x 5L bags",
          supplierName: "Pacific Coast Roasters",
          supplierPhone: "+1 (555) 012-3456",
        }}
      />
      <Composition
        id="Camp4Video"
        component={POSVideo}
        durationInFrames={POS_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={posSchema}
        defaultProps={{
          shopName: "Camp 4",
          photoFolder: "CAMP4",
          photos: [
            "474092134_18479098606022230_7411875934179316507_n.jpg",
            "626041352_18555988501022230_3398964955640932031_n.jpg",
            "642538141_18566714782022230_1367799785315825653_n.jpg",
            "90186camp4-33.avif",
            "9432camp4-39.avif",
          ],
          productPhoto: "ahi.jpg",
          lowStockItem: "fresh ahi tuna",
          salesTrend: "up 40% this week",
          reorderItem: "Fresh Ahi Tuna — 2kg",
          supplierName: "Island Fresh Seafood",
          supplierPhone: "+1 (555) 034-5678",
        }}
      />
      <Composition
        id="AnotherCafeVideo"
        component={POSVideo}
        durationInFrames={POS_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1080}
        schema={posSchema}
        defaultProps={{
          shopName: "Another Café",
          photoFolder: "ANOTHERCAFE",
          photos: [
            "640949161_26232613139688476_7613851020880952640_n.jpg",
            "641083158_26232613216355135_8015692572828906069_n.jpg",
            "641417281_26232613236355133_4043358617449244629_n.jpg",
            "642738967_26232612929688497_1653471586369683466_n.jpg",
            "642749387_26232613133021810_307173276034524144_n.jpg",
            "642990047_26232613123021811_362449972240992923_n.jpg",
          ],
          productPhoto: "cafeaulait.png",
          lowStockItem: "heavy cream",
          salesTrend: "up 40% this week",
          reorderItem: "Heavy Cream — 2 x 1L cartons",
          supplierName: "Valley Dairy Co.",
          supplierPhone: "+1 (555) 056-7890",
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
          draftPostCaption:
            "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
          perishableAlert:
            "1 carton of heavy cream expires in 5 days. Suggest a special to move it?",
        }}
      />
      <Composition
        id="SimonesScene1"
        component={SimonesScene1}
        durationInFrames={120}
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
          draftPostCaption:
            "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
          perishableAlert:
            "1 carton of heavy cream expires in 5 days. Suggest a special to move it?",
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
          draftPostCaption:
            "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
          perishableAlert:
            "1 carton of heavy cream expires in 5 days. Suggest a special to move it?",
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
          draftPostCaption:
            "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
          perishableAlert:
            "1 carton of heavy cream expires in 5 days. Suggest a special to move it?",
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
          draftPostCaption:
            "Your Monday just got creamier ☕ Vanilla Creme Cold Brew is today's special — rich, smooth, and made to move. Come get yours before it's gone.",
          perishableAlert:
            "1 carton of heavy cream expires in 5 days. Suggest a special to move it?",
        }}
      />
    </>
  );
};
