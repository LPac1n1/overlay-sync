const validateBody = (request, response, next) => {
  const { body } = request;

  if (
    body.name === undefined ||
    body.email === undefined ||
    body.password === undefined
  ) {
    return response
      .status(400)
      .json({ message: "Faltando campos obrigatórios" });
  }

  if (body.name === "" || body.email === "" || body.password === "") {
    return response
      .status(400)
      .json({ message: "Campos não podem ser vazios" });
  }

  next();
};

export default {
  validateBody,
};
