
   var globalData = globalData || [];
   var lastScanStats = lastScanStats || { emails: [], phones: [], wallets: [], hashes: [] };
   

( function() {
    
    const mode = localStorage.getItem('darkWebMode');
    const tab = localStorage.getItem('activeTab');
    
    
    if (mode === 'true') {
        document.documentElement.classList.add('dark-web-active'); 
        
    }
   
})

window.showCyberAlert = function(message) {
    const alertBox = document.getElementById('cyberAlert');
    if (!alertBox) return;

    
    alertBox.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <div class="icon-wrapper">
                <i class="fa-solid fa-shield-halved fa-spin" style="color: #bc13fe; font-size: 1.3rem;"></i>
            </div>
            <div class="d-flex flex-column">
                <span style="color: #bc13fe; font-size: 0.7rem; font-weight: bold; letter-spacing: 1px;">[ SYSTEM_STATUS ]</span>
                <span style="color: #00ff00; font-family: 'Consolas', monospace; font-size: 0.85rem;">${message}</span>
            </div>
        </div>
    `;
    
    alertBox.classList.add('show');

    if (window.alertTimeout) clearTimeout(window.alertTimeout);

    window.alertTimeout = setTimeout(() => {
        alertBox.classList.remove('show');
    }, 5000); 
};

    const icons = {
        "Twitter": ["#1DA1F2", "https://cdn-icons-png.flaticon.com/512/733/733579.png"],
        "GitHub": ["#333", "https://cdn-icons-png.flaticon.com/512/733/733553.png"],
        "TikTok": ["#69C9D0", "https://cdn-icons-png.flaticon.com/512/3046/3046121.png"],
        "Instagram": ["#E1306C", "https://cdn-icons-png.flaticon.com/512/174/174855.png"],
        "Reddit": ["#FF4500", "https://cdn-icons-png.flaticon.com/512/52/52053.png"],
        "Pinterest": ["#E60023", "https://cdn-icons-png.flaticon.com/512/733/733566.png"],
        "Steam": ["#000000", "https://cdn-icons-png.flaticon.com/512/733/733574.png"],
        "Chess.com": ["#81b64c", "https://cdn-icons-png.flaticon.com/512/2093/2093750.png"],
        "Websites": ["#6cf", "https://cdn-icons-png.flaticon.com/512/565/565547.png"]
    };
function initHunterUI() {
   
    const container = document.getElementById('hunterResults'); 
    if (!container) return;
    
   
    const socialTargets = [
        { name: "Facebook", icon: "fa-facebook" },
        { name: "Twitter", icon: "fa-x-twitter" },
        { name: "Instagram", icon: "fa-instagram" },
        { name: "TikTok", icon: "fa-tiktok" },
        { name: "LinkedIn", icon: "fa-linkedin" },
        { name: "Pinterest", icon: "fa-pinterest" },
        { name: "Snapchat", icon: "fa-snapchat" },
        { name: "Reddit", icon: "fa-reddit" },
        { name: "GitHub", icon: "fa-github" },
        { name: "GitLab", icon: "fa-gitlab" },
        { name: "StackOverflow", icon: "fa-stack-overflow" },
        { name: "HackerRank", icon: "fa-code" },
        { name: "Dev.to", icon: "fa-dev" },
        { name: "Kaggle", icon: "fa-brain" },
        { name: "Behance", icon: "fa-behance" },
        { name: "Dribbble", icon: "fa-dribbble" },
        { name: "Flickr", icon: "fa-flickr" },
        { name: "Vimeo", icon: "fa-vimeo" },
        { name: "Twitch", icon: "fa-twitch" },
        { name: "Steam", icon: "fa-steam" },
        { name: "Roblox", icon: "fa-gamepad" },
        { name: "Ask.fm", icon: "fa-question" },
        { name: "Sarahah", icon: "fa-envelope" },
        { name: "Tellonym", icon: "fa-message" },
        { name: "Medium", icon: "fa-medium" },
        { name: "SoundCloud", icon: "fa-soundcloud" },
        { name: "Tumblr", icon: "fa-tumblr" },
        { name: "Telegram", icon: "fa-telegram" }
    ];

    container.innerHTML = ""; 

    socialTargets.forEach(siteObj => {
        const siteName = siteObj.name;
        const col = document.createElement('div');
        col.className = "col-6 col-md-4 col-lg-3 col-xl-2 mb-3"; 

        col.innerHTML = `
            <div id="status-${siteName}" class="card hunter-card shadow-sm h-100" 
                 style="opacity: 0.6; border: 1px solid rgba(188, 19, 254, 0.3); background: rgba(20, 10, 30, 0.4); transition: all 0.4s ease;">
                <div class="card-body d-flex flex-column align-items-center text-center p-3">
                    <i class="fa-brands ${siteObj.icon} mb-2" style="color: #bc13fe; font-size: 1.5rem;"></i>
                    <h6 class="card-title" style="font-size: 0.75rem; color: #eee; font-family: 'Consolas', monospace;">${siteName}</h6>
                    <div id="loader-${siteName}" class="mt-auto pt-2" style="color: #bc13fe; font-size: 0.7rem; opacity: 0.8;">
                        [ READY ]
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

     container.style.opacity = '0';
    setTimeout(() => {
        container.style.transition = 'opacity 0.6s ease';
        container.style.opacity = '1';
    }, 50);
}

    
   window.copyToClipboard = function(text, btnElement) {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
        const icon = btnElement.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'fas fa-check text-success'; 
        
        setTimeout(() => {
            icon.className = originalClass; 
        }, 1500);
    }).catch(err => {
        
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied!');
    });
};


