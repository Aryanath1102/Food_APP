// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     // Get token
//     const token = req.headers["authorization"].split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Un-Authorize user",
//         });
//       } else {
//         req.body.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "error in Auth API",
//       error,
//     });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
        });
      }
      req.user = decoded; // attach decoded payload
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Please provide a auth token",
      error,
    });
  }
};
