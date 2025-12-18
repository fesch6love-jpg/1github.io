// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Закрыть меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Табы мест
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

if (tabBtns.length > 0) {
    // Показать первый таб при загрузке
    tabPanes[0]?.classList.add('active');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убрать активный класс у всех кнопок
            tabBtns.forEach(b => b.classList.remove('active'));
            // Добавить активный класс текущей кнопке
            btn.classList.add('active');
            
            // Показать соответствующий контент
            const tabId = btn.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// Форма бронирования
const bookingForm = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');

if (bookingForm) {
    // Установить минимальную дату - сегодня
    const today = new Date().toISOString().split('T')[0];
    bookingForm.querySelector('input[type="date"]').min = today;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собрать данные формы