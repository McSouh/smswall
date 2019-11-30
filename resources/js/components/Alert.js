import React from 'react';

class Alert extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div style={{maxWidth: "75%"}} className="modal-dialog modal-dialog-centered mx-auto" role="document">
                <div className="modal-content bg-info text-light p-5">
                    {/* <h1 className="text-center text-danger">/ ! \</h1> */}
                    <h1 className="text-center">{this.props.alert}</h1>
                </div>
                <button className="d-none" id="modal" data-toggle="modal" data-target="#exampleModalCenter"></button>
            </div>
            </div>
        )
    }
}

export default Alert;