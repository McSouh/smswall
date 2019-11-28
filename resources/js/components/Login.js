import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
        }
    }

    handleChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('api/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            this.props.getUser(
                this.state.email, 
                res.data.token, 
                res.data.id, 
                res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return (
            <div style={{height: "100vh"}} className="bg-dark w-100 d-flex justify-content-center align-items-center">
                <form style={{minWidth: "370px"}} onSubmit={this.handleSubmit} className="text-info text-center card bg-light p-5 shadow">
                    <img style={{width: "80%",position: "absolute", top: "-70px", margin: "auto"}} src="/images/WallLogo.png" />
                    <h2>Login</h2>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="email" type="email" className="form-control w-100" placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="password" type="password" className="form-control w-100" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="form-control btn btn-info">Submit</button>
                    <div className="invalid-feedback">
                        Wrong email or password.
                    </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;