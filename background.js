let timer = null;
let timeLeft = 0;
let totalTime = 0;
let isActive = false;

function updateBadge(time) {
    const minutes = Math.floor(time / 60);
    chrome.browserAction.setBadgeText({ text: minutes.toString() });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#7300ff' });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startTimer') {
        timeLeft = request.timeLeft;
        totalTime = request.totalTime;
        isActive = true;
        updateBadge(timeLeft);
        chrome.browserAction.setIcon({path: "icons/icon-active.svg"});
        startTimer();
        sendResponse({status: 'started'});
    } else if (request.action === 'pauseTimer') {
        clearInterval(timer);
        timer = null;
        isActive = false;
        chrome.browserAction.setIcon({path: "icons/icon-inactive.svg"});
        sendResponse({status: 'paused', timeLeft});
    } else if (request.action === 'getTime') {
        sendResponse({timeLeft, totalTime});
    }
    return true;
});

function startTimer() {
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        updateBadge(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            isActive = false;
            chrome.browserAction.setBadgeText({ text: '' });
            chrome.browserAction.setIcon({path: "icons/icon-inactive.svg"});
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon-active.svg',
                title: 'JUST DO IT NOW',
                message: 'כל הכבוד! השלמת את זמן הריכוז!'
            });
        }
        
        chrome.runtime.sendMessage({
            action: 'timeUpdate',
            timeLeft,
            totalTime
        });
    }, 1000);
} 