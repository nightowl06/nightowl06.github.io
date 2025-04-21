// Пример JavaScript для добавления интерактивности
// Можно использовать для отображения/скрытия дополнительных секций или деталей
const interestsSection = document.querySelector('.interests');
if (interestsSection) {
    interestsSection.addEventListener('click', () => {
        interestsSection.classList.toggle('expanded');
    });
}

