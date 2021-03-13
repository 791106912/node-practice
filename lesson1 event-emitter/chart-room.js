/**
 * 写一个多人聊天室，需要有以下的需求
 * 1、新人加入的时候。聊天室的每个人都要接到通知
 * 2、有人说话的时候，聊天室的每个人都能看见
 * 3、有人退出的时候，聊天室的每个人都能看见
 * 4、可以控制聊天室解散
 */
const events = require('events')
const net = require('net')

const channel = new events.EventEmitter()
/**
 * 这是只有 一次事件监听的写法。不是发布订阅模式
 */
// const clientArr = []
// channel.on('join', id => {
//     clientArr.filter(d => d.id !== id).forEach(d => {
//         d.socket.write(`${id} is joining.`)
//     })
// })

/**
 * 这是发布订阅的写法
 * 和上面的区别是，建立一个订阅类，然后统一触发，一个是把回调方式socket自身。一个是统一管理
 */
channel.sockets = {}
channel.subscriptions = {}
channel.on('join', function(socket, id) {
    this.sockets[id] = socket
    this.subscriptions[id] = (senderId, message) => {
        if(senderId !== id) {
            this.sockets[id].write(message)
        }
    }
    this.on('broadcast', this.subscriptions[id])
    this.on('leave', function(leaverId) {
        this.removeListener('broadcast', this.subscriptions[leaverId])
    })
})
channel.on('close', function() {
    this.removeAllListeners('broadcast')
})
// 创建聊天室
const server = net.createServer(socket => {
    /**
     * socket 是net的客户端 他有以下属性
     *  socket.address() bufferSize bytesRead bytesWritten connect() connect(options[, connectListener]) connect(path[, connectListener]) connect(port[, host][, connectListener]) connecting destroy([error]) destroyed end([data[, encoding]][, callback]) localAddress localPort pause() pending ref() remoteAddress remoteFamily remotePort resume() setEncoding([encoding]) setKeepAlive([enable][, initialDelay]) setNoDelay([noDelay]) setTimeout(timeout[, callback]) timeout unref() write(data[, encoding][, callback]) readyState
     */
    // 每一个客户端连进来的时候，都需要添加在一个客户端几何里面添加一个事件触发器
    const id = `${socket.remoteAddress}-${socket.remotePort}`
    // clientArr.push({
    //     id,
    //     socket,
    // })
    channel.emit('join', socket, id)
    channel.emit('broadcast', id, `welcome ${id} join`)
    socket.setEncoding('utf-8')
    socket.on('data', data => {
        data = JSON.stringify(data).replace(/\\r\\n/, '')
        if(data === '"quit"') {
            channel.emit('broadcast', '', `chatroot is closing!`)
            channel.emit('close')    
        } else {
            channel.emit('broadcast', id, data)
        }
    })
    socket.on('close', () => {
        channel.emit('leave', id)
        channel.emit('broadcast', id, `${id} is leaving`)
    })
})

server.listen(8888)
