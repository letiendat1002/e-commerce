const Catagory = [
    {
        CategoryID : '3',
        nameCatalogory: 'Máy tính bảng', 
        slug: 'may-tinh-bang',
        attribute: [
            {
                name: 'Hãng sản xuất',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Samsung', 
                        slug: 'samsung'
                    }, 
                    {
                        name: 'Lenovo', 
                        slug: 'lenovo'
                    }, 
                    {
                        name: 'Coolpad', 
                        slug: 'coolpad'
                    }, 
                    {
                        name: 'Apple', 
                        slug: 'apple'
                    }, 
                    {
                        name: 'Masstel', 
                        slug: 'masstel'
                    }, 
                    {
                        name: 'Xiaomi', 
                        slug: 'xiaomi'
                    }, 
                    {
                        name: 'Oppo',
                        slug: 'oppo'
                    }
                ]
            }, 
            {
                name: 'Mức giá',  
                childrend: [
                    {
                        name: 'Tất cả',
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 3 triệu', 
                        slug: 'duoi-3-trieu'
                    }, 
                    {
                        name: 'từ 3 - 8 triệu', 
                        slug: 'tu-3-den-8-trieu'
                    }, 
                    {
                        name: 'Từ 8 - 15 triệu', 
                        slug: 'tu-8-den-15-trieu'
                    }, 
                    {
                        name: 'Trên 15 triệu',
                        slug: 'tren-15-trieu'
                    }
                ]
            },
            {
                name: 'Dung lượng',  
                childrend: [
                    {
                        name: 'Tất cả',
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 64 gb', 
                        slug: 'duoi-64-gb'
                    }, 
                    {
                        name: 'Từ 64 - 256 gb', 
                        slug: 'tu-64-den-256-gb'
                    }, 
                    {
                        name: 'Trên 256gb', 
                        slug: 'tren-256-gb'
                    }
                ]
            },
            {
                name: 'Màn hình',  
                childrend: [
                    {
                        name: 'Tất cả',
                        slug: 'all'
                    }, 
                    {
                        name: 'Khoảng 7 - 8 inch', 
                        slug: 'khoang-7-8-inch'
                    }, 
                    {
                        name: 'Khoảng 10 - 11 inch', 
                        slug: 'khoang-10-11-inch'
                    }, 
                    {
                        name: 'Khoảng 12 inch trở lên', 
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
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Asus', 
                        slug: 'Asus'
                    }, 
                    {
                        name: 'Lenovo', 
                        slug: 'lenovo'
                    }, 
                    {
                        name: 'Gigabyte', 
                        slug: 'gigabyte'
                    }, 
                    {
                        name: 'Acer', 
                        slug: 'acer'
                    }, 
                    {
                        name: 'Apple', 
                        slug: 'apple'
                    }, 
                    {
                        name: 'HP', 
                        slug: 'hp'
                    }, 
                    {
                        name: 'DELL',
                        slug: 'dell'
                    },
                    {
                        name: 'MSI',
                        slug: 'MSI'
                    }
                ]
            }, 
            {
                name: 'Mức giá',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 2 triệu', 
                        slug: 'duoi-2-trieu'
                    }, 
                    {
                        name: 'Từ 10 đến 15 triệu', 
                        slug: 'tu-10-den-15-trieu'
                    }, 
                    {
                        name: 'Từ 15 đến 20 triệu', 
                        slug: 'tu-15-den-20-trieu'
                    }, 
                    {
                        name: 'Từ 20 đến 25 triệu', 
                        slug: 'tu-20-den-25-trieu'
                    }, 
                    {
                        name: 'Trên 25 triệu', 
                        slug: 'tren-25-trieu'
                    }
                ]
            },
            {
                name: 'Màn hình',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Khoảng 13 inch', 
                        slug: 'Khoang-13-inch'
                    }, 
                    {
                        name: 'Khoảng 14 inch', 
                        slug: 'khoang-14-inch'
                    }, 
                    {
                        name: 'Trên 15 inch', 
                        slug: 'tren-15-inch'
                    }, 
                ]
            },
            {
                name: 'CPU',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Intel celeron', 
                        slug: 'intel-celeron'
                    }, 
                    {
                        name: 'Intel pentium', 
                        slug: 'intel-pentium'
                    }, 
                    {
                        name: 'Intel core i3', 
                        slug: 'intel-core-i3'
                    }, 
                    {
                        name: 'Intel core i5', 
                        slug: 'intel-core-i5'
                    }, 
                    {
                        name: 'Intel core i7', 
                        slug: 'intel-core-i7'
                    }, 
                    {
                        name: 'Amd ryzen 3', 
                        slug: 'amd-ryzen-3'
                    }, 
                    {
                        name: 'Amd ryzen 5', 
                        slug: 'amd-ryzen-5'
                    }, 
                    {
                        name: 'Amd ryzen 7', 
                        slug: 'amd-ryzen-7'
                    }, 
                    {
                        name: 'Amd ryzen 9', 
                        slug: 'amd-ryzen-9'
                    }, 
                ]
            },
            {
                name: 'RAM',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: '4 gb', 
                        slug: '4gb'
                    }, 
                    {
                        name: '8 gb', 
                        slug: '8gb'
                    }, 
                    {
                        name: '16 gb', 
                        slug: '16gb'
                    }, 
                    {
                        name: '32 gb', 
                        slug: '32gb'
                    }, 
                ]
            },
            {
                name: 'Card đồ họa',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Nvidia geforce series', 
                        slug: 'Nvidia-geforce-series'
                    }, 
                    {
                        name: 'Amd radeon series', 
                        slug: 'Amd-radeon-series'
                    }, 
                    {
                        name: 'Card onboard', 
                        slug: 'Card-onboard'
                    }, 
                ]
            },
            {
                name: 'Ổ cứng',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Ssd 1tb', 
                        slug: 'ssd-1tb'
                    }, 
                    {
                        name: 'Ssd 512gb', 
                        slug: 'ssd-512gb'
                    }, 
                    {
                        name: 'Ssd 256gb', 
                        slug: 'ssd-256gb'
                    }, 
                    {
                        name: 'Ssd 128gb', 
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
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Samsung', 
                        slug: 'samsung'
                    }, 
                    {
                        name: 'Xiaomi', 
                        slug: 'xiaomi'
                    }, 
                    {
                        name: 'Asus', 
                        slug: 'asus'
                    }, 
                    {
                        name: 'Apple', 
                        slug: 'apple'
                    }, 
                    {
                        name: 'Nokia', 
                        slug: 'nokia'
                    }, 
                    {
                        name: 'Realme', 
                        slug: 'realme'
                    }, 
                ]
            }, 
            {
                name: 'Mức giá',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 2 triệu', 
                        slug: 'duoi-2-trieu'
                    }, 
                    {
                        name: 'Từ 2 đến 4 triệu', 
                        slug: 'tu-2-den-4-trieu'
                    }, 
                    {
                        name: 'Từ 4 đến 7 triệu', 
                        slug: 'tu-4-den-7-trieu'
                    }, 
                    {
                        name: 'Từ 7 đến 13 triệu', 
                        slug: 'tu-7-den-13-trieu'
                    }, 
                    {
                        name: 'Trên 13 triệu', 
                        slug: 'tren-13-trieu'
                    }
                ]
            },
            {
                name: 'Hiệu năng và pin',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Dưới 3000 mah', 
                        slug: 'duoi-3000-mah'
                    }, 
                    {
                        name: 'Từ 3000 đến 4000 mah', 
                        slug: 'tu-3000-4000-mah'
                    }, 
                    {
                        name: 'Từ 4000 đến 5000 mah', 
                        slug: 'tu-4000-den-5000-mah'
                    }, 
                    {
                        name: 'Trên 5000 mah', 
                        slug: 'tren-5000-mah'
                    }
                ]
            },
            {
                name: 'Màn hình',
                childrend: [
                    {
                        name: 'Tất cả', 
                        slug: 'all'
                    }, 
                    {
                        name: 'Màn hình nhỏ: dưới 5.0 inch', 
                        slug: 'duoi-5-inch'
                    }, 
                    {
                        name: 'Nhỏ gọn vừa tay: dưới 6.0 inch, tràn viền', 
                        slug: 'duoi-6-inch'
                    }, 
                    {
                        name: 'Trên 6.0 inch', 
                        slug: 'tren-6-inch'
                    }, 
                    {
                        name: 'Màn hình gập', 
                        slug: 'man-hinh-gap'
                    },  
                ]
            },
        ]
    }
]

export default Catagory