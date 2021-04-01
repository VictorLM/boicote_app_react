import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export const MenuStyled = styled(Link)`
  color: #3B3A3A!important;
  padding-right: 1rem!important;
  padding-left: 1rem!important;
  transition: 0.3s ease-out;
  &:hover {
    background-color: #3B3A3A;
    color: #fff!important;
  }
`;

export const MenuStyledNavLink = styled(Nav.Link)`
  color: #3B3A3A!important;
  padding-right: .5rem!important;
  padding-left: .5rem!important;
  transition: 0.3s ease-out;
  &:hover {
    color: ${(props) => props.twitter && '#1DA1F2!important'
      || props.facebook && '#3b5998!important'
      || props.instagram && '#E1306C!important'
};
  }
`;
