//событие нажал на кнопку задачи
document.getElementById('tasksBtn').addEventListener('click', newTask)

//пишем текст задачки
function newTask() {
    if (window.Telegram && Telegram.WebApp) 
    {
        document.getElementById('currentTask').textContent="Текст задачки";
    }
}

/*
//событие нажал на кнопку проверить
document.getElementById('checkAnswer').addEventListener('click', showFeedback)

function showFeedback() {
    if (window.Telegram && Telegram.WebApp) {
        tg.showAlert('Тут будет проверка ответа на задачку');
        newTask;
    }
    else {
        alert('Тут будет проверка ответа на задачку!')
    }
}
*/

const feedbackModal = document.getElementById('feedbackModal');
const feedbackText = document.getElementById('feedbackText');

// Показываем модалку с проверкой
function showFeedback() {
    const isCorrect = checkAnswer(); // Ваша логика проверки
    
    feedbackText.innerHTML = isCorrect 
        ? "✅ Ответ правильный!✅ Ответ правильный!✅ Ответ правильный!\n".repeat(100) 
        : "❌ Попробуйте ещё раз. Подсказка: ...";
    
    feedbackModal.style.display = 'flex';
}

// Закрытие модалки
document.querySelector('.close').addEventListener('click', () => {
    feedbackModal.style.display = 'none';
});

// Кнопка "Следующая задача"
document.getElementById('nextTaskBtn').addEventListener('click', () => {
    feedbackModal.style.display = 'none';
    newTask();
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Для Telegram WebApp
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand(); // Раскрываем на весь экран
    }
    
    setTimeout(newTask, 500);
});

// Заглушка для проверки ответа (замените на свою логику)
function checkAnswer() {
    return Math.random() > 0.5; // Пример: 50% шанс правильного ответа
}

document.addEventListener('DOMContentLoaded', 
    setTimeout(newTask, 500));