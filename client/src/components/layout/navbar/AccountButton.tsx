import React, { useContext, useState } from "react";
import { Box, Fade, IconButton, Menu, MenuItem, Theme, withStyles } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ContainerContext from "../../../context/ContainerContext";
import { useHistory } from "react-router-dom";

const AccountButton = () => {

    const history = useHistory();
    const { authService } = useContext(ContainerContext);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(evt.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null);
    };

    const DefaultMenuItem = withStyles((theme: Theme) => ({
        root: {
            '&.MuiMenuItem-root': {
                borderColor: '#f5f5f5',
                borderWidth: '3px',
                borderRadius: '2px',
                borderStyle: 'solid'
            },
        },
    }))(MenuItem);

    const LogoutMenuItem = withStyles((theme: Theme) => ({
        root: {
            '&.MuiMenuItem-root': {
                backgroundColor: theme.palette.error.main,
                color: '#fff',
                marginTop: '20px',
                borderRadius: '2px'
            },
        },
    }))(MenuItem);

    const logout = () => {
        authService.logout();
        handleClose();
        history.push('/login');
    }

    return (
        <div>
            <IconButton aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircleIcon fontSize={'large'}/>
            </IconButton>
            <Menu
                id="user-menu"
                open={Boolean(anchor)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                TransitionComponent={Fade}
                PaperProps={{
                    style: {
                        left: '50%',
                        transform: 'translateX(-33%) translateY(30%)',
                    }
                }}
            >
                <Box p={2}>
                    <DefaultMenuItem onClick={handleClose}>Profile</DefaultMenuItem>
                    <LogoutMenuItem onClick={logout}>Logout</LogoutMenuItem>
                </Box>
            </Menu>
        </div>
    );

}

export default AccountButton;