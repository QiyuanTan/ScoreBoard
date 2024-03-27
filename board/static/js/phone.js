function sendText() {
    var userInput = document.getElementById('userInput').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "服务器URL", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("文本发送成功");
        }
    };
    xhr.send("text=" + encodeURIComponent(userInput));
}