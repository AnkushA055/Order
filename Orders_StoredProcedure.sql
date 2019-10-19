Use  [13th Aug CLoud PT Immersive]

Create Procedure TeamA.AddOrder(@orderID uniqueidentifier, @retailerID uniqueidentifier,@salespersonID uniqueidentifier, @totalQuantity int, @totalAmount decimal(15,2), @channelOfSale char(7))
as
begin
if exists (Select OrderID from TeamA.Orders where OrderID = @orderID)
throw 50002, 'OrderID already exists.',0
if @orderID is null
throw 50002,'Invalid Order ID',1
if @retailerID is null AND @salespersonID is null
throw 50002, 'Both retailerID and salesmanID are null. ',2
if @totalQuantity = 0
throw 50002,'Total Quantity Entered is 0',3
if @totalAmount = 0
throw 50002, 'Invalid Total Amount',4
if @channelOfSale != 'Offline' AND @channelOfSale != 'Online'
throw 50002,'Invalid Channel Of Sale',5
 begin
 INSERT INTO GreatOutdoors.Orders(OrderID, RetailerID, SalespersonID, TotalQuantity, TotalAmount, ChannelOfSale, OrderDateTime, ModifiedDateTime)
 VALUES(@orderID, @retailerID, @salespersonID, @totalQuantity, @totalAmount, @channelOfSale, sysdatetime(),sysdatetime())
 end
 end 
 Go

 --------------------------------------------------

Create Procedure TeamA.UpdateOrder(@orderID uniqueidentifier, @totalQuantity int, @totalAmount decimal(15,2))
as
begin
if exists (Select OrderID from TeamA.Orders where OrderID = @orderID )
 begin
 Update TeamA.Orders
 SET TotalQuantity = @totalQuantity, TotalAmount = @totalAmount
 where OrderID = @orderID 
 end
else
throw 50000,'No such record exists.',3
end
GO

-----------------------------------------------

Create Procedure TeamA.DeleteOrders(@orderID uniqueidentifier)
as
begin

if exists (Select OrderID from TeamA.Orders where OrderID = @orderID )
 begin
 DELETE FROM TeamA.Orders WHERE OrderID = @orderID 
end
else
 throw 50000,'No such record exists.',3


end
GO

----------------------------------------------------------------------

Create Procedure TeamA.GetAllOrders
as
begin
Select OrderID, RetailerID, SalespersonID, TotalQuantity, TotalAmount, ChannelOfSale, OrderDateTime, ModifiedDateTime
from TeamA.Orders
end
GO

--------------------

Create Procedure TeamA.GetOrdersByOrderID(@orderID uniqueidentifier)
as
begin
if exists (Select OrderID from TeamA.Orders where OrderID = @orderID )
begin
Select OrderID, RetailerID, SalespersonID, TotalQuantity, TotalAmount,
ChannelOfSale, OrderDateTime, ModifiedDateTime from TeamA.Orders where OrderID = @orderID
end 
else
 throw 50005,'No such order exists.',2
end
GO

---------------------------------------------------

Create Procedure TeamA.GetOrdersByRetailerID(@retailerID uniqueidentifier)
as
begin
if exists (Select OrderID from TeamA.Orders where RetailerID = @retailerID )
begin
Select OrderID, RetailerID, SalespersonID, TotalQuantity, TotalAmount,
ChannelOfSale, OrderDateTime, ModifiedDateTime from TeamA.Orders where  RetailerID = @retailerID
end 
else
 throw 50005,'No order found against this retailerID',2
end
GO

------------------------------------


Create Procedure TeamA.GetOrdersBySalespersonID(@salespersonID uniqueidentifier)
as
begin
if exists (Select OrderID from TeamA.Orders where SalespersonID = @salespersonID)
begin
Select OrderID, RetailerID, SalespersonID, TotalQuantity, TotalAmount,
ChannelOfSale, OrderDateTime, ModifiedDateTime from TeamA.Orders where  SalespersonID = @salespersonID
end 
else
 throw 50005,'No order found against this salespersonID',3
end
GO
--------------------------------------------------

Create Procedure TeamA.GetOrdersSoldOnline
as
begin
if exists (Select OrderID from TeamA.Orders where ChannelOfSale = "Online")
begin
Select OrderID, RetailerID, SalespersonID, TotalQuantity, TotalAmount,
ChannelOfSale, OrderDateTime, ModifiedDateTime from TeamA.Orders where  ChannelOfSale = "Online"
end 
else
 throw 50005,'No online Order Placed.',3
end
GO

--------------------------------------------------

Create Procedure TeamA.GetOrdersSoldOffline
as
begin
if exists (Select OrderID from TeamA.Orders where ChannelOfSale = "Offline")
begin
Select OrderID, RetailerID, SalespersonID, TotalQuantity, TotalAmount,
ChannelOfSale, OrderDateTime, ModifiedDateTime from TeamA.Orders where  ChannelOfSale = "Offline"
end 
else
 throw 50005,'No offline Order Placed.',3
end
GO

-------------------------

