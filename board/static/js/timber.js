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

// updateTimer();

setInterval(updateTimer, 50);