
var request = require('request');
var fs = require('fs')

/**
 * 
 * 
 * @param {string} url - 资源定位
 * @param {string} savefilename - 资源保存的文件名
 * @param {function} callback - 
 */
var download = function (url, save_filename) {
    request.head(url, function (err, res, body) {

        // 如果错误打印错误日志，返回false
        if (err) {
            console.log('Err: ' + err);
            return false;
        }

        console.log('Res: ' + res);

        // stream a response to the file stream.
        request(url).pipe(fs.createWriteStream('images/' + save_filename)).on('close', streamClose(save_filename));
    });
}

// callback after file stream colsed.
function streamClose(filename) {

    // 闭包打印已经完成的下载
    return function () { console.log('Download Done: ' + filename) };
}

// 抛出接口
module.exports.download = download;