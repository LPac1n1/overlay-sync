import client from "./connection.js";

const getAllUsers = async () => {
  const query = "SELECT * FROM users";

  const users = await client.query(query);
  return users.rows;
};

const createUser = async (user) => {
  const { name, email, password } = user;

  const query =
    "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *";

  const createdUser = await client.query(query, [name, email, password]);
  const userId = createdUser.rows[0].id;
  return { userId };
};

const updateUserName = async (user, userId) => {
  const { name } = user;

  const query = "UPDATE users SET name = $1 WHERE id = $2 RETURNING *";

  const updatedUserName = await client.query(query, [name, userId]);
  return updatedUserName.rows;
};

const updateUserPassword = async (user, userId) => {
  const { password } = user;

  const query = "UPDATE users SET password = $1 WHERE id = $2 RETURNING *";

  const updatedUserPassword = await client.query(query, [password, userId]);
  return updatedUserPassword.rows;
};

const updateUserProfilePicture = async (user, userId) => {
  const { profile_picture } = user;

  const query =
    "UPDATE users SET profile_picture = $1 WHERE id = $2 RETURNING *";

  const updatedUserProfilePicture = await client.query(query, [
    profile_picture,
    userId,
  ]);
  return updatedUserProfilePicture.rows;
};

const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";

  const deletedUser = await client.query(query, [userId]);
  return deletedUser.rows;
};

export default {
  getAllUsers,
  createUser,
  updateUserName,
  updateUserPassword,
  updateUserProfilePicture,
  deleteUser,
};
