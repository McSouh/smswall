import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UsersCreate extends React.Component {
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
        axios.post('/api/register', {
            email: this.state.email,
            password: this.state.password,
        }, {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
            console.log(res);
            this.props.reload();
        })
    }

    render(){
        return (
            <div style={{height: "100vh"}} className="bg-dark w-100 d-flex align-items-center flex-column">
                <form onSubmit={this.handleSubmit} className="mt-5 mx-md-5 text-info bg-light p-5 shadow container">
                    <h1>
                        Create new user
                        <Link className="float-right btn btn-info" to="/users">Back</Link>
                    </h1>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="email" type="email" className="form-control w-100" placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange}  name="password" type="password" className="form-control w-100" placeholder="Enter password" required />
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

export default UsersCreate;