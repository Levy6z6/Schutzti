// const app = require('./Config/Server/Server');
// import {app, config} from './Config/Server/Server'
const express = require('express');
const haversine = require('haversine-distance')

const app = express();

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
})

const initialposition = {
    lat: 20.569471734550163, 
    lng: -103.3413052714321
}
 const allowedrange = 20;

//Conecciónes 
app.set('port', process.env.PORT || 5001);

const connection = require('./Config/SQL/database')

app.listen(app.get('port'), ()=>{
    console.log("Server running in port", app.get('port'));
})



//***Get request***

//Prueba get
app.get('/',(req,res)=>{
        connection.query("SELECT * FROM USUARIO LIMIT 2",(error,response,fields)=>{
            console.log("GET recibido")
        if(error){
            res.status(404);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    });
})

//Consulta general de usuarios.
app.get('/usuarios',(req,res)=>{
    const id = req.params.id;
    const query = "SELECT * FROM USUARIO";
    connection.query(query,(error,response,fields)=>{
    if(error){
        res.status(404);
        res.end();
    }else{
        res.status(200).json(response);
        res.end();
        }
    });
})

// Consulta por ID de usuario.
app.get('/usuarios/:id',(req,res)=>{
    const id = req.params.id;
    const query = "SELECT * FROM USUARIO WHERE id =" + id;
    connection.query(query,(error,response,fields)=>{
    if(error){
        res.status(404);
        res.end();
    }else{
        res.status(200).json(response);
        res.end();
        }
    });
})

//Consulta general de artefactos.
app.get('/artefactos',(req, res)=>{
    connection.query("SELECT * FROM ARTEFACTO",(error,response,fields)=>{
        if(error){
            res.status(404);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    });
})

//Consulta por ID de artefacto.
app.get('/artefactos/:id',(req, res)=>{
    const id = req.params.id;
    connection.query("SELECT * FROM ARTEFACTO WHERE codigo =" + id,(error,response,fields)=>{
        if(error){
            res.status(404);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    });
})

//Consulta general de sensores.
app.get('/sensor',(req,res)=>{
    const id = req.params.id;
    const query = "SELECT * FROM SENSOR";
    connection.query(query,(error,response,fields)=>{
    if(error){
        res.status(404);
        res.end();
    }else{
        res.status(200).json(response);
        res.end();
        }
    });
})

// Consulta por ID de sensor.
app.get('/sensor/:id',(req,res)=>{
    const id = req.params.id;
    const query = "SELECT * FROM SENSOR WHERE id =" + id;
    connection.query(query,(error,response,fields)=>{
    if(error){
        res.status(404);
        res.end();
    }else{
        res.status(200).json(response);
        res.end();
        }
    });
})

//Consulta de usuario por ID de artefacto.
app.get('/artefactousuario/:id', (req,res)=>{
    const id = req.params.id;
    const query = "SELECT U.* FROM USUARIO U JOIN ARTEFACTO A ON U.codigo_artefacto = A.codigo  WHERE A.codigo = " + id;
    connection.query(query,(error,response,fields)=>{
    if(error){
        res.status(404).json("Not found");
        res.end();
    }else if(response.length == 0){
        res.status(404).json("Not found");
        res.end();
    }else{
        res.status(200).json(response);
        res.end();
    }
    })
});

//Consulta general de mediciones.
app.get('/mediciones', (req, res)=>{
    connection.query("SELECT * FROM MEDICION", (error, response, field) =>{
        if(error){
            res.status(404).json("Error ",error.code)
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    });
})

//Consulta por ID de medicion.
app.get('/mediciones/:id', (req, res)=>{
    const id = req.params.id;
    const query = "SELECT M.* FROM MEDICION M JOIN MEDICION_SENSOR X ON M.id_medicion = X.id_medicion JOIN SENSOR S ON S.id = X.id_sensor WHERE S."+id;
    connection.query(query,(error, response, fields)=>{
        if(error){
            res.status(404).json("Not found" + query);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    })
});

//Consulta general de medicion_localizacion.
app.get('/medicion_localizacion', (req, res)=>{
    connection.query("SELECT * FROM MEDICION_LOCALIZACION", (error, response, field)=>{
        if(error){
            res.status(404).json("Not found" + query);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    })
});

//Consulta por ID de tabla compuesta medicion_localizacion.
app.get('/medicion_localizacion/:id', (req, res)=>{
    const id = req.params.id;
    const query = "SELECT ML.* FROM MEDICION_LOCALIZACION ML JOIN SENSOR S ON S.id = ML.id_sensor JOIN LOCALIZACION L ON L.id_medicion = ML.id_localizacion WHERE L.id_medicion ="+id;
    connection.query(query,(error, response, fields)=>{
        if(error){
            res.status(404).json("Not found" + query);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    })
});

//Consulta general de alertas.
app.get('/alertas', (req, res)=>{
    connection.query("SELECT * FROM ALERTAS", (error, response, field) =>{
        if(error){
            res.status(404).json("Error ",error.code)
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    });
})

//Consulta general de alertas_artefacto.
app.get('/alertas_artefacto', (req, res)=>{
    connection.query("SELECT * FROM ALERTAS_ARTEFACTO", (error, response, field)=>{
        if(error){
            res.status(404).json("Not found" + query);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    })
});

//Consulta por ID de tabla compuesta alertas_artefacto.
app.get('/alertas_artefacto/:id', (req, res)=>{
    const id = req.params.id;
    const query = "SELECT AA.* FROM ALERTAS_ARTEFACTO AA JOIN ALERTAS A ON A.id_alarma = AA.id_alarma JOIN artefacto AR ON AR.codigo = AA.id_codigo WHERE AA.id_codigo ="+id;
    connection.query(query,(error, response, fields)=>{
        if(error){
            res.status(404).json("Not found" + query);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    })
});

//Consulta general de artefacto_sensor.
app.get('/artefacto_sensor', (req, res)=>{
    connection.query("SELECT * FROM ARTEFACTO_SENSOR", (error, response, field)=>{
        if(error){
            res.status(404).json("Not found" + query);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    })
});

//Consulta por ID de tabla compuesta artefacto_sensor.
app.get('/artefacto_sensor/:id', (req, res)=>{
    const id = req.params.id;
    const query = "SELECT SA.* FROM ARTEFACTO_SENSOR SA JOIN SENSOR S ON S.id = SA.id_sensor JOIN artefacto A ON A.codigo = SA.codigo_artefacto WHERE SA.codigo_artefacto ="+id;
    connection.query(query,(error, response, fields)=>{
        if(error){
            res.status(404).json("Not found" + query);
            res.end();
        }else{
            res.status(200).json(response);
            res.end();
        }
    })
});

// app.get('/distance', express.json({type:'*/*'}), (req, res)=>{
//     const a = req.body;
//     //Casa
//     const b = {
//         latitude:20.56936267,
//         longitude: -103.3412758

// }
// // //Vecinos
// // const b ={
// //     latitude:20.569373588118115,
// //     longitude: -103.34137742694759
// // }
// res.status(200).json({"Distancia: ": haversine(a,b)});
// res.end();

// })

//***Post request***

//Inserción de artefactos.
app.post('/artefactos', express.json({type:'*/*'}), (req, res)=>{
    const params = req.body;
    console.log(params) 
            connection.query("INSERT INTO ARTEFACTO SET ?",params,(error, result)=>{
        if(error){
            console.log("Error" + error)
            res.status(401).json("Error")
            res.end();
        }else{
            console.log("Succes");
            res.status(201).json("Succes");
            res.end();
        }
    })
})

//Inserción de temperaturas.
app.post('/mediciontemperatura', (express.json({type:'*/*'})),(req, res)=>{
    const date = new Date();
    const params = req.body;
    console.log("")
    console.log("POST mediciontemperatura")
    console.log(params)
    connection.query("INSERT INTO MEDICION (fecha, valor, unidad, id_artefacto) VALUES (?,?,?,?)",[date, params.valor ,'C°', params.id_artefacto],(error, result)=>{
        if(error){
            console.log("Error" + error)
            res.status(401).json("Error")
            res.end();
        }else{
            res.status(201).json({"Mensaje":"Temperatura guardada exitosamente"});   
            res.end();
        }
    })
})

//Inserción de localizaciónes.
app.post('/localizacion', (express.json({type:'*/*'})),(req, res)=>{
    const date = new Date();
    const params = req.body;
    let response = false;
    console.log("");
    console.log("POST Localización")
    console.log(params);
    connection.query("INSERT INTO LOCALIZACION (fecha, latitud, longitud, speed, id_artefacto) VALUES (?,?,?,?,?)",[date, params.latitud, params.longitud, params.speed, params.id_artefacto],(error, result)=>{
        if(error){
            console.log("Error" + error)
            res.status(401).json("Error")
            res.end();
        }else{
            const id_medicion = result.insertId;
            const actualposition = {
                lat:params.latitud,
                lng:params.longitud
            }
            const distance = haversine(initialposition, actualposition);
            console.log(distance)
            if(distance > allowedrange){
                response = true;
                insertLocateWarning(params.id_artefacto);
            }else{
                console.log("All ok")
                response = false;
            }
            res.status(201).json(response)
            res.end();
        }
    })
})

//Inserción de alertas.
app.post('/alertas', express.json({type:'*/*'}), (req, res)=>{
    const params = req.body;
    console.log(params) 
            connection.query("INSERT INTO ALERTAS SET ?",params,(error, result)=>{
        if(error){
            console.log("Error" + error)
            res.status(401).json("Error")
            res.end();
        }else{
            console.log("Succes");
            res.status(201).json("Succes");
            res.end();
        }
    })
})
//Insercion de registro de alertas
app.post('/alertaartefacto', express.json({type:'*/*'}), (req, res)=>{
    const params = req.body;
    const date = new Date();
    console.log("");
    console.log("POST Alerta artefacto")
    console.log(params) 
            connection.query("INSERT INTO ALERTAS_ARTEFACTO VALUES (?,?,?)",[params.id_artefacto,params.id_alarma,date],(error, result)=>{
        if(error){
            console.log("Error" + error)
            res.status(401).json("Error")
        }else{
            console.log("Succes");
            res.status(201).json("Succes");
        }
        res.end();
    })
})

//Inserción de sensores.
app.post('/sensor', express.json({type:'*/*'}), (req, res)=>{
    const params = req.body;
    console.log(params) 
    connection.query("INSERT INTO SENSOR (id,Tipo,nombre) VALUES (?,?,?)",[params.id,params.Tipo, params.nombre],(error, result)=>{
        if(error){
            console.log("Error" + error)
            res.status(401).json("Error")
            res.end();
        }else{
            console.log("Succes");
            res.status(201).json("Succes");
            res.end();
        }
    })
})

//Inserción de usuarios.
app.post('/usuario', express.json({type:'*/*'}), (req, res)=>{
    const params = req.body;
    console.log(params) 
    connection.query("INSERT INTO USUARIO (nombre,correo,telefono,contrasena,rol,codigo_artefacto) VALUES (?,?,?,?,?,?)",[params.nombre,params.correo,params.telefono,params.contrasena,params.rol,params.codigo_artefacto],(error, result)=>{
        if(error){
            console.log("Error" + error)
            res.status(401).json("Error")
            res.end();
        }else{
            console.log("Succes");
            res.status(201).json("Succes");
            res.end();
        }
    })
})

//Auxiliar functions


function insertLocateWarning(id_artefacto){
    const date =  new Date();
    connection.query("INSERT INTO alertas_artefacto VALUES (?,?,?)", [id_artefacto,2,date], (res, err)=>{
        console.log("¡LOCATE WARNING!")
    })
}



// function insertarMedicionLocalizacion(id_medicion, id_artefacto){
//     connection.query("INSERT INTO medicion_localizacion VALUES (?,?)", [ id_medicion, id_artefacto ], (error, res)=>{
//         if(error) {
//             console.log(error.code);
//             return false;
//         }
//         else return true;
         
//     })
// }

// function insertMedicionArtefacto(id_artefacto, id_medicion){
//     connection.query("INSERT INTO medicion_artefacto VALUES (?,?)", [id_medicion, id_artefacto ], (result, error)=>{
//         // console.log(result)
//         if(error) {
//             // console.log(error.code)
//             return false;
//         }
//         else{
//             // console.log(result);
//             return true;

//         } 
        
//     })
// }




// const dist = () =>{
//     const a = {
//         lat:20.654108351371494,
//         lng:  -103.3214395438552
//     }

//     console.log(haversine(initialposition, a));
// }



// dist();


