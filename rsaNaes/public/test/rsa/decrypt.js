var express = require('express');
var router = express.Router();
var NodeRSA = require('node-rsa');
var CryptoJS = require('crypto-js');
var fs = require('fs');
var path = require('path');

// rsa页
router.get('/', function (req, res, next) {
    // 读取并加密公钥，并返还给前端页面保存
    fs.readFile(path.join(__dirname, "./public.pem"), (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            });
            return;
        }

        // 创建公钥对象
        var publicKeyString = data.toString();
        var publicKey = new NodeRSA(publicKeyString);
        publicKey.setOptions({
            // 这里需要指定RSA padding模式为pkcs1，这是因为前端jsencrypt库采用了pkcs1，而后端node-rsa默认使用的pkcs1_oaep
            // https://stackoverflow.com/questions/33837617/node-rsa-errors-when-trying-to-decrypt-message-with-private-key
            encryptionScheme: 'pkcs1'
        });
        
        publicKeyGap = 'heheda'; // 公钥间隔符
        publicKeyString = publicKeyString.replace(/\n/g, publicKeyGap);

        var publicKeySec = 'abcdefg'; // 公钥AES加密key
        var cryptBytes = CryptoJS.AES.encrypt(publicKeyString, publicKeySec); // 加密后的公钥

        var decryptBytes  = CryptoJS.AES.decrypt(cryptBytes.toString(), publicKeySec); // 解密后的公钥
        var decryptText = decryptBytes.toString(CryptoJS.enc.Utf8); // 解密后的公钥明文


        res.render('rsa', {
            pk: publicKeyGap.length + cryptBytes.toString() + publicKeyGap + publicKeySec + publicKeySec.length
        });
    });
});

router.post('/decrypt', function (req, res, next) {
    
    // 读取私钥
    fs.readFile(path.join(__dirname, "./private.pem"), (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            });
            return;
        }

        var body = req.body;
        console.log(body);

        // 创建私钥对象
        var privateKey = new NodeRSA(data.toString());
        privateKey.setOptions({
            // 这里需要指定RSA padding模式为pkcs1，这是因为前端jsencrypt库采用了pkcs1，而后端node-rsa默认使用的pkcs1_oaep
            // https://stackoverflow.com/questions/33837617/node-rsa-errors-when-trying-to-decrypt-message-with-private-key
            encryptionScheme: 'pkcs1'
        });

        // 对数据进行解密
        // 1. 先进行AES解密（利用客户端传过来的秘钥）
        var aesBytes = CryptoJS.AES.decrypt(body.msg, body.secKey);
        var decryptedData = aesBytes.toString(CryptoJS.enc.Utf8);
        // 2. 再用服务端RSA私钥进行二次解密
        var decryptedMsg = privateKey.decrypt(decryptedData, 'utf8');

        res.json({
            success: true,
            encryptedMsg: body.msg,
            decryptedMsg: decryptedMsg
        });
    });
});

module.exports = router;