function updateUIStats(stats, isDark) {
    if (!stats) return;

    
    lastScanStats = {
        emails: stats.emails || [],
        phones: stats.phones || [], 
        wallets: stats.wallets || [],
        hashes: stats.hashes || [],
       
        emails_count: stats.emails_count || (stats.emails ? stats.emails.length : 0),
        wallets_count: stats.wallets_count || (stats.wallets ? stats.wallets.length : 0),
        hashes_count: stats.hashes_count || (stats.hashes ? stats.hashes.length : 0),
        total_nodes: stats.total_nodes || stats.count || 0,
        pass_count: stats.pass_count || 0,
        phones_count: stats.phones_count || 0
    };

    
    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    safeSetText('emailStats', lastScanStats.emails_count);
    safeSetText('walletStats', lastScanStats.wallets_count);
    safeSetText('hashStats', lastScanStats.hashes_count);
    safeSetText('resultsStats', lastScanStats.total_nodes);
    
    const phoneElement = document.getElementById('phoneStats');
    if (phoneElement) {
        
        phoneElement.innerText = isDark ? lastScanStats.pass_count : lastScanStats.phones_count;
    }
}


function renderResultsList(data) {
    const resDiv = document.getElementById("results");
    if (!data || data.length === 0) { 
        resDiv.innerHTML = `<p class="text-center text-muted p-4">No results found.</p>`; 
        return; 
    }
    
    const isDark = document.getElementById('darkWebToggle').checked;
    const filteredData = data.filter(r => isDark || !r.link.includes('.onion'));

    resDiv.innerHTML = filteredData.map(r => {
        const isOnion = r.link.includes('.onion');
        const accentColor = isOnion ? '#00d4ff' : '#bc13fe';
        
       
        const allMatches = [
            ...(r.emails || []), 
            ...(r.phones || []), 
            ...(r.wallets || []),
            ...(r.hashes || [])
        ];
        
       
        const displayText = allMatches.length > 0 ? allMatches.join(' | ') : (r.title || "Unknown Result");

        return `
            <div class="result-card d-flex align-items-center p-3 mb-2" 
                 style="border-left: 4px solid ${accentColor}; background: rgba(255,255,255,0.03); border-radius: 10px;">
                
                <div style="flex: 1; min-width: 0; padding-right: 10px;">
                    <div class="d-flex align-items-center gap-2">
                        <strong class="text-truncate" style="color: ${accentColor}; font-size: 0.95rem;">
                            ${displayText}
                        </strong>
                        ${isOnion ? '<span class="badge bg-info" style="font-size: 0.6rem;">ONION</span>' : ''}
                        ${allMatches.length > 0 ? '<span class="badge bg-success" style="font-size: 0.6rem;">MATCHED</span>' : ''}
                    </div>
                    <small class="text-muted d-block text-truncate" style="font-family: 'Consolas', monospace; font-size: 0.75rem; opacity: 0.7;">
                        <i class="fas fa-link me-1"></i> ${r.link}
                    </small>
                </div>

                <div class="d-flex gap-2" style="flex-shrink: 0;">
                    <button onclick="window.copyToClipboard('${displayText}', this)" 
                            class="btn btn-sm btn-outline-light" 
                            style="border-radius: 8px; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border-color: rgba(255,255,255,0.1);">
                        <i class="fas fa-copy"></i>
                    </button>

                    <a href="${r.link}" target="_blank" 
                       class="btn btn-sm ${isOnion ? 'btn-outline-info' : 'btn-outline-primary'}" 
                       style="border-radius: 8px; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>`;
    }).join('');
}


function setupLocalFilter() {
    const searchInput = document.getElementById('localSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
       
        const filtered = globalData.filter(item => 
            (item.title && item.title.toLowerCase().includes(term)) || 
            (item.link && item.link.toLowerCase().includes(term))
        );
        renderResultsList(filtered);
    });
}


