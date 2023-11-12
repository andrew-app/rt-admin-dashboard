import { Alert, Badge, IconButton, Menu, MenuItem, Snackbar} from "@mui/material";
import { useEventSourceQuery } from "./useEventSourceQuery";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getExistingUsers } from "./getExistingUsers";
import NotificationsIcon from '@mui/icons-material/Notifications';
const Notifications = () => {
    const API_BASE_URL = import.meta.env.VITE_API_USER_STREAM || '';
    const { data } = useEventSourceQuery(['notifications'], `${API_BASE_URL}/userstatus`);
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const userData = getExistingUsers();
    const handleInvalidate = () => queryClient.invalidateQueries(['existingUsers']);
    const [count, setCount] = useState(0);
    let notificationStore: string[] = JSON.parse(sessionStorage.getItem('notifications') || '[]');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (data) {
            setOpen(true);
            setCount((prev) => prev + 1);
            notificationStore.push(data)
            sessionStorage.setItem('notifications', JSON.stringify(notificationStore));
        }
    }, [data]);

    if (open) {
        handleInvalidate();
    }

    if (userData?.data?.length === 0) {
        setCount(0);
    }

    return (
        <>
        <Snackbar open={open} autoHideDuration={2500} anchorOrigin={{horizontal: 'center', vertical: 'top'}} onClose={() => setOpen(false)}>
            <Alert severity='info' sx={{ width: '100%' }}>
                {/* @ts-ignore */}
                {data}
            </Alert>
        </Snackbar>
        <IconButton color='secondary' aria-label='show notifications' size='small' onClick={handleClick}>
            <Badge color='error' badgeContent={count} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <NotificationsIcon fontSize='large' />
            </Badge>
        </IconButton>
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
        </>
    );
};

export default Notifications;