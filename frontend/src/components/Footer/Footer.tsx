
import { DiscordIcon, FacebookIcon, InstagramIcon, LinkedInIcon, TiktokIcon, TwitterIcon, YoutubeIcon } from "components/Icons";
import styled from "styled-components"

const FooterWrapper = styled.div`
  height: 50px;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  height: 100px;
  margin : 0 50px;

  & .social-box{
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
    a{
      margin-left:40px;
    }
    svg{
      cursor: pointer;
    }
    .twitter:hover{
      svg{
        filter: invert(66%) sepia(92%) saturate(4049%) hue-rotate(158deg) brightness(91%) contrast(101%);
      }
    }
    .discord:hover{
      svg{
        filter: brightness(0) saturate(100%) invert(50%) sepia(94%) saturate(256%) hue-rotate(188deg) brightness(92%) contrast(91%);
      }
    }
    .youtube:hover{
      svg{
        filter: brightness(0) saturate(100%) invert(26%) sepia(28%) saturate(6811%) hue-rotate(348deg) brightness(82%) contrast(85%);
      }
    }
    .linkedin:hover{
      svg{
        filter: brightness(0) saturate(100%) invert(21%) sepia(99%) saturate(2081%) hue-rotate(183deg) brightness(101%) contrast(101%);
      }
    }
    .tiktok:hover{
      svg{
        filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(7500%) hue-rotate(30deg) brightness(103%) contrast(105%);
      }
    }
    .facebook:hover{
      svg{
        filter: brightness(0) saturate(100%) invert(31%) sepia(8%) saturate(4916%) hue-rotate(184deg) brightness(95%) contrast(81%);
      }
    }
    .instagram:hover{
      svg{
        filter: brightness(0) saturate(100%) invert(24%) sepia(96%) saturate(1986%) hue-rotate(269deg) brightness(82%) contrast(95%);
      }
    }
  }



  .copyright-text{
    font-size: 14px;
    color: #000;
    font-weight: 500;
    font-family: Roboto;
  }

`

const Footer =()=>{
  return(
    <FooterWrapper>
      <div>
        <p className="copyright-text">
          
          Copyright © 2023 TronDao. All Rights Reserved.
        </p>
      
      </div>
      <div className="social-box">
        <a href="https://twitter.com/trondao" className="twitter" target="_blank">
          <TwitterIcon />
        </a>
        <a href="https://discord.gg/hqKvyAM" className="discord" target="_blank">
          <DiscordIcon/>
        </a>
        
        <a href="https://www.youtube.com/channel/UC5OPOGRq02iK-0T9sKse_kA?view_as=subscriber" className="youtube" target="_blank">
          <YoutubeIcon/>
        </a>
        <a href="" className="tiktok" target="_blank">
          <TiktokIcon/>
        </a>
        <a href="https://www.instagram.com/trondaoofficial/" className="instagram" target="_blank">
          
          <InstagramIcon/>
        </a>
        
        <a href="https://www.facebook.com/trondaoofficial" className="facebook" target="_blank">
          <FacebookIcon />
        </a>
        <a href="https://www.linkedin.com/company/trondao" className="linkedin" target="_blank">
          <LinkedInIcon/>
        </a>
      </div>
    </FooterWrapper>
  
  )
}

export default Footer;
