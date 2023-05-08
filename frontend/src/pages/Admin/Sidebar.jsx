import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { useTranslation, Trans } from 'react-i18next';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { RiDashboardLine } from 'react-icons/ri';
import { Outlet, Link, NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = (props) => {
  const { collapsed, toggled, handleToggleSidebar,setCollapsed } = props;
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
        breakPoint={breakPoint ?"md":""}
        onToggle={handleToggleSidebar}>
        <Link to='/admin'>
          <SidebarHeader>
            <div
              style={{
                padding: '24px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 14,
                letterSpacing: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'flex',
                justifyContent:'center'
              }}>
              {/* <DiReact
                size={'3em'}
                color={'00bfff'}
              /> */}
              {t('sidebar.title')}
            </div>
          </SidebarHeader>
        </Link>

        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem
              icon={<RiDashboardLine />}
              suffix={<span className='badge red'>{t('sidebar.title3')}</span>}>
              <Link to='/admin' />
              {t('sidebar.title2')}
            </MenuItem>
            <MenuItem icon={<FaGem />}>
              {t('sidebar.title4')} <Link to='products-filters' />
            </MenuItem>
          </Menu>
          <Menu iconShape='circle'>
            <SubMenu
              suffix={<span className='badge yellow'>3</span>}
              icon={<FaRegLaughWink />}>
              <MenuItem>
                {t('sidebar.title5')}
                {/* Quản lý người dùng */}
                <Link to='manage-user' />
              </MenuItem>
              <MenuItem>
                <Link to='manage-categories' />
                {t('sidebar.title6')} {/* Quản lý danh mục */}
              </MenuItem>
              <MenuItem>
                {t('sidebar.title7')}
                <Link to='manage-orders' />
                {/* Quản lý đặt hàng */}
              </MenuItem>
              <MenuItem>
                {/* {t('sidebar.title8')} */}
                Manage Products
                <Link to='manage-products' />
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
