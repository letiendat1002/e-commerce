-- Users
-- test select Users-> Result: Success | Passed
select * from myecommerce.Users;
-- test insert -> Result: Success | Passed
insert into myecommerce.Users 
values (null, "nguyenvana", "123456", "user", "Nguyen Van A", "Male", "nguyenvana@email.com", "0123456789");
-- test insert duplicate username -> Result: Fail | Passed
insert into myecommerce.Users 
values (null, "nguyenvana", "123456", "user", "Nguyen Van A", "Male", "x", "x");
-- test insert duplicate email -> Result: Fail | Passed
insert into myecommerce.Users 
values (null, "x", "123456", "user", "Nguyen Van A", "Male", "nguyenvana@email.com", "x");
-- test insert duplicate phone -> Result: Fail | Passed
insert into myecommerce.Users 
values (null, "x", "123456", "user", "Nguyen Van A", "Male", "x", "0123456789");
-- test update one User information -> Result: Success | Passed
update myecommerce.Users
set Fullname = "test update info"
where UserID = 1;
-- test update one UserID -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.Users
set UserID = 1000
where UserID = 1;
-- test delete one User -> Result: Success | Passed
-- Delete all UserAddress, Orders -> OrderDetail, Rating data related to User
delete from myecommerce.Users where UserID = 1;


-- UserAddresses
-- test select UserAddresses -> Result: Success | Passed
select * from myecommerce.UserAddresses;
-- test insert -> Result: Success | Passed
insert into myecommerce.UserAddresses
values (null, 1, "111 ABC");
-- test insert second address for user -> Result: Success | Passed
insert into myecommerce.UserAddresses
values (null, 1, "121 ABC");
-- test insert duplicate address -> Result: Success | Passed
insert into myecommerce.UserAddresses 
values (null, 1, "121 ABC");
-- test insert orphan -> Result: Fail | Passed
insert into myecommerce.UserAddresses 
values (null, null, "111 ABC");
-- test update one UserAddress information -> Result: Success | Passed
update myecommerce.UserAddresses
set Address = "test update info"
where UserAddressID = 1;
-- test update one UserAddressID (2 test)
-- update 1 -> 100 -> Result: Success | Passed
update myecommerce.UserAddresses
set UserAddressID = 100
where UserAddressID = 1;
-- update 100 -> 1 -> Result: Success | Passed
update myecommerce.UserAddresses
set UserAddressID = 1
where UserAddressID = 100;
-- test delete one UserAddress -> Result: Success | Passed
delete from myecommerce.UserAddresses where UserID = 1;


-- Categories
-- test select Categories -> Result: Success | Passed
select * from myecommerce.Categories;
-- test insert -> Result: Success | Passed
insert into myecommerce.Categories 
values (null, "Dien thoai", "slug", "image");
-- test insert duplicate -> Result: Success | Passed
insert into myecommerce.Categories 
values (null, "Dien thoai", "slug", "image");
-- test insert orphan -> Result: Fail | Passed
insert into myecommerce.Categories 
values (null, null, "slug", "image");
-- test update one Category information -> Result: Success | Passed
update myecommerce.Categories
set Name = "test update info"
where CategoryID = 1;
-- test update one CategoryID (2 test)
-- update 1 -> 100 -> Result: Success | Passed
update myecommerce.Categories
set CategoryID = 100
where CategoryID = 1;
-- update 100 -> 1 -> Result: Success | Passed
update myecommerce.Categories
set CategoryID = 1
where CategoryID = 100;
-- test delete one Category -> Result: Success | Passed
delete from myecommerce.Categories where CategoryID = 1;


-- Products
-- test select Products -> Result: Success | Passed
select * from myecommerce.Products;
-- test insert -> Result: Success | Passed
-- test insert big number UnitPrice -> Result: Success | Passed
-- test insert duplicate -> Result: Success | Passed
insert into myecommerce.Products 
values (null, 1, "Iphone 14", "slug", "image", 2000000000000, 30, "description", 1, 2019, "", "", "", "", "", "", "", "");
-- test insert second product
insert into myecommerce.Products 
values (null, 1, "Iphone 8", "slug", "image", 999999999, 25, "description", 1, 2015, "", "", "", "", "", "", "", "");
-- test insert orphan CategoryID -> Result: Success (Constraint Rule) | Passed
insert into myecommerce.Products 
values (null, null, "test", "slug", "image", 1, 30, "a", 1);
-- test insert false CategoryID -> Result: Fail | Passed
insert into myecommerce.Products 
values (null, 10, "test", "slug", "image", 1, 30, "a", 1);
-- test update one Product information -> Result: Success | Passed
update myecommerce.Products
set Quantity = 100
where ProductID = 1;
-- test update CategoryID in one ProductID -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.Products
set CategoryID = 100
where ProductID = 1;
-- test update one ProductID if not in any OrderDetail (2 test)
-- update 1 -> 100 -> Result: Success | Passed
update myecommerce.Products
set ProductID = 100
where ProductID = 1;
-- update 100 -> 1 -> Result: Success | Passed
update myecommerce.Products
set ProductID = 1
where ProductID = 100;
-- test update one ProductID if in any OrderDetail 
-- -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.Products
set ProductID = 1000
where ProductID = 1;
-- test delete one Product if not in any OrderDetail -> Result: Success | Passed
delete from myecommerce.Products where ProductID = 1;
-- test delete one Product if in any OrderDetail
-- -> Result: Fail (Constraint RESTRICT) | Passed
delete from myecommerce.Products where ProductID = 1;


