const loginUser = async (data) => {
  const url = "http://localhost:3000/api/users/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify({
        status: response.status,
        message: json.message,
      })
    );
  }

  return json;
};

export default loginUser;
