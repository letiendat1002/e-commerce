import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUser } from '../../../../services/apiGetAllUser';

const TableUser = (props) => {
  

  const { data,setShowModal } = props;
  console.log(data);

 

  return (
    <>
      <table className='table table-dark table-hover table-striped table-bordered  '>
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
          {data &&
            data.length > 0 &&
            data.map((x, idx) => (
              <tr key={idx}>
                <th scope='row'>{idx + 1}</th>
                <td>{x.email}</td>
                <td>{x.username}</td>
                <td>{x.role}</td>
                <td>
                  <button className='btn btn-primary'>View</button>
                  <button className='btn btn-success mx-3' onClick={()=>setShowModal(x)}>Update</button>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}

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
    </>
  );
};

TableUser.propTypes = {};

export default TableUser;
