import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background: #3B3A3A!important;
    color: #fff!important;
  }
  html, body, #root {
    height: 100%;
  }
  .container-main{
    background: #5a5a5a!important;
    min-height: 100%;
    padding: 0;
  }
  a {
    text-decoration: none!important;
    transition: 0.3s ease-out;
  }
  a:hover {
    color: lightgrey!important;
  }

`;

/*
export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
*/
