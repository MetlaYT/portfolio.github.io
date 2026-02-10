const projects = [
    { 
        id: "hyways", 
        title: "Hyways", 
        tag: "Hytale / Blender", 
        status: "отменён", 
        statusClass: "cancelled", 
        class: "hyways", 
        link: "#",
        desc: "Экспорт миров Hytale в blender. Проект был закрыт."
    },
    { 
        id: "rig-addon", 
        title: "The-rig-addon", 
        tag: "Blender / Python", 
        status: "в активной разработке", 
        statusClass: "active", 
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
    },
    {
        id: "prj-x7v",
        title: "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        tag: "\u0058\u0058\u0058 / \u0058\u0058\u0058",
        status: "CLASSIFIED",
        statusClass: "classified-status",
        class: "classified",
        link: "#",
        desc: "ENCRYPTED",
        encrypted: true,
        cipherPayload: "5a5847396c5933524663326c6e626d566b49455a795957316c643239796179425162" +
            "336c755a4342545a584e7a615739754945317662475630645778686369424462323530" +
            "5957563049464e35626d4e6f636d39756158706864476c76626942446232356d615764" +
            "31636d46306157397549454e76636d5567556d566e61584e30636e6b675257356e6157" +
            "356c49455a795957316c49454e76626e5a6c636e4e706232346752573530636e6b675" +
            "54739706248517456473968-" +
            "6130394e4d5459794f44637a4e5455304d7a49784f5463324e544d304d7a49784f54" +
            "63324e544d304d7a49784f5463324e544d304d7a49784f5463324e544d304d7a4978" +
            "4f5463324e544d304d7a49784f5463324e544d304d7a49784f5463324e544d304d7a" +
            "49784f5463324e544d304d7a49784f5463324e544d304d7a49784f5463324e544d30" +
            "4d7a49784f5463324e544d304d7a49784f5463324e544d304d7a49784f5463324e54" +
            "4d304d7a49784f5463324e544d304d7a4978"
    }
];

