const WebSocket = require('ws');

// 创建 WebSocket 服务器，监听 8080 端口
const wss = new WebSocket.Server({ port: 8080 });

// 用于存储第一个进入游戏的用户
let firstUser = null;

// 监听每个客户端的连接
wss.on('connection', (ws) => {
    console.log('Client connected');

    // 监听消息
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // 处理进入游戏的消息
        if (data.type === 'enterGame' && !firstUser) {
            // 记录第一个进入游戏的用户
            firstUser = data;
            // 广播给所有客户端，通知第一个用户进入游戏
            broadcast(JSON.stringify({
                type: 'startGame',
                userId: data.userId,
                swanId: data.swanId,
                playerName: data.playerName
            }));
        }
    });

    // 处理客户端断开连接
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// 广播消息给所有连接的客户端
function broadcast(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

console.log('WebSocket server is running on ws://localhost:8080');