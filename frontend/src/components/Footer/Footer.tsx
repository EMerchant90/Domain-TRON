
import styled from "styled-components"

const FooterWrapper = styled.div`
    background-color: #000;
    height: 50px;
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
    font-size: 14px;
    align-items: center;




`

const Footer =()=>{
    return(
        <FooterWrapper>
            Copyright © 2022 Tron Web3 Domains. All Rights Reserved.
        </FooterWrapper>

    )
}

export default Footer;