import jwt from 'jsonwebtoken';


export default (req, res, next) => {
    ///Передавать токе без слова Bearer.
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {

    } else {
        ///Return тут чтобы два раза не передавался код
        return res.status(403).json({
            message: 'No access',
        });
    }
    // console.log(token);
    res.send(token)
}