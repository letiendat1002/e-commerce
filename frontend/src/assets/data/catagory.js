const Catagory = [
    {
        CategoryID : '3',
        nameCatalogory: 'Máy tính bảng', 
        slug: 'may-tinh-bang',
        attribute: [
            {
                name: 'Hãng sản xuất',
                title: "Manufacturer",
                childrend: [
                    {
                        name: 'Samsung', 
                        value: 'Samsung', 
                        slug: 'samsung', 
                        image: require('../images/samsung.webp')
                    }, 
                    {
                        name: 'Lenovo', 
                        value: 'Lenovo', 
                        slug: 'lenovo',
                        image:require('../images/lenovo.png')
                    }, 
                    {
                        name: 'Coolpad', 
                        value: 'Coolpad', 
                        slug: 'coolpad', 
                        image: require('../images/coolpad.png')
                    }, 
                    {
                        name: 'Apple', 
                        value: 'Apple', 
                        slug: 'apple', 
                        image: require('../images/iphone.webp')
                    }, 
                    {
                        name: 'Masstel', 
                        value: 'Masstel', 
                        slug: 'masstel', 
                        image: require('../images/masstel.png')
                    }, 
                    {
                        name: 'Xiaomi', 
                        value: 'Xiaomi', 
                        slug: 'xiaomi', 
                        image: require('../images/redmi.webp')
                    }, 
                    {
                        name: 'Oppo',
                        value: 'OPPO',
                        slug: 'oppo', 
                        image: require('../images/oppo.webp')
                    }
                ]
            }, 
            {
                name: 'Mức giá',  
                title: "UnitPrice",
                childrend: [
                    {
                        name: 'Tất cả', 
                        value: '0-50000000', 
                        slug: 'all', 
                    },
                    {
                        name: 'Dưới 3 triệu', 
                        value: '0-2999999', 
                        slug: 'duoi-3-trieu'
                    }, 
                    {
                        name: 'từ 3 - 8 triệu', 
                        value: '3000000-7999999', 
                        slug: 'tu-3-den-8-trieu'
                    }, 
                    {
                        name: 'Từ 8 - 15 triệu', 
                        value: '8000000-15000000', 
                        slug: 'tu-8-den-15-trieu'
                    }, 
                    {
                        name: 'Từ 15 - 20 triệu',
                        value: '15000000-20000000',
                        slug: 'tu-15-den-20-trieu'
                    },
                    {
                        name: 'Từ 20 - 30 triệu',
                        value: '20000000-30000000',
                        slug: 'tu-20-den-30-trieu'
                    },
                    {
                        name: 'Trên 30 triệu',
                        value: '30000000-50000000',
                        slug: 'tren-30-trieu'
                    },
                ]
            },
            {
                name: 'Dung lượng',  
                title: "Memory",
                childrend: [
                    {
                        name: 'Tất cả',
                        value: '0 - 512',
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 64 gb', 
                        value: '0 - 64', 
                        slug: 'duoi-64-gb'
                    }, 
                    {
                        name: 'Từ 64 - 256 gb', 
                        value: '64 - 256', 
                        slug: 'tu-64-den-256-gb'
                    }, 
                    {
                        name: 'Trên 256gb', 
                        value: '256 - 512', 
                        slug: 'tren-256-gb'
                    }
                ]
            },
            {
                name: 'Màn hình',  
                title: "Monitor",
                childrend: [
                    {
                        name: 'Tất cả',
                        value: '00 - 20',
                        slug: 'all'
                    }, 
                    {
                        name: 'Khoảng 7 - 8 inch', 
                        value: '07 - 08', 
                        slug: 'khoang-7-8-inch'
                    }, 
                    {
                        name: 'Khoảng 8 - 10 inch', 
                        value: '08 - 10', 
                        slug: 'khoang-7-8-inch'
                    }, 
                    {
                        name: 'Khoảng 10 - 11 inch', 
                        value: '10 - 11', 
                        slug: 'khoang-10-11-inch'
                    }, 
                    {
                        name: 'Khoảng 12 inch trở lên', 
                        value: '12 - 20', 
                        slug: 'khoang-12-inch-tro-len'
                    }
                ]
            },
        ]
    }, 
    {
        CategoryID : '1',
        nameCatalogory: 'Laptop', 
        slug: 'laptop', 
        attribute: [
            {
                name: 'Hãng sản xuất',
                title: "Manufacturer",
                childrend: [
                    {
                        name: 'Asus', 
                        value: 'Asus', 
                        slug: 'Asus', 
                        image: require('../images/asus.webp')
                    }, 
                    {
                        name: 'Lenovo', 
                        value: 'Lenovo', 
                        slug: 'lenovo',
                        image: require('../images/lenovo.png')
                    }, 
                    {
                        name: 'Gigabyte', 
                        value: 'Gigabyte', 
                        slug: 'gigabyte',
                        image: require('../images/gigabyte.png')
                    }, 
                    {
                        name: 'Acer', 
                        value: 'Acer', 
                        slug: 'acer',
                        image: require('../images/acre.webp')
                    }, 
                    {
                        name: 'Apple', 
                        value: 'Apple', 
                        slug: 'apple',
                        image: require('../images/apple.png')
                    }, 
                    {
                        name: 'HP', 
                        value: 'HP', 
                        slug: 'hp',
                        image: require('../images/hp.webp')
                    }, 
                    {
                        name: 'DELL',
                        value: 'DELL',
                        slug: 'dell',
                        image: require('../images/dell.webp')
                    },
                    {
                        name: 'MSI',
                        value: 'MSI',
                        slug: 'MSI',
                        image: require('../images/msi.png')
                    }
                ]
            }, 
            {
                name: 'Mức giá',
                title: 'UnitPrice',
                childrend: [
                    {
                        name: 'Tất cả', 
                        value: '0-100000000', 
                        slug: 'all', 
                    }, 
                    {
                        name: 'Dưới 2 triệu', 
                        value: '0-1999999', 
                        slug: 'duoi-2-trieu', 
                    }, 
                    {
                        name: 'Từ 10 đến 15 triệu', 
                        value: '10000000-14999999', 
                        slug: 'tu-10-den-15-trieu'
                    }, 
                    {
                        name: 'Từ 15 đến 20 triệu', 
                        value: '15000000-19999999', 
                        slug: 'tu-15-den-20-trieu'
                    }, 
                    {
                        name: 'Từ 20 đến 25 triệu', 
                        value: '20000000-24999999', 
                        slug: 'tu-20-den-25-trieu'
                    }, 
                    {
                        name: 'Trên 25 triệu', 
                        value: '25000000-100000000', 
                        slug: 'tren-25-trieu'
                    }
                ]
            },
            {
                name: 'Màn hình',
                title: "Monitor",
                childrend: [
                    {
                        name: 'Tất cả', 
                        value: "00 - 20", 
                        slug: 'all'
                    }, 
                    {
                        name: 'Khoảng 13 inch', 
                        value: '00 - 13', 
                        slug: 'Khoang-13-inch'
                    }, 
                    {
                        name: 'Khoảng 14 inch', 
                        value: '00 - 14', 
                        slug: 'khoang-14-inch'
                    }, 
                    {
                        name: 'Khoảng 15 inch', 
                        value: '00 - 15', 
                        slug: 'khoang-14-inch'
                    }, 
                    {
                        name: 'Trên 15 inch', 
                        value: '15 - 20', 
                        slug: 'tren-15-inch'
                    }, 
                ]
            },
            {
                name: 'CPU',
                title: "CPU",
                childrend: [
                    {
                        name: 'Intel celeron', 
                        value: 'Intel celeron', 
                        slug: 'intel-celeron'
                    }, 
                    {
                        name: 'Intel pentium', 
                        value: 'Intel pentium', 
                        slug: 'intel-pentium'
                    }, 
                    {
                        name: 'Intel core i3', 
                        value: 'Intel core i3', 
                        slug: 'intel-core-i3'
                    }, 
                    {
                        name: 'Intel core i5', 
                        value: 'Intel core i5', 
                        slug: 'intel-core-i5'
                    }, 
                    {
                        name: 'Intel core i7', 
                        value: 'Intel core i7', 
                        slug: 'intel-core-i7'
                    }, 
                    {
                        name: 'Amd ryzen 3', 
                        value: 'Amd ryzen 3', 
                        slug: 'amd-ryzen-3'
                    }, 
                    {
                        name: 'Amd ryzen 5', 
                        value: 'Amd ryzen 5', 
                        slug: 'amd-ryzen-5'
                    }, 
                    {
                        name: 'Amd ryzen 7', 
                        value: 'Amd ryzen 7', 
                        slug: 'amd-ryzen-7'
                    }, 
                    {
                        name: 'Amd ryzen 9', 
                        value: 'Amd ryzen 9', 
                        slug: 'amd-ryzen-9'
                    }, 
                    {
                        name: 'Apple M1', 
                        value: 'Apple M1', 
                        slug: 'apple-m1',
                    },
                    {
                        name: 'Apple M2', 
                        value: 'Apple M2', 
                        slug: 'apple-m2',
                    },
                ]
            },
            {
                name: 'RAM',
                title: "RAM",
                childrend: [
                    {
                        name: '4gb', 
                        value: '4 GB', 
                        slug: '4gb'
                    }, 
                    {
                        name: '8 gb', 
                        value: '8 GB', 
                        slug: '8gb'
                    }, 
                    {
                        name: '16 gb', 
                        value: '16 GB', 
                        slug: '16gb'
                    }, 
                    {
                        name: '32 gb', 
                        value: '32 GB', 
                        slug: '32gb'
                    }, 
                ]
            },
            {
                name: 'Card đồ họa',
                title: "VGA",
                childrend: [
                    {
                        name: 'Nvidia geforce series', 
                        value: 'NVIDIA', 
                        slug: 'Nvidia-geforce-series'
                    }, 
                    {
                        name: 'Amd radeon series', 
                        value: 'AMD', 
                        slug: 'Amd-radeon-series'
                    }, 
                    {
                        name: 'Card onboard', 
                        value: 'CARD ONBOARD', 
                        slug: 'Card-onboard'
                    }, 
                    {
                        name: 'Apple M1', 
                        value: 'M1', 
                        slug: 'apple-m1',
                    }, 
                    {
                        name: 'Apple M2', 
                        value: 'M2', 
                        slug: 'apple-m2',
                    },
                ]
            },
            {
                name: 'Ổ cứng',
                title: "HardDisk",
                childrend: [
                    {
                        name: 'Ssd 1tb', 
                        value: 'SSD 1 TB', 
                        slug: 'ssd-1tb'
                    }, 
                    {
                        name: 'Ssd 512gb', 
                        value: 'SSD 512 GB', 
                        slug: 'ssd-512gb'
                    }, 
                    {
                        name: 'Ssd 256gb', 
                        value: 'SSD 256 GB', 
                        slug: 'ssd-256gb'
                    }, 
                    {
                        name: 'Ssd 128gb', 
                        value: 'SSD 128 GB', 
                        slug: 'ssd-128gb'
                    }, 
                ]
            },
        ]
    },
    {
        CategoryID : '2',
        nameCatalogory: 'Điện Thoại', 
        slug: 'dienthoai', 
        attribute: [
            {
                name: 'Hãng sản xuất',
                title: "Manufacturer",
                childrend: [
                    {
                        name: 'Asus', 
                        value: 'Asus', 
                        slug: 'Asus', 
                        image: require('../images/asus.webp')
                    }, 
                    {
                        name: 'Vivo', 
                        value: 'Vivo', 
                        slug: 'Vivo', 
                        image: require('../images/vivo.webp')
                    }, 
                    {
                        name: 'Samsung', 
                        value: 'Samsung', 
                        slug: 'samsung', 
                        image: require('../images/samsung.webp')
                    }, 
                    {
                        name: 'OPPO', 
                        value: 'OPPO', 
                        slug: 'oppo', 
                        image: require('../images/oppo.webp')
                    }, 
                    {
                        name: 'Redmi', 
                        value: 'Redmi', 
                        slug: 'redmi', 
                        image: require('../images/redmi.webp')
                    }, 
                    {
                        name: 'Apple', 
                        value: 'Apple', 
                        slug: 'apple', 
                        image: require('../images/iphone.webp')
                    }, 
                    {
                        name: 'Nokia', 
                        value: 'Nokia', 
                        slug: 'nokia', 
                        image: require('../images/nokia.webp')
                    }, 
                    {
                        name: 'Realme', 
                        value: 'Realme', 
                        slug: 'realme', 
                        image: require('../images/realme.webp')
                    }, 
                ]
            }, 
            {
                name: 'Mức giá',
                title: "UnitPrice",
                childrend: [
                    {
                        name: 'Tất cả', 
                        value: '0-100000000', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 2 triệu', 
                        value: '0-2000000', 
                        slug: 'duoi-2-trieu'
                    }, 
                    {
                        name: 'Từ 2 đến 4 triệu', 
                        value: '2000000-4000000', 
                        slug: 'tu-2-den-4-trieu'
                    }, 
                    {
                        name: 'Từ 4 đến 7 triệu',
                        value: '4000000-7000000',  
                        slug: 'tu-4-den-7-trieu'
                    }, 
                    {
                        name: 'Từ 7 đến 13 triệu', 
                        value: '7000000-13000000', 
                        slug: 'tu-7-den-13-trieu'
                    }, 
                    {
                        name: 'Từ 13 đến 15 triệu', 
                        value: '13000000-15000000', 
                        slug: 'tu-13-den-15-trieu'
                    },
                    {
                        name: 'Trên 15 triệu', 
                        value: '15000000-30000000', 
                        slug: 'tren-15-trieu'
                    }
                ]
            },
            {
                name: 'Hiệu năng và pin',
                title: "Battery",
                childrend: [
                    {
                        name: 'Tất cả', 
                        value: '0 - 10000', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 3000 mah', 
                        value: '0 - 3000', 
                        slug: 'duoi-3000-mah'
                    }, 
                    {
                        name: 'Từ 3000 đến 4000 mah', 
                        value: '3000 - 4000', 
                        slug: 'tu-3000-4000-mah'
                    }, 
                    {
                        name: 'Từ 4000 đến 5000 mah', 
                        value: '4000 - 5000', 
                        slug: 'tu-4000-den-5000-mah'
                    }, 
                    {
                        name: 'Trên 5000 mah', 
                        value: '5000-10000', 
                        slug: 'tren-5000-mah'
                    }
                ]
            },
            {
                name: 'Màn hình',
                title: "Monitor",
                childrend: [
                    {
                        name: 'Tất cả', 
                        value: '00 - 15', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Màn hình nhỏ: dưới 5.0 inch', 
                        value: '00 - 05', 
                        slug: 'duoi-5-inch'
                    }, 
                    {
                        name: 'Nhỏ gọn vừa tay: dưới 6.0 inch, tràn viền', 
                        value: '05 - 06', 
                        slug: 'duoi-6-inch'
                    }, 
                    {
                        name: 'Trên 6.0 inch', 
                        value: '06 - 15', 
                        slug: 'tren-6-inch'
                    }, 
                    {
                        name: 'Màn hình gập', 
                        slug: 'man-hinh-gap'
                    },  
                ]
            },
        ]
    }, 
    {
        CategoryID : '4', 
        nameCatalogory: "PC Linh Kiện",
        slug: 'pc-linh-kien', 
        attribute: [
            {
                name: "Hãng sản xuất",
                title: 'Manufacturer', 
                childrend: [
                    {
                        name: "E-Power", 
                        value: "E-Power", 
                        slug: 'E-Power', 
                        image: require('../images/e-power.webp')
                    }, 
                    {
                        name: "Apple (iMac)", 
                        value: "Apple (iMac)", 
                        slug: 'Apple', 
                        image: require('../images/imac.webp')
                    }, 
                    {
                        name: "Apple (Mac mini)", 
                        value: "Apple (Mac mini)", 
                        slug: 'Apple',
                        image: require('../images/macmini.webp')
                    }, 
                    {
                        name: "Lenovo", 
                        value: "Lenovo", 
                        slug: 'Lenovo', 
                        image: require('../images/lenovo.png')
                    }, 
                    {
                        name: "Dell", 
                        value: "Dell", 
                        slug: 'Dell', 
                        image: require('../images/dell.webp')
                    }, 
                    {
                        name: "HP", 
                        value: "HP", 
                        slug: 'HP', 
                        image: require('../images/hp.webp')
                    }, 
                    {
                        name: "Asus", 
                        value: "Asus", 
                        slug: 'Asus', 
                        image: require('../images/asus.webp')
                    }, 
                ]
            }, 
            {
                name: "Nhu Cầu", 
                title: 'demand', 
                childrend: [
                    {
                        name: "PC Gaming", 
                        value: "PC Gaming", 
                        slug: "PC-Gaming", 
                    }, 
                    {
                        name: "PC Văn phòng", 
                        value: "PC Văn phòng", 
                        slug: "PC-van-phong"
                    }, 
                    {
                        name: "PC Đồ họa", 
                        value: "PC Đồ họa", 
                        slug: "PC-do-hoa"
                    }, 
                ]
            }, 
            {
                name: 'Mức giá',
                title: 'UnitPrice',
                childrend: [
                    {
                        name: 'Tất cả', 
                        value: '0-100000000', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 10 triệu', 
                        value: '0-10000000', 
                        slug: 'duoi-10-trieu'
                    }, 
                    {
                        name: 'Từ 10 đến 15 triệu', 
                        value: '10000000-14999999', 
                        slug: 'tu-10-den-15-trieu'
                    }, 
                    {
                        name: 'Từ 15 đến 20 triệu', 
                        value: '15000000-19999999', 
                        slug: 'tu-15-den-20-trieu'
                    }, 
                    {
                        name: 'Từ 20 đến 30 triệu', 
                        value: '20000000-30000000', 
                        slug: 'tu-20-den-30-trieu'
                    }, 
                    {
                        name: 'Từ 30 đến 40 triệu', 
                        value: '30000000-40000000', 
                        slug: 'tu-30-den-40-trieu'
                    }, 
                    {
                        name: 'Trên 40 triệu', 
                        value: '40000000-100000000', 
                        slug: 'tren-40-trieu'
                    }, 
                ]
            },
            {
                name: 'CPU',
                title: "CPU",
                childrend: [
                    {
                        name: 'Intel celeron', 
                        value: 'Intel celeron', 
                        slug: 'intel-celeron'
                    }, 
                    {
                        name: 'Intel pentium', 
                        value: 'Intel pentium', 
                        slug: 'intel-pentium'
                    }, 
                    {
                        name: 'Intel core i3', 
                        value: 'Intel core i3', 
                        slug: 'intel-core-i3'
                    }, 
                    {
                        name: 'Intel core i5', 
                        value: 'Intel core i5', 
                        slug: 'intel-core-i5'
                    }, 
                    {
                        name: 'Intel core i7', 
                        value: 'Intel core i7', 
                        slug: 'intel-core-i7'
                    }, 
                    {
                        name: 'Amd ryzen 3', 
                        value: 'Amd ryzen 3', 
                        slug: 'amd-ryzen-3'
                    }, 
                    {
                        name: 'Amd ryzen 5', 
                        value: 'Amd ryzen 5', 
                        slug: 'amd-ryzen-5'
                    }, 
                    {
                        name: 'Amd ryzen 7', 
                        value: 'Amd ryzen 7', 
                        slug: 'amd-ryzen-7'
                    }, 
                    {
                        name: 'Amd ryzen 9', 
                        value: 'Amd ryzen 9', 
                        slug: 'amd-ryzen-9'
                    }, 
                    {
                        name: 'Apple M1', 
                        value: 'Apple M1', 
                        slug: 'apple-m1',
                    },
                    {
                        name: 'Apple M2', 
                        value: 'Apple M2', 
                        slug: 'apple-m2',
                    },
                ]
            },
            {
                name: 'RAM',
                title: "RAM",
                childrend: [
                    {
                        name: '4gb', 
                        value: '4 GB', 
                        slug: '4gb'
                    }, 
                    {
                        name: '8 gb', 
                        value: '8 GB', 
                        slug: '8gb'
                    }, 
                    {
                        name: '16 gb', 
                        value: '16 GB', 
                        slug: '16gb'
                    }, 
                    {
                        name: '32 gb', 
                        value: '32 GB', 
                        slug: '32gb'
                    }, 
                ]
            },
            {
                name: 'Ổ cứng',
                title: "HardDisk",
                childrend: [
                    {
                        name: 'Ssd 1tb', 
                        value: 'SSD 1 TB', 
                        slug: 'ssd-1tb'
                    }, 
                    {
                        name: 'Ssd 512gb', 
                        value: 'SSD 512 GB', 
                        slug: 'ssd-512gb'
                    }, 
                    {
                        name: 'Ssd 256gb', 
                        value: 'SSD 256 GB', 
                        slug: 'ssd-256gb'
                    }, 
                    {
                        name: 'Ssd 128gb', 
                        value: 'SSD 128 GB', 
                        slug: 'ssd-128gb'
                    }, 
                ]
            },
            {
                name: 'Card đồ họa',
                title: "VGA",
                childrend: [
                    {
                        name: 'Nvidia geforce series', 
                        value: 'NVIDIA', 
                        slug: 'Nvidia-geforce-series'
                    }, 
                    {
                        name: 'Amd radeon series', 
                        value: 'AMD', 
                        slug: 'Amd-radeon-series'
                    }, 
                    {
                        name: 'Card onboard', 
                        value: 'CARD ONBOARD', 
                        slug: 'Card-onboard'
                    }, 
                    {
                        name: 'Apple M1', 
                        value: 'M1', 
                        slug: 'apple-m1',
                    }, 
                    {
                        name: 'Apple M2', 
                        value: 'M2', 
                        slug: 'apple-m2',
                    },
                ]
            },
        ]
    }
]

export default Catagory