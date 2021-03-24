const redis = require('redis')
const db = redis.createClient()

// 写一个留言信息存储和删除的模型
class Entry {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key]
        }
    }

    // 保存信息
    save(cb) {
        const entryJSON = JSON.stringify(this)
        db.lpush(
            'entries',
            entryJSON,
            err => {
                if(err) return cb(err)
                cb()
            }
        )        
    }

    // 获取信息 ，可以按照分页
    static getRange(from, to, cb) {
        db.lrange('entries', from, to, (err, items) => {
            if (err) return cb(err)
            const entries = []
            items.forEach(item => {
                entries.push(JSON.parse(item))
            })
            cb(null, entries)
        })
    }
}
module.exports = Entry