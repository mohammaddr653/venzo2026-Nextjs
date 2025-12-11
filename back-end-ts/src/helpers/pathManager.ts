import { mkdirp } from "mkdirp";

const pathManager = (dir: string) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const path = `${year}/${month}`;
  mkdirp.sync(`${dir}/${path}`);
  return `${dir}/${path}`;
};

export default pathManager;
