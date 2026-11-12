// ============================================================
// MOTOR DO TUTORIAL
// Os dados das aulas ficam em aulas.js (constante AULAS).
// ============================================================

// ---------- ÁUDIO (bips retrô com WebAudio) ----------
let soundEnabled = true;
let audioCtx = null;

function getAudio() {
    if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('btn-audio');
    btn.classList.toggle('active', soundEnabled);
    btn.textContent = soundEnabled ? 'SOM: LIGADO' : 'SOM: DESLIGADO';
    if (soundEnabled) playBeep(600, 0.08, 'sine', 0.05);
}

function playBeep(frequency, duration, type = 'sine', volume = 0.08) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudio();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
        console.warn('Falha de áudio WebAudio API:', e);
    }
}

function playSuccessSound() {
    playBeep(523.25, 0.1, 'triangle', 0.05);
    setTimeout(() => playBeep(659.25, 0.1, 'triangle', 0.05), 80);
    setTimeout(() => playBeep(783.99, 0.15, 'triangle', 0.05), 160);
    setTimeout(() => playBeep(1046.5, 0.25, 'triangle', 0.05), 240);
}

function playErrorSound() {
    playBeep(150, 0.15, 'sawtooth', 0.08);
    setTimeout(() => playBeep(110, 0.3, 'sawtooth', 0.08), 120);
}

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') playBeep(1200, 0.02, 'sine', 0.015);
});

// ---------- ESTADO (salvo no navegador) ----------
const STORAGE_KEY = 'pweb-react-ts-app-v1';

// liberadas = quantas aulas já tiveram a pergunta respondida
// sorteio   = índice da pergunta sorteada em cada aula
let estado = novoEstado('');
let aulaAtual = 0;

function novoEstado(nome) {
    return { nome, liberadas: 0, sorteio: {}, atual: 0 };
}

function salvarEstado() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
    } catch (e) { /* armazenamento indisponível: segue sem salvar */ }
}

function carregarEstado() {
    try {
        const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (salvo && typeof salvo.nome === 'string' && Number.isInteger(salvo.liberadas)) {
            salvo.sorteio = salvo.sorteio || {};
            salvo.liberadas = Math.min(Math.max(salvo.liberadas, 0), AULAS.length);
            return salvo;
        }
    } catch (e) { /* sem estado salvo */ }
    return null;
}

function apagarEstado() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* nada a fazer */ }
}

// ---------- UTILITÁRIOS ----------
function escapeHtml(texto) {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Compara respostas ignorando maiúsculas, acentos, espaços, aspas e pontuação final
function normalizar(texto) {
    return String(texto)
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[\s'"`]/g, '')
        .replace(/[.;]+$/, '');
}

function limparCodigo(codigo) {
    return codigo.replace(/^\n+/, '').replace(/\s+$/, '') + '\n';
}

// ---------- DESTAQUE DE SINTAXE ----------
const KEYWORDS = new Set([
    'import', 'from', 'export', 'default', 'function', 'return', 'const', 'let', 'var',
    'type', 'interface', 'if', 'else', 'new', 'true', 'false', 'null', 'undefined',
    'string', 'number', 'boolean', 'void', 'as', 'typeof', 'extends'
]);
const BASH_COMMANDS = new Set(['npm', 'npx', 'node', 'cd', 'bun', 'bunx', 'run', 'create', 'install', 'dev', 'build', 'preview', 'lint']);

function span(classe, texto) {
    return `<span class="${classe}">${texto}</span>`;
}

function highlight(codigo, lang) {
    const html = escapeHtml(codigo).replace(/&quot;/g, '"');

    if (lang === 'bash') {
        return html.replace(/(#[^\n]*)|("[^"\n]*"|'[^'\n]*')|(--?[\w-]+)|(\b[\w@.-]+\b)/g,
            (m, comment, str, flag, word) => {
                if (comment) return span('code-comment', comment);
                if (str) return span('code-string', str);
                if (flag) return span('code-type', flag);
                if (word && BASH_COMMANDS.has(word)) return span('code-keyword', word);
                return m;
            });
    }

    if (lang === 'css') {
        return html.replace(/(\/\*[\s\S]*?\*\/)|("[^"\n]*"|'[^'\n]*')|(--[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|(^|[\s,])(\.[A-Za-z][\w-]*|:root|\*)/gm,
            (m, comment, str, cssVar, hex, pre, selector) => {
                if (comment) return span('code-comment', comment);
                if (str) return span('code-string', str);
                if (cssVar) return span('code-type', cssVar);
                if (hex) return span('code-string', hex);
                if (selector) return pre + span('code-keyword', selector);
                return m;
            });
    }

    // tsx, ts e html
    return html.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|&lt;!--[\s\S]*?--&gt;)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`[\s\S]*?`)|(&lt;\/?[A-Za-z][\w.]*|\/?&gt;)|(\b[A-Za-z_]\w*\b)/g,
        (m, comment, str, tag, word) => {
            if (comment) return span('code-comment', comment);
            if (str) return span('code-string', str);
            if (tag) return span('code-tag', tag);
            if (word) {
                if (lang === 'html') return m;
                if (KEYWORDS.has(word)) return span('code-keyword', word);
                if (/^[A-Z]/.test(word)) return span('code-type', word);
            }
            return m;
        });
}

