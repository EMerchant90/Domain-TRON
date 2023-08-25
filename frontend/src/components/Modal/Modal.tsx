import React from 'react'
import { ModalWrapper, Container, ModalHeader ,ModalBody } from "./ModalStyles"
import { CloseIcon } from 'components/Icons'



const Modal = ({show, title ,children , changeModal}) => {

    const handleCloseModal = () => {
        console.log("close modal")
        changeModal(false); 
      };

    return (
        <ModalWrapper show={show} >
            <Container>
            <ModalHeader>
                <h3>{title}</h3>
                <div onClick={handleCloseModal}> 
                <CloseIcon />
                </div>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            </Container>
        </ModalWrapper>
    )
}

export default Modal