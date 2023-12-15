import { Alert, Badge, IconButton, Menu, MenuItem, Snackbar} from "@mui/material";
import { useEventSourceQuery } from "./useEventSourceQuery";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import NotificationsIcon from '@mui/icons-material/Notifications';
const Notifications = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:443';
    const { data } = useEventSourceQuery(['notifications'], `${API_BASE_URL}/userstatus`);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const invalidateUsers = () => queryClient.invalidateQueries(['existingUsers']);
    const [count, setCount] = useState(0);
    let notificationStore: string[] = JSON.parse(sessionStorage.getItem('notifications') || '[]');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setCount(0);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (data) {
            setOpen(true);
            invalidateUsers();
            setCount((prev) => prev + 1);
            notificationStore.push(data)
            sessionStorage.setItem('notifications', JSON.stringify(notificationStore));
        }
    }, [data]);


    return (
        <>
        <Snackbar open={open} autoHideDuration={2500} anchorOrigin={{horizontal: 'center', vertical: 'top'}} onClose={() => setOpen(false)}>
            <Alert severity='info' sx={{ width: '100%' }}>
                {/* @ts-ignore */}
                {data}
            </Alert>
        </Snackbar>
        <IconButton color='secondary' aria-label='show notifications' size='small' onClick={handleClick}>
            <Badge color='error' badgeContent={count >=10 ? +9 : count} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <NotificationsIcon fontSize='large' />
            </Badge>
        </IconButton>
        {notificationStore.length > 0 ?
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            {
                notificationStore.map((notification, index) => <MenuItem key={index} sx={{backgroundColor: '#8b499b'}} onClick={handleClose}>{notification}</MenuItem>)
            }
        </Menu>
        :<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            No new notifications
        </Menu>
        }
        </>
    );
};

export default Notifications;