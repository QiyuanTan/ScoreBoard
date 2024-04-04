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
        setInterval(() => {
            this.displayBoard();
        }, 50);
        setInterval(() => {
            this.fetchScore();
        }, 200);
    }

    async fetchScore() {
        try {
            const response = await fetch('/update_raceinfo/');
            const data = await response.json();

            // 直接检查 data 对象是否具有期望的属性
            if (data && typeof data === 'object' && 'race' in data && 'team1' in data && 'team2' in data && 'timer' in data) {
                // 现在直接从 data 而不是 data.raceInfo 读取信息
                if (data.race === this.raceInfo.race) {
                    this.raceInfo.team1.score = parseInt(data.team1.score);
                    this.raceInfo.team1.total_score = parseInt(data.team1.total_score);
                    this.raceInfo.team2.score = parseInt(data.team2.score);
                    this.raceInfo.team2.total_score = parseInt(data.team2.total_score);
                    this.raceInfo.timer = {...data.timer};
                } else {
                    this.fetchRaceInfo();
                }
            } else {
                console.error('Invalid or missing data structure:', data);
            }

        } catch (error) {
            console.error('Error fetching update race info:', error);
        }
    }


    async fetchRaceInfo() {
        try {
            const response = await fetch('/request_raceinfo/');
            const data = await response.json();

            if (data && typeof data === 'object') {
                // Convert score and total_score to integers
                data.team1.score = parseInt(data.team1.score);
                data.team1.total_score = parseInt(data.team1.total_score);
                data.team2.score = parseInt(data.team2.score);
                data.team2.total_score = parseInt(data.team2.total_score);

                data.timer.start = parseInt(data.timer.start);
                data.timer.end = parseInt(data.timer.end);

                this.raceInfo = {...data};
                this.displayBoard();
                console.log('Race info received:', this.raceInfo);
            } else {
                console.error('Invalid data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching race info:', error);
        }
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

