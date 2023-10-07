import { Alert, CircularProgress, Snackbar} from "@mui/material";
import { useEventSourceQuery } from "./useEventSourceQuery";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
const Notifications = () => {
    const API_BASE_URL = import.meta.env.local.VITE_API_USER_STREAM || '';
    const { data, status} = useEventSourceQuery(['notifications'], `${API_BASE_URL}/userstatus`);
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const handleInvalidate = () => queryClient.invalidateQueries(['existingUsers']);
    

    useEffect(() => {
        if (data) {
            setOpen(true);
        }
    }, [data]);

    useEffect(() => {
        if (open) {
            handleInvalidate();
        }
    }, [open]);

    if (status === 'loading') {
        return <CircularProgress size={100} color="secondary" />
    }
    
    return (
        <Snackbar open={open} autoHideDuration={2500} anchorOrigin={{horizontal: 'center', vertical: 'top'}} onClose={() => setOpen(false)}>
            <Alert severity="info" sx={{ width: '100%' }}>
                {/* @ts-ignore */}
                {data}
            </Alert>
        </Snackbar>
    );
};

export default Notifications;