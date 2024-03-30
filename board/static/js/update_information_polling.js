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
            display(raceInfo);
        });
}


function updateRaceInfo() {
    fetch('update_raceinfo/')
        .then(response => response.json())
        .then(data => {
            if (raceInfo.race !== data.race) {
                requestRaceInfo();
            } else {
                raceInfo = {...raceInfo, ...data};
                display(raceInfo);
            }
            updateTimer();
        });
}

function display(data) {
    // race name
    document.getElementById('race_name').innerText = data.race_name;
    // score
    document.getElementById('team1_score').innerText = data.team1.score;
    document.getElementById('team2_score').innerText = data.team2.score;

    // total score
    if (data.team1.total_score && data.team2.total_score){
        document.getElementById('team1_total_score').innerText = data.team1.total_score;
        document.getElementById('team2_total_score').innerText = data.team2.total_score;
    }

    // name
    if (data.team1.name && data.team2.name) {
        document.getElementById('team1_name').innerText = data.team1.name;
        document.getElementById('team2_name').innerText = data.team2.name;
    }

    //timer
    if (data.timer.start === data.timer.end) {
        document.getElementById('race_status').innerText = "比赛未开始：";
    } else if (data.timer.end) {
        document.getElementById('race_status').innerText = "比赛已暂停：";

    } else {
        document.getElementById('race_status').innerText = "比赛进行中：";
    }

}

function updateTimer() {
    let timestamp;
    let timer;
    if (timer_end) {
        timer = timer_end - timer_start
        document.getElementById('min').innerText = parseInt(timer / (60 * 1000));
        document.getElementById('sec').innerText = parseInt(timer / 1000) % 60;
        // document.getElementById('msec').innerText = parseInt((parseInt(timer) % 1000)/10);
    } else {
        timestamp = parseInt(new Date().getTime());
        timer = timestamp - timer_start;
        document.getElementById('min').innerText = parseInt(timer / (60 * 1000));
        document.getElementById('sec').innerText = parseInt(timer / 1000) % 60;
        // document.getElementById('msec').innerText = parseInt((parseInt(timer) % 1000)/10);

    }
}

requestRaceInfo();
// 计分板刷新频率
setInterval(updateRaceInfo, 100);
setInterval(updateTimer, 50);