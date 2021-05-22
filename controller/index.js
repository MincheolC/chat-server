const model = require('../model');

function get(req, res) {
  model.get((err, result) => {
    if (err) {
      return res.status(500).end();
    }
    return res.send(result.rows);
  });
}

function create(req, res) {
  const { word, description } = req.body;

  model.create([word, description], (err) => {
    if (err) {
      return res.status(500).end();
    }
    return res.status(200).end();
  });
}

module.exports = {
  get,
  create,
};

