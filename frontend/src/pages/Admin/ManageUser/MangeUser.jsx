import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiFillPlusCircle } from 'react-icons/ai';
import ModalCreateUser from '../ModalCreateUser/ModalCreateUser';
import './ManageUser.scss';
import TableUser from '../components/TableUser/TableUser';
import { getUsers, getUserWithPaginate } from '../../../services/apiServiceUser';
import ModalUpdateUser from '../components/ModalUpdateUser/ModalUpdateUser';
import ModalDeleteUser from '../components/ModalDeleteUser/ModalDeleteUser';
import Pagination from '../components/Pagination/Pagination';
import ModalViewUser from '../components/ModalViewUser/ModalViewUser';
import Loading from '../../../components/Loading/Loading';
import { GrAddCircle, GrHome } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const MangeUser = (props) => {
  const navigate = useNavigate();
  const LIMIT = 6;
  const [show, setShow] = useState(false);
  const [showModelUser, setShowModelUser] = useState({});
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const idOfLastPost = currentPage * userPerPage;
  const idOfFirstPost = idOfLastPost - userPerPage;
  const currentUsers = data?.slice(idOfFirstPost, idOfLastPost);
  const totalUsers = data?.length;

  const changePage = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    try {
      getAllUsers();
    } catch (err) {
      console.log(err);
    }
  }, []);



  const getAllUsers = async () => {
    setLoading(true);
    const res = await getUsers();
    setData(res?.data);
    setLoading(false);
  };

  const handleClickBtnUpdate = (x, id) => {
    setData1(x);
    getAllUsers();
    setShowModalUpdateUser(!false);
  };

  const handleClickBtnView = (x) => {
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
              style={{ display: 'flex', alignItems: 'center', gap: '5px' ,padding: "8px 20px", backgroundColor: "#0a3b97", color: "#ffffff", fontSize: "18px",
        borderRadius: "5px"}}
              onClick={() => {
                navigate('/admin');
              }}>
              <GrHome/>
              Back Home
            </button>
          <button
            className='btn btn-primary'
            onClick={(e) => setShow(true)}
            style={{padding: "8px 20px", backgroundColor: "#0a3b97", color: "#ffffff", fontSize: "18px",
        borderRadius: "5px"}}>
            <GrAddCircle/>
            Add New User
          </button>
        </div>
        {loading === true ? (
          <Loading />
        ) : (
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

              <div className='pagination-center'>
                <Pagination
                  getAllUsers={getAllUsers}
              userPerPage={userPerPage}
              totalUsers={totalUsers}
              changePage={changePage}
            />
           </div>
          </div>
        )}

        <ModalCreateUser
          show={show}
          setShow={setShow}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          getAllUsers={getAllUsers}
        />

        <ModalUpdateUser
          showUpdate={showModalUpdateUser}
          setShowModal={setShowModalUpdateUser}
          data1={data1}
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
