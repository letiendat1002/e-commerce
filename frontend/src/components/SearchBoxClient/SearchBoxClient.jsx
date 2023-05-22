import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import apiService from '../../services/apiServiceProducts';
import useDebouce from '../../pages/Admin/hooks/useDebounce';
import Popper from '../../pages/Admin/components/Popper/Popper';
import ItemProduct from '../ItemProduct/ItemProduct';
import NotFoundProduct from '../../pages/Admin/components/NotFoundProduct/NotFoundProduct';
import styles from './SearchBoxClient.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const SearchBoxClient = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [products, setProducts] = useState([]);

  const debouce = useDebouce(searchValue, 300);
  const inputValue = useRef();

  const getProducts = async () => {
    const { data } = await apiService.getAllProducts();
    setProducts(data);
  };

  // const timer

  // let rsSearch = [];
  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    setShowResult(false);
    inputValue.current.focus();
    // rsSearch = [];

    // rsSearch.splice(0, rsSearch.length);
    // setProducts([]);
  };

  // console.log(showResult);

  const handleHideResults = () => {
    setShowResult(false);
  };

  const handleSetSearchValue = (e) => {
    setSearchValue(e.target.value);
    setLoadingSearch(true);
  };

  useEffect(() => {
    if (debouce.trim() === '') {
      setSearchResult([]);
      // setProducts([]);
      setLoadingSearch(false);
      return;
    }

    const timerId = setTimeout(() => {
      setLoadingSearch(false);
      if (products.length > 0) {
        const rsSearch = products.filter((x) => {
          return x.name.toLowerCase().includes(debouce.toLowerCase());
        });
        setSearchResult(rsSearch);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [debouce, products]);

  useEffect(() => {
    try {
      setLoading(true);
      getProducts();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Tippy
        interactive
        placement='bottom'
        // size="big"
        maxWidth='100%'
        width="100%"
        visible={showResult === true && searchValue !== '' && loadingSearch === false}
        render={(attrs) => {
          return (
            <div
              className={cx('search-results')}
              tabIndex='-1'
              {...attrs}>
              {searchResult.length > 0 && searchValue.length !== '' ? (
                <Popper setShowResult={setShowResult}>
                  <h4 className={cx('search-title')}>Products</h4>
                  {searchResult?.map((x) => {
                    return (
                      <ItemProduct
                        setShowResult={setShowResult}
                        x={x}
                        key={x ? x.productID : 1}
                      />
                    );
                  })}
                </Popper>
              ) : (
                <Popper>
                  <NotFoundProduct debouce={debouce} />
                </Popper>
              )}
            </div>
          );
        }}
        onClickOutside={handleHideResults}>
        <div className={cx('search')}>
          <input
            ref={inputValue}
            type='text'
            placeholder='Nhập tên thiết bị cần tìm'
            spellCheck={false}
            onChange={(e) => handleSetSearchValue(e)}
            value={searchValue}
            onFocus={() => setShowResult(true)}
          />

          {!!searchValue && !loadingSearch && (
            <button
              className={cx('clear')}
              onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {/* Loading */}
          {loadingSearch && (
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

SearchBoxClient.propTypes = {};

export default SearchBoxClient;
