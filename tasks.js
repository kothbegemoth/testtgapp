//событие нажал на кнопку задачи
document.getElementById('tasksBtn').addEventListener('click', newTask)

//пишем текст задачки
function newTask() {
        const index = Math.floor(Math.random() * tasks.length);
        document.getElementById('currentTask').dataset.index = index;
        const currentTask = tasks[index]
        document.getElementById('currentTask').textContent=currentTask.question;
}


//событие нажал на кнопку проверить
document.getElementById('checkAnswer').addEventListener('click', showFeedback)

const feedbackModal = document.getElementById('feedbackModal');
const feedbackText = document.getElementById('feedbackText');
const checkBtn = document.getElementById('checkAnswer');

// Показываем модалку с проверкой
function showFeedback() {

    // Отключаем кнопку
    checkBtn.disabled = true;

    //Показываем модалку сразу
    feedbackText.innerHTML = "Проверка ответа..."; // можно показать loader
    feedbackModal.style.display = 'flex';
    askOpenAI().then(result => {
        feedbackText.innerHTML = result;
    });
}

// Закрытие модалки
document.querySelector('.close').addEventListener('click', () => {
    feedbackModal.style.display = 'none';
// Включаем кнопку обратно
    checkBtn.disabled = false;
    document.getElementById('studentAnswer').value = "";
});

// Кнопка "Следующая задача"
document.getElementById('nextTaskBtn').addEventListener('click', () => {
    feedbackModal.style.display = 'none';
    checkBtn.disabled = false;
    document.getElementById('studentAnswer').value = ""
    newTask();
});


//нейронка 

async function askOpenAI() {
    // таймаут
    const TIMEOUT_MS = 25000;
    let timeoutId;

    try {
    //подключаемся к нейронке
        const apiKey = atob('c2stcHJvai1ybFZJVTB3T0hhdzFGTmx6ZWpUU0FidG1xVEw2ZkZIUDN1Qkx3SzI0ZjMxc21JSnNqcmd0Ulltc1p4R1ZSRVc0a0hqdGxFUzZBSVQzQmxia0ZKTVNGZllIUFRNUEVrMnJ5bW9xREtPQ1VmVGJzaG9oRk42Q1dzZmdhWXRiZlhqWXRmRENxTEFhOEdLMVdIZG9tZlUzNTNEeTgyd0E=')
        
        // Создаем промис для таймаута
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                reject(new Error('Превышено время ожидания ответа от сервера'));
            }, TIMEOUT_MS);
        });

        // Создаем промис для запроса к API
        const apiPromise = fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messageForAI()
            })
        });

        // Используем Promise.race для соревнования между запросом и таймаутом
        const response = await Promise.race([apiPromise, timeoutPromise]);
        
        // Если ответ получен, отменяем таймаут
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Ошибка сети');

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Не получилось получить ответ";
    }
    catch (error){
        return `Ошибка: ${error.message}`;
    }
}

    //сообщение для нейронки
function messageForAI(){
    //берем текст задачки и реф ответа
    const index = document.getElementById('currentTask').dataset.index;
    const currentTask = tasks[index];
    const questionText = currentTask.question;
    const referenceAnswer = currentTask.reference;
    const studentAnswer = document.getElementById('studentAnswer').value;

    message = [
                { role: "system", content: "Ты оцениваешь ответ студента. Сравни эталон ответа с ответом студента. Перечисли студенту недочеты и тд. Дай оценку от 1 до 5 и краткий комментарий. " },
                { role: "user", content: `Задача: ${questionText}\nЭталон ответа: ${referenceAnswer}\nОтвет студента: ${studentAnswer}` }
            ]
            
    testmessage = [
                { role: "system", content: ""},
                { role: "system", content: "Мне задали задачу по анатомии, в учебнике даны верные ответы, но я их не подсматриваю. Дай мне оценку (совсем неверно/неверно/не совсем верно/верно - укрась эмодзи) и дай свой комментарий - совет, как можно улучшить свой ответ(чем подробнее ты мне объяснишь, тем лучше). Уложись в 10 предложений.\nЗадача:\nАнтропометрические наблюдения позволили характеризовать типичные для старческого возраста изменения грудной клетки.\n1. Укажите, как изменяется в старости форма и размеры грудной клетки?\n2. Назовите две возможные причины этих изменений.\nВерный ответ:\n1.Грудная клетка становится более длинной и плоской.\n2. Снижение тонуса мускулатуры и опускание передних концов ребер.\nМой ответ:\nИз-за возраста атрофируются мышцы, уменьшается их тонус из-за чего происходит опущение ребер и грудная клетка становится уже."}
            ]
    return testmessage
}    

document.addEventListener('DOMContentLoaded', newTask());
