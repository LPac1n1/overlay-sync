const getUser = async () => {
  const url = `http://localhost:3000/api/users/user`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      JSON.stringify({
        status: response.status,
        message: response.message,
      })
    );
  }

  const json = await response.json();

  return json;
};

export default getUser;
