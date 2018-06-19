
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}


 $( window ).on( "load", function() {
    var ul = document.getElementById('dockList');
    ul.onclick = function(event) {
        var target = getEventTarget(event);
        if(target.innerHTML == 'New Order')
          window.location.href = 'newOrder.html'
        if(target.innerHTML == 'Samples')
          window.location.href = 'jlt.html'
        if(target.innerHTML == 'Dyeing')
          window.location.href = 'dyeing.html';
        if(target.innerHTML == 'Packaging')
          window.location.href = 'packaging.html'
        if(target.innerHTML == 'Office')
          window.location.href = 'office.html'
        if(target.innerHTML == 'Stitching')
          window.location.href = 'stitching.html'
        if(target.innerHTML == 'Fabric')
          window.location.href = 'fabric.html'

    };
        
});


getInitData();


function getInitData(){
      $.post("getCustomers",{}, function(data){
        customerObj = data;
          for (var i = data.length - 1; i >= 0; i--) {
            if(data[i].name !='')
              customerNames.push(data[i].name)
          }
          // customerNames = data;
      });

}
var customerObj;


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              if(inp.name == 'customerName')
                fillCustomerData(inp.value);
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
      });
}

/*An array containing all the country names in the world:*/
// var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var customerNames= [];
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
function customerNameInitialized(id){

autocomplete(document.getElementById(id), customerNames);
}

function fillCustomerData(name){
  document.getElementById('addItemButton').disabled = false;
  var table = document.getElementById('customerInfo');
  var selectedCustomer;
  if(document.getElementById('rowSize'))
    table.deleteRow(1)
  

  for (var i = customerObj.length - 1; i >= 0; i--) {
    if(customerObj[i].name == name){
      selectedCustomer = customerObj[i];
      localStorage.selectedCustomer = JSON.stringify(selectedCustomer);
    }
  }
  var tr = table.insertRow();
  tr.setAttribute("id","rowSize")
  var tdx1 = tr.insertCell();
  var tdx2 = tr.insertCell();

  //tr = table.insertRow();
  var tdy1 = tr.insertCell();
  var tdy2 = tr.insertCell();
  //tr = table.insertRow();
  var tdz1 = tr.insertCell();
  var tdz2 = tr.insertCell();


  var input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.setAttribute("id","xInput")
  input.value = selectedCustomer.x;
  tdx1.innerHTML = 'x';
  tdx2.append(input);


  input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.setAttribute("id","yInput")
  tdy1.innerHTML = 'y';
  input.value = selectedCustomer.y;
  tdy2.append(input);

  input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.setAttribute("id","zInput")
  input.value = selectedCustomer.y;
  tdz1.innerHTML = 'z';
  tdz2.append(input);



}

function initJLT(){
    var mainDiv = document.getElementById('samplesDiv');
    var jltObj = JSON.parse(localStorage.jlt);
    var jltDiv;
    var div1,div2,div3;
    var img;
    for (var i = jltObj.length - 1; i >= 0; i--) {
      jltDiv = document.createElement('div');
      jltDiv.id = jltObj[i]['designid'];
      jltDiv.classList.add('col-sm-3');
      jltDiv.classList.add('sampleDiv')
      jltDiv.style.height = "300px";
      jltDiv.setAttribute('onclick','showSample(event)')
      div1 = document.createElement('div')
      div1.classList.add('div1');
      div1.id = 'div1';
      div2 = document.createElement('div')
      div2.id = 'div2';
      div2.classList.add('div2');
      div3 = document.createElement('div')
      div3.id = 'div3';
      div3.classList.add('div3');

      img = document.createElement('img');
      img.src = './samples/'+jltObj[i]['designid']+'/1.jpg';
      img.classList.add('jltImg');


      div1.innerHTML = jltObj[i]['designid'];
      div2.append(img);
      div3.innerHTML = jltObj[i]['color'];

      jltDiv.append(div1);
      jltDiv.append(div2);
      jltDiv.append(div3);
      mainDiv.append(jltDiv)

    }

  }

 function closeShowcase(){
  document.getElementById('samplesDiv').style.display = '';
  if(document.getElementById('sampleDiv'))
    document.getElementById('sampleDiv').style.display = 'none';
  document.getElementById('closeIcon').style.display = 'none';

  var page = window.location.href;
  if(page.indexOf('newOrder')>=0)
  {
    document.getElementById('samplesDiv').style.display = 'none';
    document.getElementById('jltOverlay').style.display = 'none';
  }


}
function showSample(e){
  var page = window.location.href;
  var div;
  if(page.indexOf('newOrder')>=0)
  {
    if(e.target.tagName == 'IMG')
     div = e.target.parentElement.parentElement;
    else
      div = e.target.parentElement;

    selectSample(div.id);
    

  }

}


  function searchJLT(e){

    var jlts = JSON.parse(localStorage.jlt);
    var hideDivs = [];
    var checkString ='';
    var input = e.target.value;
    for (var i = jlts.length - 1; i >= 0; i--) {
      checkString = JSON.stringify(jlts[i]);
      checkString =checkString.toLowerCase();
      if(checkString.indexOf(input.toLowerCase())<0)
        hideDivs.push(jlts[i]['designid'])
    }
    var sampleDivs = document.getElementsByClassName('sampleDiv');
    for (var i = sampleDivs.length - 1; i >= 0; i--) {
      if(hideDivs.indexOf(sampleDivs[i].id) >=0 )
        sampleDivs[i].style.display = 'none';
      else
        sampleDivs[i].style.display= '';
    }
  }
