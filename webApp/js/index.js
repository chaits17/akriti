var orderList = [];
var dyeingList = [];
var stitchingList = [];

getOrderListFromServer();
function getOrderListFromServer(){
	 $.post("getOrders",{}, function(data){
        orderList = data;
        createOrderTable();
      });
	 $.post("getDyeing",{}, function(data){
        dyeingList = data;
        //createOrderTable();
      });
	 $.post("getStitching",{}, function(data){
        stitchingList = data;
        //createOrderTable();
      });

}

function createOrderTable(){
	var table = document.getElementById('orderTable');
	var tbody = table.tBodies[0];
	var row,cell;
	for(var i=0;i<orderList.length;i++){
	    row = tbody.insertRow(-1);

	    cell = row.insertCell(-1);
		cell.innerHTML = orderList[i]['orderid'];

		cell = row.insertCell(-1);
		cell.innerHTML = orderList[i]['customername'];

		cell = row.insertCell(-1);
		cell.innerHTML = orderList[i]['jlt'];

		cell = row.insertCell(-1);
		cell.innerHTML = orderList[i]['item'];

		cell = row.insertCell(-1);
		cell.innerHTML = 'na';

		cell = row.insertCell(-1);
		cell.innerHTML = 'na';

		cell = row.insertCell(-1);
		cell.innerHTML =  orderList[i]['deliverydate'];
		


	}
	
}