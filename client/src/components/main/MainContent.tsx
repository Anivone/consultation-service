import React, { useContext, useEffect, useState } from "react";
import to from "await-to-js";
import axios from "axios";
import Post from "../posts/Post";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    makeStyles, TextField, Theme, withStyles
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ContainerContext from "../../context/ContainerContext";

const useStyles = makeStyles({
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        bottom: 80,
        right: 80,
    },
})

const DialogAddButton = withStyles((theme: Theme) => ({
    root: {
        '&.MuiButton-root': {
            backgroundColor: theme.palette.success.light
        }
    }
}))(Button);

const StyledIconButton = withStyles((theme: Theme) => ({
    root: {
        '&.MuiIconButton-root': {
            backgroundColor: theme.palette.success.light
        }
    }
}))(IconButton);

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

const MainContent = () => {

    const { authService } = useContext(ContainerContext);

    const classes = useStyles();
    const [state, setState] = useState({
        posts: [],
    })
    const [open, setOpen] = useState(false);
    const [statePost, setStatePost] = useState({
        title: '',
        description: '',
        tags: ''
    })

    useEffect(() => {
        (async () => {
            await getPosts();
        })();
    }, []);

    const getPosts = async () => {
        const [err, response] = await to(axios.get('http://localhost:5000/posts/'));
        if (err) throw err;
        if (!response) return;

        const posts = response.data;

        setState({
            posts
        })
    }

    const handleChange = (evt: any) => {
        setStatePost({
            ...statePost,
            [evt.target.name]: evt.target.value
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async () => {
        const account = authService.account.getValue();
        if (!account) return;

        const date = new Date();
        const [err] = await to(axios.post('http://localhost:5000/posts/', {
            title: statePost.title,
            description: statePost.description,
            userID: account.userID,
            relevance: 0,
            tags: statePost.tags.split(' '),
            date: {
                day: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear()
            },
            views: 0,
            specialty: account.specialtyID ? account.specialtyID : 'default',
            status: 'active',
            edited: false,
        }));
        if (err) throw err;

        await getPosts();
        handleClose();
    }

    return (
        <div className='w-100 h-100 d-flex flex-row flex-wrap justify-content-center align-items-center'>
            {state.posts ?
                state.posts.map(post =>
                    (<div className='main-content-post mr-10 ml-10'>
                        <Post post={post} single={false}/>
                    </div>))
                : null
            }
            <Fab className={classes.fabButton}>
                <StyledIconButton onClick={handleClickOpen}>
                    <AddIcon fontSize={'large'}/>
                </StyledIconButton>
            </Fab>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Add post"}</DialogTitle>
                <DialogContent>
                    <div className='fs-6 mb-3'>Title</div>
                    <StyledTextField
                        name={'title'}
                        fullWidth
                        autoFocus
                        variant={'outlined'}
                        value={statePost.title}
                        onChange={handleChange}
                    />
                    <div className='fs-6 mt-3 mb-3'>Description</div>
                    <StyledTextField
                        name={'description'}
                        fullWidth
                        multiline
                        rows={6}
                        variant={'outlined'}
                        value={statePost.description}
                        onChange={handleChange}
                    />
                    <div className='fs-6 mt-3 mb-3'>Tags</div>
                    <StyledTextField
                        name={'tags'}
                        fullWidth
                        variant={'outlined'}
                        value={statePost.tags}
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
    )
};

export default MainContent;