document.addEventListener("DOMContentLoaded", () => {
    // Top Bar and Navigation Elements Selectors
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebarDrawer = document.getElementById('sidebarDrawer');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    const dashboardView = document.getElementById('dashboardView');
    const depositView = document.getElementById('depositView');
    const Btn = document.getElementById('backBtn');
    
    const cards = document.querySelectorAll('.card');
    const menuItems = document.querySelectorAll('.menu-item');
    const methodButtons = document.querySelectorAll('.method-btn');
    const formHeading = document.querySelector('.form-panel h3');
    

    // ==================== SIDEBAR CONTROL LOGIC ====================
    function openSidebar() {
        sidebarDrawer.classList.add('open');
        sidebarOverlay.classList.add('visible');
    }

    function closeSidebar() {
        sidebarDrawer.classList.remove('open');
        sidebarOverlay.classList.remove('visible');
    }

    // Event listeners for open/close mechanisms
    menuToggleBtn.addEventListener('click', openSidebar);
    sidebarCloseBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // ==================== ROUTING PANELS LOGIC ====================
    function switchView(targetRoute) {
        dashboardView.classList.add('hidden');
        depositView.classList.add('hidden');

        if (targetRoute === 'deposit') {
            depositView.classList.remove('hidden');
        } else {
            dashboardView.classList.remove('hidden');
        }
        
        // Sync Link Indicators 
        menuItems.forEach(item => {
            item.classList.remove('active-link');
            if(item.getAttribute('data-target') === targetRoute) {
                item.classList.add('active-link');
            }
        });

        window.scrollTo(0, 0);
    }
    // 1. Initialize default balance in localStorage if it doesn't exist yet
if (localStorage.getItem("walletBalance") === null) {
    localStorage.setItem("walletBalance", "999.00");
}

// 2. Function to update balance displays across the dashboard UI dynamically
function updateDashboardBalanceUI() {
    const currentBalance = parseFloat(localStorage.getItem("walletBalance")) || 0;
    
    // Target the main balance text inside the purple glow info-card under Deposit view
    const depositBalanceElement = document.querySelector("#depositView .purple-glow .info-value");
    if (depositBalanceElement) {
        depositBalanceElement.textContent = "₹" + currentBalance.toFixed(2);
    }
}

// 3. Execute setup operations when the document structure is fully ready
document.addEventListener("DOMContentLoaded", () => {
    // Render initial balance on page load
    updateDashboardBalanceUI();

    // Check if the user was sent here due to an insufficient balance redirect from key.html
    if (localStorage.getItem("redirectToDeposit") === "true") {
        localStorage.removeItem("redirectToDeposit");

        // Force switch view to display the Deposit interface container block immediately
        const dashboardView = document.getElementById("dashboardView");
        const depositView = document.getElementById("depositView");
        
        if (dashboardView) dashboardView.classList.add("hidden");
        if (depositView) depositView.classList.remove("hidden");

        // Sync active sidebar item navigation styling highlight state
        document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("active-link"));
        const depositLink = document.querySelector('.menu-item[data-target="deposit"]');
        if (depositLink) depositLink.classList.add("active-link");
    }
});

// 4. Ensure data syncs correctly if navigating back using browser history arrows
window.addEventListener("pageshow", updateDashboardBalanceUI);

    // Grid System Triggers
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const route = card.getAttribute('data-route');
            switchView(route);
        });
    });

    // Sidebar Menu Navigation Triggers
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = item.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                switchView(target);
                closeSidebar(); // Autoclose panel upon routing selection
            }
        });
    });

    backBtn.addEventListener('click', () => {
        switchView('dashboard');
    });

    // ==================== SUB-TAB METHOD TUNING ====================
    methodButtons.forEach(button => {
        button.addEventListener('click', () => {
            methodButtons.forEach(btn => btn.classList.remove('active-btn'));
            button.classList.add('active-btn');
            
            const selectedText = button.textContent.trim();
            if (selectedText === "ADMIN SUPPORT") {
                formHeading.textContent = "Contact Admin Support";
            } else {
                formHeading.textContent = selectedText.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) + " Deposit";
            }
        });
        
    });
});



