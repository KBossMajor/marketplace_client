import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar_admin">
      <div className="sidebarWrapper_admin">
        <div className="sidebarMenu_admin">
          <h3 className="sidebarTitle_admin">Dashboard</h3>
          <ul className="sidebarList_admin">
            <Link to="/admin" className="link_admin">
            <li className="sidebarListItem_admin active">
              <LineStyle className="sidebarIcon_admin" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem_admin">
              <Timeline className="sidebarIcon_admin" />
              Analytics
            </li>
            <li className="sidebarListItem_admin">
              <TrendingUp className="sidebarIcon_admin" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu_admin">
          <h3 className="sidebarTitle_admin">Quick Menu</h3>
          <ul className="sidebarList_admin">
            <Link to="/admin/users" className="link_admin">
              <li className="sidebarListItem_admin">
                <PermIdentity className="sidebarIcon_admin" />
                Users
              </li>
            </Link>
            <Link to="/admin/products" className="link_admin">
              <li className="sidebarListItem_admin">
                <Storefront className="sidebarIcon_admin" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem_admin">
              <AttachMoney className="sidebarIcon_admin" />
              Transactions
            </li>
            <li className="sidebarListItem_admin">
              <BarChart className="sidebarIcon_admin" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu_admin">
          <h3 className="sidebarTitle_admin">Notifications</h3>
          <ul className="sidebarList_admin">
            <li className="sidebarListItem_admin">
              <MailOutline className="sidebarIcon_admin" />
              Mail
            </li>
            <li className="sidebarListItem_admin">
              <DynamicFeed className="sidebarIcon_admin" />
              Feedback
            </li>
            <li className="sidebarListItem_admin">
              <ChatBubbleOutline className="sidebarIcon_admin" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu_admin">
          <h3 className="sidebarTitle_admin">Staff</h3>
          <ul className="sidebarList_admin">
            <li className="sidebarListItem_admin">
              <WorkOutline className="sidebarIcon_admin" />
              Manage
            </li>
            <li className="sidebarListItem_admin">
              <Timeline className="sidebarIcon_admin" />
              Analytics
            </li>
            <li className="sidebarListItem_admin">
              <Report className="sidebarIcon_admin" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
