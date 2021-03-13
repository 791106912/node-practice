/* 
    要求通过发布订阅的模式。写一个Watcher。监听一个文件夹的的文件变动，传入不同的回调函数。
*/
const fs = require('fs')
const events = require('events')

class Watcher extends events.EventEmitter {
    constructor(wathcherDir) {
        super()
        this.wathcherDir = wathcherDir
    }

    watch() {
        fs.readdir(this.wathcherDir, (err, files) => {
            if (err) throw err
            for (let index in files) {
                this.emit('process', files[index])
            }
        })
    }

    start() {
        /* 
            watchFile会在以下的亲情况下触发
            1、文件删除、复原
            2、文件重命名，或者再命名回来。
        */
        fs.watchFile(this.wathcherDir, () => {
            this.watch()
        })
    }
}

const testwatch = new Watcher('./file-watcher-folder')
testwatch.on('process', file => {
    console.log(file)
})

testwatch.start()