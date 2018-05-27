function showAddCustomerBox(){

    
    
    document.getElementById('overlayDiv').style.display = '';

}
var itemCount = 0;

function addItem(){
	itemCount++;
	var itemTable  =document.getElementById('newItems');
	var header = itemTable.getElementsByTagName('thead')[0];
	header.style.display='';
	var item = itemTable.insertRow();

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
	viewJlt.setAttribute('onclick',"showJLT()")
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
	





}
var jlt = [];
var jltNames = [];

function showJLT()
{
	document.getElementById('jltOverlay').style.display = '';
	document.getElementById('samplesDiv').style.display = '';
    document.getElementById('closeIcon').style.display = '';
	// $("#jltOverlay").load("jlt.html"); 
	initJLT();

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