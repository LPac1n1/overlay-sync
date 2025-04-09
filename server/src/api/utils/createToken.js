import generateToken from "./generateToken.js";

const createToken = (response, status, user) => {
  const token = generateToken({ id: user.id });

  return response
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    })
    .status(status)
    .json({
      message: {
        id: user.id,
      },
    });
};

export default createToken;
