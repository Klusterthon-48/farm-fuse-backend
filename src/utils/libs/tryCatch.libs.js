// export default (fn) => (req, res, next) => {
//   return Promise.resolve(fn(req, res, next)).catch(next);
// }

export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
        return next(error);
      }
    });
  };
};
