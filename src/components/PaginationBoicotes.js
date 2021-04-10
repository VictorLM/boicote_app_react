import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationBoicotes({ boicotesCount, boicotesPorPagina, pagina }) {
  const items = [];
  for (let number = 1; number <= Math.ceil(boicotesCount / boicotesPorPagina); number += 1) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pagina}
        href={`${window.location.pathname}?pagina=${number}`}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (<Pagination className="mx-2 mt-3">{items}</Pagination>);
}

export default PaginationBoicotes;
