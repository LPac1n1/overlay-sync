const verifyToken = async () => {
  const url = "http://localhost:3000/api/auth";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Erro ao verificar token");
    return false;
  }

  const json = await response.json();

  return json.authenticated;
};

export default verifyToken;
