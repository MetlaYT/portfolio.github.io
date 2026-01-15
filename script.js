const projects = [
    { 
        id: "hyways", 
        title: "Hyways", 
        tag: "Hytale / Blender", 
        status: "в активной разработке", 
        statusClass: "active", 
        class: "hyways", 
        link: "#",
        desc: "Экспорт миров Hytale в blender."
    },
    { 
        id: "rig-addon", 
        title: "The-rig-addon", 
        tag: "Blender / Python", 
        status: "в менее активной разработке", 
        statusClass: "less-active", 
        class: "rig", 
        link: "https://github.com/MetlaYT/The-rig-addon",
        desc: "работы с ригами от TheRatmir в Blender."
    },
    { 
        id: "moviecontents", 
        title: "MovieContent's", 
        tag: "Minecraft Mod", 
        status: "заброшен", 
        statusClass: "abandoned", 
        class: "movie", 
        link: "https://modrinth.com/mod/moviecontents",
        desc: "предметы из фильма по Minecraft для Minecraft Java."
    },
    { 
        id: "tatardelight", 
        title: "TatarDelight", 
        tag: "Farmer's Delight Addon", 
        status: "заморожен", 
        statusClass: "frozen", 
        class: "tatar", 
        link: "https://modrinth.com/mod/tatardelight",
        desc: "Традиционные татарские блюда в Minecraft: Эчпочмак, Чак-чак и др."
    }
];

// Функция поиска проекта (умное сопоставление)
function findProject(input) {
    const text = input.toLowerCase().trim();
    if (!text) return null;
    return projects.find(p => 
        p.id.includes(text) || 
        p.title.toLowerCase().includes(text) ||
        text.includes(p.id.substring(0, 3))
    );
}

// Обработка команд терминала
function handleCommand(cmd) {
    const output = document.getElementById('console-output');
    const project = findProject(cmd);
    
    // Эхо команды пользователя
    const userLine = document.createElement('div');
    userLine.className = "log-entry";
    userLine.innerHTML = `<span style="color: #00aaff;">C:\\Users\\Metla\\Portfolio> ${cmd}</span>`;
    output.appendChild(userLine);

    setTimeout(() => {
        const response = document.createElement('div');
        response.className = "log-entry";
        
        if (project) {
            if (project.id === 'hyways') {
                response.innerHTML = `<span style="color: #ff5f56;">[SYSTEM ERROR]:</span> Упс, похоже, этот проект выйдет примерно к концу 2026 года.`;
            } else {
                response.innerHTML = `<span style="color: #16c60c;">[SUCCESS]:</span> Инициализация модуля ${project.title}. Запуск внешней ссылки...`;
                window.open(project.link, '_blank');
            }
        } else {
            response.innerHTML = `<span style="color: #555;">[CMD]: Команда "${cmd}" не распознана. Доступные модули: hyways, rig, movie, tatar.</span>`;
        }
        
        output.appendChild(response);
        // Автоматическая прокрутка вниз
        const footer = document.querySelector('.terminal-footer');
        footer.scrollTop = footer.scrollHeight;
    }, 450);
}

// Отрисовка карточек проектов
function renderProjects() {
    const container = document.getElementById('projects-container');
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = `project-card ${p.class}`;
        card.innerHTML = `
            <div class="status-label ${p.statusClass}">● ${p.status.toUpperCase()}</div>
            <div class="tag">[ ${p.tag} ]</div>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <button class="execute-btn" onclick="handleCommand('${p.id}')">ВЫПОЛНИТЬ ${p.id.toUpperCase()}.EXE</button>
        `;
        container.appendChild(card);
    });
}

// Последовательность загрузки (Boot)
async function startBoot() {
    const termBody = document.getElementById('terminal-body');
    const bootLines = [
        "Metla_OS v2.0.26 Loading...",
        "Memory Check: 32GB RAM ... OK",
        "I want pizza.",
        "A message has been received from the world of K1",
        "Hi, is anyone there?",
        "anyway, we'll meet soon)",
        "The end"
    ];

    for (const line of bootLines) {
        const div = document.createElement('div');
        div.textContent = `> ${line}`;
        termBody.appendChild(div);
        await new Promise(r => setTimeout(r, 180));
    }

    setTimeout(() => {
        document.getElementById('terminal-loader').style.display = 'none';
        const main = document.getElementById('main-content');
        main.style.display = 'flex';
        setTimeout(() => main.style.opacity = '1', 100);
    }, 600);
}

// Инициализация событий
window.onload = () => {
    renderProjects();
    startBoot();

    const input = document.getElementById('cmd-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommand(input.value);
            input.value = '';
        }
    });
    
    // Фокус на инпут при клике по терминалу
    document.querySelector('.terminal-footer').addEventListener('click', () => {
        input.focus();
    });
};