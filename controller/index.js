const model = require('../model');

function get(req, res) {
  model.get((err, result) => {
    if (err) {
      return res.status(500).end();
    }
    return res.send(result);
  })
}

function create(req, res) {

}

module.exports = {
  get,
  create,
};

