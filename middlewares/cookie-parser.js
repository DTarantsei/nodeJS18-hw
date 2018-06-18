const cookieParser = (req,res,next) => {
  req.parsedCookies = req.cookies;
  next();
};

export default cookieParser;
