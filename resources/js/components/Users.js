import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Users extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            users: []
        }
    }
    componentDidMount(){
        axios.get('api/users', {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
            this.setState({
                users: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    delete = (index, id) => {

        let users = this.state.users;
        axios.delete(`api/users/${id}`, {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
            console.log(res.data);
            users.splice(index, 1)
            this.setState({
                users: users
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div style={{minHeight: "100vh"}} className="bg-dark w-100 d-flex align-items-center flex-column">
                <div className="container mt-5 mx-md-5 bg-light p-5 shadow">
                <h1 className=" text-info">
                    Users management
                    <Link to="/users/create" className="float-right btn btn-info">Create new</Link>
                </h1>
                {this.state.users.map((el, i) => {
                    return (
                        <p style={{backgroundColor: 'rgb(255, 255, 255, 0.85)'}} className="card w-100 p-2" key={i}>
                            {el.email}
                            <button onClick={() => this.delete(i, el.id)} style={{right: "0", top: '0'}} className="position-absolute badge badge-pill badge-danger">X</button>
                        </p>
                    )
                })}
                </div>
            </div>
        )
    }
}


export default Users;