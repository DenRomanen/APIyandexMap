import { KAZAN_PlACES } from "./config.js";

export const gettingData = () => {
  return fetch(KAZAN_PlACES)
    .then(res => res.json())
    .then(res => res);
};
