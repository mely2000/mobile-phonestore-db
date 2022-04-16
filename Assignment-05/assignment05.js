const {MongoClient} = require("mongodb");

async function main(){
    
    const uri = "mongodb+srv://kevinmmelly:H2vKratkWHMoYUlZ@cluster0.bsx92.mongodb.net/phonestore_database?retryWrites=true&w=majority"; //cluster uri

    MongoClient.connect(uri, { useUnifiedTopology: true })
    .then((client) => {

    const collection = client.db("phonestore_database").collection("customers");
    console.log("Database (Phonestore_Database): Connected!\n");

    function addCustomer(data){
        collection.insertOne(data);
    }
    
    const http = require("http");
    const fs = require("fs");

    http.createServer(function(request, response) {
        response.writeHead(200, {"content-type": "text/html"});
        const html = fs.readFileSync("./assignment05.html");
        response.end(html);

        var url = request.url;

        //CRUD REQUESTS
        
        //CRUD - Create - Post requests
        if (url === "/addCustomer") {

            request.on("data", chunk => {
                let body = JSON.parse(""+chunk); // convert Buffer to string
                console.log(body);
                addCustomer(body);

                
            });
            request.on("end", () => {
                response.end("ok");
            });
        }

    }).listen(8000, () => {
        console.log("running on localhost:8000");
    })
    })
    .catch(console.error);

}
main().catch(console.error);