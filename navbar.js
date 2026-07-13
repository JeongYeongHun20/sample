document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    const isIndex = page === 'index.html' || page === '';
    const isStrengths = page === 'strengths.html';
    const isPlayZone = page === 'play_zone.html';
    const isRanking = page === 'ranking.html';

    // Active Tab styles
    const activeClass = "py-2 text-billiard-gold border-b-2 border-billiard-gold font-bold transition-all duration-300";
    const inactiveClass = "py-2 text-billiard-ivory/70 hover:text-billiard-gold transition-all duration-300 border-b-2 border-transparent";

    const mobileActiveClass = "block text-lg text-billiard-gold pl-3 border-l-2 border-billiard-gold font-bold py-2";
    const mobileInactiveClass = "block text-lg text-billiard-ivory/70 hover:text-billiard-gold transition-colors duration-300 py-2 border-l-2 border-transparent";

    // 로그인 유저 체크
    const userStr = localStorage.getItem('billiard_user');
    const user = userStr ? JSON.parse(userStr) : null;

    let userMenuHTML = '';
    let mobileUserMenuHTML = '';

    if (user) {
        // 로그인된 상태의 데스크탑용 엘리먼트
        let handicapKo = "중급자";
        if (user.handicap === 'beginner') handicapKo = "초급자";
        if (user.handicap === 'advanced') handicapKo = "상급자";

        userMenuHTML = `
        <div class="flex items-center space-x-3 text-xs">
            <span class="text-billiard-ivory/90 border-r border-billiard-bright/50 pr-3 font-semibold">
                <i class="fa-solid fa-circle-user text-billiard-gold mr-1"></i>
                ${escapeHTML(user.name)} 님 <span class="text-[10px] text-billiard-gold/80 font-normal">(${handicapKo})</span>
            </span>
            <button onclick="globalLogout()" class="text-red-400 hover:text-red-300 transition-colors">로그아웃</button>
        </div>
        `;

        mobileUserMenuHTML = `
        <div class="border-t border-billiard-bright/30 pt-4 mt-2 space-y-2">
            <div class="text-sm text-billiard-ivory/90 font-semibold px-1">
                <i class="fa-solid fa-circle-user text-billiard-gold mr-1.5"></i>${escapeHTML(user.name)} (${handicapKo})
            </div>
            <button onclick="globalLogout()" class="w-full text-left py-2 text-sm text-red-400 hover:text-red-300 transition-colors pl-1">로그아웃</button>
        </div>
        `;
    } else {
        // 로그아웃 상태일 때의 데스크탑 로그인 버튼
        userMenuHTML = `
        <button onclick="globalOpenLogin()" class="px-4 py-2 bg-billiard-gold text-billiard-deep font-bold rounded-lg text-xs transition-all hover:bg-billiard-ivory shadow-[0_0_10px_rgba(212,175,55,0.15)]">
            로그인
        </button>
        `;

        mobileUserMenuHTML = `
        <div class="border-t border-billiard-bright/30 pt-4 mt-2">
            <button onclick="globalOpenLogin()" class="w-full py-2.5 bg-billiard-gold text-billiard-deep font-bold rounded-lg text-sm hover:bg-white transition-colors">
                로그인하기
            </button>
        </div>
        `;
    }

    const navbarHTML = `
    <nav class="fixed top-0 left-0 w-full z-50 bg-billiard-deep/90 backdrop-blur-md border-b border-billiard-bright/30">
        <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <!-- Brand Logo -->
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

            <!-- Desktop Nav Menu -->
            <div class="hidden md:flex items-center space-x-10 text-sm tracking-widest uppercase font-medium">
                <a href="index.html" class="${isIndex ? activeClass : inactiveClass}">철학</a>
                <a href="strengths.html" class="${isStrengths ? activeClass : inactiveClass}">기술스택</a>
                <a href="play_zone.html" class="${isPlayZone ? activeClass : inactiveClass}">당구게임</a>
                <a href="ranking.html" class="${isRanking ? activeClass : inactiveClass}">랭킹</a>
                
                <!-- Dynamic Login/Profile section -->
                <div id="desktop-user-container">
                    ${userMenuHTML}
                </div>
            </div>

            <!-- Mobile Hamburger Toggle -->
            <button id="mobile-menu-btn" class="md:hidden text-billiard-ivory hover:text-billiard-gold focus:outline-none">
                <i class="fa-solid fa-bars-staggered text-2xl"></i>
            </button>
        </div>

        <!-- Mobile dropdown menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-billiard-deep/95 border-b border-billiard-bright/30 py-6 px-8 space-y-4">
            <a href="index.html" class="${isIndex ? mobileActiveClass : mobileInactiveClass}">철학</a>
            <a href="strengths.html" class="${isStrengths ? mobileActiveClass : mobileInactiveClass}">기술스택</a>
            <a href="play_zone.html" class="${isPlayZone ? mobileActiveClass : mobileInactiveClass}">당구게임</a>
            <a href="ranking.html" class="${isRanking ? mobileActiveClass : mobileInactiveClass}">랭킹</a>
            
            <div id="mobile-user-container">
                ${mobileUserMenuHTML}
            </div>
        </div>
    </nav>

    <!-- Global Dynamic Login Modal -->
    <div id="global-login-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center hidden p-4">
        <div class="bg-billiard-cloth border-2 border-billiard-gold/60 p-6 rounded-3xl max-w-sm w-full space-y-5 shadow-2xl relative">
            <button onclick="globalCloseLogin()" class="absolute top-4 right-4 text-gray-400 hover:text-billiard-gold text-lg transition-colors"><i class="fa-solid fa-xmark"></i></button>
            <div class="text-center">
                <span class="text-billiard-gold font-serif italic text-xs block">Welcome to CUE.DEV</span>
                <h4 class="text-xl font-bold font-serif text-billiard-ivory mt-1">간단 프로필 로그인</h4>
                <p class="text-[11px] text-gray-400 mt-1">닉네임과 당구 수지를 등록하면 점수가 연동됩니다.</p>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="block text-[10px] font-bold text-billiard-gold uppercase tracking-widest mb-1.5"><i class="fa-solid fa-user-tag mr-1"></i> 닉네임</label>
                    <input type="text" id="login-nickname" maxlength="10" placeholder="닉네임 입력 (최대 10자)" class="w-full bg-billiard-deep text-billiard-ivory px-3.5 py-2.5 rounded-xl border border-billiard-bright focus:outline-none focus:border-billiard-gold text-sm" />
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-billiard-gold uppercase tracking-widest mb-1.5"><i class="fa-solid fa-trophy mr-1"></i> 나의 당구 수지</label>
                    <select id="login-handicap" class="w-full bg-billiard-deep text-billiard-ivory py-2.5 px-3 rounded-xl border border-billiard-bright focus:outline-none focus:border-billiard-gold text-sm">
                        <option value="beginner">초급자 (수지 80-120)</option>
                        <option value="intermediate" selected>중급자 (수지 150-250)</option>
                        <option value="advanced">상급자 (수지 300 이상)</option>
                    </select>
                </div>
            </div>
            <button onclick="globalSubmitLogin()" class="w-full py-3 bg-billiard-gold hover:bg-white text-billiard-deep font-bold rounded-xl text-xs transition-all duration-300 shadow-md">
                프로필 등록 완료
            </button>
        </div>
    </div>
    `;

    // Injecting Navigation Bar
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHTML;
    document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);
    document.body.appendChild(wrapper.lastElementChild); // Login modal injection

    // Mobile menu toggle hook
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// HTML Escape Helper
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Global functions for profile login dialogs
window.globalOpenLogin = function() {
    const modal = document.getElementById('global-login-modal');
    if (modal) modal.classList.remove('hidden');
};

window.globalCloseLogin = function() {
    const modal = document.getElementById('global-login-modal');
    if (modal) modal.classList.add('hidden');
};

window.globalSubmitLogin = function() {
    const nicknameInput = document.getElementById('login-nickname');
    const handicapSelect = document.getElementById('login-handicap');
    
    const nickname = nicknameInput.value.trim();
    const handicap = handicapSelect.value;

    if (!nickname) {
        alert('닉네임을 입력해 주세요!');
        return;
    }

    localStorage.setItem('billiard_user', JSON.stringify({ name: nickname, handicap: handicap }));
    window.location.reload(); // Refresh to broadcast state
};

window.globalLogout = function() {
    localStorage.removeItem('billiard_user');
    window.location.reload();
};