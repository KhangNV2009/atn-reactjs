import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// css
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// page
import HomePage from './page/HomePage'
import CartPage from './page/CartPage'
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import AddProductPage from './page/AddProductPage';
import OrderPage from './page/OrderPage';
import OrderDetail from './page/OrderDetail'
import AddOrderPage from './page/AddOrderPage'

// component
import NavBar from './component/NavBar';
import Footer from './component/Footer'

export default function App() {

  return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/add-product" component={AddProductPage} />
          <Route exact path="/order" component={OrderPage} />
          <Route exact path="/detail" component={OrderDetail} />
          <Route exact path="/add-order" component={AddOrderPage} />
        </Switch>
        <Footer />
      </Router>
  );
}