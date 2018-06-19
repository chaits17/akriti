function showAddCustomerBox(){

    
    
    document.getElementById('overlayDiv').style.display = '';

}
var itemCount = 0;

function addItem(){
	document.getElementById('saveOrderButton').style.display = '';
	itemCount++;
	var itemTable  =document.getElementById('newItems');
	var header = itemTable.getElementsByTagName('thead')[0];
	header.style.display='';
	var body = itemTable.tBodies[0];
	var item = body.insertRow();	

	// item.insertCel
	var cell = item.insertCell();
	var currentCustomer = JSON.parse(localStorage.selectedCustomer);
	var id = currentCustomer.customerid;
	var date = new Date();
	cell.innerHTML	 = id+'-'+itemCount+'-'+date.getDate()+date.getMonth();
	item.id = id+'-'+itemCount+'-'+date.getDate()+date.getMonth();

	var JLTdiv = document.createElement('div');
	cell = item.insertCell();
	var JLTinput = document.createElement('input');
	JLTinput.name = 'JLT';
	JLTdiv.append(JLTinput);
	var viewJlt = document.createElement('button');
	viewJlt.setAttribute('onclick',"showJLT(event)")
	JLTdiv.append(viewJlt);
	JLTdiv.classList.add("jltDiv");
	viewJlt.classList.add("jltButton");
	var img = document.createElement('img');
	img.src = './icons/lens.jpeg'
	img.height = 20;
	viewJlt.append(img)
	JLTinput.classList.add("jltInput");
	cell.append(JLTdiv);
	autocomplete(JLTinput,jltNames);

	cell = item.insertCell();
	var itemInput = document.createElement('input');
	itemInput.name = 'item';
	cell.append(itemInput);

	cell = item.insertCell();
	var colorInput = document.createElement('input');
	colorInput.name = 'color';
	cell.append(colorInput);

	cell = item.insertCell();
	var dateInput = document.createElement('input');
	dateInput.name = 'deliveryDate';
	dateInput.type = 'date';
	cell.append(dateInput);	
	
	cell = item.insertCell();
	var notesInput = document.createElement('input');
	notesInput.name = 'notes';
	notesInput.type = 'text';
	cell.append(notesInput);	




}
var jlt = [];
var jltNames = [];

function saveOrder(){
	var itemTable  =document.getElementById('newItems');
	var body = itemTable.tBodies[0];
	var currentCustomer = JSON.parse(localStorage.selectedCustomer);

	var items = body.rows;
	var order = [];
	
	var cells;
	for (var i = 0; i< items.length; i++) {
		cells = items[i].cells;
		var orderObj = {};
		orderObj['id'] = cells[0].innerHTML;
		orderObj['customername'] = currentCustomer.name;
		orderObj['jlt'] = cells[1].getElementsByTagName('input')[0].value;
		orderObj['item'] = cells[2].getElementsByTagName('input')[0].value;
		orderObj['color'] = cells[3].getElementsByTagName('input')[0].value;
		orderObj['deliverydate'] = cells[4].getElementsByTagName('input')[0].value;
		orderObj['notes'] = cells[5].getElementsByTagName('input')[0].value;
		order.push(orderObj)
	}
	var sendOrder = JSON.stringify(order);
	$.post("createOrder",{sendOrder}, function(data){

	});
}

function showJLT(e)
{
	localStorage.currentRow = e.target.parentElement.parentElement.parentElement.parentElement.id;
	document.getElementById('jltOverlay').style.display = '';
	document.getElementById('samplesDiv').style.display = '';
    document.getElementById('closeIcon').style.display = '';
	// $("#jltOverlay").load("jlt.html"); 
	initJLT();

}
function selectSample(id){
  closeShowcase();
   var input = document.getElementById(localStorage.currentRow).getElementsByTagName('input');
   for (var i = input.length - 1; i >= 0; i--) {
   	if(input[i].name == 'JLT')
   	{
   		input[i].value = id;
   	}
   }
}

fetchJlt();
function fetchJlt(){
	$.post("getJLT",{}, function(data){
       //jlt = data;

       for (var i = data.length - 1; i >= 0; i--) {
       	jltNames.push(data[i]['designid']);
       	jlt.push({'designid':data[i]['designid'],
       			  'color':data[i]['color'],	 
       			  'path':data[i].picturelink
       		     })
       }
       localStorage.jlt = JSON.stringify(jlt);
      });
}