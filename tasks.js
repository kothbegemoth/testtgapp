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

const feedbackModal = document.getElementById('feedbackModal');
const feedbackText = document.getElementById('feedbackText');

// Показываем модалку с проверкой
function showFeedback() {
    askOpenAI().then(result => {
        feedbackText.innerHTML = result;
        feedbackModal.style.display = 'flex';
    });
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


//нейронка 

async function askOpenAI() {
    const apiKey = atob('c2stcHJvai1ybFZJVTB3T0hhdzFGTmx6ZWpUU0FidG1xVEw2ZkZIUDN1Qkx3SzI0ZjMxc21JSnNqcmd0Ulltc1p4R1ZSRVc0a0hqdGxFUzZBSVQzQmxia0ZKTVNGZllIUFRNUEVrMnJ5bW9xREtPQ1VmVGJzaG9oRk42Q1dzZmdhWXRiZlhqWXRmRENxTEFhOEdLMVdIZG9tZlUzNTNEeTgyd0E=')
    const response = await fetch("https://api.openai.com/v1/chat/completions", 
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
              model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Ты оцениваешь ответы студентов. Дай оценку от 1 до 5 и краткий комментарий." },
                { role: "user", content: "Задача: 'Назовите столицу Франции'\nЭталон: 'Париж'\nОтвет студента: 'Марсель'" }
            ]
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "Ошибка";

    }







document.addEventListener('DOMContentLoaded', newTask());