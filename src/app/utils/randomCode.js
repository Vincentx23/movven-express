const  generateRandomString = () => {
    var result = '';
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 4; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
    return result;
}

module.exports ={
    generateRandomString
}