import React from 'react';
import axios from 'axios';


class Envoi extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            message: ""
        }
    }

    handleChange = () => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        event.preventDefault();
        axios.post('api/alert', {
            alert: this.state.message
        }, {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
        })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="message" onChange={this.handleChange} placeholder="Message"></input>
                <button>Submit</button>
            </form>
        )
    }
}

export default Envoi;