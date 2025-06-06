const tg = window.Telegram.WebApp;
tg.expand(); // Раскрыть на весь экран

document.getElementById('profileBtn').addEventListener('click', showUserInfo)
    
function showUserInfo() {
            // Проверяем, что мы в Telegram WebApp
    if (window.Telegram && Telegram.WebApp) 
    {
        const user = Telegram.WebApp.initDataUnsafe.user;            
        if (user) {
                    // Заполняем данные пользователя
            document.getElementById('user-name').textContent = 
                        `${user.first_name} ${user.last_name || ''}`.trim();                    
            document.getElementById('user-username').textContent = 
                        user.username ? `@${user.username}` : 'Юзернейм не указан';
            document.getElementById('user-id').textContent = `ID: ${user.id}`;
                    
            if (user.photo_url) 
            {
                document.getElementById('user-avatar').src = user.photo_url;
            }
                    // Показываем блок с информацией
            document.getElementById('user-info').style.display = 'block';
                
            document.getElementById('user-progress-tests').textContent = "Пройдено х тестов из уй";
            document.getElementById('user-progress-tasks').textContent = "Прорешено х задач из уй";
            document.getElementById('user-progress-lections').textContent = "Прочитано х билетов из уй";
                }
        else 
        {
            alert('Данные пользователя не доступны');
        }
    } 
    else 
    {
        alert('Это работает только в Telegram!');
    }
}

document.addEventListener('DOMContentLoaded', 
    setTimeout(showUserInfo, 500));
