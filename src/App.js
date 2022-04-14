import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import Landing from "./pages/landing/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import CartBundle from "./bundles/CartBundle"; 
import ProductBundle from "./bundles/ProductBundle";
import HomeBundle from "./bundles/HomeBundle";
import ShippingAddressBundle from "./bundles/ShippingAddressBundle";
import PaymentMethodBundle from "./bundles/PaymentMethodBundle";
import PlaceOrderBundle from "./bundles/PlaceOrderBundle";
import OrderBundle from "./bundles/OrderBundle";
import OrderHistoryBundle from "./bundles/OrderHistoryBundle";
import ProfileBundle from "./bundles/ProfileBundle";
import ProductEditBundle from "./bundles/ProductEditBundle";
import AdminRoute from "./components/AdminRoute";
import ProductListBundle from "./bundles/ProductListBundle";
import OrderListBundle from "./bundles/OrderListBundle";
import UserEditBundle from "./bundles/UserEditBundle";
import UserListBundle from "./bundles/UserListBundle";
import SellerRoute from "./components/SellerRoute";
import SellerBundle from "./bundles/SellerBundle";
import SearchBundle from "./bundles/SearchBundle";
import AdminSellerRoute from "./components/AdminSellerRoute";
// import ProductListScreen from "./screens/ProductListScreen";
import Upload from "./components/upload/Upload";

import UserList from "./admin/pages/userList/UserList";
import User from "./admin/pages/user/User";
import NewUser from "./admin/pages/newUser/NewUser";
import ProductList from "./admin/pages/productList/ProductList";
import Product from "./admin/pages/product/Product";
import NewProduct from "./admin/pages/newProduct/NewProduct";
import AdminHome from "./admin/pages/admin_home/AdminHome";
import DashboardBundle from "./bundles/DashboardBundle";


function App() {
  // const { user } = useContext(AuthContext);
  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedInUser ? <Home /> : <Landing />}
        </Route>
        
        <Route path="/signin" component={Login}></Route>
        <Route path="/landing" component={Landing} ></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/messenger/:receiverId?">
          {!loggedInUser ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          {!loggedInUser ? <Redirect to="/" /> : <Profile />}
        </Route>
        <Route path="/seller/:id" component={SellerBundle}></Route>
        <Route path="/cart/:id?" component={CartBundle}></Route>
        <Route path="/product/:id" component={ProductBundle} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditBundle}
            exact
          ></Route>
        <Route path="/shipping" component={ShippingAddressBundle}></Route>
        <Route path="/payment" component={PaymentMethodBundle}></Route>
        <Route path="/placeorder" component={PlaceOrderBundle}></Route> 
        <Route path="/order/:id" component={OrderBundle}></Route>
        <Route path="/orderhistory" component={OrderHistoryBundle}></Route>
        <Route path="/upload" component={Upload}></Route>
        <PrivateRoute path="/profilestore" component={ProfileBundle}></PrivateRoute>

        <AdminRoute
            path="/dashboard"
            component={DashboardBundle}
          ></AdminRoute>
          
        <AdminRoute
            path="/productlist"
            component={ProductListBundle}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListBundle}
            exact
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListBundle}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListBundle}
          ></SellerRoute>
           <AdminRoute path="/userlist" component={UserListBundle}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditBundle}
          ></AdminRoute>

        <Route path="/homestore" component={HomeBundle} exact></Route>
        <Route path="/search/name/:name?" component={SearchBundle} exact></Route>
        <Route
            path="/search/category/:category"
            component={SearchBundle}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchBundle}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchBundle}
            exact
          ></Route>

          <AdminSellerRoute exact path="/admin">
            <AdminHome />
          </AdminSellerRoute>
          <AdminSellerRoute path="/admin/users">
            <UserList />
          </AdminSellerRoute>
          <AdminSellerRoute path="/admin/user/:userId">
            <User />
          </AdminSellerRoute>
          <AdminSellerRoute path="/admin/newUser">
            <NewUser />
          </AdminSellerRoute>
          <AdminSellerRoute path="/admin/products">
            <ProductList />
          </AdminSellerRoute>
          <AdminSellerRoute path="/admin/product/:productId">
            <Product />
          </AdminSellerRoute>
          <AdminSellerRoute path="/admin/newproduct">
            <NewProduct />
          </AdminSellerRoute>
          

      </Switch>
    </Router>
  );
}

export default App;
