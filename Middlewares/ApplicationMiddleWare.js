const applicationMiddleware = (req, res, next) => {
    console.log("Inside appliicationMiddleware");
    next();
}
module.exports = applicationMiddleware