import React from 'react';
import { Link } from 'react-router-dom';
import Fullscreen from "react-full-screen";
import Alert from './Alert';
import axios from 'axios';




class Wall extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            isFull: false,
            wall: {
                image: "/images/bg.JPG",
                title: "Titre du mur",
                contact: "Envoyez vos SMS au 0498 75 92 26",
                messages: [
                    'Coucou',
                    'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet ',
                    'Ohh waaaaawwww ! ! !',
                    'LOREM IPSUMMMMMM dolor sit amet dolor sit amet  LOREM WAW dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    'Ohh waaaaawwww ! ! !',
                    'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                ],
                alert: "WAW INFO IMPORTANTE DE LA MORT QUI TUE,WAW INFO IMPORTANTE DE LA MORT QUI TUE"
            }
        }
    }



    componentDidMount(){
        axios.get(`api/wall/${this.props.user.id}`, {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
            console.log(res);
            let wall = this.state.wall;
            res.data.image ? wall.image = res.data.image : null;
            res.data.title ? wall.title = res.data.title : null;
            res.data.contact ? wall.contact = res.data.contact : null;
            this.setState({
                wall: wall
            })
        })
        // document.querySelector("#modal").click();
        // setTimeout( () => {
        //     document.querySelector("#modal").click();            
        // }, 3000);
    }

    goFull = () => {
        this.setState({ isFull: true });
      }

    render(){
        return (
                <Fullscreen
                enabled={this.state.isFull}
                onChange={isFull => this.setState({isFull})}
                >
                <div style={{height: "100vh",backgroundImage: `url(${this.state.wall.image})`, backgroundSize: "cover", backgroundPosition: "center"}} className="bg-light w-100 d-flex align-items-center flex-column">
                    <h1 style={{textShadow: '0 0 2px black'}} className="mt-4 text-light">{this.state.wall.title}</h1>
                    <h3 style={{textShadow: '0 0 2px black'}} className="text-light text-center">{this.state.wall.contact}</h3>
                        <div className={`my-3 ${this.state.isFull && "d-none"}`}>
                        <button className="btn btn-success mx-2" onClick={this.goFull}>
                            Go Fullscreen
                        </button>
                        <Link to="/wall/edit" className={`btn btn-info mx-2 ${this.state.isFull && "d-none"}`}>
                            Edit
                        </Link>
                        <Link to="/wall/messages" className={`btn btn-warning mx-2 ${this.state.isFull && "d-none"}`}>
                            Messages
                        </Link>
                        </div>
                        <Alert alert={this.state.wall.alert} />
                    <div className="container">
                        {this.state.wall.messages.map((el, i) => {
                            return (
                                <p style={{backgroundColor: 'rgb(255, 255, 255, 0.85)'}} className="card w-100 p-2" key={i}>{el}</p>
                            )
                        })}
                    </div>
                </div>
                </Fullscreen>
        )
    }
}

export default Wall;