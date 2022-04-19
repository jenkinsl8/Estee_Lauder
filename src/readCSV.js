function ReadCSV() {
const fs = require('fs');
const {parse} = require('csv-parse');
const GeoJSON  = require('geojson');
var writeStream = fs.createWriteStream('./mobileFood.json');

const parser = parse({columns: true}, function (err, records) {
     console.log(records);
    GeoJSON.parse(records, {Point: [ 'Latitude', 'Longitude']}, function(geojson){
             console.log(JSON.stringify(geojson));
             writeStream.write(JSON.stringify(geojson));
             writeStream.end();
});

});

fs.createReadStream(__dirname+'/resources/Mobile_Food_Facility_Permit.csv').pipe(parser);
}

module.exports.ReadCSV = ReadCSV;