-- Orders
-- test select Orders -> Result: Success | Passed
select * from myecommerce.Orders;
-- test insert -> Result: Success | Passed
insert into myecommerce.Orders
values (null, 1, 0, "", "", curdate());
-- test second insert -> Result: Success | Passed
insert into myecommerce.Orders
values (null, 1, 0, "", "", curdate());
-- test insert duplicate -> Result: Fail | Passed
insert into myecommerce.Orders
values (1, 1, 0, "", "", curdate());
-- test insert orphan UserID -> Result: Fail | Passed
insert into myecommerce.Orders
values (null, null, 0, "", "", curdate());
-- test insert false UserID -> Result: Fail | Passed
insert into myecommerce.Orders
values (null, 100, 0, "", "", curdate());
-- test update one Order information -> Result: Success | Passed
update myecommerce.Orders
set total = 100
where OrderID = 1;
-- test update one OrderID if not have any OrderDetail
-- update 1 -> 100 -> Result: Success | Passed
update myecommerce.Orders
set OrderID = 100
where OrderID = 1;
-- update 100 -> 1 -> Result: Success | Passed
update myecommerce.Orders
set OrderID = 1
where OrderID = 100;
-- test update one OrderID if have OrderDetail 
-- -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.Orders
set OrderID = 1000
where OrderID = 1;
-- test delete one Order if not have OrderDetail -> Result: Success | Passed
delete from myecommerce.Orders where OrderID = 1;
-- test delete one Order if have OrderDetail -> Result: Success | Passed
-- Delete all OrderDetail, Rating data related to Order
delete from myecommerce.Orders where OrderID = 1;


-- OrderDetails
-- test select OrderDetails -> Result: Success | Passed
select * from myecommerce.OrderDetails;
-- test insert -> Result: Success | Passed
insert into myecommerce.OrderDetails
values (1, 1, 0, 0);
-- test insert second same OrderID different ProductID -> Result: Success | Passed
insert into myecommerce.OrderDetails
values (1, 2, 0, 0);
-- test insert orphan OrderID -> Result: Fail | Passed
insert into myecommerce.OrderDetails
values (null, 1, 0, 0);
-- test insert orphan ProductID -> Result: Fail | Passed
insert into myecommerce.OrderDetails
values (1, null, 0, 0);
-- test insert false OrderID -> Result: Fail | Passed
insert into myecommerce.OrderDetails
values (100, 1, 0, 0);
-- test insert false ProductID -> Result: Fail | Passed
insert into myecommerce.OrderDetails
values (1, 100, 0, 0);
-- test update one OrderDetail information -> Result: Success | Passed
update myecommerce.OrderDetails
set Quantity = 100
where OrderID = 1 and ProductID = 1;
-- test update one OrderID of primary key (OrderID,ProductID) -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.OrderDetails
set OrderID = 100
where OrderID = 1 and ProductID = 1;
-- test update one OrderID of primary key (OrderID,ProductID) -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.OrderDetails
set ProductID = 100
where OrderID = 1 and ProductID = 1;
-- test delete one OrderDetail -> Result: Success | Passed
-- Delete all Rating data related to OrderDetail
delete from myecommerce.OrderDetails where OrderID = 1 and ProductID = 1;


-- Ratings
-- test select Ratings -> Result: Success | Passed
select * from myecommerce.Ratings;
-- test insert -> Result: Success | Passed
insert into myecommerce.Ratings
values (1, 1, 1, 5, "comment", curdate());
-- test insert same UserID, OrderID diffrent ProductID -> Result: Success | Passed
insert into myecommerce.Ratings
values (1, 1, 2, 5, "comment", curdate());
-- test insert same UserID, ProductID different OrderID -> Result: Success | Passed
insert into myecommerce.Ratings
values (1, 2, 1, 5, "comment", curdate());
-- test insert duplicate (UserID, OrderID, ProductID) -> Result: Fail | Passed
insert into myecommerce.Ratings
values (1, 1, 2, 5, "comment", curdate());
-- test insert orphan UserID (2 test) -> Result: Fail | Passed
insert into myecommerce.Ratings
values (null, 1, 2, 5, "comment", curdate());
insert into myecommerce.Ratings
values (100, 1, 2, 5, "comment", curdate());
-- test insert orphan OrderID (2 test) -> Result: Fail | Passed
insert into myecommerce.Ratings
values (1, null, 2, 5, "comment", curdate());
insert into myecommerce.Ratings
values (1, 100, 2, 5, "comment", curdate());
-- test insert orphan ProductID (2 test) -> Result: Fail | Passed
insert into myecommerce.Ratings
values (1, 1, null, 5, "comment", curdate());
insert into myecommerce.Ratings
values (1, 1, 100, 5, "comment", curdate());
-- test update one Rating information -> Result: Success | Passed
update myecommerce.Ratings
set Comment = "test change comment"
where UserID = 1 and OrderID = 1 and ProductID = 1;
-- test update one attribute of primary key (UserID, OrderID, ProductID)
-- -> test update UserID of Primary Key -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.Ratings
set UserID = 100
where UserID = 1 and OrderID = 1 and ProductID = 1;
-- -> test update OrderID of Primary Key -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.Ratings
set OrderID = 100
where UserID = 1 and OrderID = 1 and ProductID = 1;
-- -> test update ProductID of Primary Key -> Result: Fail (Constraint RESTRICT) | Passed
update myecommerce.Ratings
set ProductID = 100
where UserID = 1 and OrderID = 1 and ProductID = 1;
-- test delete one Rating -> Result: Success | Passed
delete from myecommerce.Ratings where UserID = 1 and OrderID = 1 and ProductID = 1;
