import '../../assets/css/home.scss';
import '../../assets/css/menu.scss';

import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiFillFilter } from 'react-icons/ai';
import Catagory from '../../assets/data/catagory';
import { Col } from 'react-bootstrap';
import { HiSelector } from 'react-icons/hi';
import Item1 from '../../assets/images/item1.png';
import Item2 from '../../assets/images/item2.png';
import Item3 from '../../assets/images/item3.png';
import Item4 from '../../assets/images/item4.png';
import Item5 from '../../assets/images/item5.jpeg';
import Item6 from '../../assets/images/item6.png';
import Item7 from '../../assets/images/item7.png';
import Logo from '../../assets/images/Logo.svg';
import { MdOutlineRemove } from 'react-icons/md';
import NotFoundItem from '../../assets/images/noti-search.png';
import { Skeleton } from 'antd';
import Slider from 'react-slick';
import { addToCart } from '../../Redux/slice/cartSlice';
import formatProductPrice from '../../Helper';
import { getAllCategories } from '../../Redux/slice/categorySlice';
import { getAllProducts } from '../../Redux/slice/productSlice';

// import { addToCart, descreaseToCart, increaseToCart } from '../../Redux/Actions/cartAction';








const slides = [Item1, Item2, Item3, Item4, Item5, Item6, Item7];

