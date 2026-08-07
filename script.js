// ============================================
// script.js — ПОЛНЫЙ ФАЙЛ ДЛЯ COLDSTAR
// ============================================

// ----- СНЕГ (задний фон) -----
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let snowflakes = [];
const SNOW_COUNT = 200;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function initSnow() {
    snowflakes = [];
    for (let i = 0; i < SNOW_COUNT; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            speed: Math.random() * 1.5 + 0.5,
            wind: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.6 + 0.4
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, width, height);

    const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    grad.addColorStop(0, '#0f0f1a');
    grad.addColorStop(1, '#05050a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    snowflakes.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        s.y += s.speed;
        s.x += s.wind + Math.sin(s.y * 0.01) * 0.1;

        if (s.y > height) {
            s.y = 0;
            s.x = Math.random() * width;
        }
        if (s.x > width) s.x = 0;
        if (s.x < 0) s.x = width;
    });

    requestAnimationFrame(drawSnow);
}

resizeCanvas();
initSnow();
drawSnow();

window.addEventListener('resize', () => {
    resizeCanvas();
    initSnow();
});

// ----- ШТОРКА -----
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const closeBtn = document.getElementById('closeSidebar');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuToggle) {
    menuToggle.addEventListener('click', openSidebar);
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
}

if (overlay) {
    overlay.addEventListener('click', closeSidebar);
}

// ----- STEAM ЛОГИН (ЗАГЛУШКА) -----
document.getElementById('steamLogin')?.addEventListener('click', () => {
    alert('🔐 Авторизация через Steam будет добавлена позже.');
});

// ----- ОБНОВЛЕНИЕ ОНЛАЙНА -----
if (document.getElementById('onlineCount')) {
    document.getElementById('onlineCount').textContent = '0';
}

// ----- ЗАГРУЗКА СЕРВЕРА (servers.html) -----
if (document.getElementById('serverShowcase')) {
    if (typeof SERVERS !== 'undefined' && SERVERS.length > 0) {
        const s = SERVERS[0];
        document.getElementById('serverShowcase').innerHTML = `
            <div class="server-card main-card">
                <div class="status online">🟢 ВКЛЮЧЁН</div>
                <div class="name">${s.name}</div>
                <div class="mode">${s.mode}</div>
                <div class="details">
                    <span>📍 ${s.location}</span>
                    <span>🖥️ ${s.players}</span>
                    <span>🗺️ ${s.map}</span>
                </div>
                <a href="steam://connect/${s.ip}" class="btn primary">▶ ПОДКЛЮЧИТЬСЯ</a>
            </div>
        `;
    }
}

