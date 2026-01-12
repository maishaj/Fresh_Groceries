// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res.json({ success: false, message: 'Not Authorized - no token' });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//     if (tokenDecode.id) {
//       req.userId = tokenDecode.id;
//       next();
//     } else {
//       return res.json({ success: false, message: 'Not Authorized - invalid token' });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authUser;
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ THIS LINE IS REQUIRED
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
