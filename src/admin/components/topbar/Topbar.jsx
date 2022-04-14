import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div className="topbar_admin">
      <div className="topbarWrapper_admin">
        <div className="topLeft_admin">
          <Link to="/"><span className="logo_admin">SHOP-WIT-EAZE</span></Link> 
        </div>
        <div className="topRight_admin">
          <div className="topbarIconContainer_admin">
            <NotificationsNone />
            <span className="topIconBadge_admin">2</span>
          </div>
          <div className="topbarIconContainer_admin">
            <Language />
            <span className="topIconBadge_admin">2</span>
          </div>
          <div className="topbarIconContainer_admin">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar_admin" />
        </div>
      </div>
    </div>
  );
}
