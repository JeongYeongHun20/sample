document.addEventListener('DOMContentLoaded', () => {
    // 1. 현재 접속한 페이지 경로 분석 및 매핑
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    const isIndex = page === 'index.html' || page === '';
    const isStrengths = page === 'strengths.html';
    const isPlayZone = page === 'play_zone.html';

    // 2. 현재 활성화 상태에 따른 스타일 정의 (Tailwind CSS 기반)
    const activeClass = "py-2 text-billiard-gold border-b-2 border-billiard-gold font-bold transition-all duration-300";
    const inactiveClass = "py-2 text-billiard-ivory/70 hover:text-billiard-gold transition-all duration-300 border-b-2 border-transparent";

    const mobileActiveClass = "block text-lg text-billiard-gold pl-3 border-l-2 border-billiard-gold font-bold py-2";
    const mobileInactiveClass = "block text-lg text-billiard-ivory/70 hover:text-billiard-gold transition-colors duration-300 py-2 border-l-2 border-transparent";

    const navbarHTML = `
    <nav class="fixed top-0 left-0 w-full z-50 bg-billiard-deep/90 backdrop-blur-md border-b border-billiard-bright/30">
        <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <!-- 로고 영역 -->
            <a href="index.html" class="flex items-center space-x-3 group">
                <div class="relative w-10 h-10 bg-billiard-ivory rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span class="text-billiard-deep font-bold text-lg font-serif">4</span>
                    <div class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border border-billiard-ivory"></div>
                </div>
                <div>
                    <span class="font-serif text-xl tracking-wider text-billiard-ivory group-hover:text-billiard-gold transition-colors duration-300">CUE.DEV</span>
                    <span class="block text-[10px] tracking-[0.2em] text-gray-400 uppercase">Perfect Logic</span>
                </div>
            </a>

            <!-- 데스크톱용 네비게이션 메뉴 목록 -->
            <div class="hidden md:flex items-center space-x-10 text-sm tracking-widest uppercase font-medium">
                <a href="index.html" class="${isIndex ? activeClass : inactiveClass}">철학</a>
                <a href="strengths.html" class="${isStrengths ? activeClass : inactiveClass}">기술스택</a>
                <a href="play_zone.html" class="${isPlayZone ? activeClass : inactiveClass}">당구게임</a>
                <a href="${isPlayZone ? '#cta' : 'play_zone.html#cta'}" class="px-5 py-2.5 bg-billiard-bright hover:bg-billiard-gold hover:text-billiard-deep border border-billiard-gold/30 rounded-lg transition-all duration-300 shadow-md">Let's Team Up</a>
            </div>

            <!-- 모바일용 햄버거 토글 버튼 -->
            <button id="mobile-menu-btn" class="md:hidden text-billiard-ivory hover:text-billiard-gold focus:outline-none">
                <i class="fa-solid fa-bars-staggered text-2xl"></i>
            </button>
        </div>

        <!-- 모바일 드롭다운 메뉴 영역 -->
        <div id="mobile-menu" class="hidden md:hidden bg-billiard-deep/95 border-b border-billiard-bright/30 py-6 px-8 space-y-4">
            <a href="index.html" class="${isIndex ? mobileActiveClass : mobileInactiveClass}">철학</a>
            <a href="strengths.html" class="${isStrengths ? mobileActiveClass : mobileInactiveClass}">기술스택</a>
            <a href="play_zone.html" class="${isPlayZone ? mobileActiveClass : mobileInactiveClass}">당구게임</a>
            <a href="${isPlayZone ? '#cta' : 'play_zone.html#cta'}" class="block text-center py-3 bg-billiard-bright rounded-lg text-billiard-ivory font-semibold hover:bg-billiard-gold hover:text-billiard-deep transition-all duration-300">Let's Team Up</a>
        </div>
    </nav>
    `;

    // 3. 최상단(body 내부의 첫 번째 자식 노드)에 네비게이션 바 바인딩
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHTML;
    document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);

    // 4. 모바일 햄버거 메뉴 토글 이벤트 리스너 바인딩
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});