// Enhanced QuanFin Capital JavaScript with Complete Theme Support and Advanced Features

// Application State
class AppState {
    constructor() {
        this.theme = this.detectTheme();
        this.charts = {};
        this.marketData = {
            isOpen: false,
            currentPrice: 2847.63,
            priceChange: 12.45,
            priceChangePercent: 0.44,
            volume: 2847291,
            sentiment: 0.72,
            volatilityIndex: 16.8
        };
        this.calculatorData = {
            initialCapital: 10000,
            riskPercentage: 2,
            winRate: 60,
            riskRewardRatio: 1.5
        };
        this.alerts = [];
        this.chatMessages = [];
    }

    detectTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('qf-theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('qf-theme', theme);
        } catch (e) {
            console.warn('Could not save theme preference');
        }
        this.updateChartsTheme();
        this.updateThemeToggle();
    }

    updateThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.setAttribute('data-theme', this.theme);
            
            // Update toggle visual state
            if (this.theme === 'dark') {
                toggle.classList.add('dark');
            } else {
                toggle.classList.remove('dark');
            }
        }
    }

    updateChartsTheme() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.options) {
                this.updateChartTheme(chart);
            }
        });
    }

    updateChartTheme(chart) {
        const isDark = this.theme === 'dark';
        const textColor = isDark ? '#f1f5f9' : '#1e293b';
        const gridColor = isDark ? '#334155' : '#e2e8f0';
        
        if (chart.options.plugins && chart.options.plugins.legend) {
            chart.options.plugins.legend.labels.color = textColor;
        }
        if (chart.options.scales) {
            if (chart.options.scales.x) {
                chart.options.scales.x.ticks.color = textColor;
                chart.options.scales.x.grid.color = gridColor;
            }
            if (chart.options.scales.y) {
                chart.options.scales.y.ticks.color = textColor;
                chart.options.scales.y.grid.color = gridColor;
            }
        }
        
        chart.update('none');
    }
}

// Initialize app state
const appState = new AppState();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    console.log('Initializing QuanFin Capital application...');
    
    // Apply initial theme immediately
    appState.setTheme(appState.theme);
    
    // Initialize all components
    initLoader();
    initThemeToggle();
    initNavigation();
    initScrollSpy();
    initScrollToTop();
    initModalSystem();
    initContactForm();
    initScrollAnimations();
    initCounterAnimations();
    initParticleSystem();
    initMarketStatusBar();
    initDashboard();
    initChatWidget();
    initAdvancedFeatures();
    
    console.log('Application initialized successfully');
    
    // Remove loader after everything is initialized
    setTimeout(() => {
        hideLoader();
    }, 1500);
}

// Theme Toggle System
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    
    if (toggle) {
        console.log('Theme toggle found, adding event listener');
        
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const newTheme = appState.theme === 'light' ? 'dark' : 'light';
            console.log(`Switching theme from ${appState.theme} to ${newTheme}`);
            appState.setTheme(newTheme);
        });
        
        // Update initial state
        appState.updateThemeToggle();
        console.log('Theme toggle initialized with theme:', appState.theme);
    } else {
        console.warn('Theme toggle button not found');
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('qf-theme')) {
                appState.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Market Status Bar
function initMarketStatusBar() {
    updateLiveClock();
    updateMarketStatus();
    startTickerAnimation();
    
    setInterval(updateLiveClock, 1000);
    setInterval(updateMarketStatus, 30000);
}

function updateLiveClock() {
    const timeElement = document.getElementById('live-time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString + ' EST';
    }
}

function updateMarketStatus() {
    const indicator = document.getElementById('market-indicator');
    const statusText = document.getElementById('market-status-text');
    
    if (indicator && statusText) {
        const now = new Date();
        const hour = now.getHours();
        const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
        const isMarketHours = hour >= 9 && hour < 16;
        
        appState.marketData.isOpen = isWeekday && isMarketHours;
        
        if (appState.marketData.isOpen) {
            indicator.classList.add('open');
            statusText.textContent = 'Market Open';
        } else {
            indicator.classList.remove('open');
            statusText.textContent = 'Market Closed';
        }
    }
}

function startTickerAnimation() {
    const tickerContent = document.getElementById('ticker-content');
    if (tickerContent) {
        // Simulate real-time price updates
        setInterval(() => {
            updateTickerPrices();
        }, 5000);
    }
}

function updateTickerPrices() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    const pairs = [
        { symbol: 'BTC/USD', basePrice: 43250.75 },
        { symbol: 'ETH/USD', basePrice: 2687.12 },
        { symbol: 'SPY', basePrice: 445.67 },
        { symbol: 'QQQ', basePrice: 378.29 }
    ];
    
    tickerItems.forEach((item, index) => {
        if (pairs[index]) {
            const pair = pairs[index];
            const change = (Math.random() - 0.5) * 5; // Random change between -2.5 and +2.5%
            const newPrice = pair.basePrice * (1 + change / 100);
            const changeClass = change >= 0 ? 'positive' : 'negative';
            const changeSymbol = change >= 0 ? '+' : '';
            
            item.innerHTML = `${pair.symbol}: $${newPrice.toFixed(2)} <span class="${changeClass}">${changeSymbol}${change.toFixed(2)}%</span>`;
        }
    });
}

