import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';
import './Language.scss';
import i18next from 'i18next';
import { GrLanguage } from 'react-icons/gr';

const Language = (props) => {
  const { t, i18n } = useTranslation();

  const lngs = {
    en: { nativeName: 'English' },
    vi: { nativeName: 'VietNam' },
  };

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <GrLanguage />{' '}
      <NavDropdown
        title={i18n.language === 'en' ? 'English' : 'Viet Nam '}
        id='basic-nav-dropdown'
        className='dropdown-header-admin'>
        <NavDropdown.Item onClick={() => handleChangeLang('en')}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLang('vi')}>VietNam</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

Language.propTypes = {};

export default Language;
