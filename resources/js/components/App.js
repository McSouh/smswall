import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect  
} from 'react-router-dom';
import Login from './Login';
import Wall from './Wall';
import Users from './Users';
import WallEdit from './WallEdit';
import Messages from './Messages';
import UsersCreate from './UsersCreate';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        role: "",
        isLog: false,
        email: "",
        token: ""
      }
    }
  }


  redirect = () => {
    console.log(this.state.user);
    if(!this.state.user.isLog){
      return (
        <>
          <Redirect to="/login" />
          <Route path="/login">
            <Login getUser={this.getUser} />
          </Route>
        </>
      )
    } else if (this.state.user.role === "admin"){
      return (
        <>
          <Redirect to="/users" />
          <Route path="/users/create">
            <UsersCreate />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </>
      )
    } else {
      return (
        <>
          <Redirect to="/wall" />
          <Route path="/wall/messages">
            <Messages />
          </Route>
          <Route path="/wall/edit">
            <WallEdit />
          </Route>
          <Route path="/wall">
            <Wall />
          </Route>
        </>
      )
    } 
    
  }

  getUser = (email, token) => {
    this.setState({
      user: {
        isLog: true,
        email: email,
        token: token,
      }
    })
  } 

  render(){
    return (
      <div>
        <Router>
          <Switch>
            {this.redirect()}
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
