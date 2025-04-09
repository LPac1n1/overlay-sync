import { v4 as uuid } from "uuid";

const generateStreamKey = () => {
  return uuid();
};

export default generateStreamKey;
