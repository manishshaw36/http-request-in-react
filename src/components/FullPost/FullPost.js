import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {

    render () {
        const { data, onEdit, onDelete } = this.props;
        return (
            <div className="FullPost">
                <h1>{data.title}</h1>
                <p>{data.author}</p>
                <div className="Edit">
                    <button className="edit" onClick={onEdit}>Edit</button>
                    <button className="Delete" onClick={onDelete}>Delete</button>
                </div>
            </div>
        ); 
    }
}

export default FullPost; 