// ========= ENCRYPTED PROJECT SCRAMBLE =========
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*<>{}[]|/\\~`!?;:";
function scrambleText(length) {
    let s = '';
    for (let i = 0; i < length; i++) s += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    return s;
}

// Continuously scramble classified text elements
setInterval(() => {
    document.querySelectorAll('.classified-text').forEach(el => {
        const len = parseInt(el.dataset.len) || 40;
        el.textContent = scrambleText(len);
    });
}, 80);

// ========= FIND PROJECT =========
function findProject(input) {
    const text = input.toLowerCase().trim();
    if (!text) return null;
    return projects.find(p => 
        p.id.includes(text) || 
        p.title.toLowerCase().includes(text) ||
        text.includes(p.id.substring(0, 3))
    );
}

// ========= COMMAND HANDLER =========
function handleCommand(cmd) {
    const output = document.getElementById('console-output');
    const project = findProject(cmd);
    
    const userLine = document.createElement('div');
    userLine.className = "log-entry";
    userLine.innerHTML = `<span style="color: #00aaff;">C:\\Users\\Metla\\Portfolio> ${escapeHtml(cmd)}</span>`;
    output.appendChild(userLine);

    setTimeout(() => {
        const response = document.createElement('div');
        response.className = "log-entry";
        
        const cmdLower = cmd.toLowerCase().trim();

        // Built-in commands
        if (cmdLower === 'help') {
            response.innerHTML = `<span style="color: #16c60c;">[HELP]:</span> Available commands: help, list, status, clear, matrix, glitch, [project_name]`;
        } else if (cmdLower === 'list') {
            const list = projects.map(p => `  ${p.id} — ${p.status}`).join('<br>');
            response.innerHTML = `<span style="color: #16c60c;">[PROJECTS]:</span><br>${list}`;
        } else if (cmdLower === 'status') {
            response.innerHTML = `<span style="color: #16c60c;">[STATUS]:</span> System OK | Projects loaded: ${projects.length} | Uptime: ${Math.floor(performance.now()/1000)}s`;
        } else if (cmdLower === 'clear') {
            output.innerHTML = '<div class="log-entry">[SYSTEM]: Console cleared.</div>';
            return;
        } else if (cmdLower === 'matrix') {
            toggleMatrix();
            response.innerHTML = `<span style="color: #16c60c;">[SYSTEM]:</span> Matrix mode toggled.`;
        } else if (cmdLower === 'glitch') {
            triggerGlitch();
            response.innerHTML = `<span style="color: #16c60c;">[SYSTEM]:</span> Glitch triggered.`;
        } else if (project) {
            if (project.encrypted) {
                response.innerHTML = `<span style="color: #b000ff;">[ACCESS DENIED]:</span> ⛔ CLEARANCE LEVEL 7+ REQUIRED. Biometric scan failed. Incident logged.`;
                triggerGlitch();
            } else if (project.statusClass === 'cancelled') {
                response.innerHTML = `<span style="color: #ff3333;">[CANCELLED]:</span> Проект ${project.title} был отменён. Запуск невозможен.`;
            } else {
                response.innerHTML = `<span style="color: #16c60c;">[SUCCESS]:</span> Инициализация модуля ${project.title}. Запуск внешней ссылки...`;
                if (project.link !== '#') window.open(project.link, '_blank');
            }
        } else {
            response.innerHTML = `<span style="color: #555;">[CMD]: Command "${escapeHtml(cmd)}" not recognized. Type "help" for available commands.</span>`;
        }
        
        output.appendChild(response);
        const footer = document.querySelector('.terminal-footer');
        footer.scrollTop = footer.scrollHeight;
    }, 350);
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}

// ========= RENDER PROJECTS =========
function renderProjects() {
    const container = document.getElementById('projects-container');
    let activeC = 0, frozenC = 0, cancelledC = 0, classifiedC = 0;

    projects.forEach(p => {
        if (p.statusClass === 'active' || p.statusClass === 'less-active') activeC++;
        if (p.statusClass === 'frozen') frozenC++;
        if (p.statusClass === 'cancelled' || p.statusClass === 'abandoned') cancelledC++;
        if (p.statusClass === 'classified-status') classifiedC++;

        const card = document.createElement('div');
        card.className = `project-card ${p.class}`;

        let descHtml, btnHtml, titleHtml;

        if (p.encrypted) {
            titleHtml = `<h3 style="color: #b000ff; letter-spacing: 4px;">[REDACTED]</h3>`;
            descHtml = `<p class="classified-text" data-len="120">${scrambleText(120)}</p>
                        <div style="font-size:10px; color:#444; margin-top:8px; word-break:break-all; user-select:none;">${p.cipherPayload.substring(0, 200)}...</div>`;
            btnHtml = `<button class="execute-btn btn-classified" onclick="handleCommand('${p.id}')">⛔ DECRYPT ${p.id.toUpperCase()}.DAT</button>`;
        } else if (p.statusClass === 'cancelled') {
            titleHtml = `<h3 style="text-decoration: line-through; opacity: 0.5;">${p.title}</h3>`;
            descHtml = `<p style="opacity:0.5;">${p.desc}</p>`;
            btnHtml = `<button class="execute-btn btn-cancelled" disabled>CANCELLED</button>`;
        } else {
            titleHtml = `<h3>${p.title}</h3>`;
            descHtml = `<p>${p.desc}</p>`;
            btnHtml = `<button class="execute-btn" onclick="handleCommand('${p.id}')">ВЫПОЛНИТЬ ${p.id.toUpperCase()}.EXE</button>`;
        }

        card.innerHTML = `
            <div class="status-label ${p.statusClass}">● ${p.status.toUpperCase()}</div>
            <div class="tag">[ ${p.tag} ]</div>
            ${titleHtml}
            ${descHtml}
            ${btnHtml}
        `;
        container.appendChild(card);
    });

    // Update stats
    document.getElementById('active-count').textContent = activeC;
    document.getElementById('frozen-count').textContent = frozenC;
    document.getElementById('cancelled-count').textContent = cancelledC;
    document.getElementById('classified-count').textContent = classifiedC;
}

// ========= BOOT SEQUENCE =========
async function startBoot() {
    const termBody = document.getElementById('terminal-body');
    const bootLines = [
        { text: "Metla_OS v2.0.26 Loading...", cls: "" },
        { text: "Memory Check: 32GB RAM ... OK", cls: "" },
        { text: "I want pizza.", cls: "" },
        { text: "A message has been received from the world of K1", cls: "" },
        { text: "Hi, is anyone there?", cls: "" },
        { text: "anyway, we'll meet soon)", cls: "" },
        { text: "Scanning project database...", cls: "" },
        { text: "New project detected! Do you want to launch? (Y/N)", cls: "boot-warn" },
        { text: "Tren.admin-panel $ Y", cls: "boot-admin" },
        { text: "Project initialized successfully.", cls: "" },
        { text: "[CLASSIFIED] Encrypted payload detected in sector 7-X... access restricted.", cls: "boot-classified" },
        { text: "The end", cls: "" }
    ];

    for (const line of bootLines) {
        const div = document.createElement('div');
        if (line.cls) div.className = line.cls;
        // Typewriter effect for special lines
        if (line.cls === 'boot-warn' || line.cls === 'boot-classified') {
            div.textContent = '> ';
            termBody.appendChild(div);
            for (const char of line.text) {
                div.textContent += char;
                await new Promise(r => setTimeout(r, 25));
            }
        } else {
            div.textContent = `> ${line.text}`;
            termBody.appendChild(div);
        }
        termBody.scrollTop = termBody.scrollHeight;
        await new Promise(r => setTimeout(r, 200));
    }

    setTimeout(() => {
        document.getElementById('terminal-loader').style.display = 'none';
        const main = document.getElementById('main-content');
        main.style.display = 'flex';
        setTimeout(() => main.style.opacity = '1', 100);
    }, 800);
}

// ========= PARTICLES =========
let particlesEnabled = true;
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const count = 60;
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.4 + 0.1
        });
    }
    
    function animate() {
        if (!particlesEnabled) { requestAnimationFrame(animate); return; }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(22, 198, 12, ${p.alpha})`;
            ctx.fill();
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(22, 198, 12, ${0.08 * (1 - dist/120)})`;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========= MATRIX EFFECT =========
let matrixActive = false;
let matrixCanvas = null;
let matrixInterval = null;

function toggleMatrix() {
    if (matrixActive) {
        matrixActive = false;
        if (matrixCanvas) { matrixCanvas.remove(); matrixCanvas = null; }
        if (matrixInterval) { clearInterval(matrixInterval); matrixInterval = null; }
        return;
    }
    matrixActive = true;
    matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-canvas';
    document.body.appendChild(matrixCanvas);
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソ0123456789@#$%^&*';
    
    matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }, 40);
}

// ========= GLITCH EFFECT =========
function triggerGlitch() {
    document.body.classList.add('glitch-active');
    setTimeout(() => document.body.classList.remove('glitch-active'), 900);
}

// ========= NOTIFICATION =========
function showNotification(text) {
    const n = document.getElementById('notification');
    document.getElementById('notification-text').textContent = text;
    n.classList.remove('hidden');
    setTimeout(() => n.classList.add('hidden'), 3000);
}

// ========= MENU ACTIONS =========
let currentZoom = 1;

function handleMenuAction(action) {
    switch (action) {
        case 'new-window':
            window.open(window.location.href, '_blank');
            break;
        case 'open-terminal':
            document.querySelector('.terminal-footer').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('cmd-input').focus();
            break;
        case 'refresh':
            location.reload();
            break;
        case 'exit':
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:#16c60c;font-size:24px;font-family:monospace;">Session terminated. Goodbye.</div>';
            break;
        case 'clear-console':
            document.getElementById('console-output').innerHTML = '<div class="log-entry">[SYSTEM]: Console cleared.</div>';
            showNotification('Console cleared');
            break;
        case 'reset-projects':
            const container = document.getElementById('projects-container');
            container.innerHTML = '';
            container.className = 'projects-container';
            currentZoom = 1;
            container.style.transform = '';
            renderProjects();
            showNotification('Projects view reset');
            break;
        case 'toggle-scanlines':
            const scanlines = document.getElementById('scanline-overlay');
            scanlines.style.display = scanlines.style.display === 'none' ? '' : 'none';
            showNotification('Scanlines toggled');
            break;
        case 'toggle-particles':
            particlesEnabled = !particlesEnabled;
            const pc = document.getElementById('particle-canvas');
            pc.style.display = particlesEnabled ? '' : 'none';
            showNotification(particlesEnabled ? 'Particles enabled' : 'Particles disabled');
            break;
        case 'view-grid':
            document.getElementById('projects-container').classList.remove('list-layout');
            showNotification('Grid layout');
            break;
        case 'view-list':
            document.getElementById('projects-container').classList.add('list-layout');
            showNotification('List layout');
            break;
        case 'zoom-in':
            currentZoom = Math.min(currentZoom + 0.1, 1.5);
            document.getElementById('projects-container').style.transform = `scale(${currentZoom})`;
            document.getElementById('projects-container').style.transformOrigin = 'center top';
            break;
        case 'zoom-out':
            currentZoom = Math.max(currentZoom - 0.1, 0.5);
            document.getElementById('projects-container').style.transform = `scale(${currentZoom})`;
            document.getElementById('projects-container').style.transformOrigin = 'center top';
            break;
        case 'zoom-reset':
            currentZoom = 1;
            document.getElementById('projects-container').style.transform = '';
            break;
        case 'fullscreen':
            if (!document.fullscreenElement) document.documentElement.requestFullscreen();
            else document.exitFullscreen();
            break;
        case 'cmd-help':
            handleCommand('help');
            break;
        case 'cmd-list':
            handleCommand('list');
            break;
        case 'cmd-status':
            handleCommand('status');
            break;
        case 'cmd-matrix':
            toggleMatrix();
            showNotification('Matrix mode toggled');
            break;
        case 'cmd-glitch':
            triggerGlitch();
            break;
    }
}

// ========= INIT =========
window.onload = () => {
    renderProjects();
    startBoot();
    initParticles();

    const input = document.getElementById('cmd-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommand(input.value);
            input.value = '';
        }
    });
    
    document.querySelector('.terminal-footer').addEventListener('click', () => {
        input.focus();
    });

    // ===== MENU DROPDOWN LOGIC =====
    let openMenu = null;

    document.querySelectorAll('.menu-item[data-menu]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (openMenu === item) {
                item.classList.remove('menu-open');
                openMenu = null;
            } else {
                if (openMenu) openMenu.classList.remove('menu-open');
                item.classList.add('menu-open');
                openMenu = item;
            }
        });
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = item.dataset.action;
            if (action) handleMenuAction(action);
            if (openMenu) { openMenu.classList.remove('menu-open'); openMenu = null; }
        });
    });

    document.addEventListener('click', () => {
        if (openMenu) { openMenu.classList.remove('menu-open'); openMenu = null; }
    });

    // ===== WINDOW CONTROLS =====
    document.querySelector('.minimize-btn')?.addEventListener('click', () => {
        const mainWin = document.querySelector('.main-window');
        mainWin.style.transition = 'transform 0.3s, opacity 0.3s';
        mainWin.style.transform = 'scale(0.1) translateY(100vh)';
        mainWin.style.opacity = '0';
        setTimeout(() => {
            mainWin.style.transform = '';
            mainWin.style.opacity = '1';
        }, 1500);
    });

    document.querySelector('.maximize-btn')?.addEventListener('click', () => {
        const mainWin = document.querySelector('.main-window');
        if (mainWin.style.width === '100vw') {
            mainWin.style.width = '98vw';
            mainWin.style.height = '96vh';
        } else {
            mainWin.style.width = '100vw';
            mainWin.style.height = '100vh';
        }
    });

    document.querySelector('.win-btn.close')?.addEventListener('click', () => {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:#ff5f56;font-size:24px;font-family:monospace;background:#0a0a0f;">Process terminated. Press F5 to restart.</div>';
    });
};