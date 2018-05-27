const express = require('express')
const app = express()
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const fs = require('fs');
 
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1uuqMO6MOIDR0vfaLCEwc-N5tfmhvSy64TEqYRQ5OeoM');
//1uuqMO6MOIDR0vfaLCEwc-N5tfmhvSy64TEqYRQ5OeoM
var sheet;

app.get('/', (req, res) => res.redirect('index.html'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.use(express.static('./'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/getJLTFiles',function(req,res){
	var name = req.body.id;
	async.series([
		function getFilenames(step){
			fs.readdir('./samples/'+name+'/', (err, files) => {
			  step(null,files);
			})
			// step(null,data);
		}
		],
		function(err,result){
			res.send(result[0])
		});
	fs
})


app.post('/getCustomers',function(req,res){
	console.log('recieved post for getCustomers')
	async.series([
  function setAuth(step) {
    var creds = require('./orderManager-34fdc849a9ce.json');
 
    doc.useServiceAccountAuth(creds, function(err,info){
    	console.log(info);
    	step(null,'');
    });
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[2];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step(null,'');
    });
  },
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      offset: 1,
      orderby: 'col2'
    }, function( err, rows ){

 
      step(null,rows);
    });
  }
], function(err,result){
    if( err ) {
      console.log('Error: '+err);
      
    }
    res.send(result[2]);
});

})

app.post('/getJLT',function(req,res){
	console.log('recieved post for getJLT')
	async.series([
  function setAuth(step) {
    var creds = require('./orderManager-34fdc849a9ce.json');
 
    doc.useServiceAccountAuth(creds, function(err,info){
    	console.log(info);
    	step(null,'');
    });
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[8];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step(null,'');
    });
  },
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      offset: 1,
      
    }, function( err, rows ){

 
      step(null,rows);
    });
  }
], function(err,result){
    if( err ) {
      console.log('Error: '+err);
      
    }
    res.send(result[2]);
});

})





async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    var creds = require('./orderManager-34fdc849a9ce.json');
    doc.useServiceAccountAuth(creds, function(err,info){
    	console.log(info);
    	step();
    });
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step();
    });
  },
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      offset: 1,
      limit: 20,
      orderby: 'col2'
    }, function( err, rows ){
      console.log('Read '+rows.length+' rows');
 
      // the row is an object with keys set by the column headers
      rows[0].colname = 'new val';
      rows[0].save(); // this is async
 
      // deleting a row
      //rows[0].del();  // this is async
 
      step();
    });
  },
  function workingWithCells(step) {
    sheet.getCells({
      'min-row': 1,
      'max-row': 5,
      'return-empty': true
    }, function(err, cells) {
      var cell = cells[0];
      console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
 
      // cells have a value, numericValue, and formula
      cell.value == '1'
      cell.numericValue == 1;
      cell.formula == '=ROW()';
 
      // updating `value` is "smart" and generally handles things for you
      cell.value = 123;
      cell.value = '=A1+B2'
      cell.save(); //async
 
      // bulk updates make it easy to update many cells at once
      cells[0].value = 1;
      cells[1].value = 2;
      cells[2].formula = '=A1+B1';
      sheet.bulkUpdateCells(cells); //async
 
      step();
    });
  },
  function managingSheets(step) {
  	console.log('inside managingSheets')
   //  doc.addWorksheet({
   //    title: 'my new sheet'
   //  }, function(err, sheet) {
 
 		// console.log('error on addWorksheet ' + err)
   //    // change a sheet's title
   //    sheet.setTitle('new title'); //async
 
   //    //resize a sheet
   //    sheet.resize({rowCount: 50, colCount: 20}); //async
 
   //    sheet.setHeaderRow(['name', 'age', 'phone']); //async
 
   //    // removing a worksheet
   //    //sheet.del(); //async
 
      step();
    // });
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});
