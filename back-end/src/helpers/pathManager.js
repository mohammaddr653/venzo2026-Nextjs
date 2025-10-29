const { mkdirp } = require("mkdirp");

const pathManager = (dir) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const path = `${year}/${month}`;
  mkdirp.sync(`${dir}/${path}`);
  return `${dir}/${path}`;
};

module.exports = pathManager;
