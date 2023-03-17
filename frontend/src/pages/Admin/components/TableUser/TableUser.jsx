import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUser } from '../../../../services/apiGetAllUser';
import Pagination from '../Pagination/Pagination';
import Loading from '../../../../components/Loading/Loading';

import './TableUser.scss';

const TableUser = (props) => {
  const { data, setShowModal, handleClickBtnDelete, callApiWithPaginate, handleClickBtnView } =
    props;
  
  const [loading, setLoading] = useState(false);

  return (
    <>
      <table className='table table-dark table-hover table-striped table-bordered table_users '>
        <thead>
          <tr>
            <th scope='col'>No</th>
            <th scope='col'>Email</th>
            <th scope='col'>Username</th>
            <th scope='col'>Role</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Loading />
          ) : (
            data &&
            data.length > 0 &&
            data.map((x, idx) => (
              <tr key={idx}>
                <th scope='row'>{idx + 1}</th>
                <td>{x.email}</td>
                <td>{x.username}</td>
                <td>{x.role}</td>
                <td>
                  <button
                    className='btn btn-primary'
                    onClick={() => handleClickBtnView(x)}>
                    View
                  </button>
                  <button
                    className='btn btn-success mx-3'
                    onClick={() => setShowModal(x)}>
                    Update
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleClickBtnDelete(x)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}

          {data && data.length === 0 && (
            <tr>
              <th
                colSpan={'5'}
                className='text-center'>
                Data not found
              </th>
            </tr>
          )}
        </tbody>
      </table>

      {/* <PaginatedItems  />, */}
    </>
  );
};

TableUser.propTypes = {};

export default TableUser;