function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const arrow = document.getElementById('arrow-' + sectionId);

    if (!section) return;

    
    if (section.style.display === "none") {
        section.style.display = "block"; 
        if (arrow) arrow.style.transform = "rotate(0deg)";
    } else {
        section.style.display = "none";
        if (arrow) arrow.style.transform = "rotate(180deg)";
    }
}



  async function startSearch(event) {
    event.preventDefault();
    const queryInput = document.getElementById('queryInput');
    const isDark = document.getElementById('darkWebToggle').checked;
    let finalQuery = queryInput.value;
    
    if (isDeepScanActive) finalQuery += ' (filetype:pdf OR filetype:xlsx OR filetype:docx OR filetype:log)';
    if (isDeepScanActive) {

    const dorks = '("password" OR "secret" OR "login" OR "credentials" ) ' +
                  '(filetype:pdf OR filetype:xlsx OR filetype:docx OR filetype:txt OR filetype:log)';

    const searchQuery = queryInput.value.trim() + " " + dorks;

    
    window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(searchQuery),
        "_blank"
    );

}

    const resDiv = document.getElementById("results");

   
    let loaderHtml = `
        <div class='text-center p-5 animate__animated animate__fadeIn'>
            <div class="spinner-border text-danger" role="status" style="width: 3.5rem; height: 3.5rem; border-width: 0.25em;"></div>
            <h4 class="mt-4 text-light font-monospace">🕵️ DEEP SCAN INITIALIZED...</h4>
            <p class="text-muted mb-4" id="statusMessage">${isDark ? "Establishing Secure Tor Tunnel..." : "Querying Search Nodes..."}</p>
            
            <div class="progress bg-dark mx-auto shadow-sm" style="width: 85%; height: 12px; border: 1px solid #333; border-radius: 10px;">
                <div id="scanProgress" class="progress-bar progress-bar-striped progress-bar-animated bg-danger" style="width: 5%; transition: width 0.5s ease;"></div>
            </div>
            
            <div class="mt-3">
                <span class="badge rounded-pill bg-dark text-warning p-2 px-3 shadow-sm" id="timerHint" style="font-size: 0.9rem; border: 1px solid #444;">
                    <i class="fas fa-hourglass-half me-2"></i>Estimated: Calculating...
                </span>
            </div>
        </div>`;
    
    resDiv.innerHTML = loaderHtml;

    const formData = new FormData();
    formData.append('query', finalQuery);
    formData.append('onion_mode', isDark);
    formData.append('country', document.getElementById('countrySelect').value);
    formData.append('depth', document.getElementById("depthSelect").value);

    
    const onionNodesCount = 10; 
    const normalNodesCount = 5;
    let timeLeft = isDark ? (onionNodesCount * 15) : (normalNodesCount * 3);
    let progress = 5;

    let timerInterval = setInterval(() => {
        if (timeLeft > 3) {
            timeLeft -= 1;
           
            if (progress < 90) progress += isDark ? 0.5 : 5;
            
            document.getElementById('timerHint').innerHTML = `<i class="fas fa-hourglass-half me-2"></i>Remaining: ~${timeLeft}s`;
            document.getElementById('scanProgress').style.width = progress + "%";
            
            
            if (timeLeft % 8 === 0) {
                const msgs = isDark ? 
                    ["Bypassing DDOS guards...", "Parsing Onion Nodes...", "Extracting Leaked Data...", "Checking Ransomware Archives..."] :
                    ["Filtering results...", "Analyzing Metadata...", "Categorizing Links..."];
                document.getElementById('statusMessage').innerText = msgs[Math.floor(Math.random()*msgs.length)];
            }
        }
    }, 1000);

    try {
        const response = await fetch('/search', { method: 'POST', body: formData });
        const data = await response.json();
        
        clearInterval(timerInterval); 

        localStorage.setItem('lastScanResults', JSON.stringify(data));
        localStorage.setItem('lastScanQuery', queryInput.value);

        globalData = data.results;
        lastScanStats.emails = data.stats.emails || [];
        lastScanStats.phones = data.stats.phones || [];
        lastScanStats.wallets = data.stats.wallets || [];
        lastScanStats.hashes = data.stats.hashes || [];
        
        renderResultsList(data.results);
        renderNetworkGraph(data.results, queryInput.value);

        if (data.stats) {
            document.getElementById('emailStats').innerText = data.stats.emails_count || 0;
            document.getElementById('dbStats').innerText = data.stats.db_count || 0;
            
            if (document.getElementById('walletStats')) {
                document.getElementById('walletStats').innerText = data.stats.wallets_count || 0;
            }
            if (document.getElementById('hashStats')) {
                document.getElementById('hashStats').innerText = data.stats.hashes_count || 0;
            }

            const phoneElement = document.getElementById('phoneStats');
            if (phoneElement) {
               phoneElement.innerText = isDark ? (data.stats.pass_count || 0) : (data.stats.phones_count || lastScanStats.phones.length);
            }
            document.getElementById('resultsStats').innerText = data.stats.total_nodes || 0;
        }
        
    } catch (e) { 
        clearInterval(timerInterval);
        console.error(e);
        resDiv.innerHTML = "<div class='text-danger text-center p-5'><i class='fas fa-exclamation-triangle fa-3x mb-3'></i><br>Connection Error !</div>"; 
    }
}
async function handleDarkWebFlow() {
    const toggle = document.getElementById('darkWebToggle');
    const card = document.getElementById('tor-status-card');
    const loader = document.getElementById('tor-loader');
    const body = document.body;
    const isDark = toggle.checked;
    const scanBtn = document.getElementById('mainScanBtn');
    const deepScanBtn = document.getElementById('deepScanBtn');

   
    localStorage.setItem('darkWebMode', isDark);
    
    
    const countryWrapper = document.getElementById('countryWrapper');
    const depthWrapper = document.getElementById('depthWrapper');
    const actionBtnWrapper = document.getElementById('actionBtnWrapper');
    const queryWrapper = document.getElementById('queryWrapper');
    
    const dbCol = document.getElementById('dbCol');
    const walletCol = document.getElementById('walletCol');
    const hashCol = document.getElementById('hashCol');
    const emailCol = document.getElementById('emailCol');
    const phonePassCol = document.getElementById('phonePassCol');
    const totalCol = document.getElementById('totalCol');
    const phonePassIcon = document.getElementById('phonePassIcon');
    const phonePassText = document.getElementById('phonePassText');

    if (isDark) {
        
        deepScanBtn.disabled = true;
        deepScanBtn.style.opacity = "0.5";
        deepScanBtn.style.cursor = "not-allowed";
        deepScanBtn.title = "Deep Scan is disabled in Dark Web mode"; 

    
        isDeepScanActive = false;
        scanBtn.innerHTML = '<i class="fa-solid fa-skull-crossbones me-2"></i> DARK SCAN 💀';
        queryWrapper.className = "col-md-12 mb-2";
        actionBtnWrapper.className = "col-md-12 d-flex justify-content-center gap-2";
        
        if(countryWrapper) countryWrapper.style.display = 'none';
        if(depthWrapper) depthWrapper.style.display = 'none';

        [emailCol, phonePassCol, totalCol, dbCol, walletCol, hashCol].forEach(el => { 
            if(el) { el.className = "col-md-2 stat-col"; el.style.display = 'block'; } 
        });

        phonePassIcon.className = "fa-solid fa-key mb-2";
        phonePassText.innerText = "Passwords Found";
        body.classList.add('dark-web-active');

      
        loader.innerHTML = `<div style="color: #888; font-size: 0.8rem;"><i class="fa-solid fa-sync fa-spin me-2"></i> [WAIT] ESTABLISHING CIRCUIT...</div>`;
        try {
            const response = await fetch('/check_tor'); 
            const data = await response.json();
            if (data.status === "connected") {
                loader.innerHTML = `<div style="color: #00ff00; font-family: monospace; font-size: 0.85rem; text-align: left;"><i class="fa-solid fa-shield-check me-2"></i> TOR: ACTIVE<br><i class="fa-solid fa-network-wired me-2"></i> IP: <span style="color: #00d4ff;">${data.ip}</span></div>`;
            } else {
                loader.innerHTML = `<div style="color: #ff4444; font-size: 0.8rem; text-align: left;"><i class="fa-solid fa-circle-exclamation me-2"></i> TOR_OFFLINE</div>`;
            }
        } catch (error) {
            loader.innerHTML = `<div style="color: #ffa500; font-size: 0.8rem;">ERROR_CONNECTING</div>`;
        }

    } else {

        deepScanBtn.disabled = false;
        deepScanBtn.style.opacity = "1";
        deepScanBtn.style.cursor = "pointer";
        deepScanBtn.title = "Enable Deep Scan (Google Dorks)";


        body.classList.remove('dark-web-active');
        scanBtn.innerHTML = '<i class="fa-solid fa-bolt me-1"></i> SCAN';
        
       
        if(countryWrapper) countryWrapper.style.display = 'block';
        if(depthWrapper) depthWrapper.style.display = 'block';
        
        queryWrapper.className = "col-md-4";
        actionBtnWrapper.className = "col-md-4 d-flex gap-2";

       
        [dbCol, walletCol, hashCol].forEach(el => { if(el) el.style.display = 'none'; });
        [emailCol, phonePassCol, totalCol].forEach(el => { if(el) el.className = "col-md-4 stat-col"; });

      
        loader.innerHTML = `
            <div style="color: #666; font-family: monospace; font-size: 0.85rem; text-align: left;">
                <i class="fa-solid fa-shield me-2"></i> TOR: OFFLINE<br>
                <i class="fa-solid fa-network-wired me-2"></i> IP: 0.0.0.0
            </div>`;

        phonePassIcon.className = "fa-solid fa-phone mb-2";
        phonePassText.innerText = "Phones Found";
    }
}

    function handleCardClick() {
        const isDark = document.getElementById('darkWebToggle').checked;
        showQuickView(isDark ? 'Passwords' : 'Phones');
    }

