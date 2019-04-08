import React, { Component } from 'react';
import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        operatedPostObj: null,
        operation: null
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            let posts = response.data.slice(0,8);
            const existingPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Manish'
                };
            });
            this.setState({ 
                posts: existingPosts,
                operatedPostObj: null,
                operation: null
            });
        });
    }

    postSelectorHandler = (obj) => {
        this.setState({ operatedPostObj: obj, operation: 'SELECTED' });
    }

    deletePostHandler = (obj) => {
        const { posts } = this.state;
        const updatedPosts = posts.filter((post) => {
            return post.id !== obj.id;
        });
        this.setState({
            posts: updatedPosts, 
            operatedPostObj: null,
            operation: null
        });
    }

    editPostHandler = () => {
        this.setState({ operation: 'EDIT' });
    }

    addNewPost = (post) => {
        const { posts, operation } = this.state; 
        if (operation === 'EDIT') {
            const postIndex = posts.indexOf(posts.find((ele) => {
                return ele.id === post.id;
            }));
            posts[postIndex] = post;
            this.setState({
                posts: posts, 
                operatedPostObj: null,
                operation: null
            });
        } else {
            const data = {...post};
            data.id = posts.length + 1;
            posts.push(data);
            this.setState({
                posts: posts,
                operatedPostObj: null,
                operation: null
            });
        }
    }

    render () {
        const { posts, operatedPostObj, operation } = this.state;
        return (
            <div className="Blogs">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {
                        posts.map((post) => (
                            <Post 
                                key={post.id} 
                                title={post.title} 
                                author={post.author}
                                clicked={() => this.postSelectorHandler(post)} 
                            />
                        ))
                    }
                </section>
                <section>
                    {
                        operation === 'SELECTED' &&
                        <FullPost 
                            data={operatedPostObj}
                            onDelete={() => this.deletePostHandler(operatedPostObj)}
                            onEdit={() => this.editPostHandler()} 
                        />
                    }
                    {
                        operation === null &&
                        <p style={{ textAlign: 'center' }}>Please select a Post!</p>
                    }
                </section>
                <section>
                    <NewPost 
                        type={operation === 'EDIT' ? 'EDIT' : 'NEW'}
                        data={operatedPostObj} 
                        addPost={this.addNewPost}
                    />
                </section>
            </div>
        );
    }
}

export default Blog;