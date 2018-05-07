var serial = require('./../Serial/SerialPort');
var bufferReader='';

serial.on('data', function(data){
    bufferReader += data;
    var answers = bufferReader.split('\r\n');
    bufferReader = answers.pop();
    if (answers.length > 0) {
        console.log(answers);
        

    }
})



exports.settings_get = function (req, res) {
    res.send("oks")
}

exports.settings_post = function (req, res) {
    res.send("oks")
}

exports.settings_post_tare = function (req, res) {
    res.send("oks")
}


exports.settings_post_scale = function (req, res) {
    res.send("oks")
}

