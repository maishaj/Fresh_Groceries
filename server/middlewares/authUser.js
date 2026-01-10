import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized - no token' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
      next();
    } else {
      return res.json({ success: false, message: 'Not Authorized - invalid token' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
