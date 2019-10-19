USE [13th Aug CLoud PT Immersive]

Create Procedure TeamA.AddOrderDetails(@orderDetailID uniqueidentifier, @orderID uniqueidentifier,@productID uniqueidentifier, @quantity int, @discountedUnitPrice int, @totalPrice int, @giftPacking bit, @addressID uniqueidentifier)
as
begin
if exists (Select OrderDetailID from TeamA.OrderDetails where OrderDetailID = @orderDetailID)
throw 50002, 'Order Detail ID already exists.',0
if @orderDetailID is null
throw 50001,'Invalid Order Detail ID',1
if @orderID is null
throw 50001,'Invalid Order ID',2
if @productID is null
throw 50001, 'Invalid Product ID',3
if @quantity = 0
throw 50001,'Quantity Cannot Be 0',4
if @discountedUnitPrice = 0
throw 50001, 'Invalid Discounted Price',5
if @totalPrice = 0
throw 50001,'Invalid Total Price',6
if @giftPacking <0 OR @giftPacking >1
throw 50001,'Invalid Entry in Gift Packing',7
if @addressID is null
throw 50001, 'Invalid Address ID',8
else
INSERT INTO GreatOutdoors.OrderDetails(OrderDetailID, OrderID, ProductID, Quantity, DiscountedUnitPrice, TotalPrice, GiftPacking, AddressID, CurrentStatus, CreatedDateTime, ModifiedDateTime)
VALUES(@orderDetailID, @orderID, @productID, @quantity, @discountedUnitPrice, @totalPrice, @giftPacking, @addressID, 'In Cart', sysdatetime(), sysdatetime())
end
GO

-----------------------------------------------------------

Create Procedure TeamA.UpdateOrderDetail(@orderDetailID uniqueidentifier, @currentStatus varchar(15))
as
begin
if exists (Select OrderDetailID from TeamA.OrderDetails where OrderDetailID = @orderDetailID )
 begin
 Update TeamA.OrderDetails
 SET CurrentStatus = @currentStatus, ModifiedDateTime = sysdatetime()
 where OrderdetailID = @orderDetailID 
 end
else
throw 50000,'No such record exists.',3
end
GO

------------------------------------------------------------------------


Create Procedure TeamA.DeleteOrderDetails(@orderDetailID uniqueidentifier)
as
begin

if exists (Select OrderDetailID from TeamA.OrderDetails where OrderDetailID = @orderDetailID )
 begin
 DELETE FROM TeamA.OrderDetails WHERE OrderDetailID = @orderDetailID 
end
else
 throw 50000,'No such record exists.',3


end
GO
-----------------------------------------------------

Create Procedure TeamA.DeleteOrderDetailsByOrderID(@orderID uniqueidentifier)
as
begin

if exists (Select OrderID from TeamA.OrderDetails where OrderID = @orderID )
 begin
 DELETE FROM TeamA.OrderDetails WHERE OrderID = @orderID 
end
else
 throw 50000,'No such record exists.',3


end
GO
---------------------------------------------------


Create Procedure TeamA.GetAllOrderDetails
as
begin
Select OrderDetailID, OrderID, ProductID, Quantity, DiscountedUnitPrice, TotalPrice, GiftPacking, AddressID, CurrentStatus
 from TeamA.OrderDetails

end
GO
-----------------------------------------------------

Create Procedure TeamA.GetOrderDetailsByOrderID(@orderID uniqueidentifier)
as
begin
if exists (Select OrderID from TeamA.OrderDetails where OrderID = @orderID)
 begin
 Select OrderDetailID, OrderID, ProductID, Quantity, DiscountedUnitPrice, TotalPrice, GiftPacking, AddressID, CurrentStatus
 from TeamA.OrderDetails where OrderID = @orderID
 end
else
 throw 50000,'Order Does Not Exist.',1

end
GO

--------------------------------------------------

Create Procedure TeamA.GetOrderDetailsByProductID(@productID uniqueidentifier)
as
begin
if exists (Select ProductID from TeamA.OrderDetails where ProductID = @productID)
 begin
 Select OrderDetailID, OrderID, ProductID, Quantity, DiscountedUnitPrice, TotalPrice, GiftPacking, AddressID, CurrentStatus
 from TeamA.OrderDetails where ProductID = @productID
 end
else
 throw 50000,'Product Does Not Exist.',2
end
GO
-----------------------------------------------------------


