var express = require('express');
var fs = require('fs');
var {parse} = require('csv-parse')
var app = express();

app.get("/read" , async( req , res) => {

      const list = await readDataFromCSV('./Sheet.csv');
      console.log(list)
      res.send(list);

})

app.get("/sortByAge"  ,async( req ,res) => {

    const list = await readDataFromCSV('./Sheet.csv');
    list.sort(compareAgeAndSort);
    console.log(list)
    res.send(list);
})

app.get("/calculateAvg" , async( req ,res) => {
    const list = await readDataFromCSV( './studentData2.csv' )
    var len = list.length;
    const total = data.reduce((sum, student) => sum + parseInt(student.Grade), 0);
     var avg =totalGrades/parseInt(length);
     console.log( `Average is ${avg}`);
    res.send(`Average is ${avg}`);
})


function compareAgeAndSort(  stud1 , stud2 ){

    if( stud1.Age<stud2.Age) return -1;

    if( stud1.Age>stud2.Age) return 1;

    else  return 0;

}

function readDataFromCSV(filePath )
{
    return new Promise( (resolve , reject) => {

        fs.readFile( filePath , ( err , data) => {
            parse( data  , { columns:true} , ( err , rows) => {
                resolve( rows);
            })
        })
    })
}
app.listen( 3000 , () => {
    console.log('Server Running');
})