const LeaveOverlay = async (id) => {
  const url = `http://localhost:3000/api/overlays/${id}/leave`;

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  let json = null;
  const text = await response.text();

  if (text) json = JSON.parse(text);

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

export default LeaveOverlay;
