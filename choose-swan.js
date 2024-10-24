let selectedSwan = null;
let readyPlayers = 0; // 追踪已经准备好的玩家人数
const maxPlayers = 6; // 最大玩家数

function selectSwan(swanNumber) {
    // 移除所有天鹅的选中状态
    for (let i = 1; i <= 6; i++) {
        document.getElementById('swan' + i).classList.remove('selected');
    }

    // 选中天鹅
    selectedSwan = swanNumber;
    document.getElementById('swan' + swanNumber).classList.add('selected');

    // 更新 Ready 按钮
    document.getElementById('readyButton').src = 'Ready_Button_Yes.png';
    document.getElementById('readyButton').classList.add('active');
}

// 监听 Ready 按钮的点击事件
document.getElementById('readyButton').addEventListener('click', function() {
    if (selectedSwan !== null) {
        const playerName = document.getElementById('playerName').value;
        if (playerName.trim()) {
            readyPlayers++;
            if (readyPlayers >= 2 && readyPlayers < maxPlayers) {
                showConfirmationPopup();
            } else if (readyPlayers === maxPlayers) {
                showMaxPlayersPopup();
            }
        } else {
            alert('Please enter a name for your swan.');
        }
    }
});

// 弹出确认框，询问是否立即开始游戏
function showConfirmationPopup() {
    const confirmStart = confirm("At least two players are ready. Do you want to start the game or wait for more players?");
    if (confirmStart) {
        startGame(); // 如果选择开始，直接开始游戏
    }
}

// 当人数达到最大时的弹窗逻辑
function showMaxPlayersPopup() {
    alert("Maximum number of players reached. The game will start in 3 seconds.");
    setTimeout(function() {
        startGame();
    }, 3000); // 3秒后自动进入游戏
}

// 开始游戏的逻辑
function startGame() {
    // 可以在这里添加进入游戏界面的逻辑，例如重定向到游戏页面
    window.location.href = "game.html"; // 进入游戏界面
}