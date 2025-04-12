import client from "./connection.js";

const getAllInvites = async () => {
  const query = "SELECT * FROM invites";

  const invites = await client.query(query);
  return invites.rows;
};

const createInvite = async (invite, overlay) => {
  const query =
    "INSERT INTO invites (invite_token, overlay_id, created_at) VALUES ($1, $2, $3) RETURNING invite_token";

  const createdInvite = await client.query(query, [
    invite,
    overlay,
    new Date(),
  ]);
  const token = createdInvite.rows[0].invite_token;
  return { token };
};

const useInvite = async (invite) => {
  const query = "DELETE FROM invites WHERE invite_token = $1";

  await client.query(query, [invite]);
  return { message: "Invite used" };
};

export default {
  getAllInvites,
  createInvite,
  useInvite,
};
