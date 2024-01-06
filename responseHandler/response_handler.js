const responseHandler = (res, status, msg, data, err) => {
    return res.status(status).send({
        msg,
        data,
        err
    });
};
module.exports = responseHandler;
