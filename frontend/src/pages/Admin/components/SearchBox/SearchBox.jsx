import React, { useEffect, useRef, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

import AccountItem from '../ProductItemSearch/ProductItemSearch';
import Popper from '../Popper/Popper';
import styles from './SearchBox.module.scss';
import useDebouce from '../../hooks/useDebounce';
import apiFilterProducts from '../../../../services/apiFilterProducts';
import apiService from '../../../../services/apiServiceProducts';

export const ShowContext = createContext();
const cx = classNames.bind(styles);
const SearchBox = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const debouce = useDebouce(searchValue, 300);
  const inputValue = useRef();

  const getProducts = async () => {
    const { data } = await apiService.getAllProducts();
    setProducts(data);
  };

  let rsSearch = [];
  const handleClear = () => {
    setSearchValue('');
    // setSearchResult([]);
    setShowResult(false);
    inputValue.current.focus();
    // rsSearch = [];

    // rsSearch.splice(0, rsSearch.length);
    setProducts([]);
  };

  // console.log(showResult);

  const handleHideResults = () => {
    setShowResult(false);
  };

  const handleSetSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (debouce.trim() === '') {
      // setSearchResult([]);
      setProducts([]);
      return;
    }
    try {
      setLoading(true);
      getProducts();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [debouce]);

  if (products.length > 0) {
    rsSearch = products.filter((x) => {
      return x.name.toLowerCase().includes(debouce.toLowerCase());
    });
  }

  // setSearchResult(rsSearch)

  return (
    <div>
      <ShowContext.Provider value={setShowResult}>
        <Tippy
          interactive
          visible={showResult && rsSearch && rsSearch?.length > 0}
          render={(attrs) => {
            return (
              <div
                className={cx('search-results')}
                tabIndex='-1'
                {...attrs}>
                <Popper setShowResult={setShowResult}>
                  <h4 className={cx('search-title')}>Products</h4>
                  {rsSearch ?
                    rsSearch?.map((x) => {
                      return (
                        <AccountItem
                          setShowResult={setShowResult}
                          x={x}
                          key={x ? x.productID : 1}
                        />
                      );
                    }):(<div>No product match</div>)}
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
      </ShowContext.Provider>
    </div>
  );
};

SearchBox.propTypes = {};

export default SearchBox;
