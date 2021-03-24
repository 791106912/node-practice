// 表单验证中间件

/* 
    传入一个必填字段的数组，如果存在

*/
exports.required = fields => {
    return (req, res, next) => {
        let result = true
        fields.forEach(field => {
            if (!req.body.entry[field]) {
                result = false
            }
        })
        console.log(result)
        if  (result) {
            next()
        } else {
            res.status(500).send(`${fields.join(' ')} is required`);
            res.redirect('/list');
        }
    }
}

/* 
    params.
*/
exports.lengthAbove = (params) => {
    return (req, res, next) => {
        const data = req.body.entry
        for(let key in params) {
            if (data[key].toString().length < params[key]) {
                res.status(500).send(`${key}'s length is not enough! `);
                res.redirect('/list');
            }
        }
        next()
    }
}