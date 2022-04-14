// import React from "react";
import React, { useState } from "react";
import "./tab.css";
// import FirstTab from "../AllTabs/FirstTab";
import SecondTab from "../AllTabs/SecondTab";
import ThirdTab from "../AllTabs/ThirdTab";
import FouthTab from "../AllTabs/FouthTab";
import FifthTab from "../AllTabs/FifthTab";
import Feed from "../feed/Feed"
import { useParams } from "react-router";

const Tabs = (props) => {

  const {user } = props;
  const [activeTab, setActiveTab] = useState("FirstTab");
  //  Functions to handle Tab Switching

  const username = useParams().username; 


  // console.log(user)

  const handleTab1 = (e) => {
    // update the state to tab1
    setActiveTab(e);
  };
  // const handleTab2 = () => {
    // update the state to tab2
    // setActiveTab("SecondTab");
  // };
  //   const handleTab3 = () => {
  //   // update the state to tab2
  //   setActiveTab("ThirdTab");
  // };
  return (
    <div className="Tabs">
      {/* Tab nav */}
      
      <ul className="tab_nav">
        <li
          className={activeTab === "FirstTab" ? "TabActive " : ""}
          onClick={() => handleTab1('FirstTab')}
        >
          Timeline
        </li>
        <li
          className={activeTab === "SecondTab" ? "TabActive " : ""}
          onClick={() => handleTab1('SecondTab')}
        >
          About Us
        </li>
        <li
          className={activeTab === "ThirdTab" ? "TabActive " : ""}
          onClick={() => handleTab1('ThirdTab')}
        >
          Products
        </li>
        <li
          className={activeTab === "FouthTab" ? "TabActive " : ""}
          onClick={() => handleTab1('FouthTab')}
        >
          Services
        </li>
        <li
          className={activeTab === "FifthTab" ? "TabActive" : ""}
          onClick={() => handleTab1('FifthTab')}
        >
          Contact
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "FirstTab" ? <Feed username={username} /> : '' }
      </div>
      <div className="outlet">
        {activeTab === "SecondTab" ? <SecondTab   user={user}/> : ''  }
      </div>
      <div className="outlet">
        {activeTab === "ThirdTab" ? <ThirdTab  user={user}/>  : ''  }
      </div>
      <div className="outlet">
        {activeTab === "FouthTab" ? <FouthTab  user={user}/> : ''  }
      </div>
      <div className="outlet">
        {activeTab === "FifthTab" ? <FifthTab  user={user}/> : ''  }
      </div>

    </div>
  );
};
export default Tabs;