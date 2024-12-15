document.addEventListener('DOMContentLoaded', () => {
    const toolCards = document.querySelectorAll('.tool-card');
    const categorySidebar = document.querySelector('.category-sidebar');
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '切换主题';
    themeToggle.classList.add('theme-toggle');
    document.body.appendChild(themeToggle);

    // 分类切换逻辑
    categorySidebar.addEventListener('click', (event) => {
        const clickedCategory = event.target.closest('li');
        if (clickedCategory) {
            // 更新激活状态
            categorySidebar.querySelectorAll('li').forEach(li => {
                li.classList.remove('active');
            });
            clickedCategory.classList.add('active');

            // 获取当前选中的分类
            const category = clickedCategory.getAttribute('data-category');

            // 显示/隐藏对应分类的工具
            toolCards.forEach(card => {
                card.style.display = card.getAttribute('data-category') === category ? 'block' : 'none';
            });
        }
    });

    // 多语言配置
    const translations = {
        zh: {
            site_title: 'AI工具导航',
            site_header: 'AI工具导航',
            site_footer: ' 2024 AI工具导航 | ',
            tool_visit: '',
            tool_chatgpt_name: 'ChatGPT',
            tool_chatgpt_desc: 'OpenAI',
            tool_midjourney_name: 'Midjourney',
            tool_midjourney_desc: 'AI',
            tool_copilot_name: 'GitHub Copilot',
            tool_copilot_desc: 'AI',
            category_text: '对话',
            category_image: '图像',
            category_music: '音乐',
            category_video: '视频',
            category_dev: '开发',
            category_ppt: 'PPT'
        },
        en: {
            site_title: 'AI Tool Navigation',
            site_header: 'AI Tool Navigation',
            site_footer: ' 2024 AI Tool Navigation | Continuously Updated',
            tool_visit: 'Visit',
            tool_chatgpt_name: 'ChatGPT',
            tool_chatgpt_desc: 'OpenAI Conversational AI Assistant',
            tool_midjourney_name: 'Midjourney',
            tool_midjourney_desc: 'AI Image Generation Tool',
            tool_copilot_name: 'GitHub Copilot',
            tool_copilot_desc: 'AI Code Assistant',
            category_text: 'Chat',
            category_image: 'Image',
            category_music: 'Music',
            category_video: 'Video',
            category_dev: 'Dev',
            category_ppt: 'PPT'
        },
        es: {
            site_title: 'Navegación de Herramientas de IA',
            site_header: 'Navegación de Herramientas de IA',
            site_footer: ' 2024 Navegación de Herramientas de IA | Actualización Continua',
            tool_visit: 'Visitar',
            tool_chatgpt_name: 'ChatGPT',
            tool_chatgpt_desc: 'Asistente de IA Conversacional de OpenAI',
            tool_midjourney_name: 'Midjourney',
            tool_midjourney_desc: 'Herramienta de Generación de Imágenes de IA',
            tool_copilot_name: 'GitHub Copilot',
            tool_copilot_desc: 'Asistente de Código de IA',
            category_text: 'Generación de Texto',
            category_image: 'Generación de Imágenes',
            category_code_assist: 'Asistencia de Código',
            category_audio_video: 'Audio/Video',
            category_data_analysis: 'Análisis de Datos',
            category_creative_tools: 'Herramientas Creativas'
        },
        fr: {
            site_title: 'Navigation des Outils IA',
            site_header: 'Navigation des Outils IA',
            site_footer: ' 2024 Navigation des Outils IA | Mise à Jour Continue',
            tool_visit: 'Visiter',
            tool_chatgpt_name: 'ChatGPT',
            tool_chatgpt_desc: 'Assistant IA Conversationnel d\'OpenAI',
            tool_midjourney_name: 'Midjourney',
            tool_midjourney_desc: 'Outil de Génération d\'Images IA',
            tool_copilot_name: 'GitHub Copilot',
            tool_copilot_desc: 'Assistant de Code IA',
            category_text: 'Génération de Texte',
            category_image: 'Génération d\'Images',
            category_code_assist: 'Assistance de Code',
            category_audio_video: 'Audio/Video',
            category_data_analysis: 'Analyse de Données',
            category_creative_tools: 'Outils Créatifs'
        },
        de: {
            site_title: 'KI-Tools Navigation',
            site_header: 'KI-Tools Navigation',
            site_footer: ' 2024 KI-Tools Navigation | Kontinuierliche Aktualisierung',
            tool_visit: 'Besuchen',
            tool_chatgpt_name: 'ChatGPT',
            tool_chatgpt_desc: 'OpenAI Konversations-KI-Assistent',
            tool_midjourney_name: 'Midjourney',
            tool_midjourney_desc: 'KI-Bildgenerierungstool',
            tool_copilot_name: 'GitHub Copilot',
            tool_copilot_desc: 'KI-Code-Assistent',
            category_text: 'Textgenerierung',
            category_image: 'Bildgenerierung',
            category_code_assist: 'Code-Assistenz',
            category_audio_video: 'Audio/Video',
            category_data_analysis: 'Datenanalyse',
            category_creative_tools: 'Kreative Tools'
        }
    };

    // 检查用户之前的主题偏好和语言偏好
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const currentLang = localStorage.getItem('language') || 'zh';
    
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    document.body.style.setProperty('--mode', currentTheme === 'dark' 
        ? 'invert(1) hue-rotate(180deg)' 
        : 'none');

    // 语言切换函数
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // 更新语言选择器的当前语言显示
        const currentLangButton = document.querySelector('.language-current');
        const selectedLangItem = document.querySelector(`.language-list li[data-lang="${lang}"]`);
        
        if (currentLangButton && selectedLangItem) {
            const codeSpan = currentLangButton.querySelector('.language-code');
            const textSpan = currentLangButton.querySelector('.language-text');
            
            codeSpan.textContent = selectedLangItem.querySelector('.language-code').textContent;
            textSpan.textContent = selectedLangItem.querySelector('.language-text').textContent;
        }

        localStorage.setItem('language', lang);
    }

    // 初始化语言
    setLanguage(currentLang);

    // 语言选择器交互
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageCurrent = document.querySelector('.language-current');
    const languageList = document.querySelector('.language-list');

    // 切换下拉列表显示
    languageCurrent.addEventListener('click', () => {
        languageDropdown.classList.toggle('active');
    });

    // 选择语言
    languageList.addEventListener('click', (event) => {
        const selectedLi = event.target.closest('li');
        if (selectedLi) {
            const lang = selectedLi.getAttribute('data-lang');
            setLanguage(lang);
            languageDropdown.classList.remove('active');
        }
    });

    // 点击外部关闭下拉列表
    document.addEventListener('click', (event) => {
        if (!languageDropdown.contains(event.target)) {
            languageDropdown.classList.remove('active');
        }
    });

    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // 主题切换逻辑
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        // 切换图标颜色反转
        document.body.style.setProperty('--mode', isDarkMode 
            ? 'invert(1) hue-rotate(180deg)' 
            : 'none');
        
        // 保存用户主题偏好
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});
