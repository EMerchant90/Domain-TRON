import React from 'react'
import { ModalWrapper, Container, ModalHeader ,ModalBody } from "./ModalStyles"
import { CloseIcon } from 'components/Icons'


const Modal = ({show, title ,children , onClose}) => {
    return (
        <ModalWrapper show={show}>
            <Container>
            <ModalHeader>
                <h3>{title}</h3>
                <CloseIcon onClick={onClose}/>
            </ModalHeader>
            <ModalBody>
                {children}

            </ModalBody>
            </Container>
        </ModalWrapper>
    )
}

export default Modal