function renderHunterFromData(results) {
    if (!results) return;

    results.forEach(r => {
        const card = document.getElementById(`status-${r.site}`);
        const loader = document.getElementById(`loader-${r.site}`);
        const img = card?.querySelector('img');

        if (card) {
           
            card.classList.remove('scanning-pulse');

            if (r.status === 'found') {
                
                card.style.opacity = "1";
                card.style.transform = "scale(1.02)"; 
                card.style.borderColor = "#39ff14"; 
                card.style.boxShadow = "0 0 15px rgba(57, 255, 20, 0.2)";
                
                if (img) {
                    img.style.filter = "grayscale(0%) brightness(1.1)";
                    img.style.transition = "all 0.5s ease";
                }

                
                loader.innerHTML = `
                    <a href="${r.url}" target="_blank" class="btn btn-sm btn-cyber-success mt-1">
                        <i class="fa-solid fa-arrow-up-right-from-square me-1"></i> VIEW_PROFILE
                    </a>`;
            } else {
               
                card.style.opacity = "0.2";
                card.style.transform = "scale(0.98)"; 
                card.style.borderColor = "rgba(255, 255, 255, 0.05)";
                card.style.boxShadow = "none";

                if (img) img.style.filter = "grayscale(100%) contrast(0.5)";
                
                loader.innerHTML = `<span style="color: #444; font-size: 0.7rem; font-family: monospace;">[ NOT_FOUND ]</span>`;
            }
        }
    });
}
async function startHunter() {
    const input = document.getElementById('usernameInput');
    if (!input || !input.value) {
        showCyberAlert("USERNAME_REQUIRED");
        return;
    }
    const user = input.value;

    const socialTargets = [
        { name: "Facebook", url: "https://www.facebook.com/{}", icon: "fa-facebook" },
        { name: "Twitter", url: "https://x.com/{}", icon: "fa-x-twitter" },
        { name: "Instagram", url: "https://www.instagram.com/{}", icon: "fa-instagram" },
        { name: "TikTok", url: "https://www.tiktok.com/@{}", icon: "fa-tiktok" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/{}", icon: "fa-linkedin" },
        { name: "Pinterest", url: "https://www.pinterest.com/{}", icon: "fa-pinterest" },
        { name: "Snapchat", url: "https://www.snapchat.com/add/{}", icon: "fa-snapchat" },
        { name: "Reddit", url: "https://www.reddit.com/user/{}", icon: "fa-reddit" },
        { name: "GitHub", url: "https://github.com/{}", icon: "fa-github" },
        { name: "GitLab", url: "https://gitlab.com/{}", icon: "fa-gitlab" },
        { name: "StackOverflow", url: "https://stackoverflow.com/users/{}", icon: "fa-stack-overflow" },
        { name: "HackerRank", url: "https://www.hackerrank.com/{}", icon: "fa-code" },
        { name: "Dev.to", url: "https://dev.to/{}", icon: "fa-dev" },
        { name: "Kaggle", url: "https://www.kaggle.com/{}", icon: "fa-brain" },
        { name: "Behance", url: "https://www.behance.net/{}", icon: "fa-behance" },
        { name: "Dribbble", url: "https://dribbble.com/{}", icon: "fa-dribbble" },
        { name: "Flickr", url: "https://www.flickr.com/people/{}", icon: "fa-flickr" },
        { name: "Vimeo", url: "https://vimeo.com/{}", icon: "fa-vimeo" },
        { name: "Twitch", url: "https://www.twitch.org/{}", icon: "fa-twitch" },
        { name: "Steam", url: "https://steamcommunity.com/id/{}", icon: "fa-steam" },
        { name: "Roblox", url: "https://www.roblox.com/user.aspx?username={}", icon: "fa-gamepad" },
        { name: "Ask.fm", url: "https://ask.fm/{}", icon: "fa-question" },
        { name: "Tellonym", url: "https://tellonym.me/{}", icon: "fa-message" },
        { name: "Sarahah", url: "https://{}.sarahah.com", icon: "fa-envelope" },
        { name: "SoundCloud", url: "https://soundcloud.com/{}", icon: "fa-soundcloud" },
        { name: "Medium", url: "https://medium.com/@{}", icon: "fa-medium" },
        { name: "Tumblr", url: "https://{}.tumblr.com", icon: "fa-tumblr" },
        { name: "Telegram", url: "https://t.me/{}", icon: "fa-telegram" }
    ];

   
    socialTargets.forEach(site => {
        const card = document.getElementById(`card-${site.name}`) || 
                     document.getElementById(`status-${site.name}`)?.closest('.hunter-card');
        if (card) {
            
           
        }
    });

    let currentLog = "INITIATING_GLOBAL_SCAN..."; 
    let isScanning = true;

  
    const forceShow = setInterval(() => {
        if (isScanning) {
            
            showCyberAlert(`${currentLog} > Traget : ${user}...`);
        } else {
            clearInterval(forceShow);
        }
    }, 2000);

    const formData = new FormData();
    formData.append('username', user);
    formData.append('targets', JSON.stringify(socialTargets));

    try {
        const response = await fetch('/check_username', { method: 'POST', body: formData });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const allResults = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            
            
            const lines = chunk.split("\n").filter(line => line.trim() !== "");

            for (const line of lines) {
                try {
                    const data = JSON.parse(line);
                    if (data.is_finished) break;

                    currentLog = `${data.site}: ${data.status.toUpperCase()}`;
                    
                    
                    updateCardStatus([{ name: data.site, found: data.status === "found", url: data.url }]);
                    allResults.push(data);
                } catch (e) {
                    continue; 
                }
            }
        }

        isScanning = false;
        clearInterval(forceShow);

        localStorage.setItem('lastHunterResults', JSON.stringify(allResults));
        renderHunterFromData(allResults);
        
        setTimeout(() => {
            showCyberAlert(` SCAN_COMPLETE `);
        }, 100);

    } catch (e) {
        isScanning = false;
        clearInterval(forceShow);
        console.error("Hunter Error:", e);
        setTimeout(() => {
            showCyberAlert("❌ CONNECTION_INTERRUPTED");
        }, 100);
    } finally {
        setTimeout(() => {
            const alertBox = document.getElementById('cyberAlert');
            if (alertBox) alertBox.classList.remove('show');
        }, 4000);
    }
}


