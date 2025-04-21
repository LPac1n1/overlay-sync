const expireToken = (response, status) => {
  if (status === 200) {
    return response
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      })
      .status(status)
      .json({
        message: "Token expired successfully",
      });
  }

  if (status === 204) {
    return response
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      })
      .status(status)
      .json();
  }
};

export default expireToken;
