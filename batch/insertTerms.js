const parse = require('csv-parse');
const axios = require('axios');
const async = require('async');
const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(path.join(__dirname, 'terms.csv'));

function getCsv(cb) {
  const output = [];
  // Create the parser
  const parser = parse({
    delimiter: ',',
  });
  // Use the readable stream api
  parser.on('readable', function () {
    let record;
    while ((record = parser.read())) {
      output.push({
        word: record[0],
        description: record[1],
      });
    }
  });
  // Catch any error
  parser.on('error', function (err) {
    console.log(err);
  });

  // When we are done, test that the parsed output matched what expected
  parser.on('end', function () {
    cb(output);
  });

  stream.pipe(parser);
}

function postData() {
  getCsv((result) => {
    async.eachSeries(result, (data, next) => {
      axios({
        method: 'post',
        url: 'https://print-test2.azurewebsites.net/terms',
        data,
      })
        .then((response) => next())
        .catch((err) => next(err));
    }, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('Insert successfully');
    })
  });
}

postData();