const motivationalQuotes = {
    100: "בחרת להתחיל - זה כבר צעד ענק!",
    75: "רבע מהדרך מאחוריך, אתה בכיוון הנכון!",
    50: "חצי דרך! אתה מוכיח שאתה יכול!",
    25: "כמעט שם! 75% כבר מאחוריך!",
    10: "הישורת האחרונה, אל תוותר עכשיו!",
    5: "עוד כמה רגעים והמשימה הושלמה!",
    0: "כל הכבוד! השלמת את המשימה!"
};

let timer;
let timeLeft;
let totalTime = 25 * 60;
let isPaused = false;
let lastMilestone = 100;

// הגדרת זמנים למשימות שונות (בדקות)
const taskTimes = {
    'research': 45,    // מחקר דורש יותר זמן להתעמקות
    'programming': 35, // תכנות דורש ריכוז ממושך
    'writing': 30,     // כתיבת מאמר
    'content': 25,     // כתיבת תוכן
    'invoice': 15      // הפקת חשבונית - משימה קצרה יחסית
};

// אתחול אלמנטים
const startButton = document.getElementById('startFocus');
const pauseButton = document.getElementById('pauseTimer');
const resetButton = document.getElementById('resetTimer');
const decreaseTimeButton = document.getElementById('decreaseTime');
const increaseTimeButton = document.getElementById('increaseTime');
const selectedTimeSpan = document.getElementById('selectedTime');
const timerDisplay = document.getElementById('timer');
const motivationDiv = document.getElementById('motivation');
const progressBar = document.getElementById('progress-bar');
const pauseIndicator = document.querySelector('.pause-indicator');

// עדכון מאזין לשינוי סוג המשימה
document.getElementById('taskType').addEventListener('change', function() {
    const selectedTask = this.value;
    if (selectedTask && taskTimes[selectedTask]) {
        totalTime = taskTimes[selectedTask] * 60; // המרה לשניות
        timeLeft = totalTime;
        updateInitialTime(0); // עדכון התצוגה
        
        // הצגת הודעה על משך הזמן המומלץ
        motivationDiv.textContent = `משך זמן מומלץ למשימה זו: ${taskTimes[selectedTask]} דקות`;
        setTimeout(() => {
            motivationDiv.textContent = '';
        }, 3000);
    } else {
        // ברירת מחדל - 25 דקות
        totalTime = 25 * 60;
        timeLeft = totalTime;
        updateInitialTime(0);
    }
});

// עדכון זמן התחלתי
function updateInitialTime(minutes) {
    const newTime = totalTime + (minutes * 60);
    // הגבלת הזמן המינימלי והמקסימלי
    totalTime = Math.max(5 * 60, Math.min(60 * 60, newTime));
    timeLeft = totalTime;
    
    // עדכון תצוגת הזמן
    const displayMinutes = Math.floor(totalTime / 60);
    selectedTimeSpan.innerHTML = `<span class="text-xl">${displayMinutes}</span><span class="text-xs block">דקות</span>`;
    updateTimerDisplay();
}

// הוספת מאזינים לכפתורי הזמן
decreaseTimeButton.addEventListener('click', () => updateInitialTime(-5));
increaseTimeButton.addEventListener('click', () => updateInitialTime(5));

// התחלת טיימר
startButton.addEventListener('click', function() {
    if (!timer) {
        timeLeft = timeLeft || totalTime;
        chrome.runtime.sendMessage({
            action: 'startTimer',
            timeLeft: timeLeft,
            totalTime: totalTime
        });
        this.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        decreaseTimeButton.disabled = true;
        increaseTimeButton.disabled = true;
        showMotivationalQuote(100);
    }
});

// השהיית טיימר
pauseButton.addEventListener('click', function() {
    if (isPaused) {
        chrome.runtime.sendMessage({
            action: 'startTimer',
            timeLeft: timeLeft,
            totalTime: totalTime
        });
        this.innerHTML = '<i data-lucide="pause" class="w-5 h-5"></i><span>השהה</span>';
        this.classList.remove('bg-orange-500');
        this.classList.add('bg-[#ffa502]');
        pauseIndicator.classList.add('hidden');
        isPaused = false;
    } else {
        chrome.runtime.sendMessage({action: 'pauseTimer'});
        this.innerHTML = '<i data-lucide="play" class="w-5 h-5"></i><span>המשך</span>';
        this.classList.remove('bg-[#ffa502]');
        this.classList.add('bg-orange-500');
        pauseIndicator.classList.remove('hidden');
        isPaused = true;
    }
    lucide.createIcons();
});

// איפוס טיימר
resetButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'pauseTimer'});
    timeLeft = totalTime;
    updateTimerDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    decreaseTimeButton.disabled = false;
    increaseTimeButton.disabled = false;
    pauseButton.innerHTML = '<i data-lucide="pause" class="w-5 h-5"></i><span>השהה</span>';
    pauseButton.classList.remove('bg-orange-500');
    pauseButton.classList.add('bg-[#ffa502]');
    pauseIndicator.classList.add('hidden');
    isPaused = false;
    motivationDiv.textContent = '';
    progressBar.style.width = '0%';
    lucide.createIcons();
});

// עדכון תצוגת הטיימר
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // עדכון בר ההתקדמות
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progress}%`;
}

// הצגת משפט מוטיבציה
function showMotivationalQuote(milestone) {
    motivationDiv.style.opacity = '0';
    setTimeout(() => {
        motivationDiv.textContent = motivationalQuotes[milestone];
        motivationDiv.style.opacity = '1';
    }, 500);
}

// מאזין להודעות מה-background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'timeUpdate') {
        timeLeft = request.timeLeft;
        updateTimerDisplay();
        
        // בדיקת אבני דרך והצגת משפטי מוטיבציה
        const currentPercentage = Math.floor((timeLeft / totalTime) * 100);
        const milestones = [75, 50, 25, 10, 5, 0];
        
        for (const milestone of milestones) {
            if (currentPercentage <= milestone && lastMilestone > milestone) {
                showMotivationalQuote(milestone);
                lastMilestone = milestone;
                break;
            }
        }
        
        if (timeLeft <= 0) {
            resetButton.click();
        }
    }
});

// בדיקת מצב הטיימר בטעינה
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({action: 'getTime'}, response => {
        if (response.timeLeft > 0) {
            timeLeft = response.timeLeft;
            totalTime = response.totalTime;
            updateTimerDisplay();
            startButton.disabled = true;
            pauseButton.disabled = false;
            resetButton.disabled = false;
            decreaseTimeButton.disabled = true;
            increaseTimeButton.disabled = true;
        }
    });
});

// אתחול ערך התחלתי
updateInitialTime(0);