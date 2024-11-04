let balance = 1000; // Стартовый баланс

// Проверка возраста
document.getElementById('age-confirm-yes').addEventListener('click', function() {
    document.getElementById('age-confirmation').style.display = 'none';
    document.getElementById('login-section').classList.remove('hidden');
});

document.getElementById('age-confirm-no').addEventListener('click', function() {
    alert('Доступ к казино запрещен. Вы должны быть старше 18 лет.');
    window.close(); // Закрыть окно (в некоторых браузерах может не сработать)
});

// Обработка входа в казино
document.getElementById('login-btn').addEventListener('click', function() {
    let lastName = document.getElementById('last-name').value;
    let firstName = document.getElementById('first-name').value;
    let middleName = document.getElementById('middle-name').value;
    let birthDate = document.getElementById('birth-date').value;
    let inn = document.getElementById('inn').value;
    let passportId = document.getElementById('passport-id').value;

    if (lastName && firstName && middleName && birthDate && inn && passportId) {
        console.log('Фамилия: ' + lastName);
        console.log('Имя: ' + firstName);
        console.log('Отчество: ' + middleName);
        console.log('Дата рождения: ' + birthDate);
        console.log('ИНН: ' + inn);
        console.log('ID паспорта: ' + passportId);

        // Переход к разделу баланса
        document.getElementById('balance-section').classList.remove('hidden');
        document.getElementById('login-section').classList.add('hidden');
    } else {
        alert('Пожалуйста, заполните все поля');
    }
});

// Обновление баланса с ограничением в 100000 за раз
document.getElementById('deposit-btn').addEventListener('click', function() {
    let depositAmount = parseInt(document.getElementById('deposit-amount').value);

    if (depositAmount && depositAmount > 0) {
        if (depositAmount <= 100000) {
            balance += depositAmount;
            document.getElementById('balance').innerText = balance;
            console.log('Баланс пополнен на: ' + depositAmount + ' ₽');
        } else {
            alert('Максимальная сумма пополнения за один раз: 100000 ₽');
        }
    } else {
        alert('Введите корректную сумму пополнения');
    }
});

// Переход к разделу ставок
document.getElementById('go-to-bet-btn').addEventListener('click', function() {
    document.getElementById('bet-section').classList.remove('hidden');
    document.getElementById('balance-section').classList.add('hidden');
});

// Обработка ставки и переход к игре
document.getElementById('bet-btn').addEventListener('click', function() {
    let cardNumber = document.getElementById('card-number').value;
    let expiryDate = document.getElementById('expiry-date').value;
    let cvv = document.getElementById('cvv').value;
    let betAmount = parseInt(document.getElementById('bet-amount').value);

    if (cardNumber && expiryDate && cvv && betAmount && betAmount <= balance) {
        console.log('Номер карты: ' + cardNumber);
        console.log('Срок годности: ' + expiryDate);
        console.log('CVV: ' + cvv);
        console.log('Сумма ставки: ' + betAmount + ' ₽');

        // Переход к игровому разделу
        document.getElementById('game-section').classList.remove('hidden');
        document.getElementById('bet-section').classList.add('hidden');
    } else {
        alert('Пожалуйста, заполните все поля и убедитесь, что сумма ставки не превышает ваш баланс.');
    }
});

// Логика игры и вероятности выигрыша с анимацией рулетки
document.getElementById('play-game-btn').addEventListener('click', function() {
    let betAmount = parseInt(document.getElementById('bet-amount').value);
    let result = document.getElementById('result');
    let roulette = document.getElementById('roulette');

    // Запускаем анимацию рулетки
    roulette.classList.add('spin');
    
    // Останавливаем анимацию и показываем результат через 4 секунды
    setTimeout(function() {
        roulette.classList.remove('spin');
        
        // Определяем результат
        let winColor = Math.random(); // 0-1
        let winAmount;

        if (winColor < 0.3) { // 30% вероятность выигрыша (зеленый)
            winAmount = betAmount * 2;
            balance += winAmount;
            result.innerText = 'Вы выиграли: ' + winAmount + ' ₽!';
            result.style.color = 'green';
        } else { // 70% вероятность проигрыша (красный)
            balance -= betAmount;
            result.innerText = 'Вы проиграли: ' + betAmount + ' ₽!';
            result.style.color = 'orange';
        }

        document.getElementById('balance').innerText = balance;

        // Проверяем, есть ли еще баланс для игры
        if (balance <= 0) {
            alert('Ваш баланс равен 0. Пополните счет для продолжения игры.');
            document.getElementById('balance-section').classList.remove('hidden');
            document.getElementById('game-section').classList.add('hidden');
        } else {
            let playAgain = confirm('Хотите сыграть еще раз?');
            if (playAgain) {
                result.innerText = ''; // Очистить предыдущий результат
                document.getElementById('bet-section').classList.remove('hidden');
                document.getElementById('game-section').classList.add('hidden');
            } else {
                alert('Спасибо за игру!');
            }
        }
    }, 4000); // Ожидание завершения анимации (4 секунды)
});

// Кнопка "Вернуться назад"
document.getElementById('back-btn').addEventListener('click', function() {
    document.getElementById('game-section').classList.add('hidden');
    document.getElementById('bet-section').classList.remove('hidden');
    document.getElementById('result').innerText = ''; // Очистить результат
});