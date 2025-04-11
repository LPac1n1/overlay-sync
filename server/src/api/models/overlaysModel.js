import client from "./connection.js";

const getAllOverlays = async () => {
  const query = "SELECT * FROM overlays";

  const overlays = await client.query(query);
  return overlays.rows;
};

const getOverlayById = async (overlayId) => {
  const query = "SELECT * FROM overlays WHERE id = $1";

  const overlay = await client.query(query, [overlayId]);
  return overlay.rows[0];
};

const getOverlayByCanvasRoute = async (canvasRoute) => {
  const query =
    "SELECT creator_user_id, stream_key, canvas_route FROM overlays WHERE canvas_route = $1";

  const overlay = await client.query(query, [canvasRoute]);
  return overlay.rows[0];
};

const getOverlaysByCreatorUserId = async (userId) => {
  const query = "SELECT * FROM overlays WHERE creator_user_id = $1";

  const overlays = await client.query(query, [userId]);
  return overlays.rows;
};

const createOverlay = async (overlay, user) => {
  const { channel_name, channel_picture, stream_key, canvas_route } = overlay;
  const creator_user_id = user.id;

  const query =
    "INSERT INTO overlays (creator_user_id, channel_name, channel_picture, stream_key, canvas_route) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  const createdOverlay = await client.query(query, [
    creator_user_id,
    channel_name,
    channel_picture,
    stream_key,
    canvas_route,
  ]);
  const overlayId = createdOverlay.rows[0].id;
  return { id: overlayId };
};

const updateOverlayChannelName = async (overlay, overlayId) => {
  const { channel_name } = overlay;

  const query =
    "UPDATE overlays SET channel_name = $1 WHERE id = $2 RETURNING *";

  const updatedOverlayChannelName = client.query(query, [
    channel_name,
    overlayId,
  ]);

  return updatedOverlayChannelName.rows;
};

const updateOverlayChannelPicture = async (overlay, overlayId) => {
  const { channel_picture } = overlay;

  const query =
    "UPDATE overlays SET channel_picture = $1 WHERE id = $2 RETURNING *";

  const updatedOverlayChannelPicture = client.query(query, [
    channel_picture,
    overlayId,
  ]);

  return updatedOverlayChannelPicture.rows;
};

const deleteOverlay = async (overlayId) => {
  const query = "DELETE FROM overlays WHERE id = $1 RETURNING *";

  const deletedOverlay = client.query(query, [overlayId]);
  return deletedOverlay.rows;
};

export default {
  getAllOverlays,
  getOverlayByCanvasRoute,
  getOverlayById,
  getOverlaysByCreatorUserId,
  createOverlay,
  updateOverlayChannelName,
  updateOverlayChannelPicture,
  deleteOverlay,
};
