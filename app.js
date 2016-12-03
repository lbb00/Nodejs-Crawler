var request = require('request');

// cherrio 用于解析html网页
var cheerio = require('cheerio');

var path = require('path');

var download = require('./download.js')

var requrl = 'http://chenxi.name/60.html';

request(requrl, function (error, response, data) {
    if (!error && response.statusCode == 200) {
        foundData(data);
    }
})

function foundData(data) {

    var $ = cheerio.load(data);

    var imgs = $('img').toArray();

    for (var i = 0; i < imgs.length; i++) {

        // 将img路径放入数组中
        var imgsrc = imgs[i].attribs.src;

        // 生成文件名
        var filename = getFilenameFormUrl(imgsrc);

        // 对文件进行下载
        download.download(imgsrc, filename);
    }
}

/**
 * 获取url中的文件名
 * 
 * @param {any} url
 * @return {string} filename - 文件名
 */
function getFilenameFormUrl(url) {
    return path.basename(url);
}
