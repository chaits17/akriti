var orderList = [];
var dyeingList = [];
var stitchingList = [];

getListFromServer();
function getListFromServer(){
	 // $.post("getOrders",{}, function(data){
  //       orderList = data;
  //       createOrderTable();
  //     });
	 $.post("getDyeing",{}, function(data){
        dyeingList = data;
        createDyeingTable();
      });
	 // $.post("getStitching",{}, function(data){
  //       stitchingList = data;
  //       createOrderTable();
  //     });

}

function createDyeingTable(){
  var table = document.getElementById('dyeingTable');
  var tbody = table.tBodies[0];
  var row,cell;
  for(var i=0;i<dyeingList.length;i++){
    row = tbody.insertRow(0);

    cell = row.insertCell(-1);
    cell.innerHTML = dyeingList[i]['orderid'];

    cell = row.insertCell(-1);
    cell.innerHTML = dyeingList[i]['customername'];

    cell = row.insertCell(-1);
    cell.innerHTML = dyeingList[i]['jlt'];

    cell = row.insertCell(-1);
    cell.innerHTML = dyeingList[i]['item'];

    cell = row.insertCell(-1);
    cell.innerHTML = 'na';

    cell = row.insertCell(-1);
    cell.innerHTML = 'na';

    cell = row.insertCell(-1);
    cell.innerHTML =  dyeingList[i]['deliverydate'];
    
  }
}