// ---------- COPIAR PARA A ÁREA DE TRANSFERÊNCIA ----------
async function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(texto);
        return;
    }
    // Alternativa para servidores sem HTTPS
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    if (!ok) throw new Error('copy falhou');
}

async function copiarArquivo(botao) {
    const arquivo = AULAS[aulaAtual].arquivos[Number(botao.dataset.arquivo)];
    try {
        await copiarTexto(limparCodigo(arquivo.codigo));
        playBeep(900, 0.06, 'sine', 0.04);
        botao.textContent = 'COPIADO!';
        botao.classList.add('copiado');
    } catch (e) {
        playErrorSound();
        botao.textContent = 'SELECIONE E COPIE';
    }
    setTimeout(() => {
        botao.textContent = 'COPIAR';
        botao.classList.remove('copiado');
    }, 1600);
}

// ---------- TELA DE BOOT ----------
function validateBootInput() {
    const input = document.getElementById('student-name');
    document.getElementById('btn-start').disabled = input.value.trim() === '';
}

function mostrarProgressoSalvo() {
    const salvo = carregarEstado();
    const aviso = document.getElementById('boot-saved');
    if (salvo && salvo.nome) {
        document.getElementById('student-name').value = salvo.nome;
        aviso.textContent = `> Progresso salvo de ${salvo.nome}: ${salvo.liberadas}/${AULAS.length} aulas concluídas. Use o mesmo nome para continuar.`;
    } else {
        aviso.textContent = '';
    }
    validateBootInput();
}

function startMission() {
    const nome = document.getElementById('student-name').value.trim();
    if (!nome) return;

    const salvo = carregarEstado();
    estado = salvo && salvo.nome === nome ? salvo : novoEstado(nome);
    salvarEstado();

    document.getElementById('hud-user').innerHTML =
        `OPERADOR: <span style="color: #ffffff;">${escapeHtml(nome.toUpperCase())}</span>`;

    playSuccessSound();
    switchScreen('screen-game');
    buildSidebar();
    loadSlide(Math.min(estado.atual || 0, estado.liberadas, AULAS.length - 1));
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    playBeep(440, 0.1, 'sine', 0.03);
}

// ---------- BARRA LATERAL ----------
function buildSidebar() {
    const container = document.getElementById('node-list-container');
    container.innerHTML = '';

    AULAS.forEach((aula, idx) => {
        const li = document.createElement('li');
        li.id = `node-item-${idx}`;
        li.title = aula.titulo;
        li.onclick = () => (idx <= estado.liberadas ? loadSlide(idx) : playErrorSound());
        li.innerHTML = `
            <span class="node-status-icon"></span>
            <span><span class="node-num">AULA_${String(idx + 1).padStart(2, '0')}</span>
            <span class="node-title">${escapeHtml(aula.menu)}</span></span>
        `;
        container.appendChild(li);
    });

    const liFinal = document.createElement('li');
    liFinal.id = 'node-item-final';
    liFinal.onclick = () => (estado.liberadas >= AULAS.length ? showGranted() : playErrorSound());
    liFinal.innerHTML = `
        <span class="node-status-icon"></span>
        <span>CERTIFICADO</span>
    `;
    container.appendChild(liFinal);
}

