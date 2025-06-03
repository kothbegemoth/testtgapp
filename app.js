const tg = window.Telegram.WebApp;
tg.expand(); // Раскрыть на весь экран

document.getElementById('myButton').addEventListener('click', () => {
    tg.showAlert(print());
});

document.getElementById('profileBtn').addEventListener('click', function() {
            const profile = document.getElementById('userProfile');
            if (profile.style.display === 'block') {
                profile.style.display = 'none';
            } else {
                profile.style.display = 'block';
            }
        });

function print() {
     const user = Telegram.WebApp.initDataUnsafe.user;
  
    if (user) {
        return user
    }
}