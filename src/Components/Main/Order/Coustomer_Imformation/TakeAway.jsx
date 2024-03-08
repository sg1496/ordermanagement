import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
import './TakeAway.css'

function TakeAway() {
    const location = useLocation()

    console.log("check location", location.pathname)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        setShow(`${location.pathname === '/orders/takeAway' ? "true" : "false"}`)
    }, [location])


    return (
        <>
            <Modal id="takewayModal" className='modal-xl' show={show} onHide={handleClose} >
                <Modal.Header style={{backgroundColor:"#C53705", color:"#fff"}} closeButton>
                    <Modal.Title style={{color:"#fff"}} >TakeAway</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:"#FFE0BA"}}>
                    <div className='d-flex align-items-center justify-content-center my-3'>
                    <div className='textbox mx-5 py-2' style={{backgroundColor: "#DC2B19", color: "#fff"}}>Regular(Rs 145/-)</div>
                    <div className='textbox mx-5 py-2' style={{backgroundColor: "#C53705", color: "#fff"}} >Medium(Rs 275/-)</div>
                    <div className='textbox mx-5 py-2' style={{backgroundColor: "#244E36", color: "#fff"}}>Large(Rs 550/-)</div>
                    </div>

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default TakeAway;