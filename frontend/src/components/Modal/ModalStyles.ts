import styled from "styled-components";

export const ModalWrapper = styled.div`
    z-index: auto;
    display: ${({show}) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.5);
`;

export const Container = styled.div`
    background: #fff;
    width: 33%;
    height: auto;
    border-radius: 10px;
    color: rgb(56,136,255);
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 30%;
    border-radius: 12px;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,139, 0.7);
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    background: #fff;
    h3{
        margin: 0;
        padding: 20px ;
    }

    svg{
        cursor: pointer;
        margin-right: 20px;
    }
`;

export const ModalBody = styled.div`
    padding: 20px;
    font-family: 'Roboto', sans-serif;

    p{
        margin: 0;
    }
`;