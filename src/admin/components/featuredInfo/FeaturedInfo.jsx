import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured_admin">
      <div className="featuredItem_admin">
        <span className="featuredTitle_admin">Profit</span>
        <div className="featuredMoneyContainer_admin">
          <span className="featuredMoney_admin">$2,415</span>
          <span className="featuredMoneyRate_admin">
            -11.4 <ArrowDownward  className="featuredIcon_admin negative_admin"/>
          </span>
        </div>
        <span className="featuredSub_admin">Compared to last month</span>
      </div>
      <div className="featuredItem_admin">
        <span className="featuredTitle_admin">Sales</span>
        <div className="featuredMoneyContainer_admin">
          <span className="featuredMoney_admin">$4,415</span>
          <span className="featuredMoneyRate_admin">
            -1.4 <ArrowDownward className="featuredIcon_admin negative_admin"/>
          </span>
        </div>
        <span className="featuredSub_admin">Compared to last month</span>
      </div>
      <div className="featuredItem_admin">
        <span className="featuredTitle_admin">Cost</span>
        <div className="featuredMoneyContainer_admin">
          <span className="featuredMoney_admin">$2,225</span>
          <span className="featuredMoneyRate_admin">
            +2.4 <ArrowUpward className="featuredIcon_admin"/>
          </span>
        </div>
        <span className="featuredSub_admin">Compared to last month</span>
      </div>
    </div>
  );
}
