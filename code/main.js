        const loginPanel = document.getElementById('loginPanel');
        const signupPanel = document.getElementById('signupPanel');
        const toSignupLink = document.getElementById('toSignup');
        const toLoginLink = document.getElementById('toLogin');

        toSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginPanel.classList.remove('active');
            signupPanel.classList.add('active');
        });

        toLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            signupPanel.classList.remove('active');
            loginPanel.classList.add('active');
        });
    
// --- 1. LIGHT/DARK MODE THEME SYSTEM ---
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

function toggleTheme(e) {
    if (e) e.preventDefault();
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    
    updateChartTheme(targetTheme);
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

if (window.innerWidth <= 992) {
    document.querySelector('.mobile-theme-item').style.display = 'block';
}


// --- 2. MOBILE HAMBURGER MENU SYSTEM ---
const menuToggle = document.getElementById('menuToggle');
const sidebarContainer = document.getElementById('sidebarContainer');

menuToggle.addEventListener('click', function() {
    sidebarContainer.classList.toggle('open');
    menuToggle.innerText = sidebarContainer.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('.nav-links .nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        if(link.id !== 'mobileThemeToggle') {
            sidebarContainer.classList.remove('open');
            menuToggle.innerText = '☰';
        }
    });
});


// --- 3. RESPONSIVE CHART.JS DATA ENGINE ---
const ctx = document.getElementById('performanceChart').getContext('2d');

function getChartColors(theme) {
    return {
        grid: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
        text: theme === 'light' ? '#5a6578' : '#c5c6c7',
        line: theme === 'light' ? '#00a896' : '#66fcf1',
        fill: theme === 'light' ? 'rgba(0, 168, 150, 0.05)' : 'rgba(102, 252, 241, 0.03)'
    };
}

let colors = getChartColors(currentTheme);

const performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
        datasets: [{
            label: 'Data Throughput (GB/s)',
            data: [12, 19, 15, 25, 22, 30, 28], // Fixed empty data node
            borderColor: colors.line,
            backgroundColor: colors.fill,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: colors.line,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                grid: { color: colors.grid },
                ticks: { color: colors.text, font: { family: 'Poppins' } }
            },
            y: {
                grid: { color: colors.grid },
                ticks: { color: colors.text, font: { family: 'Poppins' } },
                min: 0
            }
        }
    }
});

function updateChartTheme(theme) {
    const newColors = getChartColors(theme);
    performanceChart.options.scales.x.grid.color = newColors.grid;
    performanceChart.options.scales.x.ticks.color = newColors.text;
    performanceChart.options.scales.y.grid.color = newColors.grid;
    performanceChart.options.scales.y.ticks.color = newColors.text;
    
    // Fixed dataset selection index targeting error
    performanceChart.data.datasets[0].borderColor = newColors.line;
    performanceChart.data.datasets[0].backgroundColor = newColors.fill;
    performanceChart.data.datasets[0].pointBackgroundColor = newColors.line;
    performanceChart.update();
}


// --- 4. LOGOUT ROUTE ---
 // Safe Viewport Verification Engine
    document.getElementById('logoutTrigger').addEventListener('click', function() {
        // Clear pseudo session context and push back to login
        window.location.href = "index.html";
    });
