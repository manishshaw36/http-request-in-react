import React, { Component } from 'react';


import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        author: 'Max',
        id: null
    }

    componentWillReceiveProps(nextProps) {
        const { type, data } = nextProps;
        if (type === 'EDIT' && data !== null) {
            this.setState({
                title: data.title,
                author: data.author,
                id: data.id
            });
        }
    }

    savePost = () => {
        const { title, id, author } = this.state;
        const data = {
            title, 
            id, 
            author
        };
        this.props.addPost(data);
        this.setState({
            title: '',
            author: 'Max',
            id: null
        });
    }

    updateValue = (type) => (event) => {
        this.setState({ [type]: event.target.value });
    }

    render () {
        const { type } = this.props;
        const { title, author } = this.state;
        return (
            <form className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <label id="title">*Title is mandatory</label>
                <input type="text" 
                    value={title} 
                    onChange={this.updateValue('title')}
                    required    
                />
                <label>Author</label>
                <select 
                    value={author} 
                    onChange={this.updateValue('author')}
                >
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                    <option value="Manish">Manish</option>
                </select>
                <button type="button" onClick={this.savePost} >{type === 'EDIT' ? 'Update Post' : 'Add Post'}</button>
            </form>
        );
    }
}

export default NewPost;