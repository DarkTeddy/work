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
import LayerCase from "./csscase/LayerCase";
import { RecoilRoot } from "recoil";
// import { Router } from "react-router-dom";
import Link from "next/link";
import ConferenceTicketGenerator from "./Front-Mentor/conference-ticket-generator"
export default function Home() {
  return (
    <RecoilRoot>
      {<ConferenceTicketGenerator />}
    </RecoilRoot>
  );
}
