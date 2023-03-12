import React from 'react';
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
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { RiDashboardLine } from 'react-icons/ri';
import { Outlet, Link, NavLink } from 'react-router-dom';

const Sidebar = (props) => {
  const {  collapsed, toggled, handleToggleSidebar } = props;
  return (
    <div>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint='md'
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
              }}>
              <DiReact
                size={'3em'}
                color={'00bfff'}
              />
              Admin Page
            </div>
          </SidebarHeader>
        </Link>

        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem
              icon={<RiDashboardLine />}
              suffix={<span className='badge red'>Manage</span>}>
              <Link to='/admin' />
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaGem />}> Products </MenuItem>
          </Menu>
          <Menu iconShape='circle'>
            <SubMenu
              suffix={<span className='badge yellow'>3</span>}
              icon={<FaRegLaughWink />}>
              <MenuItem>
                Quản lý người dùng
                <Link to='manage-user' />
              </MenuItem>
              <MenuItem>Quản lý danh mục </MenuItem>
              <MenuItem>Quản lý đặt hàng </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className='sidebar-btn-wrapper'
            style={{
              padding: '20px 24px',
            }}>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
