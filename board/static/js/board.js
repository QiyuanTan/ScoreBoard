function updateScoreboard() {
    fetch('http://localhost:8000/update_score/')
        .then(response => response.json())
        .then(data => {

            document.getElementById('team1').children[0].innerText = data.score1;
            document.getElementById('team2').children[0].innerText = data.score2;

            if (data.race !== lastRace) {
                lastRace = data.race;
                updateTeamNames();
            }
        })
        .catch(error => console.error('Error fetching score:', error));
}

function updateTeamNames() {
    fetch('http://localhost:8000/update_raceinfo/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('team1').children[1].innerText = data.team1.name;
            document.getElementById('team2').children[1].innerText = data.team2.name;
        })
        .catch(error => console.error('Error fetching team names:', error));
}

function adjustFontSize(containerSelector, targetSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
        let target = container.querySelector(targetSelector);
        let fontSize = parseInt(window.getComputedStyle(target, null).getPropertyValue('font-size'));

        // 减小字体大小直到内容不再溢出
        while (target.scrollWidth > container.clientWidth && fontSize > 0) {
            fontSize--;
            target.style.fontSize = fontSize + 'px';
        }
    });
}


let lastRace = null;

updateScoreboard();

setInterval(updateScoreboard, 3000);

