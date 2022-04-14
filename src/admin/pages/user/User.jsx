import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";

import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "../../admin.css";

export default function User() {
  return (
    <>
    <Topbar />
    <div className="container_admin">
        <Sidebar />
        <div className="user_admin">
          <div className="userTitleContainer_admin">
            <h1 className="userTitle_admin">Edit User</h1>
            <Link to="/admin/newUser">
              <button className="userAddButton_admin">Create</button>
            </Link>
          </div>
          <div className="userContainer_admin">
            <div className="userShow_admin">
              <div className="userShowTop_admin">
                <img
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="userShowImg_admin"
                />
                <div className="userShowTopTitle_admin">
                  <span className="userShowUsername_admin">Anna Becker</span>
                  <span className="userShowUserTitle_admin">Software Engineer</span>
                </div>
              </div>
              <div className="userShowBottom_admin">
                <span className="userShowTitle_admin">Account Details</span>
                <div className="userShowInfo_admin">
                  <PermIdentity className="userShowIcon_admin" />
                  <span className="userShowInfoTitle_admin">annabeck99</span>
                </div>
                <div className="userShowInfo_admin">
                  <CalendarToday className="userShowIcon_admin" />
                  <span className="userShowInfoTitle_admin">10.12.1999</span>
                </div>
                <span className="userShowTitle_admin">Contact Details</span>
                <div className="userShowInfo_admin">
                  <PhoneAndroid className="userShowIcon_admin" />
                  <span className="userShowInfoTitle_admin">+1 123 456 67</span>
                </div>
                <div className="userShowInfo_admin">
                  <MailOutline className="userShowIcon_admin" />
                  <span className="userShowInfoTitle_admin">annabeck99@gmail.com</span>
                </div>
                <div className="userShowInfo_admin">
                  <LocationSearching className="userShowIcon_admin" />
                  <span className="userShowInfoTitle_admin">New York | USA</span>
                </div>
              </div>
            </div>
            <div className="userUpdate_admin">
              <span className="userUpdateTitle_admin">Edit</span>
              <form className="userUpdateForm_admin">
                <div className="userUpdateLeft_admin">
                  <div className="userUpdateItem_admin">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="annabeck99"
                      className="userUpdateInput_admin"
                    />
                  </div>
                  <div className="userUpdateItem_admin">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Anna Becker"
                      className="userUpdateInput_admin"
                    />
                  </div>
                  <div className="userUpdateItem_admin">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="annabeck99@gmail.com"
                      className="userUpdateInput_admin"
                    />
                  </div>
                  <div className="userUpdateItem_admin">
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="+1 123 456 67"
                      className="userUpdateInput_admin"
                    />
                  </div>
                  <div className="userUpdateItem_admin">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="New York | USA"
                      className="userUpdateInput_admin"
                    />
                  </div>
                </div>
                <div className="userUpdateRight_admin">
                  <div className="userUpdateUpload_admin">
                    <img
                      className="userUpdateImg_admin"
                      src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon_admin" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                  <button className="userUpdateButton_admin">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
