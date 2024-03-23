function updateScoreboard() {
    fetch('/request_score/')
        .then(response => response.json())
        .then(data => {

            document.getElementById('team1').children[0].innerText = data.score1;
            document.getElementById('team2').children[0].innerText = data.score2;
            timer_start = data.timer.start*1000;
            timer_end = data.timer.end*1000;

            if(data.timer.start === data.timer.end){
                document.getElementById('race_status').innerText = "比赛未开始";
            }
            else if(data.timer.end){
                document.getElementById('race_status').innerText = "比赛已暂停";

            }
            else{
                document.getElementById('race_status').innerText = "";
            }

            if (data.race !== lastRace) {
                lastRace = data.race;
                updateTeamNames();
            }
        })
        .catch(error => console.error('Error fetching score:', error));
}

function updateTeamNames() {
    fetch('/update_raceinfo/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('team1').children[1].innerText = data.team1.name;
            document.getElementById('team2').children[1].innerText = data.team2.name;
            document.getElementById('race_name').innerText = data.race_name;
        })
        .catch(error => console.error('Error fetching team names:', error));
}


let lastRace = null;
let timer_start = null
let timer_end = null

function updateTimer(){
    let timestamp;
    let timer;
    if (timer_end) {
        timer = timer_end - timer_start
        document.getElementById('min').innerText = parseInt(timer / (60*1000));
        document.getElementById('sec').innerText = parseInt(timer/1000) % 60;
        // document.getElementById('msec').innerText = parseInt((parseInt(timer) % 1000)/10);
    }
    else {
        timestamp = parseInt(new Date().getTime());
        timer = timestamp - timer_start;
        document.getElementById('min').innerText = parseInt(timer / (60*1000));
        document.getElementById('sec').innerText = parseInt(timer/1000) % 60;
        // document.getElementById('msec').innerText = parseInt((parseInt(timer) % 1000)/10);

    }
}

updateTeamNames()
updateScoreboard();
// updateTimer();

setInterval(updateScoreboard, 1000);
setInterval(updateTimer, 50);
