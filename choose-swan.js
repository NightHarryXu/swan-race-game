let selectedSwan = null;

function selectSwan(swanNumber) {
    // Remove selected class from all swans
    for (let i = 1; i <= 6; i++) {
        document.getElementById('swan' + i).classList.remove('selected');
    }

    // Add selected class to the chosen swan
    selectedSwan = swanNumber;
    document.getElementById('swan' + swanNumber).classList.add('selected');

    // Update the Ready button
    document.getElementById('readyButton').src = 'Ready_Button_Yes.png';
    document.getElementById('readyButton').classList.add('active');
}

// When user clicks the Ready button, send selected swan and name (you can handle this part later)
document.getElementById('readyButton').addEventListener('click', function() {
    if (selectedSwan !== null) {
        const playerName = document.getElementById('playerName').value;
        if (playerName.trim()) {
            // Here you can add logic to send selectedSwan and playerName to the server
            console.log('Player selected swan ' + selectedSwan + ' with name ' + playerName);
        } else {
            alert('Please enter a name for your swan.');
        }
    }
});