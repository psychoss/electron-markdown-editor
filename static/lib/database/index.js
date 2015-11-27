const level = require('level');
const config = require('../config');

var datasbase = new level(config.databasepath);

var proxy = {
  db: datasbase,
  put(key, value) {
    var promise = new Promise((resolve, reject) => {
      datasbase.put(key, value, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(1)
        }
      })
    });

    return promise;
  },
  allkeys() {
    var promise = new Promise((resolve, reject) => {
      var datas=[];
      datasbase.createReadStream({
          keys: true,
          values: false
        })
        .on('data', (data)=>{
          datas.push(data);
        }).on('error',(err)=>{
          reject(err,datas)
        }).on('end',()=>{
          resolve(datas);
        })
    });
    return promise;

  }
}

module.exports = proxy;
