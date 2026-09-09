 const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.isOperational) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
};

export default errorHandler;