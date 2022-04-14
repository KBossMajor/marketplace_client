import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "../../admin.css";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./admin_home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function AdminHome() {
  return (
    <>
    <Topbar />
    <div className="container_admin">
        <Sidebar />
        <div className="home_admin">
          <FeaturedInfo />
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets_admin">
            <WidgetSm/>
            <WidgetLg/>
          </div>
        </div>
    </div>
    </>
  );
}
