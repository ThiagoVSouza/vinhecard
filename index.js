

var net = require('net');
var http = require('http');

var server = net.createServer(function(socket) {

    // socket.write('Echo server\r\n');
    // socket.pipe(socket);
    
     var completeData = '';
    
    socket.on('data', function(chunk) {
        
       /* 
       console.log('Chunk: '+chunk);
       console.log('Hex: '+chunk.toString('hex'));
        
        var newstring = ""+chunk;
        
        completeData = "" + newstring.replace("1800", "1810");
        */
        
        
        // var input  = '00DA47303138313041303330303030323038453030303038303030303030303030303030303032303939303030303830323735323138303731323134333232373038303030303836343030303030303036373931333030303030383634303030303030303030303030303839343230313030303030303030303030303030303030303130373056423138323031383037313231313039323638383539564931383230313830373132313130393236383835395645303056433138323031383037313231313039323638383539303133573F463331332E443031323333';
        
        // var output = new Buffer(chunk, 'hex');
        
        var buf = Buffer.from(chunk, 'ascii');
        
        var output = buf.toString('hex');
        
       console.log('Inicio 2 : '+output);
        
        // log(input + " -> " + output); 
           
        // var resposta = 
        
        // "G01810A030000208E0000800000000000000209900008027521807121432270800008640000000679130000086400000000000008942010000000000000000001070VB18201807121109268859VI18201807121109268859VE00VC18201807121109268859013W?F313.D01233";
        
        
       var now = new Date("milliseconds");
        // now="+now+"&
        
        var url = "http://n1.nortrix.net/apps/vinhecard/script_servidor4.php?now="+now+"&i="+output; // +output
        
         url.replace(/\\/g, "\\\\")
           .replace(/\$/g, "\\$")
           .replace(/'/g, "\\'")
           .replace(/"/g, "\\\"");

        http.get(url, res => {

            res.setEncoding("utf8");
            let body1 = "";
            res.on("data", data => {
                body1 += data;
            });
    
            res.on("end", () => {
    
               // response.end('Finalizou:'+body1+'<br/>');    
               // response.end(body1); 
                
                //  var buf2 = Buffer.from(body1, 'hex');
        
                // var output2 = buf2.toString('ascii');
     
                socket.write(body1); // body1
                
                socket.end();
        
                 // console.log('Fim 6 : ' + body1);
                 console.log('Fim 8 : ' + body1);
                
            });
    
    
        });
        
        console.log('Fim 2');
        
      
        
        
    /*    
        completeData = completeData + chunk;
        
        console.log('Chunk: '+chunk);
                 
        socket.pipe("RESP:"+completeData);
        
         console.log('Pipe: '+completeData);
       */
        // socket.end();
        
        
    }).on('error', function(e)
    {
        // Call callback function with the error object which comes from the response
        console.log('Error: '+e);
       
        callback(e, null);
        
    }).on('end', function() {
        
        console.log('Fim: '+completeData);
                
        // socket.write(completeData);
        // socket.end();
        
    });
    
       
    
   
    
    /*
    
    socket.on('data', function(chunk) {
        socket.write(chunk);
    });
    
   socket.on('end', socket.end);
    
    */
   
    
}).on('error', function(e) {
    // Call callback function with the error object which comes from the request
    console.log('Error 2: '+e);
    callback(e, null);
    
});

server.listen(1234);

console.log('Server running');




/*

var net = require('net');

var server = net.createServer(function(socket) {

    socket.write('Echo server\r\n');
    
    socket.on('data', function(chunk) {
        socket.write(chunk);
    });
    socket.on('end', socket.end);

});

server.listen(5000);

*/

/*
var http = require('http');

var final = 0;

var server = http.createServer(function(request, response) {

    final = 0;

    
    response.writeHead(200, {"Content-Type": "text/plain"});

    let body = [];

    request.on('data', (chunk) => {

      body.push(chunk);

    }).on('end', () => {

        body = Buffer.concat(body).toString();

        // response.write('Chegou no BODY : '+body+'<br/>');
        
        const url = "http://n1.nortrix.net/apps/vinhecard/script_servidor.php?i="+body;

        http.get(url, res => {

            res.setEncoding("utf8");
            let body1 = "";
            res.on("data", data => {
                body1 += data;
            });
    
            res.on("end", () => {
    
               // response.end('Finalizou:'+body1+'<br/>');    
               response.end(body1);    
     
            });
    
    
        });



        // response.end('Finalizou:'+body+'<br/>');


    });

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);

*/

/*

var net = require('net');
var http = require('http');

net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('"' + data + '"');
        // Enviado:
        
        

        const url = "http://n1.nortrix.net/apps/vinhecard/script_servidor.php?i="+data;

        http.get(url, res => {

            res.setEncoding("utf8");
            let body1 = "";
            res.on("data", data => {
                body1 += data;
            });
    
            res.on("end", () => {
    
               // response.end('Finalizou:'+body1+'<br/>');    
               response.end(body1);    
     
            });
    
    
        });

        

    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {

        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        sock.write('Fim:');
        
    });
    
}).listen(5000);

*/


/*

var http = require('http');

var final = 0;

var server = http.createServer(function(request, response) {

    final = 0;

    
    response.writeHead(200, {"Content-Type": "text/plain"});

    let body = [];

    request.on('data', (chunk) => {

      body.push(chunk);

    }).on('end', () => {

        body = Buffer.concat(body).toString();

        // response.write('Chegou no BODY : '+body+'<br/>');
        
        const url = "http://n1.nortrix.net/apps/vinhecard/script_servidor.php?i="+body;

        http.get(url, res => {

            res.setEncoding("utf8");
            let body1 = "";
            res.on("data", data => {
                body1 += data;
            });
    
            res.on("end", () => {
    
               // response.end('Finalizou:'+body1+'<br/>');    
               response.end(body1);    
     
            });
    
    
        });



        // response.end('Finalizou:'+body+'<br/>');


    });

    */

    /*

    http.get(url, res => {

        console.log("Chegou no GET", port);
        response.write('Chegou no GET <br/>');

        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {

            console.log("Chegou no END", port);

            response.write('Chegou no GET <br/>');
            response.end('Finalizou:'+body+'<br/>');


            //

            // response.write('Chegou no END <br/>');

            //

            //  body = JSON.parse(body);
            // response.writeHead(200, {"Content-Type": "text/plain"});
            // response.end("Resposta: "+body.results[0].formatted_address);



        });


    });

    */

    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.end("Hello World 5");


    /*


    http.get(url, res => {



        res.setEncoding("utf8");
        let body = "";

        res.on("data", data => {
            body += data;
        });

        console.log("Chegou no ON", port);

        res.on("end", () => {

            body = JSON.parse(body);


            console.log(
                `City: ${body.results[0].formatted_address} -`,
                `Latitude: ${body.results[0].geometry.location.lat} -`,
                `Longitude: ${body.results[0].geometry.location.lng}`
             );


            // response.writeHead(200, {"Content-Type": "text/plain"});
            // response.end("Hello World : "+body.results[0].formatted_address);

        });


    });

    // console.log('Chegou no fim')

    */

/*

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);

*/
