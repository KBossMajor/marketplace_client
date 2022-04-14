import Topbar from "../../components/topbar/Topbar";
import  PhoneTab from "../../components/PhoneTab/PhoneTab";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Right from "../../components/right/Right";
import Left from "../../components/left/Left";
import "./home.css"
import { useState } from "react";

export default function Home() {

  const [update, setUpdate] = useState(false);


  return (
    <>
      <Topbar />
      {/* <Phoneheader /> */}
      <div className="homeContainer">
        <Left />
        <Sidebar />
        <Feed update={update}/>
        <Rightbar setUpdate={setUpdate}/>
        <Right />
      </div>
      <PhoneTab />
      
    </>
  );
}
