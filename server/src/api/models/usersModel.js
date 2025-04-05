import client from "./connection.js";

const getAllUsers = async () => {
  const users = await client.query("SELECT * FROM users");
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

const updateUser = async (user, userId) => {
  const { name, email, password, profile_picture } = user;

  const query =
    "UPDATE users SET name = $1, email = $2, password = $3, profile_picture = $4 WHERE id = $5 RETURNING *";

  const updatedUser = await client.query(query, [
    name,
    email,
    password,
    profile_picture,
    userId,
  ]);
  return updatedUser.rows;
};

const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";

  const removedUser = await client.query(query, [userId]);
  return removedUser.rows;
};

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
