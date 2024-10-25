let selectedSwan = null;

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
            // 使用URL参数传递用户选择的天鹅和名字
            window.location.href = `game.html?swan=${selectedSwan}&name=${encodeURIComponent(playerName)}`;
        } else {
            alert('Please enter a name for your swan.');
        }
    }
});