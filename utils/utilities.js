    /***** VERIFY IF IS NOT NULL, UNDEFINED OR "" *****/

const isNotNull = function(obj) {
    let notNull = true;

    let keyList = Object.keys(obj);
    keyList.forEach((key) => {        
        if (obj[key] == '' || obj[key] == null || obj[key] == undefined) {
            notNull = false;
        };
    });
    return notNull;
};


    /***** SEND MESSAGE ERROR IF CATCH "" *****/

const sendErrorMessage = function(error) {
    return res.status(500).json({
        error,
        message: `Ocorreu um erro durante o acesso ao Banco de Dados.`
    })

};


module.exports = {
    isNotNull,
    sendErrorMessage
}
 