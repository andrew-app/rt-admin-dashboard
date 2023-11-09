import { Alert, Badge, IconButton, Snackbar} from "@mui/material";
import { useEventSourceQuery } from "./useEventSourceQuery";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import NotificationsIcon from '@mui/icons-material/Notifications';
const Notifications = () => {
    const API_BASE_URL = import.meta.env.VITE_API_USER_STREAM || '';
    const { data } = useEventSourceQuery(['notifications'], `${API_BASE_URL}/userstatus`);
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const handleInvalidate = () => queryClient.invalidateQueries(['existingUsers']);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (data) {
            setOpen(true);
            setCount((prev) => prev + 1);
        }
    }, [data]);

    useEffect(() => {
        if (open) {
            handleInvalidate();
        }
    }, [open]);

    return (
        <>
        <Snackbar open={open} autoHideDuration={2500} anchorOrigin={{horizontal: 'center', vertical: 'top'}} onClose={() => setOpen(false)}>
            <Alert severity='info' sx={{ width: '100%' }}>
                {/* @ts-ignore */}
                {data}
            </Alert>
        </Snackbar>
        <IconButton color='secondary' aria-label='show notifications' size='small' onClick={() => setCount(0)}>
            <Badge color='error' badgeContent={count} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <NotificationsIcon fontSize='large' />
            </Badge>
        </IconButton>
        </>
    );
};

export default Notifications;