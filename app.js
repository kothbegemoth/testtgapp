const tg = window.Telegram.WebApp;
tg.expand(); // Раскрыть на весь экран


if (window.Telegram && Telegram.WebApp) {
  const user = Telegram.WebApp.initDataUnsafe.user;
  
  if (user) {
    tg.showAlert("Данные пользователя:", user);
    
    // Доступные поля:
    const userId = user.id; // ID пользователя
    const firstName = user.first_name; // Имя
    const lastName = user.last_name; // Фамилия (может отсутствовать)
    const username = user.username; // Ник (@username)
    const photoUrl = user.photo_url; // Аватар (URL)
    
    // Используем данные в интерфейсе
    document.getElementById('user-name').textContent = `${firstName} ${lastName || ''}`;
    document.getElementById('user-avatar').src = photoUrl || 'default-avatar.jpg';
  }
}

document.getElementById('profileBtn').addEventListener('click', function() {
            const profile = document.getElementById('userProfile');
            if (profile.style.display === 'block') {
                profile.style.display = 'none';
            } else {
                profile.style.display = 'block';
            }
        });