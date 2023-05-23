import React, { useEffect, useRef, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCentercode } from 'react-icons/fa';

import AccountItem from '../ProductItemSearch/ProductItemSearch';
import Popper from '../Popper/Popper';
import styles from './SearchBox.module.scss';
import useDebouce from '../../hooks/useDebounce';
import apiFilterProducts from '../../../../services/apiFilterProducts';
import apiService from '../../../../services/apiServiceProducts';
import NotFoundProduct from '../NotFoundProduct/NotFoundProduct';
import './SearchBox.scss'

export const ShowContext = createContext();
const cx = classNames.bind(styles);
const SearchBox = (props) => {
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
    <div style={{width:'100%'}}>
      <ShowContext.Provider value={setShowResult}>
        <Tippy
          interactive
          placement='bottom-end'
        maxWidth='100%'
        width="100%"
          visible={showResult === true && searchValue !== '' && loadingSearch === false}
          render={(attrs) => {
            return (
              <div
                className={cx('search-results')}
                {...attrs}>
                {searchResult.length > 0 && searchValue.length !== '' ? (
                  <Popper setShowResult={setShowResult}>
                    <h4 className={cx('search-title')}>Products</h4>
                    {searchResult?.map((x) => {
                      return (
                        <AccountItem
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
              placeholder='Enter products'
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
      </ShowContext.Provider>
    </div>
  );
};

SearchBox.propTypes = {};

export default SearchBox;
