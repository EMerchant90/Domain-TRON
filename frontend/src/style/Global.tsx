import { createGlobalStyle } from 'styled-components'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
  }
  body {
    margin: 0 !important;
  }
  .pointer{
    cursor : pointer !important;
  }
  .row{
    margin-right : 0px !important;
    margin-left : 0px !important;
  }
  input:focus {
    outline:none;
  }

  .nav-link {
    padding: 0.4rem 0.75rem !important;
    height : 100%;
    &:hover {
      opacity: 0.5;
    }
  }

  .nav-link.disabled {
    opacity: 0.4 !important;
  }
  a {
    text-decoration: none;
  }
`

export default GlobalStyle
