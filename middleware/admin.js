const jwt = require("jsonwebtoken");

const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  const accessToken = authHeader.split(" ")[1];

  try {
    const decodedAdminToken = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (decodedAdminToken.isAdmin === true) {
      next();
      return;
    }
    return res
      .status(401)
      .json({ success: false, message: "Bạn không phải admin" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Token not found" });
  }
};

module.exports = verifyAdminToken;