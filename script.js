const CONFIG = {
    chapterPrefix: 'chapter-',
    chapterExtension: '.txt',
    basePath: './chapters/',
    totalChapters: 2235,
    storageKey: 'lastChapter'
};

const cache = new Map();
let currentChapter = null;

const el = {
    select: document.getElementById('chapterSelect'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    menuBtn: document.getElementById('menuBtn'),
    settingsModal: document.getElementById('settingsModal'),
    modalContainer: document.getElementById('modalContainer'),
    closeModal: document.getElementById('closeModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    goToInput: document.getElementById('goToInput'),
    goToBtn: document.getElementById('goToBtn'),
    content: document.getElementById('content'),
    readingProgress: document.getElementById('readingProgress'),
    statusToast: document.getElementById('statusToast')
};

function parseChapterNum(val) {
    const num = parseInt(val, 10);
    return isNaN(num) ? null : num;
}

function isValidChapter(num) {
    return num !== null && num >= 1 && num <= CONFIG.totalChapters;
}

function showToast(message) {
    el.statusToast.textContent = message;
    el.statusToast.classList.remove('opacity-0', 'scale-95');
    setTimeout(() => el.statusToast.classList.add('opacity-0', 'scale-95'), 2000);
}

function toggleModal(show) {
    if (show) {
        el.settingsModal.classList.remove('pointer-events-none', 'opacity-0');
        el.modalContainer.classList.remove('scale-95');
        el.modalContainer.classList.add('scale-100');
    } else {
        el.settingsModal.classList.add('pointer-events-none', 'opacity-0');
        el.modalContainer.classList.remove('scale-100');
        el.modalContainer.classList.add('scale-95');
    }
}

async function loadChapter(num) {
    num = parseChapterNum(num);
    if (!isValidChapter(num) || num === currentChapter) return;

    currentChapter = num;
    el.select.value = currentChapter;
    el.readingProgress.textContent = `Chapter ${currentChapter} / ${CONFIG.totalChapters}`;

    el.prevBtn.disabled = currentChapter <= 1;
    el.nextBtn.disabled = currentChapter >= CONFIG.totalChapters;

    history.replaceState(null, '', '#' + currentChapter);
    localStorage.setItem(CONFIG.storageKey, currentChapter);

    if (cache.has(currentChapter)) {
        renderContent(cache.get(currentChapter));
        return;
    }

    el.content.classList.add('opacity-20');

    try {
        const response = await fetch(`${CONFIG.basePath}${CONFIG.chapterPrefix}${currentChapter}${CONFIG.chapterExtension}`);
        if (!response.ok) throw new Error('404');
        const text = await response.text();
        cache.set(currentChapter, text);
        if (currentChapter === num) renderContent(text);
    } catch (err) {
        el.content.innerHTML = `<p class="text-center py-20 text-slate-600 uppercase tracking-widest text-xs">This chapter cannot be reached in the archive.</p>`;
    } finally {
        el.content.classList.remove('opacity-20');
    }
}

function renderContent(text) {
    el.content.textContent = text;
    window.scrollTo({ top: 0, behavior: 'instant' });
    lucide.createIcons();
}

function setupDropdown() {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= CONFIG.totalChapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Chapter ${i}`;
        fragment.appendChild(option);
    }
    el.select.appendChild(fragment);
}

el.menuBtn.onclick = () => toggleModal(true);
el.closeModal.onclick = () => toggleModal(false);
el.modalOverlay.onclick = () => toggleModal(false);

el.select.onchange = (e) => {
    loadChapter(e.target.value);
    toggleModal(false);
};

el.goToBtn.onclick = () => {
    const val = parseChapterNum(el.goToInput.value);
    if (isValidChapter(val)) {
        loadChapter(val);
        toggleModal(false);
        el.goToInput.value = '';
    } else {
        showToast("Out of Range!");
    }
};

el.prevBtn.onclick = () => loadChapter(currentChapter - 1);
el.nextBtn.onclick = () => loadChapter(currentChapter + 1);

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft') loadChapter(currentChapter - 1);
    if (e.key === 'ArrowRight') loadChapter(currentChapter + 1);
    if (e.key === 'Escape') toggleModal(false);
    if (e.key.toLowerCase() === 'm') toggleModal(true);
});

window.addEventListener('hashchange', () => {
    const num = parseChapterNum(window.location.hash.substring(1));
    if (isValidChapter(num) && num !== currentChapter) {
        loadChapter(num);
    }
});

function init() {
    setupDropdown();
    lucide.createIcons();

    const hashNum = parseChapterNum(window.location.hash.substring(1));
    const lastRead = parseChapterNum(localStorage.getItem(CONFIG.storageKey));

    if (isValidChapter(hashNum)) loadChapter(hashNum);
    else if (isValidChapter(lastRead)) loadChapter(lastRead);
    else loadChapter(1);
}

init();