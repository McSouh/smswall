import React from 'react';
import { Link } from "react-router-dom";

class Users extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            users: [
                {
                    id: 2,
                    email: "maxime.herbiet@gmail.com"
                },
                {
                    id: 4,
                    email: "maxime@molengeek.com"
                },
                {
                    id: 5,
                    email: "elias@molengeek.com"
                },
                {
                    id: 8,
                    email: "nicolas@molengeek.com"
                },
                {
                    id: 12,
                    email: "maxime.herbiet@hotmail.com"
                },
            ]
        }
    }

    delete = (index, id) => {

        let users = this.state.users;
        users.splice(index, 1)
        this.setState({
            users: users
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