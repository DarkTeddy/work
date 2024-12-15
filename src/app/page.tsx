'use client'
import Image from "next/image";
import styles from "./page.module.css";
import MultiCrossTable from "./components/CrossTable";
import VirtualSelector from "./components/VirtualSelector";
import LazyLoad from "./components/LazyLoad";
import LineChartCase from "./components/Antv";
import RecoilCase from "./components/Recoil";
import Case1 from "./components/Recoil/Case1";
import Csscase from './csscase'
import DimSelector from "./components/DimSelector";
import ContextCase from "./components/ContextCase";
import MobxCase from "./components/Mobx"
import DiyEvent from "./components/DiyEvent";
import { RecoilRoot } from "recoil";
export default function Home() {
  return (
    // <MultiCrossTable />
    // <VirtualSelector />
    // <LazyLoad />
    // <LineChartCase></LineChartCase>
    <RecoilRoot>
      {/* <Case1 /> */}
      {/* <Csscase /> */}
      {/* <DimSelector/> */}
      {/* <ContextCase /> */}
      {/* <MobxCase /> */}
      <DiyEvent></DiyEvent>
    </RecoilRoot>
  );
}
