import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { getAllUser } from '../../../../services/apiGetAllUser';
import Pagination from '../Pagination/Pagination';
import Loading from '../../../../components/Loading/Loading';

import './TableUser.scss';

const TableUser = (props) => {
  const { data, setShowModal, handleClickBtnDelete, callApiWithPaginate, handleClickBtnView } =
    props;

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  console.log(data);

  return (
    <>
      <div className='table-responsive'>
        <Table
          striped
          bordered
          hover
          className='table_users '>
          <thead>
            <tr>
              <th scope='col'>No</th>
              <th
                scope='col'
                className='text-center'>
                Avatar
              </th>
              <th scope='col'>Email</th>
              <th scope='col'>Username</th>
              <th scope='col'>Role</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length === 0 ? (
              <tr>
                <th
                  colSpan={'5'}
                  className='text-center'>
                  <Loading />
                </th>
              </tr>
            ) : (
              data &&
              data.length > 0 &&
                data.map((x, idx) => {
                return (
                  <tr key={idx}>
                    <th scope='row'>{idx+1}</th>
                    <td className='row_img'>
                      <img
                        style={{ width: '40px', height: '40px' }}
                        src={`data:image/jpeg;base64,${x.image}`}
                        alt=''
                      />
                    </td>
                    <td>{x.email}</td>
                    <td>{x.fullName}</td>
                    <td>{x.roles[0]}</td>
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() => handleClickBtnView(x)}>
                        View
                      </button>
                      <button
                        className='btn btn-success mx-3'
                        onClick={() => setShowModal(x,x.userID)}>
                        Update
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleClickBtnDelete(x)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
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
        </Table>
      </div>

      {/* <PaginatedItems  />, */}
    </>
  );
};

TableUser.propTypes = {};

export default TableUser;
