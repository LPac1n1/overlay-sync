const changeUserPassword = async (id, data) => {
  const url = `http://localhost:3000/api/users/${id}/password`;

  const response = await fetch(url, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: data }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      JSON.stringify({
        status: response.status,
        message: errorText,
      })
    );
  }
};

export default changeUserPassword;
