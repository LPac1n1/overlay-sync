const logoutUser = async () => {
  const url = "http://localhost:3000/api/users/logout";

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    console.error("logout failed");
  }

  return window.location.reload();
};

export default logoutUser;
