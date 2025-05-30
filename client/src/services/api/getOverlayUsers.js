const getOverlayUsers = async (id) => {
  const url = `http://localhost:3000/api/overlays/${id}/users`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
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

export default getOverlayUsers;
