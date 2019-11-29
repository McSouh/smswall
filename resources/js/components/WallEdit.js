import React from 'react';
import { Link } from 'react-router-dom';

class WallEdit extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            wall: {
                image: null,
                title: "Titre du mur",
                contact: "Envoyez vos SMS au 0498 75 92 26",
            },
            preview: "/images/bg.JPG"
        }
    }

    componentDidMount(){
        axios.get(`/api/wall/${this.props.user.id}`, {
            headers: {'Authorization': `Bearer ${this.props.user.token}`}
        })
        .then(res => {
            console.log(res);
            let wall = this.state.wall;
            let preview;
            res.data.image ? preview = res.data.image : null;
            res.data.title ? wall.title = res.data.title : null;
            res.data.contact ? wall.contact = res.data.contact : null;
            this.setState({
                wall: wall,
                preview: preview
            })
        })
    }

    handleChange = event => {
        event.preventDefault();
        let wall = this.state.wall;
        wall[event.target.name] = event.target.value;
        if(event.target.name == "image"){
            var reader  = new FileReader();
            reader.addEventListener("load", () => {
                this.setState({
                    preview: reader.result
                })
              }, false);
            reader.readAsDataURL(event.target.files[0]);
            wall.image = event.target.files[0]
        }
        this.setState({
            wall: wall
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        
        let wall = new FormData();
        wall.append('title', this.state.wall.title)
        wall.append('contact', this.state.wall.contact)
        this.state.wall.image ? wall.append('image', this.state.wall.image) : null;
        
        
        axios.post(`/api/wall/${this.props.user.id}`, 
        wall , {
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        })
        .then(res => {
            console.log(res);
            this.props.reload()
        })
    }

    render(){
        return (
            <div style={{height: "100vh"}} className="bg-dark w-100 d-flex align-items-center flex-column">
                <form onSubmit={this.handleSubmit} className="mt-5 mx-md-5 text-info bg-light p-5 shadow container" encType="multipart/form-data">
                    <h1>
                        Edit Wall
                        <Link className="float-right btn btn-info" to='/wall'>Back</Link>
                    </h1>
                    <div className="form-group">
                        <input onChange={this.handleChange} value={this.state.wall.title} name="title" type="text" className="form-control w-100" placeholder="Enter title" required />
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} value={this.state.wall.contact} name="contact" type="text" className="form-control w-100" placeholder="Enter contact" required />
                    </div>
                    <div className="form-group">
                        <div style={{height: "200px", width: "100%", backgroundSize: "cover", backgroundPosition: 'center', backgroundImage: `url(${this.state.preview})`}}>
                        </div>
                        <input onChange={this.handleChange} name="image" type="file" className="form-control w-100" />
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