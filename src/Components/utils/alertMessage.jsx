import {forwardRef} from 'react'
import MuiAlert from "@mui/material/Alert"
import { Snackbar } from "@mui/material"

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert  ref={ref} {...props} />;
});

const Alerts = ({ open, type, msg, onClose }) => {
    return (
        open && <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            sx={{ top: '45px' }}
        >
            <Alert
                severity={type}
                onClose={onClose}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default Alerts