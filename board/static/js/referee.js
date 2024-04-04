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
            this.displayBoard()
        }, 200);
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


    async sendRaceInfo() {
        $.ajax({
            url: '/change_raceinfo/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'update_state': 'all',

                'team1_name': this.raceInfo.team1.name,
                'team1_score': this.raceInfo.team1.score,
                'team1_total_score': this.raceInfo.team1.total_score,

                'team2_name': this.raceInfo.team2.name,
                'team2_score': this.raceInfo.team2.score,
                'team2_total_score': this.raceInfo.team2.total_score,

                'timer_start': this.raceInfo.timer.start,
                'timer_end': this.raceInfo.timer.end,
            }),
            success: function (res) {
                console.log(res)
            }
        })
    }

    async sendTimer() {
        $.ajax({
            url: '/change_raceinfo/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'update_state': 'timer',

                'timer_start': this.raceInfo.timer.start,
                'timer_end': this.raceInfo.timer.end,
            }),
            success: function (res) {
                console.log(res)
            }
        })
    }

    async sendScore() {
        $.ajax({
            url: '/change_raceinfo/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'update_state': 'score',

                'team1_score': this.raceInfo.team1.score,
                'team1_total_score': this.raceInfo.team1.total_score,

                'team2_score': this.raceInfo.team2.score,
                'team2_total_score': this.raceInfo.team2.total_score,
            })
        })
    }


    displayBoard() {
        // board
        if (this.raceInfo.team1.name && this.raceInfo.team1.score !== null) {
            document.getElementById('team1_score').innerText = this.raceInfo.team1.name + ':' + this.raceInfo.team1.score;
        }

        if (this.raceInfo.team1.name && this.raceInfo.team1.total_score !== null) {
            document.getElementById('team1_total_score').innerText = this.raceInfo.team1.name + ' (total score):' + this.raceInfo.team1.total_score;
        }

        if (this.raceInfo.team2.name && this.raceInfo.team2.score !== null) {
            document.getElementById('team2_score').innerText = this.raceInfo.team2.name + ':' + this.raceInfo.team2.score;
        }

        if (this.raceInfo.team2.name && this.raceInfo.team2.total_score !== null) {
            document.getElementById('team2_total_score').innerText = this.raceInfo.team2.name + ' (total score):' + this.raceInfo.team2.total_score;
        }

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

        this.updateButtonStates();
        const timerDisplayElement = document.getElementById("timerDisplay");
        if (timerDisplayElement) {
            timerDisplayElement.innerText = display;
        }
    }


    updateButtonStates() {
        const {start, end} = this.raceInfo.timer;
        if (start && !end) {
            // 计时器正在运行
            document.getElementById('timer_start').classList.add('disabled');
            document.getElementById('timer_start').disabled = true;
            document.getElementById('timer_pause').classList.remove('disabled');
            document.getElementById('timer_pause').disabled = false;
            document.getElementById('timer_reset').classList.remove('disabled');
            document.getElementById('timer_reset').disabled = true;
        } else if (!start) {
            // 计时器未开始
            document.getElementById('timer_start').classList.remove('disabled');
            document.getElementById('timer_start').disabled = false;
            document.getElementById('timer_pause').classList.add('disabled');
            document.getElementById('timer_pause').disabled = true;
            document.getElementById('timer_reset').classList.add('disabled');
            document.getElementById('timer_reset').disabled = true;
        } else if (start && end) {
            // 计时器已暂停
            document.getElementById('timer_start').classList.remove('disabled');
            document.getElementById('timer_start').disabled = true;
            document.getElementById('timer_pause').classList.remove('disabled');
            document.getElementById('timer_pause').disabled = false;
            document.getElementById('timer_reset').classList.remove('disabled');
            document.getElementById('timer_reset').disabled = false;
        }
    }


    start_timer() {
        const now = new Date();
        const referenceDate = new Date('2024-04-01T00:00:00');
        this.raceInfo.timer.start = now.getTime() - referenceDate.getTime();
        this.raceInfo.timer.end = 0;
        this.sendTimer();
    }

    pause_resume_timer() {
        const now = new Date();
        const referenceDate = new Date('2024-04-01T00:00:00');
        const nowTimestamp = now.getTime() - referenceDate.getTime();

        if (this.raceInfo.timer.end === 0) {
            this.raceInfo.timer.end = nowTimestamp;
        } else {
            const pausedDuration = nowTimestamp - this.raceInfo.timer.end;
            this.raceInfo.timer.start += pausedDuration;
            this.raceInfo.timer.end = 0;
        }
        this.sendTimer();
    }


    reset_timer() {
        this.raceInfo.timer.start = 0;
        this.raceInfo.timer.end = 0;
        this.sendTimer();
    }


// mutators
// set all score to 0
    clearAllScore() {
        this.raceInfo.team1.score = 0;
        this.raceInfo.team2.score = 0;
        this.raceInfo.team1.total_score = 0;
        this.raceInfo.team2.total_score = 0;
        this.sendRaceInfo()
    }

// score increase & decrease
    changeTeam1Score(num) {
        this.raceInfo.team1.score += parseInt(num);
        this.sendScore()
    }

    changeTeam2Score(num) {
        this.raceInfo.team2.score += parseInt(num);
        this.sendScore()
    }

// total score increase and decrease
    changeTeam1TotalScore(num) {
        this.raceInfo.team1.total_score += parseInt(num);
        this.sendScore()
    }

    changeTeam2TotalScore(num) {
        this.raceInfo.team2.total_score += parseInt(num);
        this.sendScore()
    }


// exchange
    exchangeTeams() {
        const tempTeam = {...this.raceInfo.team1};
        this.raceInfo.team1 = {...this.raceInfo.team2};
        this.raceInfo.team2 = {...tempTeam};
        this.sendRaceInfo()
    }
}

const raceManager = new RaceInfoManager();
raceManager.fetchRaceInfo();