const Menu = ({ match, history }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([dispatch(getAllProducts()),
    dispatch(getAllCategories())
  ])
  }, [])
  const [catagoryId, setCatagoryID] = useState('');

  const category = useSelector(state => state.categories.data)

  const initFilter = {
    manufactorer: [],
    unitPrice: [],
    memory: [],
    monitor: [],
    cpu: [],
    ram: [],
    vga: [],
    haskdisk: [],
    battery: [],
    demand: [],
  };

  const item = useSelector(state => state.product?.data || [])

  const loadingProduct = useSelector(state => state.product.productLoading);
  const loadingCategory = useSelector(state => state.categories.loadingCategory);
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState(initFilter);
  const [value, setValue] = useState('0');
  const [filterItem, setFilterItem] = useState('Tất cả');
  
  useEffect(() => {
    if (!loadingProduct && !loadingCategory){
      setProduct(item)
    }
    else{
      setProduct(item)
    }
  }, [loadingCategory, loadingProduct])

  const handleChange = (e) => {
    setValue(e.target.value);
    let temp = product;
    if (e.target.value == "DEFAULT") {
      temp = temp
    }

    else if (e.target.value == 1) {
      temp = temp.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    else if (e.target.value == 2) {
      temp = temp.sort((a, b) => {
        return b.unitPrice - a.unitPrice;
      });
    }
    setProduct(temp);
  };

  const handleSortFilter = () => {
    let temp = product;
    if (value == "DEFAULT") {
      temp = temp
    }
    else if (value == 1) {
      temp = temp.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    else if (value == 2) {
      temp = temp.sort((a, b) => {
        return b.unitPrice - a.unitPrice;
      });
    }
    setProduct(temp);
  }

  useEffect(() => {
    category?.map((catagory) => {
      if (catagory.slug === slug) {
        setCatagoryID(catagory.categoryID);
      }
    });
  });

  const setFilterProduct = (filterItem) => {
    if (filterItem === 'Theo tên từ A - Z') {
      const product = product.filter((e) => e.Name.sort());
      setProduct(product);
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  };

  // Function handle Filter Attribute product
  const filterSelect = (type, e) => {
    const item = e.target.value;
    const Checked = e.target.checked;

    function getAttribute() {
      for (let i = 0; i < Catagory.length; i++) {
        if (Catagory[i].slug === slug) {
          return Catagory[i].attribute;
        }
      }
    }

    function getChildrend(title) {
      const attribute = getAttribute();
      for (let i = 0; i < attribute.length; i++) {
        if (attribute[i].title === title) {
          return attribute[i];
        }
      }
    }

    function getChildrendValue(children) {
      const childrend = getChildrend(children);
      for (let i = 0; i < childrend.childrend.length; i++) {
        return childrend.childrend[i].value;
      }
    }
    if (Checked) {
      switch (type) {
        case 'Manufacturer':
          if (!filter.manufactorer.includes(item)) {
            setFilter({ ...filter, manufactorer: [...filter.manufactorer, item] });
          }
          break;
        case 'UnitPrice':
          const children = getChildrendValue('UnitPrice');
          if (!filter.unitPrice.includes(item) && item !== children) {
            const newUnitPrice = filter.unitPrice.filter((e) => e !== children);
            setFilter({ ...filter, unitPrice: [...newUnitPrice, item] });
          } else if (!filter.unitPrice.includes(item) && !filter.unitPrice.includes(children)) {
            const newUnitPrice = filter.unitPrice.filter((e) => e === children);
            setFilter({ ...filter, unitPrice: [...newUnitPrice, item] });
          }
          break;
        case 'Memory':
          const Memory = getChildrendValue('Memory');
          if (!filter.memory.includes(item) && item !== Memory) {
            const newMemory = filter.memory.filter((e) => e !== Memory);
            setFilter({ ...filter, memory: [...newMemory, item] });
          } else if (!filter.memory.includes(item) && !filter.memory.includes(Memory)) {
            const newMemory = filter.memory.filter((e) => e === Memory);
            setFilter({ ...filter, memory: [...newMemory, item] });
          }
          break;
        case 'Monitor':
          setFilter({ ...filter, monitor: [...filter.monitor, item] });
          break;
        case 'CPU':
          setFilter({ ...filter, cpu: [...filter.cpu, item] });
          break;
        case 'RAM':
          setFilter({ ...filter, ram: [...filter.ram, item] });
          break;
        case 'VGA':
          setFilter({ ...filter, vga: [...filter.vga, item] });
          break;
        case 'HardDisk':
          setFilter({ ...filter, haskdisk: [...filter.haskdisk, item] });
          break;
        case 'Battery':
          setFilter({ ...filter, battery: [...filter.battery, item] });
          break;
        case 'demand':
          setFilter({ ...filter, demand: [...filter.demand, item] });
          break;
        default:
      }
    } else {
      switch (type) {
        case 'Manufacturer':
          const newManufacturer = filter.manufactorer.filter((e) => e !== item);
          setFilter({ ...filter, manufactorer: newManufacturer });
          break;
        case 'UnitPrice':
          const newUnitPrice = filter.unitPrice.filter((e) => e !== item);
          setFilter({ ...filter, unitPrice: newUnitPrice });
          break;
        case 'Memory':
          const newMemory = filter.memory.filter((e) => e !== item);
          setFilter({ ...filter, memory: newMemory });
          break;
        case 'Monitor':
          const newMonitor = filter.monitor.filter((e) => e !== item);
          setFilter({ ...filter, monitor: newMonitor });
          break;
        case 'CPU':
          const newCPU = filter.cpu.filter((e) => e !== item);
          setFilter({ ...filter, cpu: newCPU });
          break;
        case 'RAM':
          const newRAM = filter.ram.filter((e) => e !== item);
          setFilter({ ...filter, ram: newRAM });
          break;
        case 'VGA':
          const newVGA = filter.vga.filter((e) => e !== item);
          setFilter({ ...filter, vga: newVGA });
          break;
        case 'HardDisk':
          const newHarkDisk = filter.haskdisk.filter((e) => e !== item);
          setFilter({ ...filter, haskdisk: newHarkDisk });
          break;
        case 'Battery':
          const newBattery = filter.battery.filter((e) => e !== item);
          setFilter({ ...filter, battery: newBattery });
          break;
        case 'demand':
          const newDemand = filter.demand.filter((e) => e !== item);
          setFilter({ ...filter, demand: newDemand });
          break;
        default:
      }
    }
  };

  // Functiom handle Filter Product in Tablet and mobile Screen

  const filterCheck = (children, attribute) => {
    const item = children.value;
    const name = children.name;
    const Check = true;
    const type = attribute.title;
    const manufactorerItem = document.querySelectorAll('input[name="Manufacturer"]');
    for (let i = 0; i < manufactorerItem.length; i++) {
      if (manufactorerItem[i].value === item) {
        manufactorerItem[i].checked = true;
      }
    }

    const unitPriceItem = document.querySelectorAll('input[name="UnitPrice"]');
    for (let i = 0; i < unitPriceItem.length; i++) {
      if (unitPriceItem[i].value === item) {
        unitPriceItem[i].checked = true;
      }
    }

    if (Check) {
      switch (type) {
        case 'Manufacturer':
          if (!filter.manufactorer.includes(item)) {
            setFilter({ ...filter, manufactorer: [...filter.manufactorer, item] });
          }
          break;
        case 'UnitPrice':
          if (!filter.unitPrice.includes(item)) {
            setFilter({ ...filter, unitPrice: [...filter.unitPrice, item] });
          }
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case 'Manufacturer':
          const newManufacturer = filter.manufactorer.filter((e) => e !== item);
          setFilter({ ...filter, manufactorer: newManufacturer });
          break;
        case 'UnitPrice':
          const newUnitPrice = filter.unitPrice.filter((e) => e !== item);
          setFilter({ ...filter, unitPrice: newUnitPrice });
          break;
        default:
          break;
      }
    }
  };

  // Function handle Remove Filter in Tablet and Mobile Screen

  const removeFilter = (item, title) => {
    const value = item;
    const type = title;
    const check = false;
    const manufactorerItem = document.querySelectorAll('input[name="Manufacturer"]');
    for (let i = 0; i < manufactorerItem.length; i++) {
      if (manufactorerItem[i].value === value) {
        manufactorerItem[i].checked = false;
      }
    }
    const UnitPriceItem = document.querySelectorAll('input[name="UnitPrice"]');
    for (let i = 0; i < UnitPriceItem.length; i++) {
      if (UnitPriceItem[i].value === value) {
        UnitPriceItem[i].checked = false;
      }
    }
    const memoryItem = document.querySelectorAll('input[name="Memory"]');
    for (let i = 0; i < memoryItem.length; i++) {
      if (memoryItem[i].value === value) {
        memoryItem[i].checked = false;
      }
    }
    const monitorItem = document.querySelectorAll('input[name="Monitor"]');
    for (let i = 0; i < monitorItem.length; i++) {
      if (monitorItem[i].value === value) {
        monitorItem[i].checked = false;
      }
    }
    const cpuItem = document.querySelectorAll('input[name="CPU"]');
    for (let i = 0; i < cpuItem.length; i++) {
      if (cpuItem[i].value === value) {
        cpuItem[i].checked = false;
      }
    }
    const ramItem = document.querySelectorAll('input[name="RAM"]');
    for (let i = 0; i < ramItem.length; i++) {
      if (ramItem[i].value === value) {
        ramItem[i].checked = false;
      }
    }
    const vgaItem = document.querySelectorAll('input[name="VGA"]');
    for (let i = 0; i < vgaItem.length; i++) {
      if (vgaItem[i].value === value) {
        vgaItem[i].checked = false;
      }
    }
    const haskDiskItem = document.querySelectorAll('input[name="HardDisk"]');
    for (let i = 0; i < haskDiskItem.length; i++) {
      if (haskDiskItem[i].value === value) {
        haskDiskItem[i].checked = false;
      }
    }
    const batteryItem = document.querySelectorAll('input[name="Battery"]');
    for (let i = 0; i < batteryItem.length; i++) {
      if (batteryItem[i].value === value) {
        batteryItem[i].checked = false;
      }
    }
    const demandItem = document.querySelectorAll('input[name="demand"]');
    for (let i = 0; i < demandItem.length; i++) {
      if (demandItem[i].value === value) {
        demandItem[i].checked = false;
      }
    }
    if (check === false) {
      switch (type) {
        case 'Manufactorer':
          const newManufacturer = filter.manufactorer.filter((e) => e !== item);
          setFilter({ ...filter, manufactorer: newManufacturer });
          break;
        case 'UnitPrice':
          const newUnitPrice = filter.unitPrice.filter((e) => e !== item);
          setFilter({ ...filter, unitPrice: newUnitPrice });
          break;
        case 'Memory':
          const newMemory = filter.memory.filter((e) => e !== item);
          setFilter({ ...filter, memory: newMemory });
          break;
        case 'Monitor':
          const newMonitor = filter.monitor.filter((e) => e !== item);
          setFilter({ ...filter, monitor: newMonitor });
          break;
        case 'CPU':
          const newCPU = filter.cpu.filter((e) => e !== item);
          setFilter({ ...filter, cpu: newCPU });
          break;
        case 'RAM':
          const newRAM = filter.ram.filter((e) => e !== item);
          setFilter({ ...filter, ram: newRAM });
          break;
        case 'VGA':
          const newVGA = filter.vga.filter((e) => e !== item);
          setFilter({ ...filter, vga: newVGA });
          break;
        case 'HardDisk':
          const newHarkDisk = filter.haskdisk.filter((e) => e !== item);
          setFilter({ ...filter, haskdisk: newHarkDisk });
          break;
        case 'Battery':
          const newBattery = filter.battery.filter((e) => e !== item);
          setFilter({ ...filter, battery: newBattery });
          break;
        case 'demand':
          const newDemand = filter.demand.filter((e) => e !== item);
          setFilter({ ...filter, demand: newDemand });
          break;
        default:
      }
    }
  };
  const [itemFilter, setItemFilter] = useState([]);

  // Function handle Update Product depend on filter state

  const updateProducts = useCallback(() => {
    let temp = item;

    if (filter.manufactorer.length > 0) {
      temp = temp.filter((e) => filter.manufactorer.includes(e.manufacturer));
    }
    else if (filter.manufactorer.length == 0){
      temp = item
    }
    if (filter.ram.length > 0) {
      temp = temp.filter((e) => filter.ram.includes(e.ram));
    }
    if (filter.haskdisk.length > 0) {
      temp = temp.filter((e) => filter.haskdisk.includes(e.hardDisk));
    }
    if (filter.vga.length > 0) {
      temp = temp.filter((e) => filter.vga.includes(e.vga));
    }
    if (filter.demand.length > 0) {
      temp = temp.filter((e) => filter.demand.includes(e.demand));
    }
    if (filter.cpu.length > 0) {
      temp = temp.filter((e) => {
        for (var i = 0; i < filter.cpu.length; i++) {
          if (e?.cpu?.includes(filter.cpu[i])) {
            return temp;
          }
        }
      });
    }
    if (filter.monitor.length > 0) {
      temp = temp.filter((e) => {
        for (var i = 0; i < filter.monitor.length; i++) {
          if (
            e?.monitor?.slice(0, 3) > filter.monitor[i].slice(0, 2) &&
            e?.monitor?.slice(0, 3) <= filter.monitor[i].slice(5, 8)
          ) {
            return temp;
          }
        }
      });
    }
    if (filter.memory.length > 0) {
      temp = temp.filter((e) => {
        for (var i = 0; i < filter.memory.length; i++) {
          const startMemory = filter.memory[i].match(/\d+/g).map(Number)[0];
          const endMemory = filter.memory[i].match(/\d+/g).map(Number)[1];
          if (e?.memory?.slice(0, 3) > startMemory && e?.memory?.slice(0, 3) <= endMemory) {
            return temp;
          }
        }
      });
    }
    if (filter.battery.length > 0) {
      temp = temp.filter((e) => {
        for (var i = 0; i < filter.battery.length; i++) {
          const startPrice = filter.battery[i].match(/\d+/g).map(Number)[0];
          const endPrice = filter.battery[i].match(/\d+/g).map(Number)[1];
          if (e?.battery?.slice(0, 4) > startPrice && e?.battery?.slice(0, 4) <= endPrice) {
            return temp;
          }
        }
      });
    }
    if (filter.unitPrice.length > 0) {
      temp = temp.filter((e) => {
        for (var i = 0; i < filter.unitPrice.length; i++) {
          const startPrice = filter.unitPrice[i].match(/\d+/g).map(Number)[0];
          const endPrice = filter.unitPrice[i].match(/\d+/g).map(Number)[1];
          if (e?.discount != null){
            if ((e?.unitPrice - (e?.unitPrice * (e?.discount/100))) > startPrice && e?.unitPrice <= endPrice) {
              return temp;
            }
          }
          else{
            if (e?.unitPrice > startPrice && e?.unitPrice <= endPrice) {
              return temp;
            }
          }
        }
      });
    }
    setProduct(temp);
  },[filter]);

  useEffect(() => {
    updateProducts();
  }, [filter]);

  // useEffect(() => {
  //   handleSortFilter();
  // }, [filter])
  const cart = useSelector((state) => state.cart);

  const handleOpenMenu = (attribute) => {
    const nameItem = attribute.title;
    const menuItem = document.querySelector(`.item__attribute__${nameItem}`);
    const OpenIcon = document.querySelector(`span.plusIcon__${nameItem}`);
    const CloseIcon = document.querySelector(`span.closeIcon__${nameItem}`);
    if (menuItem.classList.contains('d-none')) {
      menuItem.classList.remove('d-none');
      OpenIcon.classList.add('d-none');
      CloseIcon.classList.remove('d-none');
    } else {
      menuItem.classList.add('d-none');
      OpenIcon.classList.remove('d-none');
      CloseIcon.classList.add('d-none');
    }
  };

  //   Function handle Open Menu With Tablet
  const handleOpenMenuSelect = () => {
    const menuTablet = document.querySelector('.menuTablet');
    const overlayItem = document.querySelector('.overlay__menuTablet');
    if (menuTablet.classList.contains('d-none')) {
      menuTablet.classList.remove('d-none');
      overlayItem.classList.remove('d-none');
    } else {
      menuTablet.classList.add('d-none');
      overlayItem.classList.add('d-none');
    }
  };

  const [checkedItem, setCheckedItem] = useState(true);

  const type = Catagory.filter((item) => item.slug === slug);

  const catagoryID = type[0].CategoryID;

  const CountProduct = () => {
    let count = 0;
    for (let i = 0; i < product.length; i++) {
      if (product[i].categoryID == catagoryID) {
        count = count + 1;
      }
    }
    return count;
  };

  // State ProductLength of every type
  const [productLength, setProductLength] = useState(CountProduct());

  useEffect(() => {
    setProductLength(CountProduct());
  }, [CountProduct]);

  // Function handle Change Checked when change screen
  useEffect(() => {
    const manufactorerItem = document.querySelectorAll('input[name="Manufacturer"]');
    for (let i = 0; i < manufactorerItem.length; i++) {
      if (filter.manufactorer.includes(manufactorerItem[i].value)) {
        manufactorerItem[i].checked = true;
      } else {
        manufactorerItem[i].checked = false;
      }
    }

    // Change UnitPrice Checked State
    const UnitPriceItem = document.querySelectorAll('input[name="UnitPrice"]');
    for (let i = 0; i < UnitPriceItem.length; i++) {
      if (filter.unitPrice.includes(UnitPriceItem[i].value)) {
        UnitPriceItem[i].checked = true;
      } else {
        UnitPriceItem[i].checked = false;
      }
    }
    // Change Memory Checked State
    const memoryItem = document.querySelectorAll('input[name="Memory"]');
    for (let i = 0; i < memoryItem.length; i++) {
      if (filter.memory.includes(memoryItem[i].value)) {
        memoryItem[i].checked = true;
      } else {
        memoryItem[i].checked = false;
      }
    }

    // Change Monitor Checked State
    const monitorItem = document.querySelectorAll('input[name="Monitor"]');
    for (let i = 0; i < monitorItem.length; i++) {
      if (filter.monitor.includes(monitorItem[i].value)) {
        monitorItem[i].checked = true;
      } else {
        monitorItem[i].checked = false;
      }
    }

    // Change CPU Checked State
    const cpuItem = document.querySelectorAll('input[name="CPU"]');
    for (let i = 0; i < cpuItem.length; i++) {
      if (filter.cpu.includes(cpuItem[i].value)) {
        cpuItem[i].checked = true;
      } else {
        cpuItem[i].checked = false;
      }
    }

    // Change RAM Checked State
    const ramItem = document.querySelectorAll('input[name="RAM"]');
    for (let i = 0; i < ramItem.length; i++) {
      if (filter.ram.includes(ramItem[i].value)) {
        ramItem[i].checked = true;
      } else {
        ramItem[i].checked = false;
      }
    }

    // Change VGA Checked State
    const vgaItem = document.querySelectorAll('input[name="VGA"]');
    for (let i = 0; i < vgaItem.length; i++) {
      if (filter.vga.includes(vgaItem[i].value)) {
        vgaItem[i].checked = true;
      } else {
        vgaItem[i].checked = false;
      }
    }

    // Change HaskDisk Checked State
    const haskDiskItem = document.querySelectorAll('input[name="HardDisk"]');
    for (let i = 0; i < haskDiskItem.length; i++) {
      if (filter.haskdisk.includes(haskDiskItem[i].value)) {
        haskDiskItem[i].checked = true;
      } else {
        haskDiskItem[i].checked = false;
      }
    }

    // Change Battery Checked State
    const batteryItem = document.querySelectorAll('input[name="Battery"]');
    for (let i = 0; i < batteryItem.length; i++) {
      if (filter.battery.includes(batteryItem[i].value)) {
        batteryItem[i].checked = true;
      } else {
        batteryItem[i].checked = false;
      }
    }

    // Change Demand Checked State
    const demandItem = document.querySelectorAll('input[name="demand"]');
    for (let i = 0; i < demandItem.length; i++) {
      if (filter.demand.includes(demandItem[i].value)) {
        demandItem[i].checked = true;
      } else {
        demandItem[i].checked = false;
      }
    }
  }, [filterSelect, filterCheck]);

  const AddToCartHandle = (products) => {
    let productPrice = products.unitPrice
    if (products.discount != null){
    productPrice = products.unitPrice - (products.unitPrice * (products.discount / 100)) 
    }
    const updatedProduct = {...products, unitPrice: productPrice};
    dispatch(addToCart(updatedProduct))
  }
  return (
    <div
      className='container-fluid col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12'
      style={{ backgroundColor: '#f1f0f1' }}>
      <div className='catagory'>
        {Catagory.map((catagory, idx) => {
          if (catagory.slug === slug) {
            return (
              <h6 key={idx}>
                <Link to={'/'}>Trang chủ</Link> / {catagory.nameCatalogory}
              </h6>
            );
          }
        })}
        {
            (loadingProduct) ? (
              <Skeleton active />
            ) : (
              <>
                <div
                  className='slider'
                  style={{ minHeight: '240px' }}>
                  <Slider {...settings}>
                    {slides.map((slide, idx) => {
                      return (
                        <div
                          style={{ borderRadius: '10px', border: '1px solid #d5d5d5' }}
                          key={idx}>
                          <img
                            src={slide}
                            alt=''
                            style={{ width: '100%', minHeight: '240px' }}
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
                <div
                  className='tablet'
                  style={{ display: 'flex', padding: '2rem 0' }}>
                  <div
                    className='catagory__container col-lg-3 col-md-4'
                    style={{ paddingTop: '1rem' }}>
                    {Catagory.map((catalog, idx) => {
                      if (catalog.slug === slug) {
                        return catalog.attribute.map((attribute, key) => {
                          return (
                            <div
                              className='catagory__container--item'
                              key={key}>
                              <h5>{attribute.name}</h5>
                              <ul>
                                {attribute?.childrend.map((children, key) => {
                                  return (
                                    <li key={key}>
                                      <input
                                        type='checkbox'
                                        checked={children.check}
                                        name={attribute.title}
                                        value={children.value}
                                        onChange={(e) => filterSelect(attribute.title, e)}
                                      />
                                      <p>{children.name}</p>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        });
                      }
                    })}
                  </div>
                  <div className='catagory__container--tablet col-sm-12 col-md-12 col-12'>
                    <h3 className='select__item--title'>Hãng sản xuất</h3>
                    <div className='select__item'>
                      {Catagory.map((catalog, key) => {
                        if (catalog.slug === slug) {
                          return catalog.attribute.map((attribute, key) => {
                            if (attribute.title === 'Manufacturer') {
                              return attribute.childrend.map((children, key) => {
                                return (
                                  <div
                                    className='select__item--child'
                                    onClick={() => filterCheck(children, attribute)}
                                    key={key}>
                                    <img
                                      src={children.image}
                                      alt=''
                                    />
                                  </div>
                                );
                              });
                            }
                          });
                        }
                      })}
                    </div>
                  </div>
                  <div className='catagory__container--tablet col-sm-12 col-md-12 col-12 pb-3'>
                    <h4 className='select__item--title'>Mức Giá</h4>
                    <div className='select__item'>
                      {Catagory.map((catalog, key) => {
                        if (catalog.slug === slug) {
                          return catalog.attribute.map((attribute, key) => {
                            if (attribute.title === 'UnitPrice') {
                              return attribute.childrend.map((children, key) => {
                                return (
                                  <div
                                    className='select__item--child'
                                    key={key}>
                                    <span
                                      onClick={() => filterCheck(children, attribute)}
                                      style={{ whiteSpace: 'nowrap' }}>
                                      {children.name}
                                    </span>
                                  </div>
                                );
                              });
                            }
                          });
                        }
                      })}
                    </div>
                  </div>
                  <div className='catagory__container--tablet col-sm-12 col-md-12 col-12 pb-3'>
                    <div className='container__tablet-sort'>
                      <button className='container__tablet--sort'>
                        <span>Sắp xếp</span>
                        <HiSelector />
                      </button>
                      <button
                        className='container__tablet--feature'
                        onClick={() => handleOpenMenuSelect()}>
                        <span>Tính năng</span>
                        <AiFillFilter />
                      </button>
                    </div>
                  </div>
                  <div className='menuTablet d-none'>
                    <ul className='menuTablet__item'>
                      <li className='menuTablet__item--child'>
                        <img
                          src={Logo}
                          alt=''
                        />
                        <i onClick={() => handleOpenMenuSelect()}>
                          <AiOutlineClose />
                        </i>
                      </li>
                      {Catagory.map((catagory, key) => {
                        if (catagory.slug === slug) {
                          return catagory.attribute.map((attribute, idx) => {
                            return (
                              <div
                                className='menuTablet__container'
                                key={idx}>
                                <li
                                  className='menuTablet__item--child'
                                  key={key}>
                                  <p>{attribute.name}</p>
                                  <span
                                    className={`plusIcon__${attribute.title}`}
                                    onClick={() => handleOpenMenu(attribute)}>
                                    <AiOutlinePlus />
                                  </span>
                                  <span
                                    className={`closeIcon__${attribute.title} d-none`}
                                    onClick={() => handleOpenMenu(attribute)}>
                                    <MdOutlineRemove />
                                  </span>
                                </li>
                                <ul
                                  className={`item__child--select d-none item__attribute__${attribute.title}`}>
                                  {attribute?.childrend.map((children, key) => {
                                    return (
                                      <li key={key}>
                                        <input
                                          type='checkbox'
                                          checked={children.check}
                                          name={attribute.title}
                                          value={children.value}
                                          onChange={(e) => filterSelect(attribute.title, e)}
                                        />
                                        <p>{children.name}</p>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          });
                        }
                      })}
                    </ul>
                    <div className='actions__menu'>
                      <button
                        className='search'
                        onClick={() => handleOpenMenuSelect()}>
                        Áp dụng
                      </button>
                      <button
                        className='resetOption'
                        onClick={() => setFilter(initFilter)}>
                        Thiết Lập Lại
                      </button>
                    </div>
                  </div>
                  <div
                    className='overlay__menuTablet d-none'
                    onClick={() => handleOpenMenuSelect()}></div>
                  <div className='catagory__container--tablet col-sm-12 col-md-12 col-12 pb-3'>
                    <div className='container__item--filter'>
                      {filter.manufactorer.length > 0 ||
                      filter.unitPrice.length > 0 ||
                      filter.memory.length > 0 ||
                      filter.monitor.length > 0 ||
                      filter.cpu.length > 0 ||
                      filter.ram.length > 0 ||
                      filter.vga.length > 0 ||
                      filter.haskdisk.length > 0 ||
                      filter.battery.length > 0 ||
                      filter.demand.length > 0 ? (
                        <div className='item__filter'>
                          Lọc theo:
                          {filter.manufactorer.map((item) => {
                            return Catagory.map((catagory, idx) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'Manufacturer') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'Manufactorer')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.unitPrice.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'UnitPrice') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'UnitPrice')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.memory.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'Memory') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'Memory')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.monitor.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'Monitor') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'Monitor')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.cpu.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'CPU') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'CPU')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.ram.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'RAM') {
                                      return attribute.childrend.map((children, idx) => {
                                        if (children.value === item) {
                                          return (
                                            <div
                                              className='item__filter--contain'
                                              key={idx}>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'RAM')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.vga.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'VGA') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'VGA')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.haskdisk.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'HardDisk') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'HardDisk')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.battery.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'Battery') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'Battery')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                          {filter.demand.map((item) => {
                            return Catagory.map((catagory) => {
                              {
                                if (catagory.slug === slug) {
                                  return catagory.attribute.map((attribute) => {
                                    if (attribute.title === 'demand') {
                                      return attribute.childrend.map((children) => {
                                        if (children.value === item) {
                                          return (
                                            <div className='item__filter--contain'>
                                              <span>{children.name}</span>
                                              <i onClick={() => removeFilter(item, 'demand')}>
                                                <AiOutlineClose />
                                              </i>
                                            </div>
                                          );
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          })}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='catagory__item col-lg-9 col-md-12 col-sm-12'>
                    <div className='catagory__item--title'>
                      {Catagory.map((catagory, key) => {
                        if (catagory.slug === slug) {
                          return (
                            <div key={key}>
                              <h3>{catagory.nameCatalogory}</h3>
                              <span>({productLength} sản phẩm)</span>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className='catagory__item--container col-lg-12 col-md-12 col-sm-12'>
                      <div className='catagory__item--container--item'>
                        <span>Sản phẩm dành cho bạn</span>
                        <select
                          value={value}
                          onChange={handleChange}
                          style={{
                            position: 'absolute',
                            right: '0%',
                            padding: '5px 20px',
                            border: '1px solid #d5d5d5',
                            borderRadius: '5px',
                            margin: '0 15px',
                          }}>
                          <option value='DEFAULT'>Tất cả</option>
                          <option value='1'>Theo tên từ A - Z</option>
                          <option value='2'>Sắp xếp theo giá giảm dần</option>
                        </select>
                      </div>
                      <div className='catagory__item--container--child'>
                        <Col
                          lg={12}
                          md={12}
                          sm={12}
                          className='container__item--child'>
                          {product.length > 0 ? (
                            filterItem === 'Tất cả' ? (
                              product.map((item, key) => {
                                if (item.categoryID === catagoryId) {
                                  return (
                                    <div
                                      className='item--child--contains  col-lg-4 col-md-4 col-sm-6 col-6'
                                      key={key}>
                                      <Link to={`/${item.slug}`}>
                                        <div className='child--contains--img'>
                                          <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                        </div>
                                        <div className='contains--title'>
                                          <h3>{item.name}</h3>
                                          <div className='child--contains--price'>
                                            <div>
                                              <span className='contains--price--discount'>
                                                {
                                                  (item.discount) ? (
                                                    <del>{formatProductPrice(item.unitPrice)}</del>
                                                  ) : (<del style={{color: "#f1f2f1"}}>{formatProductPrice(item.unitPrice)}</del>)
                                                }
                                              </span>
                                              <h4 className='contains--price-unit'>
                                              {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                              </h4>
                                            </div>
                                            {
                                              (item.discount) ? (
                                                <div className='contains--price-pecent'>
                                                  <p>{item.discount}%</p>
                                                </div>
                                              ) : ("")
                                            }
                                          </div>
                                        </div>
                                      </Link>
                                      <div className='child--contains--action'>
                                        <Link
                                          to={`/${item.slug}`}
                                          className='button'>
                                          <button className='contains--action--buy'>Mua Hàng</button>
                                        </Link>
                                        <Link
                                          
                                          className='button'>
                                          <button
                                            className='contains--action-addcart'
                                            onClick={() => AddToCartHandle(item)}>
                                            Giỏ Hàng
                                          </button>
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                }
                              })
                            ) : filterItem === 'Theo tên từ A - Z' ? (
                              product.map((item, key) => {
                                if (item.categoryID === catagoryId) {
                                  return (
                                    <div
                                      className='item--child--contains col-lg-4 col-md-6 col-sm-6 col-12 '
                                      key={key}>
                                      <Link to={`/${item.slug}`}>
                                        <div className='child--contains--img'>
                                          <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                        </div>
                                        <h3>{item.name}</h3>
                                        <div className='child--contains--price'>
                                            <div>
                                              <span className='contains--price--discount'>
                                                {
                                                  (item.discount) ? (
                                                    <del>{formatProductPrice(item.unitPrice)}</del>
                                                  ) : (<del style={{color: "#f1f2f1"}}>{formatProductPrice(item.unitPrice)}</del>)
                                                }
                                              </span>
                                              <h4 className='contains--price-unit'>
                                                {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                              </h4>
                                            </div>
                                            {
                                              (item.discount) ? (
                                                <div className='contains--price-pecent'>
                                                  <p>{item.discount}%</p>
                                                </div>
                                              ) : ("")
                                            }
                                          </div>
                                      </Link>
                                      <div className='child--contains--action'>
                                        <Link
                                          to={`/${item.slug}`}
                                          className='button'>
                                          <button className='contains--action--buy'>Mua Hàng</button>
                                        </Link>
                                        <Link
                                          
                                          className='button'>
                                          <button
                                            className='contains--action-addcart'
                                            onClick={() => AddToCartHandle(item)}>
                                            Giỏ Hàng
                                          </button>
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                }
                              })
                            ) : (
                              <div className='not-found-item'>
                              <img
                                src={NotFoundItem}
                                alt=''
                              />
                              <p>Rất tiếc chúng tôi không tìm thấy kết quả theo yêu cầu của bạn.</p>
                              <span>Vui lòng thử lại .</span>
                              {/* <img className='temp' src={NotFoundItem2} alt="" /> */}
                            </div>
                            )
                          ) : (
                            <div className='not-found-item'>
                              <img
                                src={NotFoundItem}
                                alt=''
                              />
                              <p>Rất tiếc chúng tôi không tìm thấy kết quả theo yêu cầu của bạn.</p>
                              <span>Vui lòng thử lại .</span>
                              {/* <img className='temp' src={NotFoundItem2} alt="" /> */}
                            </div>
                          )}
                        </Col>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
        }
      </div>
    </div>
  );
};

export default Menu;
