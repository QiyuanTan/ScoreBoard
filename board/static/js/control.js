function set_timer(act) {
    $.ajax({
        url: '/set_timer/',
        type: 'post',
        data: {
            action: act
        },
        success: function (res) {
            //console.log(res);
            update_race_status();
        }
    });
}

function update_race_status() {
    fetch('/request_score/')
        .then(response => response.json())
        .then(data => {
            if (data.timer.start === data.timer.end) {
                document.getElementById('startbtn').classList = "btn btn-primary";
                document.getElementById('startbtn').disabled = false;
                document.getElementById('pausebtn').classList = "btn btn-primary disabled";
                document.getElementById('pausebtn').disabled = true;
                document.getElementById('resumebtn').classList = "btn btn-primary disabled";
                document.getElementById('resumebtn').disabled = true;
            } else if (data.timer.end) {
                document.getElementById('startbtn').classList = "btn btn-primary disabled";
                document.getElementById('startbtn').disabled = true;
                document.getElementById('pausebtn').classList = "btn btn-primary disabled";
                document.getElementById('pausebtn').disabled = true;
                document.getElementById('resumebtn').classList = "btn btn-primary";
                document.getElementById('resumebtn').disabled = false;
            } else {
                document.getElementById('startbtn').classList = "btn btn-primary disabled";
                document.getElementById('startbtn').disabled = true;
                document.getElementById('pausebtn').classList = "btn btn-primary";
                document.getElementById('pausebtn').disabled = false
                document.getElementById('resumebtn').classList = "btn btn-primary disabled";
                document.getElementById('resumebtn').disabled = true;
            }
        })
}

function updateTeamNames() {
    fetch('/update_raceinfo/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('team1').children[0].innerText = data.team1.name;
            document.getElementById('team2').children[0].innerText = data.team2.name;
            // document.getElementById('race-name').innerText = data.race_name;
        })
        .catch(error => console.error('Error fetching team names:', error));
}

function updateScoreboard() {
    fetch('/request_score/')
        .then(response => response.json())
        .then(data => {

            timer_start = data.timer.start * 1000;
            timer_end = data.timer.end * 1000;

            if (data.timer.start === data.timer.end) {
                document.getElementById('race_status').innerText = "比赛未开始";
            } else if (data.timer.end) {
                document.getElementById('race_status').innerText = "比赛已暂停";

            } else {
                document.getElementById('race_status').innerText = "";
            }

            if (data.race !== lastRace) {
                lastRace = data.race;
                updateTeamNames();
            }
        })
        .catch(error => console.error('Error fetching score:', error));
}


let lastRace = null;

function updateScore(delta1, delta2) {
    $.ajax({
        url: '/update_score/',
        type: 'post',
        data: {
            score1: delta1,
            score2: delta2
        },
        success: function (res) {
            console.log(res);
        }
    });
}

function exchange() {
    $.ajax({
        url: '/exchange/',
        type: 'post',
        data: {},
        success: function (res) {
            console.log(res);
        }
    });
}


update_race_status();
updateTeamNames();
setInterval(updateTeamNames, 1000);