import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import to from "await-to-js";
import axios from "axios";
import PostComment from "./PostComment";
import Post from "./Post";

interface ParamsProps {
    id: string;
}

interface StateProps {
    post: any;
    postComments: any[];
    postUser: any;
}

const PostPage = () => {
    const { id } = useParams<ParamsProps>();

    const [state, setState] = useState<StateProps>({
        post: null,
        postComments: [],
        postUser: null
    });

    useEffect(() => {
        (async () => {
            const data = await getPost(id);
            setState(data);
        })();
    }, []);

    const getPost = async (id: string) => {
        const [err, response] = await to<any>(axios.get('http://localhost:5000/posts/' + id));
        if (err) throw err;

        return response.data;
    }

    return (
        <div className='w-50 h-100 d-flex flex-column align-items-center'>
            {state.post ? <Post post={state} single={true}/> : null}
        </div>
    );
}

export default PostPage;