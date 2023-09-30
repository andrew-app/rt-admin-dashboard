import { Alert, CircularProgress, Snackbar} from "@mui/material";
import { useEventSourceQuery } from "./useEventSourceQuery";
import { useState, useEffect } from "react";

const Notifications = () => {
    const { data, status} = useEventSourceQuery(['notifications'], 'http://localhost:8082/userstatus');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setOpen(true);
        }
    }, [data]);

    if (status === 'loading') {
        return <CircularProgress size={100} color="secondary" />
    }
    
    return (
        <Snackbar open={open} autoHideDuration={2500} anchorOrigin={{horizontal: 'center', vertical: 'top'}} onClose={() => setOpen(false)}>
            <Alert severity="info" sx={{ width: '100%' }}>
                {data}
            </Alert>
        </Snackbar>
    );
};

export default Notifications;