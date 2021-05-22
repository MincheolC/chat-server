const Ajv = require('ajv');
const model = require('../model');
const cache = require('../helper/cache');
const { updateCache, deleteCache } = require('../helper/util');

const ajv = new Ajv();

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
  const schema = {
    type: 'object',
    properties: {
      word: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['word'],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (!valid) {
    return res.status(404).end();
  }

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
  const schema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      word: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['id', 'word', 'description'],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (!valid) {
    return res.status(404).end();
  }

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
