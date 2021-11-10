/*
 * @Author        : ryuusennka
 * @Date          : 2021-11-10 22:41:13
 * @LastEditors   : ryuusennka
 * @LastEditTime  : 2021-11-11 00:54:28
 * @FilePath      : /generate/config/index.js
 * @Description   :
 */
const path = require('path');
const handlerPromise = promise => promise.then(res => [null, res]).catch(err => [err, null]);
const resolve = dir => path.join(__dirname, '..', dir);
module.exports = { handlerPromise, resolve };
