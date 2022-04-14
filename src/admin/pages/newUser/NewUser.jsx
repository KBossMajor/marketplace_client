import "./newUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "../../admin.css";

export default function NewUser() {
  return (
    <>
    <Topbar />
    <div className="container_admin">
        <Sidebar />
        <div className="newUser_admin">
          <h1 className="newUserTitle_admin">New User</h1>
          <form className="newUserForm_admin">
            <div className="newUserItem_admin">
              <label>Username</label>
              <input type="text" placeholder="john" />
            </div>
            <div className="newUserItem_admin">
              <label>Full Name</label>
              <input type="text" placeholder="John Smith" />
            </div>
            <div className="newUserItem_admin">
              <label>Email</label>
              <input type="email" placeholder="john@gmail.com" />
            </div>
            <div className="newUserItem_admin">
              <label>Password</label>
              <input type="password" placeholder="password" />
            </div>
            <div className="newUserItem_admin">
              <label>Phone</label>
              <input type="text" placeholder="+1 123 456 78" />
            </div>
            <div className="newUserItem_admin">
              <label>Address</label>
              <input type="text" placeholder="New York | USA" />
            </div>
            <div className="newUserItem_admin">
              <label>Gender</label>
              <div className="newUserGender_admin">
                <input type="radio" name="gender" id="male" value="male" />
                <label for="male">Male</label>
                <input type="radio" name="gender" id="female" value="female" />
                <label for="female">Female</label>
                <input type="radio" name="gender" id="other" value="other" />
                <label for="other">Other</label>
              </div>
            </div>
            <div className="newUserItem_admin">
              <label>Active</label>
              <select className="newUserSelect_admin" name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button className="newUserButton_admin">Create</button>
          </form>
        </div>
    </div>
    </>
  );
}
