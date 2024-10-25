let countdown = 3;
let playerSwanSpeed = 0;
let aiSwans = [
    { id: 'swan1', speed: Math.random() * 5 + 2 }, // 随机速度在2到7之间
    { id: 'swan2', speed: Math.random() * 5 + 2 },
    { id: 'swan3', speed: Math.random() * 5 + 2 },
    { id: 'swan4', speed: Math.random() * 5 + 2 },
    { id: 'swan5', speed: Math.random() * 5 + 2 }
];

// 弹窗显示提示
document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('startModal').style.display = 'none';
    startCountdown();
});

// 倒计时逻辑
function startCountdown() {
    let countdownInterval = setInterval(() => {
        if (countdown > 1) {
            countdown--;
            document.getElementById('countImg').src = `Count_${countdown}.png`;
        } else {
            clearInterval(countdownInterval);
            document.getElementById('countdown').style.display = 'none';
            startRace();
        }
    }, 1000);
}

// 用户点击加速
document.body.addEventListener('click', () => {
    playerSwanSpeed += 2; // 减少每次点击对速度的影响
});

function startRace() {
    let raceInterval = setInterval(() => {
        // 移动AI天鹅
        aiSwans.forEach(ai => {
            let swanElement = document.getElementById(ai.id);
            let currentPos = swanElement.offsetLeft;
            swanElement.style.left = (currentPos + ai.speed) + 'px';
        });

        // 移动用户天鹅
        let playerSwan = document.getElementById('playerSwan');
        let currentPlayerPos = playerSwan.offsetLeft;
        playerSwan.style.left = (currentPlayerPos + playerSwanSpeed) + 'px';
        playerSwanSpeed *= 0.9;

        // 判断是否到达终点
        if (currentPlayerPos + playerSwan.clientWidth >= window.innerWidth) {
            clearInterval(raceInterval);
            document.getElementById('success').style.display = 'block';
        }
    }, 50);
}

// 解析URL参数
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const swan = params.get('swan');
    const name = params.get('name');
    return { swan, name };
}

// 加载页面时，显示用户选择的天鹅和名字
window.onload = function() {
    const { swan, name } = getQueryParams();

    // 根据选择的天鹅编号显示相应图片
    if (swan) {
        document.getElementById('playerSwan').querySelector('img').src = `${swan}.png`;
    }

    // 显示用户输入的名字
    if (name) {
        document.getElementById('playerName').textContent = decodeURIComponent(name);
    }
};