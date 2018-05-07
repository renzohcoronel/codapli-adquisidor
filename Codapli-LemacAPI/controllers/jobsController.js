var serial = require('./../Serial/SerialPort');
var bufferReader='';


serial.on('data', function (data) {
    bufferReader += data;
    var answers = bufferReader.split('\r\n');
    bufferReader = answers.pop();
    if (answers.length > 0) {
        console.log(answers[0]);
       

    }
})


exports.job_post = function (req, res) {
    res.send("oks")

}
exports.job_get = function (req, res) {
    res.send("oks")
}

exports.jobs_get = function (req, res) {
    res.send("oks")
}

exports.jobs_get_values = function (req, res) {
    res.send("oks")
}

exports.jobs_start = function (req, res) {
    res.send("oks")
}

exports.jobs_stop = function (req, res) {
    res.send("oks")
}