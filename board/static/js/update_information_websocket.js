// JS for websocket
class RaceInfoManager {
    constructor() {
        this.raceInfo = {
            'race_name': '',
            'race': '',
            'team1': {
                'name': '',
                'score': 0,
                'total_score': 0,
            },
            'team2': {
                'name': '',
                'score': 0,
                'total_score': 0,
            },
            'timer': {
                'start': 0,
                'end': 0,
            }
        };
        this.websocket = new WebSocket('ws://' + window.location.host + '/ws/raceinfo/');


        setInterval(() => {
            this.displayBoard();
        }, 50);
    }



    displayBoard() {
        // board
        // race name
        document.getElementById('race_name').innerText = this.raceInfo.race_name;
        // score
        document.getElementById('team1_score').innerText = this.raceInfo.team1.score;
        document.getElementById('team2_score').innerText = this.raceInfo.team2.score;

        // total score
        document.getElementById('team1_total_score').innerText = this.raceInfo.team1.total_score;
        document.getElementById('team2_total_score').innerText = this.raceInfo.team2.total_score;

        // name
        document.getElementById('team1_name').innerText = this.raceInfo.team1.name;
        document.getElementById('team2_name').innerText = this.raceInfo.team2.name;

        // timer
        let display;
        if (this.raceInfo.timer.start === 0) {
            display = "计时器未开始";
        } else if (this.raceInfo.timer.end) {
            const timer = this.raceInfo.timer.end - this.raceInfo.timer.start;
            const minutes = Math.floor(timer / (60 * 1000));
            const seconds = Math.floor((timer / 1000) % 60);
            display = `比赛已暂停：${minutes}分${seconds < 10 ? '0' : ''}${seconds}秒`;
        } else {
            const currentTimestamp = Date.now() - new Date('2024-04-01T00:00:00').getTime();
            const timer = currentTimestamp - this.raceInfo.timer.start;
            const minutes = Math.floor(timer / (60 * 1000));
            const seconds = Math.floor((timer / 1000) % 60);
            display = `比赛进行中：${minutes}分${seconds < 10 ? '0' : ''}${seconds}秒`;
        }

        const timerDisplayElement = document.getElementById("timerDisplay");
        if (timerDisplayElement) {
            timerDisplayElement.innerText = display;
        }
    }


}

const raceManager = new RaceInfoManager();
raceManager.fetchRaceInfo();

