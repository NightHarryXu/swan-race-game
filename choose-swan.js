// WebSocket 连接到服务器（确保服务器在本地或远程运行）
const ws = new WebSocket('ws://localhost:8080');

let selectedSwan = null;

// 用户选择天鹅角色
function selectSwan(swanNumber) {
    // 移除所有天鹅的选中状态
    for (let i = 1; i <= 6; i++) {
        document.getElementById('swan' + i).classList.remove('selected');
    }

    // 设置选中状态
    selectedSwan = swanNumber;
    document.getElementById('swan' + swanNumber).classList.add('selected');

    // 更新Ready按钮
    document.getElementById('readyButton').src = 'Ready_Button_Yes.png';
    document.getElementById('readyButton').classList.add('active');
}

// 当点击Ready按钮时，跳转到游戏页面并传递用户选择
document.getElementById('readyButton').addEventListener('click', function() {
    if (selectedSwan !== null) {
        const playerName = document.getElementById('playerName').value;
        if (playerName.trim()) {
            // 生成唯一用户 ID
            const userId = generateUniqueUserId();

            // 使用URL参数传递用户选择的天鹅和名字
            const gameUrl = `game.html?swan=${selectedSwan}&name=${encodeURIComponent(playerName)}`;

            // 通知服务器用户已进入游戏界面
            ws.send(JSON.stringify({
                type: 'enterGame',
                userId: userId,
                swanId: selectedSwan,
                playerName: playerName
            }));

            // 跳转到游戏页面
            window.location.href = gameUrl;
        } else {
            alert('Please enter a name for your swan.');
        }
    }
});

// 生成唯一用户ID的函数
function generateUniqueUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// WebSocket 连接成功时的回调
ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

// WebSocket 连接关闭时的回调
ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
};