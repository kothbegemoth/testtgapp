document.getElementById('profileBtn').onclick = showUserInfo;

// показать данные пользователя
function showUserInfo() {
            // Проверяем, что мы в Telegram WebApp
    if (window.Telegram && Telegram.WebApp) 
    {
        const user = Telegram.WebApp.initDataUnsafe.user;            
        if (user) {
                    // Заполняем данные пользователя
            document.getElementById('userName').textContent = 
                        `${user.first_name} ${user.last_name || ''}`.trim();                    
            document.getElementById('userUsername').textContent = 
                        user.username ? `@${user.username}` : 'Юзернейм не указан';
            document.getElementById('userId').textContent = `ID: ${user.id}`;
                    
            if (user.photo_url) 
            {
                document.getElementById('userAvatar').src = user.photo_url;
            }
                    // Показываем блок с информацией
            document.getElementById('userInfo').style.display = 'block';
            document.getElementById('userProgressTests').textContent = "Пройдено х тестов из уй";
            document.getElementById('userProgressTasks').textContent = "Прорешено х задач из уй";
            document.getElementById('userProgressLections').textContent = "Прочитано х билетов из уй";
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