const dbDlls = require('./dbDlls'); //
const dollars = require('./Dollars'); //

const dbBancos = require('./dbBancos'); //
const Banco = require('./Banco'); //

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { request, response } = require('express');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);//principal

//operaciones Dolares

//consultar mediante SP /dlls

router.route('/dlls').get((request,response)=>{
    dbDlls.getDlls().then(result =>{
        response.json(result[0]);
    });
});

//consultar registro por banco y tipo mediante SP /dlls/:id/:banco

router.route('/dlls/:id/:banco').get((request,response)=>{
    dbDlls.getDllsBancos(request.params.id,request.params.banco).then(result =>{
        response.json(result[0]);
    });
});

//insertar mediante metodo post 
router.route('/dlls').post((request,response)=>{
    let dlls = {...request.body}
    dbDlls.insertDllsBancos(dlls).then(result =>{
        response.json('Se a Registrado Satisfactoriamente...');
    }, (err) => {
        console.log(err.message);
        response.json(err.message);
    });
});

//Actualizar mediante SP /dlls

router.route('/dlls/:id').put((request,response)=>{
    let dlls = {...request.body}
    console.log(request.params.id);
    console.log(dlls);
    dbDlls.updateDllsBancos(dlls,request.params.id).then(result =>{
        response.json('Se a Actualizado Satisfactoriamente...');
    }, (err) => {
        console.log(err.message);
        response.json(err.message);
    });
});

//borrar mediante SP  /dlls

router.route('/dlls/:id').delete((request,response)=>{
    //let dlls = {...request.body}
    dbDlls.delDllsBancos(request.params.id).then(result =>{
        response.json('Se a Eliminado Satisfactoriamente...');
    }, (err) => {
        console.log(err.message);
        response.json(err.message);
    });
});



//funcion borrar mas antiguos de 5 dias /dlls/borrar_historial


//Operaciones Bancos

//consultar mediante SP /banco

router.route('/banco').get((request,response)=>{
    dbBancos.getBancos().then(result =>{
        response.json(result[0]);
    });
});

//consultar registro por id SP /banco/:id

router.route('/banco/:id').get((request,response)=>{
    dbBancos.getBancosId(request.params.id).then(result =>{
        response.json(result[0]);
    });
});

//insertar mediante metodo post  /banco
router.route('/banco').post((request,response)=>{
    let banco = {...request.body}
    dbBancos.insertBancos(banco).then(result =>{
        response.json('Se a Registrado Satisfactoriamente...');
    }, (err) => {
        console.log(err.message);
        response.json(err.message);
    });
});

//Actualizar mediante SP /banco

router.route('/banco/:id').put((request,response)=>{
    let banco = {...request.body}
    console.log(request.params.id);
    console.log(banco);
    dbBanco.updateBancos(banco,request.params.id).then(result =>{
        response.json('Se a Actualizado Satisfactoriamente...');
    }, (err) => {
        console.log(err.message);
        response.json(err.message);
    });
});

//borrar mediante SP  /banco

router.route('/banco/:id').delete((request,response)=>{
    //let dlls = {...request.body}
    dbBancos.delBancos(request.params.id).then(result =>{
        response.json('Se a Eliminado Satisfactoriamente...');
    }, (err) => {
        console.log(err.message);
        response.json(err.message);
    });
});




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Dlls API Iniciado en el puerto: ' + port);
