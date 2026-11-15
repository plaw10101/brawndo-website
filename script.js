document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal functionality
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Trigger once on load

    // Chaotic Buy Button
    const buyBtn = document.getElementById('buy-btn');
    const overlay = document.querySelector('.glitch-overlay');

    if (buyBtn) {
        buyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Extreme Screen Shake and Glitch
            document.body.style.animation = 'shake 0.5s';
            overlay.classList.add('active');
            
            setTimeout(() => {
                document.body.style.animation = '';
                overlay.classList.remove('active');
            }, 500);

            // Ridiculous Alert
            const alerts = [
                "ELECTROLYTES INJECTED DIRECTLY INTO RETINAS!",
                "ERROR: YOU ARE TOO WEAK FOR THIS. DRINK MORE BRAWNDO.",
                "THANK YOU FOR YOUR PURCHASE. YOUR BANK ACCOUNT HAS BEEN MUTILATED.",
                "WHAT ARE YOU DOING? DRINK IT! DRINK IT NOW!",
                "SUCCESS. THE MINISTRY OF STATE HAS BEEN NOTIFIED."
            ];
            const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            
            setTimeout(() => {
                alert(randomAlert);
            }, 100);
        });
    }

    // Idiocracy Ads Logic
    const popup = document.getElementById('idiocracy-popup');
    const closeBtn = document.getElementById('close-popup');
    const carlsBtn = document.querySelector('.btn-carls');

    // Show popup after 3 seconds
    setTimeout(() => {
        if(popup) popup.classList.add('show');
    }, 3000);

    // Make close button run away occasionally
    if (closeBtn) {
        closeBtn.addEventListener('mouseover', () => {
            if (Math.random() > 0.5) {
                closeBtn.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
            }
        });

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
            // But it comes back after 10 seconds!
            setTimeout(() => {
                popup.classList.add('show');
            }, 10000);
        });
    }

    if (carlsBtn) {
        carlsBtn.addEventListener('click', () => {
            alert("BROUGHT TO YOU BY CARL'S JR.");
            popup.classList.remove('show');
        });
    }

    // Floating Ads clicking
    const ads = document.querySelectorAll('.floating-ad');
    ads.forEach(ad => {
        ad.addEventListener('click', () => {
            alert("THANK YOU FOR SUPPORTING OUR SPONSORS. YOUR ACCOUNT HAS BEEN CHARGED.");
        });
    });
});

// Add shake animation to document dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}
`;
document.head.appendChild(style);

// ===== LIVE GLOBAL VIEWS COUNTER =====
(function () {
    // ---------- CONFIG (edit these numbers) ----------
    var CFG = {
        base: 1000000,      // starting lifetime count
        dailyJump: 8000,    // ~added each UTC day (the day-to-day step)
        peakHour: 21,       // hour (UTC, 0-23) of peak activity
        label: 'GLOBAL SITE VIEWS',
        subLabel: 'EVERYBODY\u2019S DRINKING BRAWNDO'
    };
    // deterministic hash -> [0,1], same on every browser (reproducible)
    function hash01(x){ var n = Math.sin(x*127.1 + 311.7) * 43758.5453; return n - Math.floor(n); }
    // some days bigger than others (deterministic, reproducible)
    function dayTotal(k){ return CFG.dailyJump * (0.55 + 1.4 * hash01(k)); }
    // monotonic 0->1 across a day, NONLINEAR (fast near peak, slow at night)
    function dayFraction(x){
        var p = CFG.peakHour/24;
        var a = 0.85;
        var c = a / (2*Math.PI*(1+a));
        return x - c*(Math.sin(2*Math.PI*(x-p)) + Math.sin(2*Math.PI*p));
    }
    // lifetime total derived from UTC clock -> identical for every viewer
    function totalViews(){
        var sec = Math.floor(Date.now()/1000);   // UTC ms since epoch, same everywhere
        var day = Math.floor(sec/86400);
        var x = (sec - day*86400)/86400;          // fraction of today (0..1), UTC
        var sum = CFG.base;
        for (var k=0;k<day;k++){ sum += dayTotal(k); }
        sum += dayTotal(day) * dayFraction(x);     // grows within the day
        return Math.round(sum);
    }
    var el = document.getElementById('gv-number');
    function render(){ if(el){ el.textContent = totalViews().toLocaleString('en-US'); } }
    render();
    setInterval(render, 1000);
    var head = document.getElementById('views-head');
    if(head){ head.innerHTML = '<span class="live-dot"></span> ' + CFG.label; }
    var sub = document.getElementById('views-sub');
    if(sub){ sub.textContent = 'LIVE \u2014 ' + CFG.subLabel; }
})();
