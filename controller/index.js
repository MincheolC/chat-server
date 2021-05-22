const model = require('../model');
const cache = require('../helper/cache');
const { updateCache, deleteCache } = require('../helper/util');

function get(req, res) {
  const terms = cache.get('terms');
  if (terms) {
    return res.send(terms);
  }

  return updateCache(terms, (err, result) => {
    if (err) {
      return res.status(500).end();
    }
    return res.send(result);
  });
}

function create(req, res) {
  const { word, description } = req.body;

  model.create([word, description], (err) => {
    if (err) {
      return res.status(500).end();
    }
    deleteCache('terms');
    return res.status(200).end();
  });
}

function update(req, res) {
  const { id, word, description } = req.body;
  model.update([description, id, word], (err) => {
    if (err) {
      return res.status(500).end();
    }
    deleteCache('terms');
    return res.status(200).end();
  });
}

module.exports = {
  get,
  create,
  update,
};

