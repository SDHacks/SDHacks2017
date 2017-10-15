var fs = require('fs');
var csv = require('fast-csv');

var User = require('./entities/users/model');

var stream = fs.createReadStream('acceptances/reimbursed - accepted3.csv');

var total = 0;

var csvStream = csv()
  .on('data', function(data){
    User.findOne({email: data[0].toLowerCase()}, function(err, user) {
      if (err || user == null) {
        console.log("couldn't find", data[0]);
        return;
      }

      user.status = 'Unconfirmed';
      //user.availableBus = 'UCLA Bus';
      //user.bussing = false;

      user.save(function() {
        console.log(++total);
      });
    });
  })
  .on('end', function(){
    console.log('done');
  });

stream.pipe(csvStream);
