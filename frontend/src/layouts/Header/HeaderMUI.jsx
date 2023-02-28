import * as React from 'react'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import classNames from 'classnames/bind'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import LaptopIcon from '@mui/icons-material/Laptop'
import TabletIcon from '@mui/icons-material/Tablet'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AdbIcon from '@mui/icons-material/Adb'
import InputBase from '@mui/material/InputBase'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import { styled, alpha } from '@mui/material/styles'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

let cx = classNames.bind(styles)

const data = [
  {
    id: 1,
    name: 'Điện thoại',
    icon: <PhoneAndroidIcon />,
  },
  {
    id: 2,
    name: 'Laptop',
    icon: <LaptopIcon />,
  },
  {
    id: 3,
    name: 'Máy tính bảng',
    icon: <TabletIcon />,
  },
]

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

function HeaderMUI() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <AppBar position="sticky" className={cx(styles.header__nav)}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}></Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <NavLink to="/news" className={cx(styles.link)}>
                <NewspaperIcon />
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>Thông tin hay</Button>
              </NavLink>
              <NavLink to="/payments" className={cx(styles.link)}>
                <PaymentIcon />
                <Button color="inherit" sx={{ my: 2, color: 'white', display: 'block' }}>
                  Thanh toán & tiện ích
                </Button>
              </NavLink>
              <NavLink to="/account" className={cx(styles.link)}>
                <AccountCircleIcon />
                <Button color="inherit" sx={{ my: 2, color: 'white', display: 'inline' }}>
                  Tài khoản của tôi
                </Button>
              </NavLink>
              <NavLink to="/cart" className={cx(styles.link)}>
                <ShoppingCartIcon />
                <Button color="inherit" sx={{ color: 'white', display: 'block' }}>
                  Giỏ hàng
                </Button>
              </NavLink>
            </Box>

            {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
                </Search */}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <Container className={cx(styles.link_subNav)} maxWidth="xl">
          {data && (
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: 'flex', md: 'flex' },
                justifyContent: 'space-around',
                AlignItem: 'center',
              }}
            >
              {data.map((item) => {
                return (
                  <NavLink key={item.id} className={cx(styles.link)}>
                    {item.icon}
                    <Button color="inherit" sx={{ my: 2, color: 'white', display: 'block', fontWeight: 500 }}>
                      {item.name}
                    </Button>
                  </NavLink>
                )
              })}
            </Box>
          )}
        </Container>
      </AppBar>
    </>
  )
}
export default HeaderMUI
