import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthService from './utils/ApiUtils/AuthService';
import ProductListing from './ProductListing/ProductListing';
import Checkout from './Checkout/Checkout';

class App extends Component {
  constructor(props){
    super(props);
    AuthService.initializeValidUsers();
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <ProductListing />} />
          <Route exact path="/checkout" render={() => <Checkout />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