function updateCardStatus(results) {
    results.forEach(site => {
        const card = document.getElementById(`card-${site.name}`) || 
                     document.getElementById(`status-${site.name}`)?.closest('.hunter-card');
        if (!card) return;
        card.classList.remove('hunting-active', 'status-found', 'status-not-found');
        const isFound = site.found === true || site.found === "true" || !!site.url;
        card.classList.add(isFound ? 'status-found' : 'status-not-found');
    });
}

    
   function renderNetworkGraph(data, name) {
    const container = document.getElementById("resultMap");
    if(!container) return;
    const isDark = document.getElementById('darkWebToggle').checked;

    const nodes = new vis.DataSet([{ 
        id: 1, label: name, 
        color: { background: '#0c0c14', border: '#bc13fe' }, 
        shape: 'box', margin: 15, font: { color: '#ffffff', weight: 'bold' } 
    }]);
    const edges = new vis.DataSet([]);
    
    const groups = {
        'social': { id: 100, label: 'SOCIAL', icon: 'https://cdn-icons-png.flaticon.com/512/2583/2583852.png' },
        'other': { id: 105, label: 'WEB NODES', icon: 'https://cdn-icons-png.flaticon.com/512/565/565547.png' }
    };

    if (isDark) {
        groups['crypto'] = { id: 106, label: 'WALLETS', icon: 'https://cdn-icons-png.flaticon.com/512/2163/2163477.png' };
        groups['hashes'] = { id: 107, label: 'HASHES', icon: 'https://cdn-icons-png.flaticon.com/512/2622/2622550.png' };
    }

    Object.values(groups).forEach(g => {
        nodes.add({ id: g.id, label: g.label, shape: 'image', image: g.icon, size: 25 });
        edges.add({ from: 1, to: g.id, color: 'rgba(188, 19, 254, 0.6)', width: 2 });
    });

    data.forEach((r, i) => {
        if (!isDark && r.link.includes('.onion')) return;

        const nodeId = i + 200;
        let domain = "";
        try { domain = new URL(r.link).hostname; } catch(e) { domain = "web"; }
        const fav = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

        nodes.add({ 
            id: nodeId, 
            label: r.title.substring(0, 15), 
            shape: 'image', 
            image: fav, 
            size: 20, 
            url: r.link 
        });

        const link = r.link.toLowerCase();
        let pId = 105;
        if (link.includes("facebook") || link.includes("twitter") || link.includes("instagram")) pId = 100;
        
        edges.add({ from: pId, to: nodeId, color: 'rgba(188, 19, 254, 0.3)' });

        if (isDark) {
            if (r.wallets) {
                r.wallets.forEach(w => {
                    const wId = `w-${w}`;
                    if(!nodes.get(wId)) nodes.add({ id: wId, label: 'Wallet', shape: 'diamond', color: '#ffcc00', investUrl: `https://www.blockchain.com/explorer/search?search=${w}` });
                    edges.add({ from: 106, to: wId });
                    edges.add({ from: nodeId, to: wId, dashes: true });
                });
            }
            if (r.hashes) {
                r.hashes.forEach(h => {
                    const hId = `h-${h}`;
                    if(!nodes.get(hId)) nodes.add({ id: hId, label: 'Hash', shape: 'triangle', color: '#ff4444' });
                    edges.add({ from: 107, to: hId });
                });
            }
        }
    });

    const network = new vis.Network(container, { nodes, edges }, { 
        physics: { enabled: true, solver: 'forceAtlas2Based', stabilization: { iterations: 100 } },
        interaction: { hover: true }
    });
    
    network.on("click", (p) => {
        if (p.nodes.length > 0) {
            const n = nodes.get(p.nodes[0]);
            if (n.url) window.open(n.url, '_blank');
            if (n.investUrl) window.open(n.investUrl, '_blank');
        }
    });
}

    function showQuickView(type) {
    let data = [];
    
   
    switch(type) {
        case 'Emails': data = lastScanStats.emails; break;
        case 'Wallets': data = lastScanStats.wallets; break;
        case 'Hashes': data = lastScanStats.hashes; break;
        case 'Phones': data = lastScanStats.phones; break;
        case 'Passwords': 
            
            data = lastScanStats.phones.length > 0 ? lastScanStats.phones : (lastScanStats.passwords || []); 
            break;
    }

    const container = document.getElementById("qv-content");
    const title = document.getElementById("qv-title");
    if (title) title.innerText = `${type} Detected`;
    if (!container) return;

    if (data && data.length > 0) {
        container.innerHTML = data.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2 p-2" 
                 style="background: rgba(255,255,255,0.05); border-left: 3px solid #bc13fe; border-radius: 4px;">
                <span style="font-family: monospace; font-size: 0.9rem; color: #eee;">${item}</span>
                <button class="btn btn-sm btn-outline-info" 
                        onclick="copyToClipboard('${item.toString().replace(/'/g, "\\'")}', this)">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');
    } else {
        container.innerHTML = `<div class="text-center p-4 text-muted">No ${type} found in memory.</div>`;
    }
    
    const modal = document.getElementById("quickView");
    if (modal) modal.style.display = "block";
}
    
    function generateProfessionalReport() {
        const query = localStorage.getItem('lastScanQuery') || 'N/A';
        const reportWindow = window.open('', '_blank');
        reportWindow.document.write(`
            <html><head><title>Forensic Report - ${query}</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
                .header { border-bottom: 3px solid #bc13fe; padding-bottom: 20px; margin-bottom: 30px; }
                .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #eee; padding: 12px; text-align: left; }
                th { background: #f8f9fa; color: #bc13fe; }
                .timestamp { color: #888; font-size: 12px; }
            </style></head><body>
                <div class="header"><h1>OSINT INTELLIGENCE REPORT</h1><p class="timestamp">Generated: ${new Date().toLocaleString()}</p><p>Target: <strong>${query}</strong></p></div>
                <div class="stat-grid">
                    <div class="stat-card"><h3>Emails</h3><p>${lastScanStats.emails.length}</p></div>
                    <div class="stat-card"><h3>Wallets</h3><p>${lastScanStats.wallets.length}</p></div>
                    <div class="stat-card"><h3>Data Nodes</h3><p>${globalData.length}</p></div>
                </div>
                <h3>Evidence Collection:</h3>
                <table><thead><tr><th>Type</th><th>Value</th></tr></thead><tbody>
                    ${lastScanStats.emails.map(e => `<tr><td>Email</td><td>${e}</td></tr>`).join('')}
                    ${lastScanStats.wallets.map(w => `<tr><td>Wallet</td><td>${w}</td></tr>`).join('')}
                    ${lastScanStats.hashes.map(h => `<tr><td>Hash</td><td>${h}</td></tr>`).join('')}
                </tbody></table>
            </body></html>`);
        reportWindow.document.close();
        setTimeout(() => reportWindow.print(), 500);
    }




    
 function closeQuickView() { document.getElementById("quickView").style.display = "none"; }



