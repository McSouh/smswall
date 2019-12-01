import React from 'react';
import { Link } from 'react-router-dom';
import Fullscreen from "react-full-screen";
import Alert from './Alert';
import axios from 'axios';
import Echo from 'laravel-echo';
import Envoi from './Envoi';
window.Pusher = require('pusher-js');




class Wall extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            isFull: false,
            wall: {
                image: "/images/bg.JPG",
                title: "Titre du mur",
                contact: "Envoyez vos SMS au 0498 75 92 26",
            },
            alert: "",
            messages: []
        }
        this.echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.MIX_PUSHER_APP_KEY,
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            encrypted: true,
            auth: {
                headers: {
                    Authorization: 'Bearer ' + this.props.user.token
                },
            },
        });
    }



    componentDidMount(){
        axios.get(`api/wall/${this.props.user.id}`, {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
            let wall = this.state.wall;
            res.data.image ? wall.image = res.data.image : null;
            res.data.title ? wall.title = res.data.title : null;
            res.data.contact ? wall.contact = res.data.contact : null;
            this.setState({
                wall: wall
            })
        })

        axios.get(`api/messages`, {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
            this.setState({
                messages: res.data
            })
        })

        this.echo.private(`chat.${this.props.user.id}`)
        .listen('MessageSent', (e) => {
            let messages = this.state.messages;
            messages.push(e.message)
            this.setState({
                messages: messages
            })
        });
        this.echo.private(`alert.${this.props.user.id}`)
        .listen('AlertSent', (e) => {
            this.setState({
                alert: e.alert
            })
            document.querySelector("#modal").click();
            let overlay = document.querySelector(".modal-backdrop");
            let screen = document.querySelector(".fullscreen");
            screen.appendChild(overlay.parentNode.removeChild(overlay));
            
        });

    }
    componentWillUnmount(){
        this.echo.private(`alert.${this.props.user.id}`)
        .stopListening('AlertSent')
        this.echo.private(`chat.${this.props.user.id}`)
        .stopListening('MessageSent')
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
                        {this.state.alert != "" ? <Alert alert={this.state.alert} /> : null}
                        <Envoi user={this.props.user} />
                    <div className="container">
                        {this.state.messages.map((el, i) => {
                            return (
                                <p style={{backgroundColor: 'rgb(255, 255, 255, 0.85)'}} className="card w-100 p-2" key={i}>{el.body}</p>
                            )
                        })}
                    </div>
                </div>
                </Fullscreen>
        )
    }
}

export default Wall;