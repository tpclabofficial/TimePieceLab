document.addEventListener('DOMContentLoaded', function() {
    // DOM元素
    const textEditor = document.getElementById('textEditor');
    const fileInput = document.getElementById('fileInput');
    const newFileBtn = document.getElementById('newFile');
    const openFileBtn = document.getElementById('openFile');
    const saveFileBtn = document.getElementById('saveFile');
    const findInput = document.getElementById('findInput');
    const replaceInput = document.getElementById('replaceInput');
    const findBtn = document.getElementById('findBtn');
    const replaceBtn = document.getElementById('replaceBtn');
    const sortLinesBtn = document.getElementById('sortLines');
    const reverseLinesBtn = document.getElementById('reverseLines');
    const uniqueLinesBtn = document.getElementById('uniqueLines');
    const commentLinesBtn = document.getElementById('commentLines');
    const themeSelect = document.getElementById('themeSelect');
    const wordCountEl = document.getElementById('wordCount');
    const lineCountEl = document.getElementById('lineCount');
    const charCountEl = document.getElementById('charCount');
    const linePosEl = document.getElementById('linePos');
    const colPosEl = document.getElementById('colPos');
    const saveStatusEl = document.getElementById('saveStatus');
    const tabBar = document.getElementById('tabBar');
    const addTabBtn = document.getElementById('addTab');
    const treeContainer = document.getElementById('treeContainer');
    const refreshFilesBtn = document.getElementById('refreshFiles');

    // 当前文件状态
    let currentFile = {
        id: 'default',
        name: '未命名文件',
        content: '',
        modified: false
    };

    // 初始化主题
    function initTheme() {
        const savedTheme = localStorage.getItem('editorTheme') || 'dark';
        themeSelect.value = savedTheme;
        document.body.setAttribute('data-theme', savedTheme);
    }

    // 统计功能
    function updateStats() {
        const text = textEditor.value;
        wordCountEl.textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        lineCountEl.textContent = text === '' ? 0 : text.split('\n').length;
        charCountEl.textContent = text.length;
        
        // 更新光标位置
        updateCursorPosition();
    }

    // 更新光标位置
    function updateCursorPosition() {
        const cursorPos = textEditor.selectionStart;
        const textLines = textEditor.value.substr(0, cursorPos).split('\n');
        linePosEl.textContent = textLines.length;
        colPosEl.textContent = textLines[textLines.length - 1].length + 1;
    }

    // 文件操作
    newFileBtn.addEventListener('click', () => {
        createNewTab();
    });

    openFileBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        if (!files.length) return;
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                createNewTab(file.name, e.target.result);
            };
            reader.readAsText(file);
        });
    });

    saveFileBtn.addEventListener('click', function() {
        saveCurrentFile();
    });

    function saveCurrentFile() {
        const blob = new Blob([textEditor.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile.name || 'document.txt';
        a.click();
        URL.revokeObjectURL(url);
        
        currentFile.modified = false;
        updateSaveStatus();
    }

    // 标签页管理
    function createNewTab(name = '未命名文件', content = '') {
        const tabId = 'tab-' + Date.now();
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.dataset.fileId = tabId;
        tab.innerHTML = `
            <span>${name}</span>
            <button class="close-tab"><i class="fas fa-times"></i></button>
        `;
        
        tabBar.insertBefore(tab, addTabBtn);
        
        // 激活新标签
        activateTab(tabId);
        
        // 设置内容
        textEditor.value = content;
        updateStats();
        
        return tabId;
    }

    function activateTab(tabId) {
        // 更新当前标签状态
        Array.from(tabBar.querySelectorAll('.tab')).forEach(tab => {
            tab.classList.toggle('active', tab.dataset.fileId === tabId);
        });
        
        // 更新当前文件状态
        // (实际应用中这里应该从文件缓存中加载内容)
    }

    tabBar.addEventListener('click', function(e) {
        const tab = e.target.closest('.tab');
        const closeBtn = e.target.closest('.close-tab');
        
        if (closeBtn && tab) {
            // 关闭标签
            tab.remove();
            // TODO: 处理文件缓存
        } else if (tab) {
            // 激活标签
            activateTab(tab.dataset.fileId);
        }
    });

    addTabBtn.addEventListener('click', function() {
        createNewTab();
    });

    // 查找替换功能
    findBtn.addEventListener('click', function() {
        const searchText = findInput.value;
        if (!searchText) return;
        
        const text = textEditor.value;
        const regex = new RegExp(escapeRegExp(searchText), 'gi');
        const highlighted = text.replace(regex, match => `<mark>${match}</mark>`);
        
        // 创建预览div
        const previewDiv = document.createElement('div');
        previewDiv.className = 'search-preview';
        previewDiv.innerHTML = highlighted;
        
        // 替换编辑器
        textEditor.style.display = 'none';
        textEditor.parentNode.appendChild(previewDiv);
        
        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-preview';
        closeBtn.textContent = '关闭高亮';
        closeBtn.addEventListener('click', function() {
            previewDiv.remove();
            closeBtn.remove();
            textEditor.style.display = 'block';
        });
        previewDiv.parentNode.appendChild(closeBtn);
    });

    replaceBtn.addEventListener('click', function() {
        const searchText = findInput.value;
        const replaceText = replaceInput.value;
        if (!searchText) return;
        
        textEditor.value = textEditor.value.replace(
            new RegExp(escapeRegExp(searchText), 'g'), 
            replaceText
        );
        updateStats();
    });

    // 行操作
    sortLinesBtn.addEventListener('click', function() {
        const lines = textEditor.value.split('\n');
        textEditor.value = lines.sort().join('\n');
        updateStats();
    });

    reverseLinesBtn.addEventListener('click', function() {
        const lines = textEditor.value.split('\n');
        textEditor.value = lines.reverse().join('\n');
        updateStats();
    });

    uniqueLinesBtn.addEventListener('click', function() {
        const lines = textEditor.value.split('\n');
        textEditor.value = [...new Set(lines)].join('\n');
        updateStats();
    });

    commentLinesBtn.addEventListener('click', function() {
        const selectionStart = textEditor.selectionStart;
        const selectionEnd = textEditor.selectionEnd;
        const text = textEditor.value;
        
        // 获取选中行
        const startLine = text.substr(0, selectionStart).split('\n').length;
        const endLine = text.substr(0, selectionEnd).split('\n').length;
        
        const lines = text.split('\n');
        for (let i = startLine - 1; i < endLine; i++) {
            if (lines[i].trim() !== '') {
                lines[i] = '// ' + lines[i];
            }
        }
        
        textEditor.value = lines.join('\n');
        updateStats();
    });

    // 主题切换
    themeSelect.addEventListener('change', function() {
        const theme = this.value;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('editorTheme', theme);
    });

    // 自动保存状态
    function updateSaveStatus() {
        saveStatusEl.textContent = currentFile.modified ? '未保存' : '已保存';
    }

    // 辅助函数
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 事件监听
    textEditor.addEventListener('input', function() {
        currentFile.modified = true;
        updateStats();
        updateSaveStatus();
    });

    textEditor.addEventListener('click', updateCursorPosition);
    textEditor.addEventListener('keyup', updateCursorPosition);

    // 初始化
    initTheme();
    updateStats();
    updateSaveStatus();

    // 模拟文件树
    function loadFileTree() {
        const mockFiles = [
            { name: 'index.html', type: 'file' },
            { name: 'styles.css', type: 'file' },
            { name: 'scripts', type: 'folder', children: [
                { name: 'main.js', type: 'file' },
                { name: 'utils.js', type: 'file' }
            ]}
        ];
        
        renderFileTree(mockFiles, treeContainer);
    }

    function renderFileTree(files, container) {
        container.innerHTML = '';
        
        files.forEach(item => {
            const element = document.createElement('div');
            element.className = `tree-item ${item.type}`;
            element.textContent = item.name;
            
            if (item.type === 'folder' && item.children) {
                element.addEventListener('click', function() {
                    this.classList.toggle('expanded');
                });
                
                const childContainer = document.createElement('div');
                childContainer.className = 'tree-children';
                renderFileTree(item.children, childContainer);
                element.appendChild(childContainer);
            }
            
            container.appendChild(element);
        });
    }

    refreshFilesBtn.addEventListener('click', loadFileTree);
    
    // 初始加载
    loadFileTree();
});