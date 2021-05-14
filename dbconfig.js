const config = {
    user: 'interbancaria',
    password:'Netzwerk2806',
    server:'interbancaria.database.windows.net',
    database:'ContribucionInterbancaria',
    options:{
        trustedconnection: false,
        enableArithAbort: true,
        encrypt:true
        //instancename : '/'
    }
}

module.exports = config;