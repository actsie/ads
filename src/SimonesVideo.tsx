import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SimonesScene1 } from "./SimonesScene1";
import { SimonesScene2 } from "./SimonesScene2";
import { SimonesScene3 } from "./SimonesScene3";
import { SimonesScene4 } from "./SimonesScene4";
import { SimonesProps } from "./SimonesSchema";

// Scene durations in frames
const S1 = 100;
const S2 = 202;
const S3 = 347;
const S4 = 160;

export const SIMONES_TOTAL_FRAMES = S1 + S2 + S3 + S4;

export const SimonesVideo: React.FC<SimonesProps> = (props) => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={S1}>
        <SimonesScene1 {...props} />
      </Sequence>
      <Sequence from={S1} durationInFrames={S2}>
        <SimonesScene2 {...props} />
      </Sequence>
      <Sequence from={S1 + S2} durationInFrames={S3}>
        <SimonesScene3 {...props} />
      </Sequence>
      <Sequence from={S1 + S2 + S3} durationInFrames={S4}>
        <SimonesScene4 {...props} />
      </Sequence>
    </AbsoluteFill>
  );
};
