import { Container } from "components/Container/Container"
import Footer from "components/Footer/Footer"
import  Header  from "components/Header/Header"

import styled from "styled-components"

const LayoutWrapper = styled.div`
    background-color : rgb(241,243,243);
    min-height : 100vh;
    `


const Layout = ({children})=>{
    return(
        <LayoutWrapper>
            <Header/>
        <Container>
            {children}   
        </Container>
            <Footer/>
        </LayoutWrapper>
    )
}

export default Layout