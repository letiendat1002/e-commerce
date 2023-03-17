import React, { useState, useEffect, useCallback } from 'react'
import Slider from 'react-slick';
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import Item1 from '../../assets/images/item1.webp'
import Item2 from '../../assets/images/item2.webp'
import Item3 from '../../assets/images/item3.webp'
import Item4 from '../../assets/images/item4.webp'
import Item5 from '../../assets/images/item5.webp'
import Item6 from '../../assets/images/item6.webp'
import Item7 from '../../assets/images/item7.webp'
import '../../assets/css/menu.scss'
import '../../assets/css/home.scss'
import {FcPrevious, FcNext} from 'react-icons/fc'
import Catagory from '../../assets/data/catagory';
import Products from '../../assets/data/product';
import {Link, useParams} from 'react-router-dom' 
import formatProductPrice from '../../Helper';

const slides = [
    Item1,
    Item2, 
    Item3,
    Item4,
    Item5,
    Item6,
    Item7,
]

const Menu = ({match, history}) => {

    

    const {slug} = useParams();
    
    const [catagoryId, setCatagoryID] = useState("");

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
    }

    const [product, setProduct] = useState(Products);
    const [filter, setFilter] = useState(initFilter);
    // const [manufactorer, setMenuFactorer] = useState([])
    // const [unitPrice, setUnitPrice] = useState([0]);
    // const [memory, setMemory] = useState([]);
    // const [monitor, setMonitor] = useState([]);
    // const [cpu, setCPU] = useState([]);
    // const [ram, setRAM] = useState([]);
    // const [vga, setVGA] = useState([]);
    // const [hasdDisk, setHardDisk] = useState([]);
    // const [battery, setBattery] = useState([]);
    // const [filterProduct, setFilterProduct] = useState([
    //     manufactorer,
        
    //     // {
    //     //     UnitPrice : unitPrice
    //     // }, 
    //     // {
    //     //     Memory : memory
    //     // }, 
    //     // {
    //     //     Monitor : monitor
    //     // }, 
    //     // {
    //     //     CPU : cpu
    //     // }, 
    //     // {
    //     //     RAM: ram
    //     // }, 
    //     // {
    //     //     VGA: vga
    //     // }, 
    //     // {
    //     //     HardDisk: hasdDisk
    //     // }, 
    //     // {
    //     //     Battery: battery
    //     // }
    // ]);



    useEffect(() => {
        Catagory.map((catagory) => {
            if (catagory.slug === slug){
                setCatagoryID(catagory.CategoryID)
            }
        })
    })

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "linear", 
      };

    // const handleFilter = (e) => {
    //     const item = e.target.value;
    //     const name = e.target.name;
    //     const Checked = e.target.checked;
    //     if (name == "Manufacturer"){
    //         if (Checked){
    //             setMenuFactorer([...manufactorer,item])
    //         }
    //         else {
    //             setMenuFactorer(manufactorer.filter((e) => (e !== item)))
    //         }
    //         // setFilterProduct([...filterProduct,manufactorer])
    //     }
    //     else if (name === "UnitPrice"){
    //         if (Checked){
    //             setUnitPrice([...unitPrice,item])
    //         }
    //         else {
    //             setUnitPrice(unitPrice.filter((e) => (e !== item)))
    //         }
    //         // setFilterProduct([...filterProduct,unitPrice])
    //     }
    //     else if (name === "Memory"){
    //         if (Checked){
    //             setMemory([...memory,item])
    //         }
    //         else {
    //             setMemory(memory.filter((e) => (e !== item)))
    //         }
    //     }
    //     else if (name === "CPU"){
    //         if (Checked){
    //             setCPU([...cpu,item])
    //             // setFilterProduct([...filterProduct, cpu])
    //         }
    //         else {
    //             setCPU(cpu.filter((e) => (e !== item)))
    //             // setFilterProduct(filterProduct.filter((e) => (e !== item)))
    //         }
    //     }
    //     else if (name === "RAM"){
    //         if (Checked){
    //             setRAM([...ram,item])
    //         }
    //         else {
    //             setRAM(ram.filter((e) => (e !== item)))
    //         }
    //     }
    //     else if (name === "VGA"){
    //         if (Checked){
    //             setVGA([...vga,item])
    //         }
    //         else {
    //             setVGA(vga.filter((e) => (e !== item)))
    //         }
    //     }
    //     else if (name === "HardDisk"){
    //         if (Checked){
    //             setHardDisk([...hasdDisk,item])
    //         }
    //         else {
    //             setHardDisk(hasdDisk.filter((e) => (e !== item)))
    //         }
    //     }
    //     else if (name === "Battery"){
    //         if (Checked){
    //             setBattery([...battery,item])
    //         }
    //         else {
    //             setBattery(battery.filter((e) => (e !== item)))
    //         }
    //     }
    //     else if (name === "Monitor"){
    //         if (Checked){
    //             setMonitor([...monitor,item])
    //         }
    //         else {
    //             setMonitor(monitor.filter((e) => (e !== item)))
    //         }
    //     }
    // }

    const filterSelect = (type, e) => {
        const item = e.target.value;
        const name = e.target.name;
        const Checked = e.target.checked;
        if (Checked){
            switch(type){
                case "Manufacturer":
                    setFilter({...filter, manufactorer: [...filter.manufactorer, item]})
                    console.log(item);
                    break
                case "UnitPrice":
                    setFilter({...filter, unitPrice: [...filter.unitPrice, item]})
                    break
                case "Memory":
                    setFilter({...filter, memory: [...filter.memory, item]})
                    break
                case "Monitor":
                    setFilter({...filter, monitor: [...filter.monitor, item]})
                    break
                case "CPU":
                    setFilter({...filter, cpu: [...filter.cpu, item]})
                    break
                case "RAM":
                    setFilter({...filter, ram: [...filter.ram, item]})
                    break
                case "VGA":
                    setFilter({...filter, vga: [...filter.vga, item]})
                    break
                case "HardDisk":
                    setFilter({...filter, haskdisk: [...filter.haskdisk, item]})
                    break
                case "Battery":
                    setFilter({...filter, battery: [...filter.battery, item]})
                    break
                default:
            }
        }
        else{
            switch(type){
                case "Manufacturer":
                    const newManufacturer = filter.manufactorer.filter(e => e !== item)
                    setFilter({...filter, manufactorer: newManufacturer})
                    console.log(item);
                    break
                case "UnitPrice":
                    const newUnitPrice = filter.unitPrice.filter(e => e !== item)
                    setFilter({...filter, unitPrice: newUnitPrice})
                    break
                case "Memory":
                    const newMemory = filter.memory.filter(e => e !== item)
                    setFilter({...filter, memory: newMemory})
                    break
                case "Monitor":
                    const newMonitor = filter.monitor.filter(e => e !== item)
                    setFilter({...filter, monitor: newMonitor})
                    break
                case "CPU":
                    const newCPU = filter.cpu.filter(e => e !== item)
                    setFilter({...filter, cpu: newCPU})
                    break
                case "RAM":
                    const newRAM = filter.ram.filter(e => e !== item)
                    setFilter({...filter, ram: newRAM})
                    break
                case "VGA":
                    const newVGA = filter.vga.filter(e => e !== item)
                    setFilter({...filter, vga: newVGA})
                    break
                case "HardDisk":
                    const newHarkDisk = filter.haskdisk.filter(e => e !== item)
                    setFilter({...filter, haskdisk: newHarkDisk})
                    break
                case "Battery":
                    const newBattery = filter.battery.filter(e => e !== item)
                    setFilter({...filter, battery: newBattery})
                    break
                default:
            }
        }
    }
    const [itemFilter, setItemFilter] = useState([]) 

    const updateProducts = useCallback(
        () => {
            let temp = Products

            if (filter.manufactorer.length > 0) {
                temp = temp.filter(e => filter.manufactorer.includes(e.Manufacturer))
            }
            if (filter.ram.length > 0) {
                temp = temp.filter(e => filter.ram.includes(e.RAM))
            }
            if (filter.haskdisk.length > 0) {
                temp = temp.filter(e => filter.haskdisk.includes(e.HardDisk))
            }
            if (filter.vga.length > 0) {
                temp = temp.filter(e => filter.vga.includes(e.VGA))
            }
            if (filter.cpu.length > 0) {
                // temp = temp.filter(e => e?.CPU?.includes(filter.cpu))
                temp = temp.filter((e) => {
                    for(var i = 0; i < filter.cpu.length; i++ ){
                        if (e?.CPU?.includes(filter.cpu[i])){
                            return temp
                        }
                    }
                })
            }
            if (filter.monitor.length > 0) {
                temp = temp.filter((e) => {
                    for(var i = 0; i < filter.monitor.length; i++ ){
                        if ((e?.Monitor?.slice(0,3) > filter.monitor[i].slice(0,2)) && (e?.Monitor?.slice(0,3) <= filter.monitor[i].slice(5,8))){
                            return temp
                        }
                    }
                })
            }
            if (filter.memory.length > 0) {
                temp = temp.filter((e) => {
                    for(var i = 0; i < filter.memory.length; i++ ){
                        const startMemory = filter.memory[i].match(/\d+/g).map(Number)[0];
                        const endMemory = filter.memory[i].match(/\d+/g).map(Number)[1];
                        if ((e?.Memory?.slice(0,3) > startMemory) && (e?.Memory?.slice(0,3) <= endMemory)){
                            return temp
                        }
                    }
                })
            }
            if (filter.battery.length > 0) {
                temp = temp.filter((e) => {
                    for(var i = 0; i < filter.battery.length; i++ ){
                        const startPrice = filter.battery[i].match(/\d+/g).map(Number)[0];
                        const endPrice = filter.battery[i].match(/\d+/g).map(Number)[1];
                        // console.log(e.Battery.slice(0,4));
                        if ((e?.Battery?.slice(0,4) > startPrice) && (e?.Battery?.slice(0,4) <= endPrice)){
                            return temp
                        }
                    }
                })
            }
            if (filter.unitPrice.length > 0) {
                temp = temp.filter((e) => {
                    for(var i = 0; i < filter.unitPrice.length; i++ ){
                        const startPrice = filter.unitPrice[i].match(/\d+/g).map(Number)[0];
                        const endPrice = filter.unitPrice[i].match(/\d+/g).map(Number)[1];
                        if ((e?.UnitPrice > startPrice) && (e?.UnitPrice <= endPrice)){
                            return temp
                        }
                    }
                })
            }
            

            setProduct(temp)
        },
        [filter, Products],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    console.log(filter);

    return (
        <div className="container-fluid col-lg-12 col-md-12 col-sm-12 col-12" style={{backgroundColor: '#f1f0f1'}}>
            <div className="catagory">
            {
                Catagory.map((catagory, key) => {
                    if (catagory.slug === slug){
                        return (
                            <h6><Link to={'/'}>Trang chủ</Link> / {catagory.nameCatalogory}</h6>
                        )
                    }
                })   
            }
            <div className='slider'>
                <Slider {...settings}>
                    {
                        slides.map((slide, key) => {
                            return (
                                <div style={{borderRadius: '10px', border: '1px solid #d5d5d5'}}>
                                    <img src={slide} alt="" style={{width: '100%'}}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <div style={{display: 'flex', padding: '2rem 0'}}>
                <div className="catagory__container col-lg-3 col-md-4" style={{paddingTop: "1rem"}}>
                {
                        Catagory.map((catalog, key) => {
                            if (catalog.slug === slug){
                                return (
                                    catalog.attribute.map((attribute, key) => {
                                        return (
                                            <div className='catagory__container--item'><h5>{attribute.name}</h5>
                                                <ul>{
                                                    attribute?.childrend.map((children, key) => {
                                                        return (
                                                            <li>
                                                                <input type='checkbox' checked = {children.check} name={attribute.title} value = {children.value} onChange={(e) => filterSelect(attribute.title,e)} />
                                                                {/* <input type='checkbox' checked = {children.check} name={attribute.title} value = {children.value} onChange={(e) => handleFilter(e)} /> */}
                                                                <p>{children.name}</p>
                                                                {/* <p>{children.title}</p> */}
                                                            </li>
                                                        )
                                                    })
                                                }</ul>
                                            </div>
                                        )
                                    })
                                )
                            }
                        })
                    }
                </div>
                <div className="catagory__item col-lg-9">
                    <div className="catagory__item--title">
                    {
                        Catagory.map((catagory, key) => {
                            if (catagory.slug === slug){
                                return (
                                    <h3>{catagory.nameCatalogory} <span>(36 sản phẩm)</span></h3>
                                )
                            }
                        })   
                    }
                    </div>
                    <div className="catagory__item--container col-lg-12 col-md-12 col-sm-12">
                        <div className="catagory__item--container--item">
                            <span>Sản phẩm dành cho bạn</span>
                            <select style={{position: 'absolute', right: '0%', padding: '5px 20px', border: '1px solid #d5d5d5', borderRadius: '5px', margin: '0 15px'}}>
                            <option>Bán chạy nhất</option>
                            <option>Theo tên từ A - Z</option>
                            <option>Sắp xếp theo giá giảm dần</option>
                            </select>
                        </div>
                        <div className="catagory__item--container--child">
                            <Col lg={12} md={12} sm={12} className='container__item--child'>
                                {
                                    product.map((product, key) => {
                                        if (product.CategoryID === catagoryId){
                                            // for(var i = 0; i <= cpu.length; i++){
                                            //     if (product.CPU.includes(cpu[i])){
                                                    return (
                                                        <div className="item--child--contains col-lg-4 col-md-4 col-sm-6 col-12 ">
                                                            <Link to = {product.Slug}><div className="child--contains--img">
                                                                <img src={product.Image} alt="" />
                                                            </div>
                                                            <h3>{product.Name}</h3>
                                                            <div className="child--contains--price">
                                                                <div>
                                                                    <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                                    <h4 className="contains--price-unit">{formatProductPrice(product.UnitPrice)}</h4>
                                                                </div>
                                                                <div className="contains--price-pecent">
                                                                    <p>1%</p>
                                                                </div>
                                                            </div></Link>
                                                            <div className="child--contains--action">
                                                                <button className='contains--action--buy'>Mua Hàng</button>
                                                                <button className='contains--action-addcart'>Thêm Giỏ Hàng</button>
                                                            </div>
                                                        </div>
                                                )   
                                            // }
                                            // }
                                        }
                                    })
                                }
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default Menu