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
        role: "",
        token: ""
      }
    }
  }

  reload = () => {
    let user = this.state.user;
    user.isLog = false;
    this.setState({
      user: user
    })
    user.isLog = true;
    this.setState({
      user: user
    })
  }


  redirect = () => {
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
            <UsersCreate reload={this.reload} user={this.state.user} />
          </Route>
          <Route exact path="/users">
            <Users user={this.state.user} />
          </Route>
        </>
      )
    } else {
      return (
        <>
          <Redirect to="/wall" />
          <Route path="/wall/messages">
            <Messages user={this.state.user} />
          </Route>
          <Route path="/wall/edit">
            <WallEdit reload={this.reload} user={this.state.user} />
          </Route>
          <Route exact path="/wall">
            <Wall user={this.state.user} />
          </Route>
        </>
      )
    } 
    
  }

  getUser = (email, token, id, role) => {
    this.setState({
      user: {
        isLog: true,
        email: email,
        role: role,
        token: token,
        id: id
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
