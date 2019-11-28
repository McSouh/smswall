import React from 'react';
import { Link } from 'react-router-dom';


class Messages extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            messages: [
                {
                    body: 'Coucou',
                    id: 2
                },
                {
                    body: 'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    id: 4
                },
                {
                    body: 'Ohh waaaaawwww ! ! !',
                    id: 6
                },
                {
                    body: 'LOREM IPSUMMMMMM dolor sit amet dolor sit amet  LOREM WAW dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    id: 9
                },
                {
                    body: 'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    id: 13
                },
                {
                    body: 'Ohh waaaaawwww ! ! !',
                    id: 14
                },
                {
                    body: 'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet',
                    id: 17
                },
            ]
        }
    }

    delete = (index, id) => {

        let messages = this.state.messages;
        messages.splice(index, 1)
        this.setState({
            messages: messages
        })
    }

    render(){
        return (
            <div style={{minHeight: "100vh"}} className="bg-dark w-100 d-flex align-items-center flex-column">
                <div className="container mt-5 mx-md-5 bg-light p-5 shadow">
                <h1 className=" text-info">
                    Messages management
                    <Link className="float-right btn btn-info" to="/wall">Back</Link>
                </h1>
                {this.state.messages.map((el, i) => {
                    return (
                        <p style={{backgroundColor: 'rgb(255, 255, 255, 0.85)'}} className="card w-100 p-2" key={i}>
                            {el.body}
                            <button onClick={() => this.delete(i, el.id)} style={{right: "0", top: '0'}} className="position-absolute badge badge-pill badge-danger">X</button>
                        </p>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default Messages;
