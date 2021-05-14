var config = require('./dbconfig'); //Instanciamos configuracion
const sql = require('mssql'); //se necesita paquete mssql

async function getDlls(){
    try{
        let pool = await sql.connect(config);
        let dllsBancos = await pool.request()
        .input('accion',sql.VarChar,'SELECT_ALL') //CONSULTAR BASE
        .execute("sp_Dolares");
        return dllsBancos.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

async function getDllsBancosId(dlls_id){
    try{
        let pool = await sql.connect(config);
        let dllsBancos = await pool.request()
        .input('input_parameter',sql.Int,dlls_id)
        .query("SELECT * FROM DolarBancos where idDolar = @input_parameter");
        return dllsBancos.recordsets;

    }catch(error){
        console.log(error);
    }
}

async function getDllsBancos(idDlls,banco){
    try{
        let pool = await sql.connect(config);
        let dllsBancos = await pool.request()
        .input('idDlls',sql.Int,idDlls)
        .input('banco',sql.VarChar,banco)
        .input('accion',sql.VarChar,'SELECT') //CONSULTA POR BANCO
        .execute("sp_Dolares");
        return dllsBancos.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

//Insertar nuevo Dollar
async function insertDllsBancos(dollar){
    try{
        let pool = await sql.connect(config);
        let newDollar = await pool.request()
        .input('idDlls',sql.Int,dollar.idDlls)
        .input('accion',sql.VarChar,'INSERT') //INSERT
        .input('banco',sql.VarChar,dollar.banco)
        .input('tipodolar',sql.VarChar,dollar.tipoDolar)
        .input('compra',sql.Float,dollar.compra)
        .input('venta',sql.Float,dollar.venta)
        .input('compra24',sql.Float,dollar.compra24)
        .input('venta24',sql.Float,dollar.venta24)
        .input('compra48',sql.Float,dollar.compra48)
        .input('venta48',sql.Float,dollar.venta48)
        .execute("sp_Dolares");
        return newDollar.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

//update Dollar
async function updateDllsBancos(dollar,idDlls){
    try{
        let pool = await sql.connect(config);
        let upDollar = await pool.request()
        .input('accion',sql.VarChar,'UPDATE')
        .input('idDlls',sql.Int,idDlls)
        .input('banco',sql.VarChar,dollar.banco)
        .input('tipodolar',sql.VarChar,dollar.tipoDolar)
        .input('compra',sql.Float,dollar.compra)
        .input('venta',sql.Float,dollar.venta)
        .input('compra24',sql.Float,dollar.compra24)
        .input('venta24',sql.Float,dollar.venta24)
        .input('compra48',sql.Float,dollar.compra48)
        .input('venta48',sql.Float,dollar.venta48)
        .execute("sp_Dolares");
        console.log(dollar);
        return upDollar.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}

//delete Dollar
async function delDllsBancos(idDlls){
    try{
        let pool = await sql.connect(config);
        let delDollar = await pool.request()
        .input('accion',sql.VarChar,'DEL')
        .input('idDlls',sql.Int,idDlls)
        .execute("sp_Dolares");
        console.log(idDlls);
        return delDollar.recordsets;

    }catch(error){
        console.log(error);
        throw new Error (`Error en el SP... ${err.message}`);
    }
}



module.exports = {
    getDlls : getDlls,
    getDllsBancos : getDllsBancos,
    getDllsBancosId : getDllsBancosId,
    insertDllsBancos : insertDllsBancos,
    updateDllsBancos : updateDllsBancos,
    delDllsBancos : delDllsBancos
}