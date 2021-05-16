import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import StarRateIcon from '@material-ui/icons/StarRate';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from "@material-ui/core";
import to from "await-to-js";
import axios from "axios";

interface PostCommentProps {
    _id: string
    text: string;
    postID: string;
    userID: string;
    points: number;
    date: {
        day: number
        month: number;
        year: number;
    };
    user: any;
}

const PostComment = ({ comment }: { comment: PostCommentProps }) => {

    const [commentPoints, setCommentPoints] = useState(comment ? comment.points : 0);

    const handleVote = async (evt: React.MouseEvent<HTMLButtonElement>) => {
        const vote = evt.currentTarget.name === 'up' ? 1 : -1;
        const [err] = await to<any>(axios.patch('http://localhost:5000/posts/comments/' + comment._id + '/vote', {
            vote
        }))
        if (err) throw err;

        setCommentPoints(commentPoints! + vote);
    }

    return (
        <div className='w-100 mb-3 d-flex flex-row justify-content-center align-items-center'>
            <div className="card comment-content text-start">
                <div className="row g-0 d-flex flex-row justify-content-between">
                    <div className="col-md-8">
                        <div className="card-body comment-content d-flex flex-column">
                            <p className="card-text">{comment ? comment.text : null}</p>
                        </div>
                    </div>
                    {comment
                        ?
                        <div
                            className="col-md-3 text-muted d-flex flex-column justify-content-center align-items-center">
                            <PersonIcon/>
                            <div>
                                {comment.user.firstName} {comment.user.lastName}
                            </div>
                            {comment.user.isConsultant
                                ?
                                <div className='d-flex flex-column justify-content-around align-items-center'>
                                    <div>Specialist</div>
                                    <div className='d-flex flex-row justify-content-around align-items-center'>
                                        <div>{comment.user.rating}</div>
                                        <StarRateIcon fontSize={'small'}/>
                                    </div>
                                    <div>
                                        <small className="text-muted">{comment
                                        ? `${comment.date.day}/${comment.date.month}/${comment.date.year}`
                                        : null}</small>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                </div>
            </div>
            <div className='comment-points h-100 d-flex flex-column justify-content-center align-items-center'>
                <IconButton onClick={handleVote} name={'up'} size={'small'}>
                    <ExpandLessIcon fontSize={'large'}/>
                </IconButton>
                <div className='fs-3'>{commentPoints}</div>
                <IconButton onClick={handleVote} name={'down'} size={'small'}>
                    <ExpandMoreIcon fontSize={'large'}/>
                </IconButton>
            </div>
        </div>
    );
}

export default PostComment;