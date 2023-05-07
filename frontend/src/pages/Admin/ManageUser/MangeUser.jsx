import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiFillPlusCircle } from 'react-icons/ai';
import ModalCreateUser from '../ModalCreateUser/ModalCreateUser';
import './ManageUser.scss';
import TableUser from '../components/TableUser/TableUser';
import { getAllUser } from '../../../services/apiGetAllUser';
import { getUsers, getUserWithPaginate } from '../../../services/apiServiceUser';
import ModalUpdateUser from '../components/ModalUpdateUser/ModalUpdateUser';
import ModalDeleteUser from '../components/ModalDeleteUser/ModalDeleteUser';
import Pagination from '../components/Pagination/Pagination';
// import Pagination from '../../../components/Pagination/Pagination';
import ModalViewUser from '../components/ModalViewUser/ModalViewUser';

const MangeUser = (props) => {
  const LIMIT = 6;
  const [show, setShow] = useState(false);
  const [showModelUser, setShowModelUser] = useState({
    
  });
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const idOfLastPost = currentPage * userPerPage;
  const idOfFirstPost = idOfLastPost - userPerPage;
  const currentUsers = data.slice(idOfFirstPost, idOfLastPost);
  const totalUsers = data.length;

  const changePage = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const callApi = async () => {
    const res = await getAllUser();
    if (res.EC === 0) {
    }
  };

  const getAllUsers = async () => {
    const res = await getUsers();
    setData(res?.data);
  };

  const handleClickBtnUpdate = (x, id) => {
    setData1(x);
    console.log(x, id);
    getAllUsers();
    setShowModalUpdateUser(!false);
  };

  const handleClickBtnView = (x) => {
    console.log(x);
    setData1(x);
    setShowModalViewUser(true);
  };

  const resetUpdateData = () => {
    setData1({});
  };

  const handleClickBtnDelete = (dataDelete) => {
    setShowModalDeleteUser(!false);
    setDataDelete(dataDelete);
  };

  return (
    <div className='manage-user-container'>
      <div className='title'>Manage User</div>

      <div className='user-content'>
        <div className='btn-add-new'>
          <button
            className='btn btn-primary'
            onClick={(e) => setShow(true)}>
            <AiFillPlusCircle />
            Add New User
          </button>
        </div>

        <div className='table-users-container'>
          <TableUser
            data={currentUsers}
            setShowModal={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            handleClickBtnView={handleClickBtnView}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* <Pagination
            userPerPage={userPerPage}
            totalUsers={totalUsers}
            changePage={changePage}
          /> */}

          <Pagination
            userPerPage={userPerPage}
            totalUsers={totalUsers}
            changePage={changePage}
          />
        </div>
        <ModalCreateUser
          show={show}
          setShow={setShow}
          callApi={callApi}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          getAllUsers={getAllUsers}
        />

        <ModalUpdateUser
          showUpdate={showModalUpdateUser}
          setShowModal={setShowModalUpdateUser}
          data1={data1}
          callApi={callApi}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          getAllUsers={getAllUsers}
        />

        <ModalDeleteUser
          showDelete={showModalDeleteUser}
          setShowModalDeleteUser={setShowModalDeleteUser}
          dataDelete={dataDelete}
          getAllUsers={getAllUsers}
          callApi={callApi}
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
