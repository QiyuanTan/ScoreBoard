function updateScoreboard() {
    fetch('request_score/')
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
    fetch('update_raceinfo/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('team1').children[1].innerText = data.team1.name;
            document.getElementById('team2').children[1].innerText = data.team2.name;
            document.getElementById('race-name').innerText = data.race_name;
        })
        .catch(error => console.error('Error fetching team names:', error));
}


let lastRace = null;

updateScoreboard();

setInterval(updateScoreboard, 1000);

