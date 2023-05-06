import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ userPerPage, totalUsers, changePage }) => {
  const pageNumber = [];

  console.log(userPerPage, totalUsers,Math.ceil(totalUsers / userPerPage));
  for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
    pageNumber.push(i);
  }
  console.log(pageNumber);
  return (
    <div>
      <ul className='Pagination'>
        {pageNumber.map((x, idx) => (
          <li
            key={idx}
            onClick={() => changePage(x)}>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
};

Pagination.propTypes = {};

export default Pagination;
