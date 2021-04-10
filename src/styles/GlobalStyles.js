import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import {
  backgroundColor, primaryColor, secondaryColor, lightGrayColor, grayColor,
} from '../config/colors';

export default createGlobalStyle`
  // GERAL
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: ${backgroundColor}!important;
  }
  html, body, #root {
    height: 100%;
  }
  .container-main{
    min-height: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  a {
    text-decoration: none!important;
    color: ${secondaryColor}!important;
  }
  a:hover {
    color: ${primaryColor}!important;
  }
  a, button, span {
    transition: 0.3s ease-out!important;
  }
  // TEXT COLORS
  .text-primary {
    color: ${primaryColor}!important;
  }
  .text-secondary {
    color: ${secondaryColor}!important;
  }
  .text-gray {
    color: ${grayColor}!important;
  }
  .text-muted {
    color: ${lightGrayColor}!important;
  }
  // BACKGROUN COLORS
  .bg-secondary {
    background-color: ${secondaryColor}!important;
  }

  // REACT SHARE BTNS
  .react-share__ShareButton:hover {
    opacity: 0.6;
  }
  //
  .card, .btn, .form-control, .popover {
    border-radius: 1.5rem;
  }
  .modal-header {
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    border-bottom: 1px solid rgba(0,0,0,.125);
  }
  .modal-body {
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }
  .modal-content {
    background-color: transparent;
    border: 0;
  }
  .navbar-toggler {
    border-color: ${primaryColor}!important;
  }
  .header {
    font-family: 'Raleway', sans-serif;
    color: ${primaryColor};
    font-weight: bold;
  }
  .border-bottom {
    border-radius: unset!important;
    border-bottom: 1px solid ${grayColor}!important;
  }
  .hr-colored {
    border-top: 1px solid ${grayColor}!important;
  }
  .btn-padrao {
    color: ${secondaryColor};
    border: 2px solid ${secondaryColor};
    background-color: #fff;
    &:hover{
      background-color: ${secondaryColor}!important;
    }
  }
  .zoom-hover {
    transition: transform .3s;
    cursor: default;
    &:hover{
      transform: scale(1.05);
    }
  }
  .vertical-center {
    min-height: 100%;
    display: grid;
    align-items: center;
  }
  .text-pouco-menor {
    font-size: .94rem!important;
  }

`;
