//#region 解析公钥

var pk = $('#J_PublicKey').val();
// 1. 去掉公钥加密key
var pkSecKeyL = pk.slice(-1); // 公钥加密key长度
pk = pk.slice(0, -1); // 去掉公钥加密key长度字段
var pkSecKey = pk.slice(-pkSecKeyL); // 公钥间加密key
pk = pk.slice(0, -pkSecKeyL); // 去掉公钥加密key
// 2. 去掉公钥间隔符
var pkGapL = pk.slice(0, 1); // 公钥间隔符长度
pk = pk.slice(1); // 去掉公钥间隔符长度字段
var pkGap = pk.slice(-pkGapL); // 公钥间隔符
pk = pk.slice(0, -pkGapL); // 去掉公钥间隔符，得到加密后的公钥

// 解密公钥
var decryptBytes = CryptoJS.AES.decrypt(pk, pkSecKey); // 解密后的公钥
var decryptText = decryptBytes.toString(CryptoJS.enc.Utf8); // 解密后的公钥明文
console.log(pkGap);
var publicKey = decryptText.replace(new RegExp(pkGap, 'g'), '\n'); // 还原公匙
console.log(publicKey);

//#endregion

//#region 客户端加密

var aesSecKey;

// 生成随机AES秘钥
function generateAESKey() {
    var p = Math.random() * 1000;
    return CryptoJS.SHA256(p).toString();
}

$('#J_EncryptBtn').click(function () {

    // 1. RSA一次加密
    // 使用公匙对明文进行加密
    var encrypt = new JSEncrypt();
    // var publicKey = $.trim($('#J_PublicKey').val());

    var msg = $.trim($('#J_Msg').val());
    if (!msg) {
        return;
    }
    // msg = encodeURI(msg);

    encrypt.setPublicKey(publicKey);
    var encryptedMsg = encrypt.encrypt(msg);

    // 2. AES二次加密
    aesSecKey = generateAESKey();
    encryptedMsg = CryptoJS.AES.encrypt(encryptedMsg, aesSecKey).toString();

    // 显示密文
    $('#J_EncryptedMsg').html(encryptedMsg);

});

//#endregion

//#region 服务端解密

$('#J_DecryptBtn').click(function () {

    $.ajax({
        method: 'POST',
        url: '/rsa/decrypt',
        data: {
            secKey: aesSecKey, // AES秘钥
            msg: $('#J_EncryptedMsg').html() // 二次加密后的密文
        }
    }).then(function (res) {
        if (!res || !res.success) {
            return;
        }

        $('#J_DecryptedMsg').html(res.decryptedMsg);
    }, function () {

    });

});

//#endregion