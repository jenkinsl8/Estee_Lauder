/*
uses csv-parse and fs to open and read the CSV file.
geojson is used to convert the cvs data into a geojson file that is required by the Google Maps Javascript API.
Writes the file out to the current directory. */

function ReadCSV() {
const fs = require('fs');
const {parse} = require('csv-parse');
const GeoJSON  = require('geojson');
var writeStream = fs.createWriteStream('./mobileFood.json');

/*
parser receives the records read in from fs as a collection of records.  Passes the records to GeoJSON function to
generate the output file
*/

const parser = parse({columns: true}, function (err, records) {
     console.log(records);

/*
parses the csv records read, creates the coord format using Lat/long values from the csv file:
For more info about the GeoJSON format info see: https://geojson.org/
*/

    GeoJSON.parse(records, {Point: [ 'Latitude', 'Longitude']}, function(geojson){
             console.log(JSON.stringify(geojson));
             writeStream.write(JSON.stringify(geojson));
             writeStream.end();
});

});

// reads the csv data as an input stream and pipes the data read to parser defined above.
fs.createReadStream(__dirname+'/resources/Mobile_Food_Facility_Permit.csv').pipe(parser);
}

module.exports.ReadCSV = ReadCSV;