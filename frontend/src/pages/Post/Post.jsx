import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


const Post = () => {
    let {postId} = useParams()

    return (
        <div>
            Post {postId}
        </div>
    );
};


Post.propTypes = {

};


export default Post;
