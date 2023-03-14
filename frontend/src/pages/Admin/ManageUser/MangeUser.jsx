import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiFillPlusCircle } from 'react-icons/ai';
import ModalCreateUser from '../ModalCreateUser/ModalCreateUser';
import './ManageUser.scss';
import TableUser from '../components/TableUser/TableUser';
import { getAllUser } from '../../../services/apiGetAllUser';
import ModalUpdateUser from '../components/ModalUpdateUser/ModalUpdateUser';

const MangeUser = (props) => {
  const [show, setShow] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});



  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    const res = await getAllUser();
    if (res.EC === 0) {
      setData(res.DT);
    }
  };

  const handleClickBtnUpdate = (x) => {
    console.log("done");
    console.log(x);
    setData1(x)
    setShowModalUpdateUser(!false)
  }
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

        <div className='table-users-container'><TableUser data={data} setShowModal={handleClickBtnUpdate} /></div>
        {/* <ModalCreateUser show={show} handleClose={handleClose} /> */}
        <ModalCreateUser
          show={show}
          setShow={setShow}
          callApi={callApi}
        />
        <ModalUpdateUser showUpdate={showModalUpdateUser} setShowModal={setShowModalUpdateUser} data1={data1} />
      </div>
    </div>
  );
};

MangeUser.propTypes = {};

export default MangeUser;
