// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8585;
var MongoClient = require('mongodb').MongoClient; 
var format = require('util').format;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

// http://localhost:8080/?id=4&token=sadsf4&geo=us
MongoClient.connect('mongodb://127.0.0.1:27017/my_test_db', function (err, db) 
            {
                if (err) 
                {
                    throw err;
                } 
                else 
                {
                    app.get('/', function(req, res) 
                    {
                    	//older version
                        /*var user_id = req.param('id');
                        var token = req.param('token');
                        var geo = req.param('geo');
                        */
                    	var all_val = req.query;
                    	var output = "";
                    	for(var obj in all_val)
                    		{
                    			output += "\n <br>"+obj+" - "+all_val[obj];
                    			console.log(obj+" - "+all_val[obj]);
                    		}
                    	res.writeHead(200, { 'Content-Type': 'text/html' });
                    	res.write(output);
                    	res.end('');
                        //res.send(output);
            
                        //ghggh
                    });
                    console.log("successfully connected to the database");
                    //res.send("successfully connected to the database");
                }
                //db.close();
            });

app.listen(port);
console.log('Server started! At http://localhost:' + port);