import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.customer = decoded;
    next();
  } catch {
    next();
    res.status(403).json({ message: 'Invalid token' });
  }
};
