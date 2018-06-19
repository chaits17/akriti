var fabricList = [];


getListFromServer();
function getListFromServer(){
	 
	 $.post("getFabric",{}, function(data){
        fabricList = data;
        createFabricTable();
      });
	 

}

function createFabricTable(){
  var select = document.getElementById('fabricSelect');
  var opt;
  for(var i=0;i<fabricList.length; i++){
    opt = document.createElement('option');
    opt.text = fabricList[i]['fabric'];
    select.add(opt);
  }
}


function updateFabric(){
  var fabricName = document.getElementsByName("fabricName")[0].value;
  var fabricQuantity = document.getElementsByName("fabricQuantity")[0].value;
  var selectName = '';
  if(fabricName == '')
  {
    var options = document.getElementById('fabricSelect');
    selectName = options.options[options.selectedIndex].text;

  }
  alert(fabricName + fabricQuantity + selectName)

}