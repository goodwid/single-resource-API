# single-resource-API
Single resource API using restify and MongoDB.


## API server for cheese

##### To install, clone this repo then run

    npm install
    ./index.js [port]

##### Available endpoints and methods:
- GET
  - /cheese: gets a list of available cheeses
  - /cheese/id: returns all data for the id provided
- POST
  - /cheese: adds a new cheese to the database
- PUT
  - /cheese/id: replaces properties of the specified resource with information provided
- DELETE
  - /cheese/id: deleted the specified resource

##### Data is sent and received in JSON format, as follows:

``` json
{
  "name" : "Tillamook Sharp Cheddar",
  "milk" : "cow",
  "region" : "Northwest US",
  "moisture" : "semi-hard"
}
```


##### Tests are available:

    npm test
