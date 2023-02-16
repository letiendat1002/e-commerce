import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

import { DiDatabase, DiReact } from 'react-icons/di';
import {
  FaChartBar,
  FaGem,
  FaGithub,
  FaHeart,
  FaList,
  FaRegLaughWink,
  FaTachometerAlt,
} from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { FaBars } from 'react-icons/fa';
import { GrUserManager } from 'react-icons/gr';
import PropTypes from 'prop-types';
import { RiDashboardLine } from 'react-icons/ri';

const Sidebar = (props) => {
  const { collapsed, toggled, handleToggleSidebar, setCollapsed } = props;
  const { t } = useTranslation();

  const [sizeWidth, setSizeWidth] = useState();
  const [display, setDisplay] = useState('');
  const [breakPoint, setBreakPoint] = useState(true);

  const getSize = () => {
    setSizeWidth(window.innerWidth);
  };
  // useEffect(() => {
  //   window.addEventListener('resize', getSize);

  //   if (sizeWidth <= 1000){
  //     setCollapsed(true)
  //     setDisplay("")
  //     setBreakPoint(true)
  //   }
  //   if (sizeWidth >= 1000) {
  //     setCollapsed(false)
  //     setDisplay("display")
  //     setBreakPoint(false)
  //   }
  // }, [setCollapsed, sizeWidth]);

  return (
    <div>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint={breakPoint ? 'md' : ''}
        onToggle={handleToggleSidebar}>
        <Link to='/shipper'>
          <SidebarHeader>
            <div
              style={{
                padding: '24px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: '16px',
                letterSpacing: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'flex',
                justifyContent: 'center',
                color: '#ffff',
                alignItems: 'center',
                gap: '5px',
              }}>
              <DiDatabase
                size={'3em'}
                color={'00bfff'}
              />
              {/* <GrUserManager
                style={{
                  fontSize: '16px',
                  color:'white !important'
               }}
              /> */}
             SHIPPER
            </div>
          </SidebarHeader>
        </Link>

        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem
              icon={<FaChartBar />}
              suffix={<span className='badge red'>Tổng Thể</span>}>
              <Link to='/shipper' />
              SHIPPER
            </MenuItem>
          </Menu>
          <Menu iconShape='circle'>
            <SubMenu
              suffix={<span className='badge yellow'>Quản Lý</span>}
              icon={<FaRegLaughWink />}>
              <MenuItem>
                {/* {t('sidebar.title8')} */}
                Quản Lý Đơn Hàng
                <Link to='manage-order' />
                {/* Quản lý sản phẩm */}
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className='sidebar-btn-wrapper'
            style={{
              padding: '20px 24px',
            }}></div>
        </SidebarFooter>
      </ProSidebar>

      {/* <span onClick={() => setCollapsed(!collapsed)}>
              <FaBars className='leftside' />
            </span> */}
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