function updateTabButtons(savedTab) {
    const osintBtn = document.getElementById('btn-osint');
    const hunterBtn = document.getElementById('btn-hunter');

   
    osintBtn?.classList.remove('active');
    hunterBtn?.classList.remove('active');

  
    if (savedTab === 'osint') {
        osintBtn?.classList.add('active');
    } else if (savedTab === 'hunter') {
        hunterBtn?.classList.add('active');
    }
}

var isDeepScanActive = false;
function toggleDeepScan(btn) {
    isDeepScanActive = !isDeepScanActive;
    
    if (isDeepScanActive) {
        btn.classList.add('active-mode');
        console.log("Deep Scan: ARMED (Ready to fire)");
    } else {
        btn.classList.remove('active-mode');
        console.log("Deep Scan: DISARMED");
    }
}



async function switchTab(savedTab) {
    const osintSection = document.getElementById('osint-section');
    const hunterSection = document.getElementById('hunter-section');
    const darkToggle = document.getElementById('darkWebToggle');
    const darkWrapper = document.getElementById('darkWebToggleWrapper');
    
    
    localStorage.setItem('activeTab', savedTab);

    const isDarkModeActive = darkToggle ? darkToggle.checked : false;

    if (savedTab === 'hunter') {
        
        if (hunterSection) {
            hunterSection.style.display = 'block';
            if (document.getElementById('hunterResults').innerHTML.trim() === "") {
                initHunterUI();
            }
        }

        
        if (darkWrapper) {
            darkWrapper.style.opacity = '0';
            darkWrapper.style.transform = 'translateX(20px)';
            setTimeout(() => { darkWrapper.style.display = 'none'; }, 500);
        }

        
        if (isDarkModeActive) {
            if (darkToggle) darkToggle.checked = false;
            localStorage.setItem('darkWebMode', false); 
            handleDarkWebFlow(); 
            showCyberAlert("TERMINATING_SECURE_SESSION...");
        }
    }



    
    const currentSection = (savedTab === 'hunter') ? osintSection : hunterSection;
    const targetSection = (savedTab === 'hunter') ? hunterSection : osintSection;

    if (currentSection) currentSection.classList.add('section-fade-out');

    setTimeout(() => {
        if (osintSection) osintSection.style.display = 'none';
        if (hunterSection) hunterSection.style.display = 'none';
        
        if (currentSection) currentSection.classList.remove('section-fade-out');

        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(10px)';

            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                
                if (savedTab === 'osint' && darkWrapper) {
                    darkWrapper.style.display = 'flex';
                    setTimeout(() => {
                        darkWrapper.style.opacity = '1';
                        darkWrapper.style.transform = 'translateX(0)';
                    }, 50);
                }
            }, 50);
        }
        
    
        if (typeof updateTabButtons === 'function') updateTabButtons(savedTab);

    }, 600);
}
function executeTabLogic(savedTab) {
    const darkSwitchWrapper = document.getElementById('darkWebToggleWrapper');
    
    
    localStorage.setItem('activeTab', savedTab);

    
    if (darkSwitchWrapper) {
        if (savedTab === 'osint') {
            darkSwitchWrapper.style.display = 'flex';
           
            darkSwitchWrapper.style.opacity = '1';
        } else {
            darkSwitchWrapper.style.display = 'none';
        }
    }

 
    const allTabs = document.querySelectorAll('.tab-btn'); 
    allTabs.forEach(btn => btn.classList.remove('active-tab'));
    
    const activeBtn = document.getElementById(`${tab}TabBtn`);
    if (activeBtn) {
        activeBtn.classList.add('active-tab');
    }

    
    if (savedTab === 'hunter') {
        const container = document.getElementById('hunterResults');
        if (container && container.innerHTML === "") {
            initHunterUI();
        }
    }


    if (savedTab === 'osint') {
        if (darkSwitchWrapper) darkSwitchWrapper.style.setProperty('display', 'flex', 'important');
        document.getElementById('btn-osint').classList.add('active');
        document.getElementById('btn-hunter').classList.remove('active');
    } else {
        if (darkSwitchWrapper) darkSwitchWrapper.style.setProperty('display', 'none', 'important');
        document.getElementById('btn-hunter').classList.add('active');
        document.getElementById('btn-osint').classList.remove('active');
        if (document.getElementById('hunterResults').innerHTML.trim() === "") initHunterUI();
    }
}

