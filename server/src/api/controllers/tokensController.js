const createTokens = (_request, response) => {
  return response.status(200).json({ message: "Conta logada com sucesso!" });
};

export default {
  createTokens,
};
