import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    return (
        <>
            <div className='Delete_Alert' >
                <Dialog
                    className='Delete_Alert_custom'
                    open={props.open.check}
                    onClose={props.onClose}

                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{ backgroundColor: "#f2f5ff" }}>
                        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "25px", color: "#1C2E5C", fontWeight: '800', textAlign: 'left' }}>
                            {props.title}
                        </DialogTitle>
                    </div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ fontSize: "18px", color: '#222222', textAlign: 'left' }} >
                            {props.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ fontSize: '16px' }} onClick={props.onClose}>cancel</Button>
                        <Button sx={{ fontSize: '16px' }} onClick={props.onDelete} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
