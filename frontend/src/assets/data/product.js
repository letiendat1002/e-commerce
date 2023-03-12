const Products = [
    {
        ProductID: '1',
        CategoryID: '1',
        Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
        Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
        Image: require('../../assets/images/laptop2.webp'),
        Image2: require('../../assets/images/laptop1.webp'),
        Image3: require('../../assets/images/laptop1.webp'),
        Image4: require('../../assets/images/laptop1.webp'),
        Image5: require('../../assets/images/laptop2.webp'),

        UnitPrice: '22.990.000',
        Quantity: 120,
        Description: 'Trong tầm giá rẻ đến bất ngờ, MSI Gaming GF63 Thin 11SC-1090VN là sự lựa chọn tuyệt vời cho game thủ, đặc biệt những bạn học sinh, sinh viên với cấu hình xuất sắc từ bộ vi xử lý Intel Core i5 11400H và GPU RTX 1650. Hơn nữa, nhờ thiết kế mỏng nhẹ, bạn có thể mang laptop đi bất cứ đâu một cách dễ dàng',
        Status: 'Còn Hàng'
    },
    // {
    //     ProductID: '2',
    //     CategoryID: '1',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop2.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '3',
    //     CategoryID: '3',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop3.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '4',
    //     CategoryID: '4',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop4.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '5',
    //     CategoryID: '1',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop1.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '6',
    //     CategoryID: '1',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop2.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '7',
    //     CategoryID: '3',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop3.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '8',
    //     CategoryID: '4',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop4.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '5',
    //     CategoryID: '1',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop1.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '6',
    //     CategoryID: '1',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop2.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '7',
    //     CategoryID: '3',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop3.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '8',
    //     CategoryID: '4',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop4.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '5',
    //     CategoryID: '1',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop1.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '6',
    //     CategoryID: '1',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop2.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '7',
    //     CategoryID: '3',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop3.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
    // {
    //     ProductID: '8',
    //     CategoryID: '4',
    //     Name: 'Lenovo Gaming IdeaPad 3 15IAH7 i5 12500H/82S900H2VN',
    //     Slug: 'Lenovo-Gaming-IdeaPad-3-15IAH7',
    //     Image: require('../../assets/images/laptop4.webp'),
    //     UnitPrice: '22.990.000',
    //     Quantity: 120,
    //     Description: 'sjgfjsgfkjasdkjgjksdgakshgdahkgdkjsdk',
    //     Status: 'Còn Hàng'
    // },
]

export default Products