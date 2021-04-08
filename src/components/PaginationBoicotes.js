import React from 'react';
import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';

function PaginationBoicotes({ boicotesCount, boicotesPorPagina, pagina }) {
  const items = [];
  for (let number = 1; number <= Math.ceil(boicotesCount / boicotesPorPagina); number += 1) {
    items.push(
      <PaginationItemDark
        key={number}
        active={number === pagina}
        href={`${window.location.pathname}?pagina=${number}`}
      >
        {number}
      </PaginationItemDark>,
    );
  }

  return (<Pagination className="mx-3 mt-3">{items}</Pagination>);
}

export default PaginationBoicotes;

// Styled Components

const PaginationItemDark = styled(Pagination.Item)`
  > * {
    color: #fff!important;
    background-color: #6c757d!important;
  }
`;
