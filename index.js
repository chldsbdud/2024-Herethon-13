document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                app.innerHTML = html;

                // 기존 스크립트 제거
                const oldScript = document.querySelector('script[data-page-script]');
                if (oldScript) {
                    document.body.removeChild(oldScript);
                }

                // 새로운 스크립트 로드
                const scriptTag = document.createElement('script');
                const scriptUrl = 'Frontend/js/' + url.split('/').pop().replace('.html', '.js');
                scriptTag.src = scriptUrl;
                scriptTag.setAttribute('data-page-script', 'true');

                // 스크립트가 로드되면 실행
                scriptTag.onload = () => {
                    console.log(`${scriptTag.src} loaded successfully.`);
                };

                scriptTag.onerror = () => {
                    console.error(`Failed to load script: ${scriptTag.src}`);
                };

                document.body.appendChild(scriptTag);
            })
            .catch(error => console.error('Error loading page:', error));
    }

    function navigate(event) {
        if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
            event.preventDefault();
            const url = event.target.getAttribute('data-href') || event.target.getAttribute('href');
            if (url) {
                window.history.pushState(null, null, url);
                loadPage(url);
            }
        }
    }

    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname);
    });

    document.body.addEventListener('click', navigate);

    const initialPage = window.location.pathname === '/' ? 'Frontend/pages/Login.html' : 'Frontend/pages' + window.location.pathname + '.html';
    loadPage(initialPage);
});