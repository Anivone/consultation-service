import React, { useContext, useState } from "react";
import to from "await-to-js";
import axios from "axios";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton, TextField,
    Theme,
    withStyles
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import ContainerContext from "../../context/ContainerContext";
import PostComment from "./PostComment";

const AddCommentButton = withStyles((theme: Theme) => ({
    root: {
        '&.MuiButton-root': {
            backgroundColor: theme.palette.success.light
        }
    }
}))(Button);

const AddIconButton = withStyles((theme: Theme) => ({
    root: {
        '&.MuiIconButton-root': {
            color: theme.palette.success.main
        }
    }
}))(IconButton);

const DialogAddButton = withStyles((theme: Theme) => ({
    root: {
        '&.MuiButton-root': {
            backgroundColor: theme.palette.success.light
        }
    }
}))(Button);

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'gray',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'gray',
            },
        }
    }
})(TextField)

interface StateProps {
    post: any;
    postComments: any[];
    postUser: any;
}

const Post = ({ post, single }: { post: StateProps, single: boolean }) => {
    const { authService } = useContext(ContainerContext);

    const [state, setState] = useState<StateProps>(post);
    const [postRelevance, setPostRelevance] = useState(state.post ? state.post.relevance : 0);

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    const handleVote = async (evt: React.MouseEvent<HTMLButtonElement>) => {
        if (!state.post) return;
        const vote = evt.currentTarget.name === 'up' ? 1 : -1;
        const [err] = await to<any>(axios.patch(
            'http://localhost:5000/posts/' + state.post._id + '/vote', {
                vote
            }))
        if (err) throw err;

        setPostRelevance(postRelevance! + vote);
    }

    const handleAdd = async () => {
        const date = new Date();
        const [err] = await to(axios.post('http://localhost:5000/posts/comments', {
            text,
            userID: authService.account.getValue()!.userID,
            postID: state.post._id,
            date: {
                day: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear()
            }
        }));
        if (err) throw err;

        await getComments();
        handleClose();
    }

    const getComments = async () => {
        const [err, response] = await to(axios.get('http://localhost:5000/posts/comments'))
        if (err) throw err;
        if (!response) return;

        const comments = response.data;

        if (!comments) return;

        const postComments = comments.filter((comment: any) => state.post._id === comment.postID);

        setState({
            post: state.post,
            postUser: state.postUser,
            postComments,
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (evt: any) => {
        setText(evt.target.value);
    }

    return (
        <div className='w-100 mb-3 mt-3 text-start'>
            <div className='card'>
                {single
                    ? null
                    : <a className='stretched-link' href={"/posts/" + state.post._id}/>
                }
                <div className="card-body">
                    <div className='w-100 d-flex flex-row justify-content-between'>
                        <h5 className="card-title">{state.post ? state.post.title : null}</h5>
                        <h6 className='card-subtitle text-muted'>{state.post ? state.post.status.toUpperCase() : null}</h6>
                    </div>
                    <div className='text-end'>
                        <h6 className="card-subtitle mb-2 text-muted">{state.post
                            ? `${state.post.date.day}/${state.post.date.month}/${state.post.date.year}`
                            : null}</h6>
                    </div>
                    <p className="card-text">{state.post ? state.post.description : null}</p>

                        <div className='card-link d-flex flex-row justify-content-start align-items-center'>
                            {single ? <IconButton name={'down'} onClick={handleVote} size={'small'}>
                                <RemoveIcon color={'error'}/>
                            </IconButton>
                                : null
                            }
                            <div className='fs-4 ml-10 mr-10'>{single ? null : 'Relevance:'} {postRelevance}</div>
                            {single ? <AddIconButton name={'up'} onClick={handleVote} size={'small'}>
                                <AddIcon/>
                            </AddIconButton>
                                : null
                            }
                        </div>
                </div>
                <div className='card-footer text-muted d-flex flex-row justify-content-between align-items-center'>
                    {single ?
                        <div>
                            <AddCommentButton onClick={handleClickOpen} variant={'contained'}>
                                Add Comment
                            </AddCommentButton>
                        </div>
                        : null
                    }
                    <div className='d-flex flex-row justify-content-center align-items-center text-center'>
                        {state.postUser ? `${state.postUser.firstName} ${state.postUser.lastName}` : null}
                        <PersonIcon className='ml-10'/>
                    </div>
                </div>
                <Dialog
                    fullWidth
                    maxWidth={'sm'}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>{"Add comment"}</DialogTitle>
                    <DialogContent>
                        <StyledTextField
                            fullWidth
                            multiline
                            rows={6}
                            autoFocus
                            variant={'outlined'}
                            value={text}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                        <div className='w-25'>
                            <DialogAddButton fullWidth onClick={handleAdd} variant={'contained'}>
                                Add
                            </DialogAddButton>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
            {single ?
                <div className='w-100 mt-3 d-flex flex-column justify-content-start align-items-start'>
                    {state.postComments
                        ? state.postComments.map(comment => (<PostComment comment={comment}/>))
                        : null
                    }
                </div>
                : null
            }
        </div>
    )
}

export default Post;