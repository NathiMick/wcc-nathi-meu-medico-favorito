const notNull = function(obj) {

    let notNull = true;

    let keyList = Object.keys(obj);
    keyList.forEach((key) => {
        
        if (obj[key] == '' || obj[key] == null || obj[key] == undefined) {
            notNull = false;

        }

    });

    return notNull;

}

module.exports = {
    notNull
}
 