document.addEventListener('DOMContentLoaded', () => {

    // =================================================
    // 1. WATERDROP ANIMATION LOGIC (NEW)
    // =================================================
    const sidebarWrapper = document.querySelector('.sidebar-wrapper');
    const toggleButton = document.getElementById('sidebar-toggle-btn');

    // Create and append the water effect container once
    const waterContainer = document.createElement('div');
    waterContainer.classList.add('water-effect-container');
    document.body.appendChild(waterContainer);

    function createWaterRipple(event) {
        if (!waterContainer) return;

        // 1. Activate the container
        waterContainer.classList.add('active');

        // 2. Clear previous drops and reduce container opacity slightly
        waterContainer.innerHTML = '';
        waterContainer.style.opacity = '0.9';

        // 3. Generate multiple drops (e.g., 5 drops)
        for (let i = 0; i < 5; i++) {
            const drop = document.createElement('div');
            drop.classList.add('water-drop');

            // Random positions around the screen
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // Set initial position
            drop.style.left = `${x}px`;
            drop.style.top = `${y}px`;

            // Set initial drop appearance
            drop.style.width = '10px';
            drop.style.height = '10px';
            drop.style.boxShadow = '0 0 15px rgba(0, 170, 255, 0.8)';

            // Apply the ripple animation after a short delay
            setTimeout(() => {
                 drop.style.animation = `ripple 1.5s ease-out forwards`;
            }, 50 * i); // Stagger the drops

            waterContainer.appendChild(drop);

            // 4. Clean up after animation finishes
            drop.addEventListener('animationend', () => {
                drop.remove();

                // If all drops are removed, reset container opacity
                if (waterContainer.children.length === 0) {
                    waterContainer.style.opacity = '0';
                    waterContainer.classList.remove('active');
                }
            });
        }
    }


    // =================================================
    // 2. SIDEBAR TOGGLE & EXPANSION LOGIC
    // =================================================

    function toggleSidebar(event) {
        // Run the water effect animation first
        createWaterRipple(event);

        // Toggle the 'expanded' class on the wrapper
        sidebarWrapper.classList.toggle('expanded');

        // Update button text and icon
        const isExpanded = sidebarWrapper.classList.contains('expanded');
        if (isExpanded) {
            toggleButton.innerHTML = `<i class="fas fa-times"></i> Close Menu`;
        } else {
            toggleButton.innerHTML = `<i class="fas fa-bars"></i> Menu`;
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSidebar);
    }


    // =================================================
    // 3. LIVE CLOCK FUNCTIONALITY
    // =================================================
    const timeDisplay = document.getElementById('current-time');

    function updateClock() {
        if (timeDisplay) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            timeDisplay.textContent = timeString;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);


    // =================================================
    // 4. WEATHER FORECAST FUNCTIONALITY (RESTORED)
    // --- (Note: This uses dummy data for demonstration)
    // =================================================
    const weatherDisplay = document.getElementById('current-weather');
    const predictionsGrid = document.getElementById('weather-predictions');

    function updateWeather() {
        // In a real app, you would fetch data from a weather API here.
        // For now, use static data.

        const dummyWeather = {
            currentTemp: '19°C',
            condition: 'Clear Skies',
            icon: '<i class="fas fa-cloud-sun"></i>',
            forecast: [
                { day: 'Mon', temp: '15°C', cond: 'Cloudy' },
                { day: 'Tue', temp: '18°C', cond: 'Sunny' },
                { day: 'Wed', temp: '16°C', cond: 'Rain' },
                { day: 'Thu', temp: '20°C', cond: 'Windy' },
            ]
        };

        if (weatherDisplay) {
            weatherDisplay.innerHTML = `${dummyWeather.icon} ${dummyWeather.currentTemp} (${dummyWeather.condition})`;
        }

        if (predictionsGrid) {
            predictionsGrid.innerHTML = dummyWeather.forecast.map(item =>
                `<p>${item.day}: ${item.temp} ${item.cond}</p>`
            ).join('');
        }
    }

    updateWeather();
    // Refresh weather data every 30 minutes (30 * 60 * 1000 ms)
    setInterval(updateWeather, 1800000); 


    // =================================================
    // 5. HERO SECTION TYPING ANIMATION
    // =================================================
    const typingTextElement = document.getElementById('typing-text');
    const messages = [
        "Welcome, Future Innovator! Explore & Grow.",
        "Your Student Hub. Organized. Dynamic. Efficient.",
        "Code. Learn. Achieve. Erderstone is Ready."
    ];
    let messageIndex = 0;
    let charIndex = 0;

    function typeEffect() {
        if (!typingTextElement) return;

        const currentMessage = messages[messageIndex];

        if (charIndex < currentMessage.length) {
            typingTextElement.textContent += currentMessage.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 75);
        } else {
            setTimeout(eraseEffect, 1500);
        }
    }

    function eraseEffect() {
        if (!typingTextElement || typingTextElement.textContent.length === 0) {
            messageIndex = (messageIndex + 1) % messages.length;
            charIndex = 0;
            setTimeout(typeEffect, 500);
            return;
        }

        typingTextElement.textContent = typingTextElement.textContent.slice(0, -1);
        setTimeout(eraseEffect, 40);
    }

    typeEffect();


    // =================================================
    // 6. CODING ROOM FUNCTIONALITY
    // =================================================
    const codeInput = document.getElementById('code-input');
    const codeOutput = document.getElementById('code-output');
    const runButton = document.getElementById('run-code');
    const saveButton = document.getElementById('save-code');
    const clearButton = document.getElementById('clear-code');
    const localStorageKey = 'erderstoneStudentCode';

    function executeCode() {
        if (!codeInput || !codeOutput) return;

        const userCode = codeInput.value;

        // Safely extract HTML, CSS, and JS components using regex
        const htmlContent = userCode.includes('<body>') ? userCode.match(/<body>([\s\S]*?)<\/body>/i)?.[1] || '' : userCode;
        const cssContent = userCode.includes('<style>') ? userCode.match(/<style>([\s\S]*?)<\/style>/i)?.[1] || '' : '';
        const jsContent = userCode.includes('<script>') ? userCode.match(/<script>([\s\S]*?)<\/script>/i)?.[1] || userCode : userCode;

        const outputDocument = `
            <html>
                <head>
                    <style>
                        body { background: #f0f0f0; color: #333; font-family: sans-serif; padding: 10px; margin: 0; }
                        ${cssContent}
                    </style>
                </head>
                <body>
                    ${htmlContent}
                    <script>
                        try {
                            ${jsContent}
                        } catch(e) {
                            document.body.innerHTML += '<p style="color:red; margin-top: 10px;">Runtime Error: ' + e.message + '</p>';
                        }
                    </script>
                </body>
            </html>
        `;
        codeOutput.srcdoc = outputDocument;
    }

    const savedCode = localStorage.getItem(localStorageKey);
    if (codeInput && savedCode) {
        codeInput.value = savedCode;
        executeCode();
    }

    if (runButton) runButton.addEventListener('click', executeCode);

    if (saveButton) {
        saveButton.addEventListener('click', () => {
            if (codeInput) {
                localStorage.setItem(localStorageKey, codeInput.value);
                alert('Code saved successfully in your browser!');
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (codeInput && confirm('Are you sure you want to clear your code?')) {
                codeInput.value = '// Write your code here (HTML/CSS/JS). Use Local Storage to save!';
                localStorage.removeItem(localStorageKey);
                if (codeOutput) codeOutput.srcdoc = '<h1>Output Cleared</h1>';
            }
        });
    }
});