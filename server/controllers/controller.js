const axios = require("axios");

var facts = [];

const create = (req, res, next) => {
  facts.unshift(req.body);
  res.send(facts);
};

const read = (req, res, next) => {
  axios
    .get("https://api.arcsecond.io/exoplanets")
    .then(response => (facts = response.data.results))
    .then(() => {
      for (let i = 0; i < facts.length; i++) {
        facts[i] = Object.assign({ id: i }, facts[i]);
      }
    })
    .then(response => res.send(facts))
    .catch(err => console.log(err));
};

const update = (req, res, next) => {
  const newName = req.body.newName;
  const id = req.params.id;

  const index = facts.findIndex(fact => fact.id === +id);
  let fact = facts[index];

  facts[index] = Object.assign({}, facts[index], { name: newName });

  res.send(facts);
};

const deleted = (req, res, next) => {
  const id = req.params.id;
  let index = facts.findIndex(fact => fact.id === +id);
  facts.splice(index, 1);
  res.send(facts);
};

const deleteAll = (req, res, next) => {
  facts.splice(facts[0], facts.length);
  res.send(facts);
};

module.exports = {
  read,
  create,
  deleted,
  update,
  deleteAll
};
