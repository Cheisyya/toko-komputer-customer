import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login"
import Product from "./pages/product"
import Transaksi from "./pages/transaksi"
import Cart from "./pages/cart"
 
export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Product} />
        <Route path="/login" component={Login} />
        <Route path="/transaksi" component={Transaksi} />
        <Route path="/cart" component={Cart} />
      </Switch>
    )
  }
}
