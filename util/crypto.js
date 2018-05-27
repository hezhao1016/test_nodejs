// crypto模块的目的是为了提供通用的加密和哈希算法。

////// MD5和SHA1
const crypto = require('crypto');

const hash = crypto.createHash('md5');
// const hash = crypto.createHash('sha1');
// const hash = crypto.createHash('sha256');
// const hash = crypto.createHash('sha512');

// 可任意多次调用update():
hash.update('Hello,World');
hash.update('Hello,Node.js');

console.log(hash.digest('hex'));


////// Hmac
// Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥
var key = '123456';
const hmac = crypto.createHmac('sha256', key);

hmac.update('Hello,World');
hmac.update('Hello,Node.js');

console.log(hmac.digest('hex'));


////// AES
// AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用
function aesEncrypt(data, key) {
    // AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = '123456';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);


////// AES 指定IV
function aesEncryptIV(data, key, iv) {
    const cipher = crypto.createCipheriv('aes-128-cbc', align(key), align(iv));
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecryptIV(encrypted, key, iv) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', align(key), align(iv));
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// 补全字符
function align(str){
    // 需要密码、iv长度为16
    if (str.length > 16){
        return str.substring(0, 16);
    }
    var zerocount = 16 - str.length;
    for(var i=0; i<zerocount; i++){
        str = str + '0';
    }
    return str;
}

var data = 'Hello, this is a secret message!';
var key = '123456';
var iv = 'e6db271db12d4d47';
var encrypted = aesEncryptIV(data, key, iv);
var decrypted = aesDecryptIV(encrypted, key, iv);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);


////// Diffie-Hellman
//
// DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：
// 小明先选一个素数和一个底数，例如，素数p=23，底数g=5（底数可以任选），再选择一个秘密整数a=6，计算A=g^a mod p=8，然后大声告诉小红：p=23，g=5，A=8；
// 小红收到小明发来的p，g，A后，也选一个秘密整数b=15，然后计算B=g^b mod p=19，并大声告诉小明：B=19；
// 小明自己计算出s=B^a mod p=2，小红也自己计算出s=A^b mod p=2，因此，最终协商的密钥s为2。
// 在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道p=23，g=5，A=8，B=19，由于不知道双方选的秘密整数a=6和b=15，因此无法计算出密钥2。
// 用crypto模块实现DH算法如下：

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
// 注意每次输出都不一样，因为素数的选择是随机的。
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));