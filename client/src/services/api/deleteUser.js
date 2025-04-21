const deleteUser = async (id) => {
  const url = `http://localhost:3000/api/users/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
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

export default deleteUser;
