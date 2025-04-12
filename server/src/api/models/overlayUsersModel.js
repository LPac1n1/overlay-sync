import client from "./connection.js";

const getAllOverlaysUsers = async () => {
  const query = "SELECT * FROM overlay_users";
  const overlaysUsers = await client.query(query);
  return overlaysUsers.rows;
};

const getOverlaysByUserId = async (userId) => {
  const query = "SELECT * FROM overlay_users WHERE user_id = $1";

  const invitedOverlays = await client.query(query, [userId]);
  return invitedOverlays.rows;
};

const getOverlayUsersByOverlayId = async (overlayId) => {
  const query = "SELECT * FROM overlay_users WHERE overlay_id = $1";
  const bond = await client.query(query, [overlayId]);

  return bond.rows;
};

const addOverlayUser = async (userId, overlayId) => {
  const query =
    "INSERT INTO overlay_users (user_id, overlay_id, role) VALUES ($1, $2, $3) RETURNING id";
  const bond = await client.query(query, [userId, overlayId, "editor"]);

  const bondId = bond.rows[0].id;
  return { bondId };
};

export default {
  getAllOverlaysUsers,
  getOverlaysByUserId,
  getOverlayUsersByOverlayId,
  addOverlayUser,
};
