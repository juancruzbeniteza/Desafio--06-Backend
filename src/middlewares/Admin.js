export default (req, res, next) => {
    try {
        const { role } = req.body;
        if (role !== "admin") {
            const error = new Error("Only admin can access");
            error.statusCode = 403;
            throw error;
        }else{
            return next();
        }
    } catch (error) {
        return next(error);
    }
}