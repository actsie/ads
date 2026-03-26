import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { POSProps } from "./POSSchema";
import { SimonesScene1 } from "./SimonesScene1";
import { POSScene2 } from "./POSScene2";
import { POSScene3 } from "./POSScene3";
import { POSScene4 } from "./POSScene4";

const S1 = 120;
const S2 = 202;
const S3 = 430;
const S4 = 160;

export const POS_TOTAL_FRAMES = S1 + S2 + S3 + S4;

export const POSVideo: React.FC<POSProps> = (props) => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={S1}>
      <SimonesScene1 {...props} />
    </Sequence>
    <Sequence from={S1} durationInFrames={S2}>
      <POSScene2 {...props} />
    </Sequence>
    <Sequence from={S1 + S2} durationInFrames={S3}>
      <POSScene3 {...props} />
    </Sequence>
    <Sequence from={S1 + S2 + S3} durationInFrames={S4}>
      <POSScene4 {...props} />
    </Sequence>
  </AbsoluteFill>
);
