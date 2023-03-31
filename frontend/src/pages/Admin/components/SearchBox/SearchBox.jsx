import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import AccountItem from '../ProductItemSearch/ProductItemSearch';
import Popper from '../Popper/Popper';
import styles from './SearchBox.module.scss';
import useDebouce from '../../hooks/useDebounce';
import apiFilterProducts from '../../../../services/apiFilterProducts';
import axios from 'axios';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const SearchBox = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouce = useDebouce(searchValue, 300);
  const inputValue = useRef();

  useEffect(() => {
    if (debouce.trim() === '') {
      setSearchResult([]);
      return;
    }
    setLoading(true);

    const callApi = async () => {
      try {
        const res = await apiFilterProducts
          .getProducts(`users/search`, {
            params: {
              q: debouce,
              type: 'more',
            },
          })
          .then((res) => res);

        setSearchResult(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error('Wrong API');
      }
    };
    callApi();
  }, [debouce]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    setShowResult(false);
    inputValue.current.focus();
  };

  const handleHideResults = () => {
    setShowResult(false);
  };

  const handleSetSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Tippy
        interactive
        visible={showResult && searchResult && searchResult?.length > 0}
        render={(attrs) => {
          return (
            <div
              className={cx('search-results')}
              tabIndex='-1'
              {...attrs}>
              <Popper>
                <h4 className={cx('search-title')}>Products</h4>
                {searchResult &&
                  searchResult?.map((x) => (
                    <AccountItem
                      x={x}
                      key={x.id}
                    />
                  ))}
              </Popper>
            </div>
          );
        }}
        onClickOutside={handleHideResults}>
        <div className={cx('search')}>
          <input
            ref={inputValue}
            type='text'
            placeholder='Enter products'
            spellCheck={false}
            onChange={(e) => handleSetSearchValue(e)}
            value={searchValue}
            onFocus={() => setShowResult(true)}
          />

          {!!searchValue && !loading && (
            <button
              className={cx('clear')}
              onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {/* Loading */}
          {loading && (
            <FontAwesomeIcon
              className={cx('loading')}
              icon={faSpinner}
            />
          )}

          <button className={cx('search-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Tippy>
    </div>
  );
};

SearchBox.propTypes = {};

export default SearchBox;
