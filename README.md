
# Estee Lauder Code Test

Converts a CSV file into a GeoJson file, mobileFood.json.  The GeoJson file is loaded into a custom google map that is
used to mark the food truck locations.  Inspiration for the lab was the Google Maps API demo.  It was basically used to learn
how to create a custom map using the Google Maps API and then converted to load the food truck data.


STEPS TO GENERATE THE MAPS DATA:

To convert the csv file to a json file, NodeJS is required.  Run `node convertInputData.js`.
This NodeJS javascript calls readCSV.js, which reads in the csv file under _projectDir/resources and converts it into a
GeoJson file, mobileFoods.json, that is  written to the source directory.


STEPS TO VIEW THE CUSTOM MAP

The GeoJson data is loaded into a custom map using the Google Maps API.
To use Google Maps, a valid API_Key is required.

To view the map, download the project and open the src/index.html in a browser.

When the markers are clicked, a window displays the Applicant name, Location Description,
shows an icon that represents the FacilityType and the FoodItems.