// ----- ПРАВИЛА (60 ПУНКТОВ) -----
const RULES_DATA = [
    // РАЗДЕЛ 1: ОБЩИЕ ПРАВИЛА (1–10)
    { id: 1, section: "Общие правила", text: "Запрещено использовать любые читы, сторонние программы и скрипты, дающие преимущество.", punishment: "Перманентный бан" },
    { id: 2, section: "Общие правила", text: "Запрещено использовать баги, эксплойты и недоработки карт в своих интересах.", punishment: "Бан на 7 дней" },
    { id: 3, section: "Общие правила", text: "Запрещено создавать несколько аккаунтов для обхода бана.", punishment: "Перманентный бан всех аккаунтов" },
    { id: 4, section: "Общие правила", text: "Запрещено передавать свой аккаунт третьим лицам.", punishment: "Бан на 3 дня" },
    { id: 5, section: "Общие правила", text: "Запрещено использовать чужие аккаунты без разрешения владельца.", punishment: "Бан на 7 дней" },
    { id: 6, section: "Общие правила", text: "Запрещено изменять файлы игры для получения преимущества.", punishment: "Перманентный бан" },
    { id: 7, section: "Общие правила", text: "Запрещено подстрекать других игроков к нарушению правил.", punishment: "Мут на 1 час" },
    { id: 8, section: "Общие правила", text: "Запрещено выдавать себя за администратора.", punishment: "Перманентный бан" },
    { id: 9, section: "Общие правила", text: "Запрещено использовать нецензурную лексику в никах.", punishment: "Смена ника + бан на 1 день" },
    { id: 10, section: "Общие правила", text: "Запрещено использовать оскорбительные и провокационные ники.", punishment: "Смена ника + бан на 1 день" },
    
    // РАЗДЕЛ 2: ПРАВИЛА ЧАТА (11–25)
    { id: 11, section: "Правила чата", text: "Запрещены оскорбления других игроков (личные, национальные, религиозные).", punishment: "Мут на 2 часа" },
    { id: 12, section: "Правила чата", text: "Запрещены угрозы физической расправы.", punishment: "Мут на 1 день" },
    { id: 13, section: "Правила чата", text: "Запрещён спам (повторение одного сообщения более 3 раз подряд).", punishment: "Мут на 30 минут" },
    { id: 14, section: "Правила чата", text: "Запрещена реклама других серверов, проектов и сторонних ресурсов.", punishment: "Мут на 1 день" },
    { id: 15, section: "Правила чата", text: "Запрещён флуд (бессмысленные сообщения, символы, капс).", punishment: "Мут на 30 минут" },
    { id: 16, section: "Правила чата", text: "Запрещено использование мата и нецензурной лексики.", punishment: "Мут на 1 час" },
    { id: 17, section: "Правила чата", text: "Запрещены политические и религиозные дискуссии.", punishment: "Мут на 2 часа" },
    { id: 18, section: "Правила чата", text: "Запрещено обсуждение читов и способов их получения.", punishment: "Мут на 1 день" },
    { id: 19, section: "Правила чата", text: "Запрещено просить администраторов о привилегиях и донате.", punishment: "Мут на 1 час" },
    { id: 20, section: "Правила чата", text: "Запрещено выдавать ложную информацию о сервере.", punishment: "Мут на 3 часа" },
    { id: 21, section: "Правила чата", text: "Запрещено писать на других языках, кроме русского и английского.", punishment: "Предупреждение" },
    { id: 22, section: "Правила чата", text: "Запрещено оскорблять администрацию.", punishment: "Мут на 1 день" },
    { id: 23, section: "Правила чата", text: "Запрещено обжаловать действия администрации в общем чате.", punishment: "Мут на 2 часа" },
    { id: 24, section: "Правила чата", text: "Запрещено создавать темы для провокаций и конфликтов.", punishment: "Мут на 4 часа" },
    { id: 25, section: "Правила чата", text: "Запрещено публиковать личную информацию других игроков.", punishment: "Перманентный бан" },

    // РАЗДЕЛ 3: ГЕЙМПЛЕЙНЫЕ ПРАВИЛА (26–40)
    { id: 26, section: "Геймплейные правила", text: "Запрещены намеренные Teamkill'ы (убийство союзников).", punishment: "Бан на 7 дней" },
    { id: 27, section: "Геймплейные правила", text: "Запрещена намеренная порча игры (саботаж, блокировка союзников).", punishment: "Бан на 3 дня" },
    { id: 28, section: "Геймплейные правила", text: "Запрещено мешать игре команды (афк, бег по кругу, невыполнение задач).", punishment: "Бан на 1 день" },
    { id: 29, section: "Геймплейные правила", text: "Запрещено намеренное убийство себя (для получения преимущества).", punishment: "Бан на 1 день" },
    { id: 30, section: "Геймплейные правила", text: "Запрещено намеренное сливание раунда (подстава команды).", punishment: "Бан на 3 дня" },
    { id: 31, section: "Геймплейные правила", text: "Запрещено использование нестандартных текстур и моделей для преимущества.", punishment: "Бан на 7 дней" },
    { id: 32, section: "Геймплейные правила", text: "Запрещено намеренное затягивание раунда (неигровое поведение).", punishment: "Предупреждение / кик" },
    { id: 33, section: "Геймплейные правила", text: "Запрещено намеренное создание шума и помех для команды.", punishment: "Мут + предупреждение" },
    { id: 34, section: "Геймплейные правила", text: "Запрещено намеренное блокирование союзников на спавне.", punishment: "Бан на 1 день" },
    { id: 35, section: "Геймплейные правила", text: "Запрещено намеренное использование оружия против союзников.", punishment: "Бан на 3 дня" },
    { id: 36, section: "Геймплейные правила", text: "Запрещено намеренное уничтожение предметов команды.", punishment: "Бан на 2 дня" },
    { id: 37, section: "Геймплейные правила", text: "Запрещено намеренное невыполнение команд капитана (в соревновательном режиме).", punishment: "Бан на 1 день" },
    { id: 38, section: "Геймплейные правила", text: "Запрещено намеренное использование багов карт для получения преимущества.", punishment: "Бан на 7 дней" },
    { id: 39, section: "Геймплейные правила", text: "Запрещено намеренное использование багов с оружием.", punishment: "Бан на 3 дня" },
    { id: 40, section: "Геймплейные правила", text: "Запрещено намеренное использование багов с гранатами.", punishment: "Бан на 3 дня" },

    // РАЗДЕЛ 4: АДМИНИСТРАЦИЯ (41–50)
    { id: 41, section: "Администрация", text: "Администратор обязан быть объективным и беспристрастным.", punishment: "Снятие с должности" },
    { id: 42, section: "Администрация", text: "Администратор не имеет права использовать свои привилегии в личных целях.", punishment: "Снятие с должности" },
    { id: 43, section: "Администрация", text: "Администратор обязан реагировать на жалобы игроков.", punishment: "Предупреждение / снятие" },
    { id: 44, section: "Администрация", text: "Администратор обязан соблюдать правила сервера.", punishment: "Предупреждение / снятие" },
    { id: 45, section: "Администрация", text: "Администратор не имеет права оскорблять игроков.", punishment: "Снятие с должности" },
    { id: 46, section: "Администрация", text: "Администратор не имеет права выдавать наказания без доказательств.", punishment: "Предупреждение / снятие" },
    { id: 47, section: "Администрация", text: "Администратор обязан вести логи своих действий.", punishment: "Предупреждение" },
    { id: 48, section: "Администрация", text: "Администратор не имеет права передавать свои полномочия.", punishment: "Снятие с должности" },
    { id: 49, section: "Администрация", text: "Администратор обязан помогать новым игрокам.", punishment: "Предупреждение" },
    { id: 50, section: "Администрация", text: "Администратор обязан следить за порядком на сервере.", punishment: "Предупреждение / снятие" },

    // РАЗДЕЛ 5: ДОНАТ И ПРИВИЛЕГИИ (51–55)
    { id: 51, section: "Донат", text: "Донат не даёт права нарушать правила.", punishment: "Отказ в обслуживании" },
    { id: 52, section: "Донат", text: "Привилегии не дают иммунитета к наказаниям.", punishment: "Отказ в обслуживании" },
    { id: 53, section: "Донат", text: "Возврат доната возможен только в случае технических проблем.", punishment: "По запросу" },
    { id: 54, section: "Донат", text: "Все привилегии выдаются после подтверждения оплаты.", punishment: "Ожидание" },
    { id: 55, section: "Донат", text: "Администрация имеет право отозвать привилегии за нарушение правил.", punishment: "Отказ в обслуживании" },

    // РАЗДЕЛ 6: БЕЗОПАСНОСТЬ (56–60)
    { id: 56, section: "Безопасность", text: "Запрещено передавать свои логины и пароли третьим лицам.", punishment: "Бан на 3 дня" },
    { id: 57, section: "Безопасность", text: "Запрещено пытаться взломать аккаунты других игроков.", punishment: "Перманентный бан" },
    { id: 58, section: "Безопасность", text: "Запрещено использовать чужие данные для входа.", punishment: "Бан на 7 дней" },
    { id: 59, section: "Безопасность", text: "Запрещено публиковать личную информацию других игроков.", punishment: "Перманентный бан" },
    { id: 60, section: "Безопасность", text: "Запрещено использовать аккаунты для мошенничества.", punishment: "Перманентный бан" }
];

// ----- ЗАГРУЗКА ПРАВИЛ (rules.html) -----
function renderRules() {
    const container = document.getElementById('rulesContainer');
    if (!container) return;

    let currentSection = '';
    let html = '';

    RULES_DATA.forEach(rule => {
        if (rule.section !== currentSection) {
            currentSection = rule.section;
            html += `<div class="rules-section-title">📌 ${currentSection}</div>`;
        }

        html += `
            <div class="rule-card">
                <div class="rule-number">${String(rule.id).padStart(2, '0')}</div>
                <div class="rule-content">
                    <p>${rule.text}</p>
                    <div class="rule-punishment">Наказание: <span>${rule.punishment}</span></div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderRules);