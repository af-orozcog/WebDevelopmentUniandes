const axios = require("axios");
const http = require("http");
const fs = require("fs");

//This funtion retrives the data and stores it
//in the specified file
function retriveData(url){
    const promise = axios.get(url);

    const dataPromise = promise.then((response) => response.data).catch((response) => []);

    return dataPromise;
}

function modifyHTML(serverData,filename1){
    let data = fs.readFileSync(filename1, {encoding: 'utf8'});

    data = data.toString().split("\n");
    let from = 21;
    
    for(const info of serverData){
        let compania = (info.nombrecompania === undefined? info.NombreCompania:info.nombrecompania);
        let contacto = (info.nombrecontacto === undefined? info.NombreContacto : info.nombrecontacto);
        let id = (info.idCliente === undefined? info.idproveedor: info.idCliente);
        let html = `<tr>
            <td scope="row">${id}</td>
            <td>${compania}</td>
            <td>${contacto}</td>
            </tr>`;
        data.splice(from++,0,html);
    }
    
    data = data.join("\n");

    return data;
}

const url1 = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";

const url2 = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";


const server = http.createServer((request,response) =>{
    const url = request.url;

    if(url === "/api/proveedores"){
        retriveData(url1).then(function(data){
            response.writeHead(200,{"Content-Type":"text/html"});
            data = modifyHTML(data,"proveedores.html");
            response.write(data);
            response.end();
        }).catch(function(error){
            response.writeHead(500,{"Content-Type":"text/html"});
            response.end();
        });
    }
    else if(url === "/api/clientes"){
        retriveData(url2).then(function(data){
            response.writeHead(200,{"Content-Type":"text/html"});
            data = modifyHTML(data,"clientes.html");
            response.write(data);
            response.end();
        }).catch(function(error){
            response.writeHead(500,{"Content-Type":"text/html"});
            response.end();
        });
    }
    else{
        response.writeHead(400);
        response.end();
    }
});

server.listen(8081, () => {
    console.log("Server is running");
});