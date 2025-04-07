const PostUsersData = async (data) => {
  const url = "http://localhost:3000/api/users";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const newUserId = response.json();

    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return newUserId;
  } catch (error) {
    console.error(error.message);
  }
};

export default PostUsersData;
