let raceInfo = null;
let timer_start = null;
let timer_end = null;

function requestRaceInfo() {
    fetch('request_raceinfo/')
        .then(response => response.json())
        .then(data => {
            raceInfo = data;
            timer_start = data.timer.start;
            timer_end = data.timer.end;
            displayboard(raceInfo);
        });
}


function changeScore() {

}


function displayTimer() {
    let timestamp;
    let timer;
    let display;

    if (timer_start === timer_end) {
        display = "计时器控制";
    } else if (timer_end) {
        // timer pause
        timer = timer_end - timer_start;
        diplay = '比赛已停止：' + parseInt(timer / (60*1000)) + '分' + parseInt((timer / 1000) % 60) + '秒';
    } else {
        // timer
        timestamp = parseInt(new Date().getTime());
        timer = timestamp - timer_start;
        diplay = '比赛进行中：' + parseInt(timer / (60*1000)) + '分' + parseInt((timer / 1000) % 60) + '秒';
    }
    document.getElementById(timer).innerText = display;
}

function displayBoard(data) {

    // display team1 score
    if (data.team1.name && data.team1.score) {
        document.getElementById(team1_score).innerText = data.team1.name + ':' + data.team1.score;
    }

    // display team1 total score
    if (data.team1.name && data.team1.total_score) {
        document.getElementById(team1_total_score).innerText = data.team1.name + ' (total score):' + data.team1.total_score;
    }

    // display team2 score
    if (data.team2.name && data.team2.score) {
        document.getElementById(team2_score).innerText = data.team2.name + ':' + data.team2.score;
    }

    // display team2 total score
    if (data.team2.name && data.team2.total_score) {
        document.getElementById(team2_total_score).innerText = data.team2.name + ' (total score):' + data.team2.total_score;
    }

}

function change_raceinfo() {
    $.ajax(
        {
            url: 'change_raceinfo',
            type: 'POST',
            data: {},
            success: function (response) {
                console.log(response);
            }
        }
    );
}