function resetHunter() {
    localStorage.removeItem('lastHunterResults');
    document.getElementById('usernameInput').value = '';
    initHunterUI(); 




    document.addEventListener("DOMContentLoaded", () => {
   

    const savedTab = localStorage.getItem('activeTab') || 'osint';
    const savedMode = localStorage.getItem('darkWebMode') === 'true';

    
    const darkToggle = document.getElementById('darkWebToggle');
    if (darkToggle) {
        darkToggle.checked = savedMode;
        if (savedMode) document.body.classList.add('dark-web-active');
        if (typeof handleDarkWebFlow === 'function') handleDarkWebFlow(false); 
    }
    if (typeof switchTab === 'function') switchTab(savedTab, false); 

    
    const savedData = localStorage.getItem('lastScanResults');
    const savedQuery = localStorage.getItem('lastScanQuery');

    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            globalData = data.results || [];
            
            if (data.stats) {
   
    lastScanStats.emails = data.stats.emails || [];
    lastScanStats.phones = data.stats.phones || [];
    lastScanStats.wallets = data.stats.wallets || [];
    lastScanStats.hashes = data.stats.hashes || [];
}
if (typeof updateAllModals === 'function') {
    updateAllModals(); 
}

if (typeof renderMiniList === 'function') {
    renderMiniList(lastScanStats.emails, 'emailListContainer');
}

    document.getElementById('emailStats').innerText = lastScanStats.emails.length;

            if (typeof renderResultsList === 'function') renderResultsList(globalData);
            
            
            if (typeof renderNetworkGraph === 'function' && savedQuery) {
               
                renderNetworkGraph(globalData, savedQuery);
            }

           
            if (data.stats) {
               
                const emailStat = document.getElementById('emailStats');
                if (emailStat) emailStat.innerText = data.stats.emails?.length || 0;

                
                const walletStat = document.getElementById('walletStats');
                if (walletStat) walletStat.innerText = data.stats.wallets?.length || 0;

                
                const phonePassStat = document.getElementById('phoneStats');
                if (phonePassStat) {
                    phonePassStat.innerText = savedMode ? (data.stats.pass_count || 0) : (data.stats.phones?.length || 0);
                }

            
                const totalStat = document.getElementById('resultsStats');
                if (totalStat) totalStat.innerText = data.stats.count || globalData.length;
            }

           
            const queryInput = document.getElementById('queryInput');
            if (queryInput && savedQuery) queryInput.value = savedQuery;

            
        } catch (e) {
            console.error("❌ JSON Parse Error:", e);
        }
    }
});




    //////////////////////////

    const mockData = {
    results: [
        {
            title: "Onion Leak - Database Alpha",
            link: "http://vww6yvdt.onion/archive/db_01",
            wallets: ["bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"],
            hashes: ["5d41402abc4b2a76b9719d911017c592"]
        },
        {
            title: "Exploit.in - Private Paste",
            link: "http://exploit.in/paste/admin_leaks",
            wallets: ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F"],
            hashes: ["8b1a9953c4611296a827abf8c47804d7"]
        },
        {
            title: "Ransomware Group - Victim Files",
            link: "http://lockbit.onion/leaks/target_corp",
            wallets: ["1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"],
            hashes: ["21232f297a57a5a743894a0e4a801fc3"]
        }
    ],
    stats: {
        emails: ["admin@company.com", "root@server.onion", "dev_sec@proton.me"],
        phones: ["+12025550156", "SecureP@ss123", "Admin@2024!"],
        wallets: ["bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"],
        hashes: ["5d41402abc4b2a76b9719d911017c592", "8b1a9953c4611296a827abf8c47804d7", "21232f297a57a5a743894a0e4a801fc3"],
        emails_count: 3,
        phones_count: 0,
        pass_count: 2, 
        wallets_count: 3,
        hashes_count: 3,
        db_count: 5,
        total_nodes: 15
    }
};
}


    function exportData(format) {
        if (format === 'pdf') {
            generateProfessionalReport();
        } else {
            if (!globalData.length) return alert("No data!");
            let content = format === 'json' ? JSON.stringify(globalData) : globalData.map(i => i.link).join('\n');
            const blob = new Blob([content], { type: "text/plain" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `Report.${format}`;
            a.click();
        }
    }

    function resetAll() {
        localStorage.removeItem('lastScanResults');
        localStorage.removeItem('lastScanQuery');
        location.reload();
    }


function toggleEmail() {
    const popup = document.getElementById('emailPopup');
    popup.classList.toggle('show');
}

function copyEmail() {
    const email = document.getElementById('emailText').innerText;
    const feedback = document.getElementById('copyFeedback');
    
    
    navigator.clipboard.writeText(email).then(() => {
        
        feedback.innerHTML = '<i class="fas fa-check" style="color: #03dac6;"></i>';
        
       
        feedback.style.display = 'block';
        
        
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 1500);
    });
}


window.onclick = function(event) {
    const popup = document.getElementById('emailPopup');
    if (popup && !event.target.closest('.email-wrapper')) {
        popup.classList.remove('show');
    }
}


  //                             <------- END ----->



  //////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////
  ///////////////////

     // test function
    function runUIMockTest() {
    console.log("🚀 Starting UI Test with Mock Data...");

   
    localStorage.setItem('lastScanResults', JSON.stringify(mockData));
    localStorage.setItem('lastScanQuery', "TEST_TARGET_OSINT");

    
    globalData = mockData.results;
    lastScanStats.emails = mockData.stats.emails;
    lastScanStats.phones = mockData.stats.phones;
    lastScanStats.wallets = mockData.stats.wallets;
    lastScanStats.hashes = mockData.stats.hashes;

    if(document.getElementById('emailStats')) document.getElementById('emailStats').innerText = mockData.stats.emails_count;
    if(document.getElementById('walletStats')) document.getElementById('walletStats').innerText = mockData.stats.wallets_count;
    if(document.getElementById('hashStats')) document.getElementById('hashStats').innerText = mockData.stats.hashes_count;
    if(document.getElementById('resultsStats')) document.getElementById('resultsStats').innerText = mockData.stats.total_nodes;
    
    const isDark = document.getElementById('darkWebToggle')?.checked;
    const phoneEl = document.getElementById('phoneStats');
    if(phoneEl) phoneEl.innerText = isDark ? mockData.stats.pass_count : mockData.stats.phones_count;

    renderResultsList(mockData.results);
    renderNetworkGraph(mockData.results, "TEST_TARGET_OSINT");

    console.log("✅ UI Updated with Mock Data. Ready for inspection!");
}