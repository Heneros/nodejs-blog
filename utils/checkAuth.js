import jwt from 'jsonwebtoken';


export default (req, res, next) => {
    ///Передавать токен без слова Bearer.
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        ///Расшифровать токен
        try {
            const decoded = jwt.verify(token, 'secret123');
            req.userId = decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'No access token',
            });
        }

    } else {
        ///Return тут чтобы два раза не передавался код
        return res.status(403).json({
            message: 'No access 403',
        });
    }
    // console.log(token);
    // res.send(token)
}