import "./newProduct.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "../../admin.css";


export default function NewProduct() {
  return (
    <>
    <Topbar />
    <div className="container_admin">
        <Sidebar />
        <div className="newProduct_admin">
          <h1 className="addProductTitle_admin">New Product</h1>
          <form className="addProductForm_admin">
            <div className="addProductItem_admin">
              <label>Image</label>
              <input type="file" id="file" />
            </div>
            <div className="addProductItem_admin">
              <label>Name</label>
              <input type="text" placeholder="Apple Airpods" />
            </div>
            <div className="addProductItem_admin">
              <label>Stock</label>
              <input type="text" placeholder="123" />
            </div>
            <div className="addProductItem_admin">
              <label>Active</label>
              <select name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button className="addProductButton_admin">Create</button>
          </form>
        </div>
    </div>
    </>

  );
}
