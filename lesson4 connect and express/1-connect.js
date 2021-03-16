const app = require('connect')()

// 简单地使用
app.use(
    // app.use中的这个函数就是中间件 next的作用是去往下一个中间件
    (req, res, next)=> {
        res.end('Hello World!')
    }
)

app.listen(3000)

// 组合中间件
function logger(req, res, next) {
    console.log('s% %s', req.method, req.url)
    next()
}
function hello(req, res, next) {
    res.setHeader('Content-type', 'text/plain')
    res.send('Hello World')
    // 不需要next了，因为完成了响应，不需要再控制权交给分发器Dispatch了。
}
/* 中间件的顺序很重要，如果没有next，那么就会停止执行 */
app.use(logger).use(hello).listen(3000)


// 可配置的中间件
function configLogger(attr) {
    return function (req, res, next) {
        console.log('%s %s', req[attr])
    }
}

app.use(logger).use(hello).listen(3000)


// 错误中间件
/* 
    错误中间件有四个参数，err, req, res, next     
*/
const env = process.env.NODE_ENV || 'dev'
// 根据环境变量来分别处理错误信息
function errorHandle(err, req, res, next) {
    res.status = 500
    if (env === 'dev') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(err))
    } else {
        res.setHeader('Content-Type', 'text/html')
        res.end('Server Error')
    }
}

// 错误中间件的流程，当Connect 出现错误的时候，它只会调用错误中间件
app.use(logger) // 遇到错误
    .use(hello) // 跳过
    .use(errorHandle)
    .listen(3000)