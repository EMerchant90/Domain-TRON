

import React from "react";

const Icon = (props) => {
  return (
    <svg width={props.width ? props.width : "26"} height={props.height ? props.height : "26"} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="13" fill="#3E91DE"/>
    <circle cx="13" cy="13" r="13" fill="#C23631"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.889 12.8578L19.9336 11.7491L13.0002 20.3046L13.889 12.8578ZM13.1086 12.5215L12.1771 20.3069L7.15024 7.52914L13.1086 12.5215ZM13.5008 11.4172L7.80024 6.75052L17.1169 8.44281L13.5008 11.4172ZM18.0617 8.86133L20.0419 10.7606L14.6252 11.7502L18.0617 8.86133ZM18.3174 7.8253L5.41626 5.41663L12.2062 22.75L21.6663 11.0557L18.3174 7.8253Z" fill="white"/>
    </svg>
    );
};

export default Icon;

