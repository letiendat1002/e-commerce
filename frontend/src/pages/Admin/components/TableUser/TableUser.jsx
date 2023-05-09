import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { getAllUser } from '../../../../services/apiGetAllUser';
import Pagination from '../Pagination/Pagination';
import Loading from '../../../../components/Loading/Loading';

import './TableUser.scss';
import { GrEdit, GrFormTrash, GrFormView } from 'react-icons/gr';

const TableUser = (props) => {
  const { data, setShowModal, handleClickBtnDelete, callApiWithPaginate, handleClickBtnView } =
    props;

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

  return (
    <>
      <div className='table-responsive'>
        <Table
          striped
          bordered
          hover
          className='table_users '
          style={{
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
          <thead>
            <tr>
              <th
                scope='col'
                className='text-center'>
                No
              </th>
              {/* <th
                scope='col'
                className='text-center'>
                Avatar
              </th> */}
              <th
                scope='col'
                className='text-center'>
                Email
              </th>
              <th
                scope='col'
                className='text-center'>
                Fullname
              </th>
              <th
                scope='col'
                className='text-center'>
                Role
              </th>
              <th
                scope='col'
                className='text-center'>
                Action
              </th>
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
                const checkAdmin = x.roles.includes('ROLE_ADMIN');
                return (
                  <tr key={idx}>
                    <th
                      scope='row'
                      className='text-center'>
                      {idx + 1}
                    </th>
                    {/* <td className='row_img'>
                      <img
                        style={{ width: '40px', height: '40px' }}
                        src={`data:image/jpeg;base64,${x.image}`}
                        alt=''
                      />
                    </td> */}
                    <td>{x.email}</td>
                    <td style={{ color: x.fullName.length === 0 ? 'red' : 'black' }}>
                      {x.fullName.length === 0 ? 'No data' : x.fullName}
                    </td>
                    <td>{checkAdmin ? x.roles[14].substr(5) : x.roles[0].substr(5)}</td>
                    <td>
                      <button
                        className='btn btn-info'
                        onClick={() => handleClickBtnView(x)}>
                        <GrFormView />
                      </button>
                      <button
                        className='btn btn-success mx-3'
                        disabled={checkAdmin}
                        onClick={() => setShowModal(x, x.userID)}>
                        <GrEdit />
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleClickBtnDelete(x)}>
                        <GrFormTrash />
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
