const verifyToken = async () => {
  const url = "http://localhost:3000/api/auth";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const json = await response.json();

  if (!response.ok) {
    return json.authenticated;
  }

  return json.authenticated;
};

export default verifyToken;