// Dashboard System
function initDashboard() {
    console.log('Initializing dashboard...');
    initTradingCalculator();
    
    // Initialize charts with delay to ensure DOM is ready
    setTimeout(() => {
        initCharts();
    }, 500);
    
    initLiveAlerts();
    startRealTimeUpdates();
}

function initTradingCalculator() {
    const inputs = ['initial-capital', 'risk-percentage', 'win-rate', 'risk-reward'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateCalculatorResults);
        }
    });
    
    updateCalculatorResults();
}

function updateCalculatorResults() {
    const initialCapital = parseFloat(document.getElementById('initial-capital')?.value) || 10000;
    const riskPercentage = parseFloat(document.getElementById('risk-percentage')?.value) || 2;
    const winRate = parseFloat(document.getElementById('win-rate')?.value) || 60;
    const riskReward = parseFloat(document.getElementById('risk-reward')?.value) || 1.5;
    
    const positionSize = initialCapital * (riskPercentage / 100);
    const expectedReturn = calculateExpectedReturn(initialCapital, riskPercentage, winRate, riskReward);
    
    const positionSizeElement = document.getElementById('position-size');
    const expectedReturnElement = document.getElementById('expected-return');
    
    if (positionSizeElement) {
        positionSizeElement.textContent = `$${positionSize.toLocaleString()}`;
    }
    
    if (expectedReturnElement) {
        const returnClass = expectedReturn >= 0 ? 'positive' : 'negative';
        const returnSymbol = expectedReturn >= 0 ? '+' : '';
        expectedReturnElement.textContent = `${returnSymbol}$${Math.abs(expectedReturn).toLocaleString()}/month`;
        expectedReturnElement.className = returnClass;
    }
}

function calculateExpectedReturn(capital, riskPct, winRate, riskReward) {
    const riskAmount = capital * (riskPct / 100);
    const rewardAmount = riskAmount * riskReward;
    const winProbability = winRate / 100;
    const lossProbability = 1 - winProbability;
    
    const expectedValue = (winProbability * rewardAmount) - (lossProbability * riskAmount);
    const monthlyTrades = 20; // Assume 20 trades per month
    
    return expectedValue * monthlyTrades;
}

function initCharts() {
    console.log('Initializing charts...');
    initPortfolioChart();
    initPerformanceChart();
    initRiskChart();
    initSentimentGauge();
}

function initPortfolioChart() {
    const ctx = document.getElementById('portfolio-chart')?.getContext('2d');
    if (!ctx) {
        console.warn('Portfolio chart canvas not found');
        return;
    }
    
    const isDark = appState.theme === 'dark';
    
    appState.charts.portfolio = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Equities', 'Fixed Income', 'Derivatives', 'Cash'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: isDark ? '#f1f5f9' : '#1e293b',
                        padding: 20,
                        usePointStyle: true,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
    
    console.log('Portfolio chart initialized');
}

