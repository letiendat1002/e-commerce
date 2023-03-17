import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiFillPlusCircle } from 'react-icons/ai';
import ModalCreateUser from '../ModalCreateUser/ModalCreateUser';
import './ManageUser.scss';
import TableUser from '../components/TableUser/TableUser';
import { getAllUser } from '../../../services/apiGetAllUser';
import { getUserWithPaginate } from '../../../services/apiServiceUser';
import ModalUpdateUser from '../components/ModalUpdateUser/ModalUpdateUser';
import ModalDeleteUser from '../components/ModalDeleteUser/ModalDeleteUser';
import Pagination from '../components/Pagination/Pagination';
import ModalViewUser from '../components/ModalViewUser/ModalViewUser';

const MangeUser = (props) => {
  const LIMIT = 6;
  const [show, setShow] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // callApi();
    callApiWithPaginate(1);
  }, []);

  const callApi = async () => {
    const res = await getAllUser();
    if (res.EC === 0) {
      setData(res.DT);
    }
  };

  const callApiWithPaginate = async (page) => {
    const res = await getUserWithPaginate(page, LIMIT);
    if (res.EC === 0) {
      console.log('Res:', res.DT.users);
      setData(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (x) => {
    setData1(x);
    setShowModalUpdateUser(!false);
  };

  const handleClickBtnView = (x) => {
    console.log('Done');
    setData1(x);
    setShowModalViewUser(true);
  };

  const resetUpdateData = () => {
    setData1({});
  };

  const handleClickBtnDelete = (dataDelete) => {
    setShowModalDeleteUser(!false);
    setDataDelete(dataDelete);
    // console.log(dataDelete)
  };

  return (
    <div className='manage-user-container'>
      <div className='title'>Manage User</div>

      <div className='user-content'>
        <div className='btn-add-new'>
          {/* <button className='btn btn-primary' onClick={handleOpen}><AiFillPlusCircle/>Manage User</button> */}
          <button
            className='btn btn-primary'
            onClick={(e) => setShow(true)}>
            <AiFillPlusCircle />
            Add New User
          </button>
        </div>

        <div className='table-users-container'>
          <TableUser
            data={data}
            setShowModal={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            handleClickBtnView={handleClickBtnView}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Pagination
            callApiWithPaginate={callApiWithPaginate}
            pageCount={pageCount}
            setPageCount={setPageCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        {/* <ModalCreateUser show={show} handleClose={handleClose} /> */}
        <ModalCreateUser
          show={show}
          setShow={setShow}
          callApi={callApi}
          callApiWithPaginate={callApiWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalUpdateUser
          showUpdate={showModalUpdateUser}
          setShowModal={setShowModalUpdateUser}
          data1={data1}
          callApi={callApi}
          resetUpdateData={resetUpdateData}
          callApiWithPaginate={callApiWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalDeleteUser
          showDelete={showModalDeleteUser}
          setShowModalDeleteUser={setShowModalDeleteUser}
          dataDelete={dataDelete}
          callApi={callApi}
          callApiWithPaginate={callApiWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalViewUser
          showModalViewUser={showModalViewUser}
          setShowModalViewUser={setShowModalViewUser}
          data1={data1}
        />
      </div>
    </div>
  );
};

MangeUser.propTypes = {};

export default MangeUser;
