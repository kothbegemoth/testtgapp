//событие нажал на кнопку задачи
document.getElementById('tasksBtn').addEventListener('click', newTask)

//пишем текст задачки
function newTask() {
    if (window.Telegram && Telegram.WebApp) 
    {
        document.getElementById('currentTask').textContent="Текст задачки";
    }
}

//событие нажал на кнопку проверить
document.getElementById('checkAnswer').addEventListener('click', showFeedback)

function showFeedback() {
    if (window.Telegram && Telegram.WebApp) {
        tg.showAlert('Тут будет проверка ответа на задачку\n\n\n\n\n\n\n\n\n\n\n\n\ут будет проверка ответа на задачку\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfghnfxjnsrzfjnzjnz!n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfghnfxjnsrzfjnzjnz!');
        newTask;
    }
    else {
        alert('Тут будет проверка ответа на задачку!')
    }
}

document.addEventListener('DOMContentLoaded', 
    setTimeout(newTask, 500));