function initPerformanceChart() {
    const ctx = document.getElementById('performance-chart')?.getContext('2d');
    if (!ctx) {
        console.warn('Performance chart canvas not found');
        return;
    }
    
    const isDark = appState.theme === 'dark';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const returns = [2.3, 1.8, 3.1, 2.7, 1.9, 2.8, 3.2, 2.1, 2.9, 3.4, 2.6, 2.2];
    
    appState.charts.performance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Monthly Returns (%)',
                data: returns,
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: isDark ? '#f1f5f9' : '#1e293b'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: isDark ? '#334155' : '#e2e8f0'
                    },
                    ticks: {
                        color: isDark ? '#f1f5f9' : '#1e293b'
                    }
                },
                y: {
                    grid: {
                        color: isDark ? '#334155' : '#e2e8f0'
                    },
                    ticks: {
                        color: isDark ? '#f1f5f9' : '#1e293b',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Chart period controls
    const periodButtons = document.querySelectorAll('[data-period]');
    periodButtons.forEach(button => {
        button.addEventListener('click', () => {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updatePerformanceChart(button.dataset.period);
        });
    });
    
    console.log('Performance chart initialized');
}

function updatePerformanceChart(period) {
    const chart = appState.charts.performance;
    if (!chart) return;
    
    let data, labels;
    
    switch(period) {
        case '1M':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [1.2, 0.8, 1.5, 0.9];
            break;
        case '3M':
            labels = ['Oct', 'Nov', 'Dec'];
            data = [3.4, 2.6, 2.2];
            break;
        case '6M':
            labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [3.2, 2.1, 2.9, 3.4, 2.6, 2.2];
            break;
        case '1Y':
        default:
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [2.3, 1.8, 3.1, 2.7, 1.9, 2.8, 3.2, 2.1, 2.9, 3.4, 2.6, 2.2];
            break;
    }
    
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

function initRiskChart() {
    const ctx = document.getElementById('risk-chart')?.getContext('2d');
    if (!ctx) {
        console.warn('Risk chart canvas not found');
        return;
    }
    
    const isDark = appState.theme === 'dark';
    
    appState.charts.risk = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Low Risk', 'Med Risk', 'High Risk', 'Hedge', 'Cash'],
            datasets: [{
                label: 'Allocation %',
                data: [35, 25, 20, 15, 5],
                backgroundColor: ['#5D878F', '#1FB8CD', '#B4413C', '#FFC185', '#ECEBD5'],
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: isDark ? '#f1f5f9' : '#1e293b',
                        font: { size: 10 }
                    }
                },
                y: {
                    grid: {
                        color: isDark ? '#334155' : '#e2e8f0'
                    },
                    ticks: {
                        color: isDark ? '#f1f5f9' : '#1e293b',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
    console.log('Risk chart initialized');
}

function initSentimentGauge() {
    const sentimentValue = document.getElementById('sentiment-value');
    const sentimentArc = document.getElementById('sentiment-arc');
    const sentimentPointer = document.getElementById('sentiment-pointer');
    
    if (sentimentValue && sentimentArc && sentimentPointer) {
        updateSentimentGauge(appState.marketData.sentiment);
        
        // Update sentiment periodically
        setInterval(() => {
            const newSentiment = Math.random();
            appState.marketData.sentiment = newSentiment;
            updateSentimentGauge(newSentiment);
        }, 10000);
        
        console.log('Sentiment gauge initialized');
    } else {
        console.warn('Sentiment gauge elements not found');
    }
}

function updateSentimentGauge(sentiment) {
    const percentage = Math.round(sentiment * 100);
    const angle = (sentiment * 140) - 70; // -70 to +70 degrees
    const dashOffset = 220 - (sentiment * 154); // Adjust arc fill
    
    const sentimentValue = document.getElementById('sentiment-value');
    const sentimentArc = document.getElementById('sentiment-arc');
    const sentimentPointer = document.getElementById('sentiment-pointer');
    const sentimentLabel = document.querySelector('.sentiment-label');
    
    if (sentimentValue) sentimentValue.textContent = percentage;
    if (sentimentArc) sentimentArc.style.strokeDashoffset = dashOffset;
    if (sentimentPointer) {
        sentimentPointer.style.transform = `rotate(${angle}deg)`;
        sentimentPointer.style.transformOrigin = '100px 100px';
    }
    
    if (sentimentLabel) {
        let label = 'Neutral';
        if (sentiment > 0.7) label = 'Very Bullish';
        else if (sentiment > 0.6) label = 'Bullish';
        else if (sentiment > 0.4) label = 'Neutral';
        else if (sentiment > 0.3) label = 'Bearish';
        else label = 'Very Bearish';
        
        sentimentLabel.textContent = label;
    }
}

function initLiveAlerts() {
    const alertTypes = [
        { type: 'price', message: 'BTC reached target price of $45,000', icon: 'fa-dollar-sign', color: '#10b981' },
        { type: 'volume', message: 'Unusual volume spike detected in SPY', icon: 'fa-chart-bar', color: '#f59e0b' },
        { type: 'sentiment', message: 'Market sentiment improved to bullish', icon: 'fa-arrow-trend-up', color: '#3b82f6' },
        { type: 'risk', message: 'Portfolio risk threshold exceeded', icon: 'fa-exclamation-triangle', color: '#ef4444' }
    ];
    
    // Add initial alerts
    setTimeout(() => {
        alertTypes.forEach((alert, index) => {
            setTimeout(() => addAlert(alert), index * 2000);
        });
    }, 3000);
    
    // Add random alerts periodically
    setInterval(() => {
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        addAlert(randomAlert);
    }, 15000);
}

function addAlert(alert) {
    const alertsList = document.getElementById('alerts-list');
    if (!alertsList) return;
    
    const alertElement = document.createElement('div');
    alertElement.className = 'alert-item';
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    alertElement.innerHTML = `
        <div class="alert-icon" style="color: ${alert.color};">
            <i class="fas ${alert.icon}"></i>
        </div>
        <div class="alert-content">
            <div class="alert-time">${timeString}</div>
            <div class="alert-message">${alert.message}</div>
        </div>
    `;
    
    alertsList.insertBefore(alertElement, alertsList.firstChild);
    
    // Remove old alerts (keep only latest 10)
    const alerts = alertsList.querySelectorAll('.alert-item');
    if (alerts.length > 10) {
        alerts[alerts.length - 1].remove();
    }
}

function startRealTimeUpdates() {
    setInterval(() => {
        updateMarketMetrics();
    }, 5000);
}

function updateMarketMetrics() {
    // Simulate real-time updates to risk metrics
    const riskItems = document.querySelectorAll('.risk-value');
    riskItems.forEach((item, index) => {
        const baseValues = [-2.3, 2.47, -1.2, 8.4];
        const variation = (Math.random() - 0.5) * 0.2;
        const newValue = baseValues[index] + variation;
        
        let formattedValue = newValue.toFixed(2);
        if (index === 0 || index === 2) formattedValue += '%';
        if (index === 3) formattedValue += '%';
        
        if (newValue < 0) {
            item.className = 'risk-value negative';
            if (!formattedValue.startsWith('-')) formattedValue = '-' + formattedValue;
        } else if (index === 1) {
            item.className = 'risk-value positive';
        } else {
            item.className = 'risk-value';
        }
        
        item.textContent = formattedValue;
    });
}

// Chat Widget System
function initChatWidget() {
    console.log('Initializing chat widget...');
    
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    
    if (chatBubble) {
        chatBubble.addEventListener('click', () => {
            console.log('Chat bubble clicked');
            if (chatWindow) {
                chatWindow.classList.remove('hidden');
                console.log('Chat window opened');
                if (chatInput) {
                    chatInput.focus();
                }
            } else {
                console.warn('Chat window not found');
            }
        });
    } else {
        console.warn('Chat bubble not found');
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            console.log('Chat close clicked');
            if (chatWindow) {
                chatWindow.classList.add('hidden');
                console.log('Chat window closed');
            }
        });
    }
    
    if (chatSend && chatInput) {
        chatSend.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
    
    // Add welcome message after delay
    setTimeout(() => {
        addChatMessage('Hello! I\'m here to help you with any questions about our trading services. How can I assist you today?', 'bot');
    }, 3000);
    
    console.log('Chat widget initialized');
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput?.value.trim();
    
    if (!message) return;
    
    console.log('Sending chat message:', message);
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const responses = [
            'Thank you for your question! I\'ll connect you with one of our trading specialists shortly.',
            'That\'s a great question about our AI-driven models. Let me get you more information.',
            'Our risk management team can provide detailed insights on that topic.',
            'I\'d be happy to schedule a consultation with our experts for you.',
            'Our quantitative research team has extensive experience with those strategies.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'bot');
    }, 1000 + Math.random() * 2000);
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) {
        console.warn('Chat messages container not found');
        return;
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}`;
    
    const messageContent = document.createElement('p');
    messageContent.textContent = message;
    messageElement.appendChild(messageContent);
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    console.log(`Added ${sender} message:`, message);
}

// Loader System
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Navigation System
function initNavigation() {
    console.log('Initializing navigation...');
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        console.log('Mobile navigation initialized');
    }

    // Smooth scroll navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            console.log('Navigation clicked, target:', targetId);
            
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 120; // Account for fixed nav + status bar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Scrolled to section:', targetId);
            } else {
                console.warn('Target element not found:', targetId);
            }
        });
    });
    
    console.log('Navigation initialized with', navLinks.length, 'links');
}

// Scroll Spy System
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Modal System
function initModalSystem() {
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Close modal when clicking close button
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(0)';
            }
        }, 10);
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Contact Form System
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('.form-control');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                // Clear error state while typing
                if (input.classList.contains('error')) {
                    clearFieldError(input);
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous states
    clearFieldError(field);

    // Skip validation if field is empty (only validate on submit for required fields)
    if (value === '') {
        return true;
    }

    // Validation rules
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name should only contain letters and spaces';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters long';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }

    // Display error or success state
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else if (value !== '') {
        showFieldSuccess(field);
    }

    return isValid;
}

function validateRequiredField(field) {
    const value = field.value.trim();
    
    if (value === '') {
        showFieldError(field, `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`);
        return false;
    }
    
    return validateField(field);
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = 'var(--color-error)';
    }
}

function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function clearFieldError(field) {
    field.classList.remove('error', 'success');
    
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('.form-control');
    let isFormValid = true;

    // Validate all fields including required check
    inputs.forEach(input => {
        if (!validateRequiredField(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Reset form
            form.reset();
            inputs.forEach(input => clearFieldError(input));
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
        }, 2000);
    } else {
        // Scroll to first error field
        const firstErrorField = form.querySelector('.form-control.error');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
    }
}

function showSuccessMessage() {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-success);
            color: white;
            padding: 20px 40px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
        ">
            ✓ Thank you for your message! We will get back to you soon.
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.dashboard-card, .service-card, .team-card, .stat-card, .tech-feature, .about-text');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    let countersAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, observerOptions);

    if (counters.length > 0) {
        const statsSection = document.querySelector('.stats-grid');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += step;
                if (current > target) current = target;
                
                // Format the number
                if (target >= 100) {
                    counter.textContent = Math.floor(current).toLocaleString();
                } else {
                    counter.textContent = current.toFixed(1);
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                // Final formatting
                if (target >= 100) {
                    counter.textContent = target.toLocaleString() + (target >= 750 ? 'M' : '+');
                } else {
                    counter.textContent = target + '%';
                }
            }
        };

        updateCounter();
    });
}

// Particle System Enhancement
function initParticleSystem() {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    // Create additional floating elements
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particles.appendChild(particle);
    }
}

// Advanced Features
function initAdvancedFeatures() {
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, 16));
    }

    // Add smooth hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card, .dashboard-card, .team-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    document.getElementById('chat-bubble')?.click();
                    break;
                case 'd':
                    e.preventDefault();
                    scrollToSection('dashboard');
                    break;
            }
        }
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global Functions (accessible from HTML)
window.scrollToSection = function(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const headerOffset = 120;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        console.log('Global scrollToSection called for:', sectionId);
    } else {
        console.warn('Global scrollToSection: Target not found:', sectionId);
    }
};

window.openModal = function(modalId) {
    openModal(modalId);
};

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate positions if needed
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }

    // Resize charts
    Object.values(appState.charts).forEach(chart => {
        if (chart && chart.resize) {
            chart.resize();
        }
    });
}, 250));

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b3be?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add smooth scroll behavior for browsers that don't support it natively
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    const smoothScrollPolyfill = function(target, duration = 800) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 120;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Override scrollToSection for browsers without smooth scroll support
    window.scrollToSection = function(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            smoothScrollPolyfill(targetElement);
        }
    };
}