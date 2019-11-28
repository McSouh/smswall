import React from 'react';
import { Link } from 'react-router-dom';

class WallEdit extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            wall: {
                background: "http://localhost:3000/bg.JPG",
                name: "Titre du mur",
                contact: "Envoyez vos SMS au 0498 75 92 26",
                messages: [
                    'Coucou',
                    'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet ',
                    'Ohh waaaaawwww ! ! !',
                    'LOREM IPSUMMMMMM dolor sit amet dolor sit amet  LOREM WAW dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    'Ohh waaaaawwww ! ! !',
                    'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                ]
            }
        }
    }

    handleChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return (
            <div style={{height: "100vh"}} className="bg-dark w-100 d-flex align-items-center flex-column">
                <form onSubmit={this.handleSubmit} className="mt-5 mx-md-5 text-info bg-light p-5 shadow container">
                    <h1>
                        Edit Wall
                        <Link className="float-right btn btn-info" to="/wall">Back</Link>
                    </h1>
                    <div className="form-group">
                        <input onChange={this.handleChange} defaultValue={this.state.wall.name} name="name" type="text" className="form-control w-100" placeholder="Enter name" required />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} defaultValue={this.state.wall.contact} name="contact" type="text" className="form-control w-100" placeholder="Enter contact" required />
                    </div>
                    <div className="form-group">
                        <div style={{height: "200px", width: "100%", backgroundSize: "cover", backgroundPosition: 'center', backgroundImage: `url(${this.state.wall.background})`}}>
                        </div>
                        <input onChange={this.handleChange} name="background" type="file" className="form-control w-100" />
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

export default WallEdit;