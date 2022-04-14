import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";

import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "../../admin.css";

export default function Product() {
  return (
    <>
    <Topbar />
    <div className="container_admin">
        <Sidebar />
        <div className="product_admin">
        <div className="productTitleContainer_admin">
            <h1 className="productTitle_admin">Product</h1>
            <Link to="/admin/newproduct">
            <button className="productAddButton_admin">Create</button>
            </Link>
        </div>
        <div className="productTop_admin">
            <div className="productTopLeft_admin">
                <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
            </div>
            <div className="productTopRight_admin">
                <div className="productInfoTop_admin">
                    <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg_admin" />
                    <span className="productName_admin">Apple Airpods</span>
                </div>
                <div className="productInfoBottom_admin">
                    <div className="productInfoItem_admin">
                        <span className="productInfoKey_admin">id:</span>
                        <span className="productInfoValue_admin">123</span>
                    </div>
                    <div className="productInfoItem_admin">
                        <span className="productInfoKey_admin">sales:</span>
                        <span className="productInfoValue_admin">5123</span>
                    </div>
                    <div className="productInfoItem_admin">
                        <span className="productInfoKey_admin">active:</span>
                        <span className="productInfoValue_admin">yes</span>
                    </div>
                    <div className="productInfoItem_admin">
                        <span className="productInfoKey_admin">in stock:</span>
                        <span className="productInfoValue_admin">no</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom_admin">
            <form className="productForm_admin">
                <div className="productFormLeft_admin">
                    <label>Product Name</label>
                    <input type="text" placeholder="Apple AirPod" />
                    <label>In Stock</label>
                    <select name="inStock" id="idStock">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <label>Active</label>
                    <select name="active" id="active">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="productFormRight_admin">
                    <div className="productUpload_admin">
                        <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg_admin" />
                        <label for="file">
                            <Publish/>
                        </label>
                        <input type="file" id="file" style={{display:"none"}} />
                    </div>
                    <button className="productButton_admin">Update</button>
                </div>
            </form>
        </div>
        </div>
    </div>
    </>
  );
}