function updateSidebarClasses() {
    AULAS.forEach((aula, idx) => {
        const li = document.getElementById(`node-item-${idx}`);
        if (!li) return;
        li.className = 'node-item';
        if (idx === aulaAtual) li.classList.add('active');
        if (idx < estado.liberadas) li.classList.add('completed');
        if (idx > estado.liberadas) li.classList.add('locked');
    });

    const liFinal = document.getElementById('node-item-final');
    if (liFinal) {
        liFinal.className = 'node-item final';
        liFinal.classList.add(estado.liberadas >= AULAS.length ? 'completed' : 'locked');
    }

    const ativo = document.getElementById(`node-item-${aulaAtual}`);
    if (ativo) ativo.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

// ---------- AULAS ----------
function perguntaDaAula(idx) {
    if (estado.sorteio[idx] == null) {
        estado.sorteio[idx] = Math.floor(Math.random() * AULAS[idx].perguntas.length);
        salvarEstado();
    }
    return AULAS[idx].perguntas[estado.sorteio[idx]];
}

function renderArquivos(aula) {
    if (!aula.arquivos || aula.arquivos.length === 0) return '';

    const blocos = aula.arquivos.map((arq, i) => `
        <div class="arquivo">
            <div class="arquivo-cabecalho">
                <span class="arquivo-caminho">${arq.lang === 'bash' ? '&gt;_ ' : ''}${escapeHtml(arq.caminho)}</span>
                ${arq.acao ? `<span class="arquivo-acao">${escapeHtml(arq.acao)}</span>` : ''}
                <span class="arquivo-lang">${escapeHtml(arq.lang)}</span>
                <button class="btn-copiar" data-arquivo="${i}" onclick="copiarArquivo(this)">COPIAR</button>
            </div>
            ${arq.nota ? `<div class="arquivo-nota">${arq.nota}</div>` : ''}
            <pre><code>${highlight(limparCodigo(arq.codigo), arq.lang)}</code></pre>
        </div>
    `).join('');

    return `
        <div class="section-label">// CÓDIGO-FONTE</div>
        <div class="arquivos">${blocos}</div>
    `;
}

function loadSlide(index) {
    aulaAtual = index;
    estado.atual = index;
    salvarEstado();
    updateSidebarClasses();

    const aula = AULAS[index];
    const pergunta = perguntaDaAula(index);
    const respondida = index < estado.liberadas;
    const container = document.getElementById('slide-container');

    container.innerHTML = `
        <div class="slide-header">
            <span class="slide-tag">Aula ${String(index + 1).padStart(2, '0')} // ${escapeHtml(aula.tag)}</span>
            <span class="slide-tag" style="color: var(--text-secondary);">ESTADO: ${respondida ? 'COMPILADO' : 'AGUARDANDO CHAVE'}</span>
        </div>
        <h2 class="slide-title">${escapeHtml(aula.titulo)}</h2>

        <div class="section-label">// FUNDAMENTO TEÓRICO</div>
        <div class="slide-body">${aula.teoria}</div>

        ${renderArquivos(aula)}

        <div class="challenge-panel ${respondida ? 'bypassed' : ''}" id="challenge-panel-element">
            <div class="challenge-header">
                <div class="challenge-title">${respondida ? '🔓 CHAVE ACEITA: AULA CONCLUÍDA' : '⚡ CHAVE DE ACESSO NECESSÁRIA'}</div>
                <span class="challenge-meta">PERGUNTA SORTEADA ${estado.sorteio[index] + 1}/${aula.perguntas.length}</span>
            </div>
            <p class="challenge-desc">${pergunta.texto}</p>
            <div class="challenge-interaction">
                <span class="challenge-prompt">aluno@pweb:~/ts-app$ verificar</span>
                <input type="text" id="challenge-input-field" class="challenge-input"
                       placeholder="${escapeHtml(pergunta.dica || 'Digite a resposta...')}"
                       value="${respondida ? escapeHtml(pergunta.respostas[0]) : ''}"
                       ${respondida ? 'disabled' : ''}
                       autocomplete="off" spellcheck="false"
                       onkeydown="if(event.key === 'Enter') checkChallengeAnswer()">
                <button class="btn btn-cyan" onclick="checkChallengeAnswer()" ${respondida ? 'disabled' : ''}>
                    ${respondida ? 'LIBERADO' : 'VERIFICAR'}
                </button>
            </div>
            <div class="challenge-feedback" id="challenge-feedback-msg"></div>
        </div>
    `;

    // Destaca os exemplos curtos escritos dentro da teoria
    container.querySelectorAll('.slide-body pre[data-lang] code').forEach((bloco) => {
        bloco.innerHTML = highlight(bloco.textContent, bloco.parentElement.dataset.lang);
    });

    container.scrollTop = 0;
    updateHUDAndControls();
}

function checkChallengeAnswer() {
    if (aulaAtual < estado.liberadas) return;

    const input = document.getElementById('challenge-input-field');
    const feedback = document.getElementById('challenge-feedback-msg');
    const pergunta = perguntaDaAula(aulaAtual);
    const resposta = normalizar(input.value);

    if (resposta && pergunta.respostas.some((r) => normalizar(r) === resposta)) {
        playSuccessSound();
        feedback.className = 'challenge-feedback success';
        feedback.textContent = aulaAtual === AULAS.length - 1
            ? '>>> CHAVE VÁLIDA. Build concluído. Certificado liberado!'
            : '>>> CHAVE VÁLIDA. Próxima aula liberada.';

        estado.liberadas = Math.max(estado.liberadas, aulaAtual + 1);
        salvarEstado();
        setTimeout(() => loadSlide(aulaAtual), 1200);
    } else {
        playErrorSound();
        feedback.className = 'challenge-feedback error';
        feedback.textContent = '>>> ERRO: CHAVE INCORRETA. Releia o fundamento teórico e o código, e tente novamente.';

        const panel = document.getElementById('challenge-panel-element');
        panel.style.transform = 'translateX(-10px)';
        setTimeout(() => (panel.style.transform = 'translateX(10px)'), 100);
        setTimeout(() => (panel.style.transform = 'translateX(-10px)'), 200);
        setTimeout(() => (panel.style.transform = 'translateX(0)'), 300);
    }
}

function updateHUDAndControls() {
    const percent = Math.round((estado.liberadas / AULAS.length) * 100);
    document.getElementById('hud-progress').innerHTML =
        `COMPILAÇÃO: <span style="color: var(--neon-cyan);">${percent}%</span>`;
    document.getElementById('game-progress-bar').style.width = `${percent}%`;
    document.getElementById('game-progress-percent').textContent = `${percent}%`;

    document.getElementById('btn-slide-prev').disabled = aulaAtual === 0;

    const btnNext = document.getElementById('btn-slide-next');
    const ultima = aulaAtual === AULAS.length - 1;
    btnNext.classList.remove('btn-yellow');

    if (ultima && estado.liberadas >= AULAS.length) {
        btnNext.disabled = false;
        btnNext.textContent = 'CERTIFICADO';
        btnNext.classList.add('btn-yellow');
        btnNext.onclick = showGranted;
    } else {
        btnNext.disabled = !(aulaAtual < estado.liberadas && !ultima);
        btnNext.textContent = 'PRÓXIMA';
        btnNext.onclick = () => changeSlide(1);
    }
}

function changeSlide(direction) {
    const alvo = aulaAtual + direction;
    if (alvo >= 0 && alvo <= estado.liberadas && alvo < AULAS.length) loadSlide(alvo);
}

// ---------- FINAL ----------
function showGranted() {
    document.getElementById('cert-student-name').textContent = estado.nome.toUpperCase();
    document.getElementById('cert-score').textContent = `${estado.liberadas}/${AULAS.length}`;
    playSuccessSound();
    switchScreen('screen-granted');
}

function backToLessons() {
    switchScreen('screen-game');
    loadSlide(aulaAtual);
}

function rebootSystem() {
    if (!confirm('Apagar o progresso salvo e recomeçar do zero?')) return;
    apagarEstado();
    estado = novoEstado('');
    aulaAtual = 0;
    document.getElementById('student-name').value = '';
    document.getElementById('hud-user').innerHTML = 'OPERADOR: <span style="color: #ffffff;">DESCONHECIDO</span>';
    document.getElementById('hud-progress').innerHTML = 'COMPILAÇÃO: <span style="color: var(--neon-cyan);">0%</span>';
    mostrarProgressoSalvo();
    switchScreen('screen-boot');
}

mostrarProgressoSalvo();
