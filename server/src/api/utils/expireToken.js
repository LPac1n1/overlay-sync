const expireToken = (response, status) => {
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
};

export default expireToken;
