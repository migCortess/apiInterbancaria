var config = require('./dbconfig'); //Instanciamos configuracion
const sql = require('mssql'); //se necesita paquete mssql

//consultar todos los bancos
async function getBancos(){
    try{
        let pool = await sql.connect(config);
        let Bancos = await pool.request()
        .input('accion',sql.VarChar,'SELECT_ALL') //CONSULTAR BASE
        .execute("sp_Bancos");
        return Bancos.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

//consultar banco en especifico por id
async function getBancosId(idBanco){
    try{
        let pool = await sql.connect(config);
        let Banco = await pool.request()
        .input('idDlls',sql.Int,idBanco)
        .input('accion',sql.VarChar,'SELECT') //CONSULTA POR BANCO
        .execute("sp_Bancos");
        return Banco.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

//Insertar nuevo banco
async function insertBancos(banco){
    try{
        let pool = await sql.connect(config);
        let newBanco = await pool.request()
        .input('accion',sql.VarChar,'INSERT') //INSERT
        .input('banco',sql.VarChar,banco.banco)
        .execute("sp_Bancos");
        return newBanco.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

//update Banco
async function updateBancos(banco,idBanco){
    try{
        let pool = await sql.connect(config);
        let upBanco = await pool.request()
        .input('accion',sql.VarChar,'UPDATE')
        .input('idDlls',sql.Int,idBanco)
        .input('banco',sql.VarChar,banco.banco)
        .execute("sp_Bancos");
        console.log(banco);
        return upBanco.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

//borrar banco
async function delBancos(idbanco){
    try{
        let pool = await sql.connect(config);
        let delBanco = await pool.request()
        .input('accion',sql.VarChar,'DELETE')
        .input('idDlls',sql.Int,idbanco)
        .execute("sp_Bancos");
        console.log(idbanco);
        return delBanco.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

module.exports = {
    getBancos : getBancos,
    getBancosId : getBancosId,
    insertBancos : insertBancos,
    updateBancos : updateBancos,
    delBancos : delBancos
}