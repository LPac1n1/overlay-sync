const GetUsersData = async () => {
  const url = "http://localhost:3000/api/users";
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const usersData = await response.json();
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    return usersData;
  } catch (error) {
    console.error(error.message);
  }
};

export default GetUsersData;
