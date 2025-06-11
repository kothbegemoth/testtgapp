
document.getElementById('tasksBtn').addEventListener('click', newTask)

function newTask() {
    document.getElementById('currentTask').textContent="Текст задачки";
}

document.getElementById('checkAnswer').addEventListener('click', showFeedback)

function showFeedback() {
    if (window.Telegram && Telegram.WebApp) {
        tg.showAlert('Тут будет проверка ответа на задачку!');
    }
    alert('Тут будет проверка ответа на задачку!')
}

document.addEventListener('DOMContentLoaded', 
    setTimeout(newTask, 500));