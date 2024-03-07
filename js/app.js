function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (newTheme === 'dark') {
        root.style.setProperty('--main-clr', '#fff');
        root.style.setProperty('--secondary-clr', 'rgba(94, 115, 142, .7');
        root.style.setProperty('--shadow', 'rgba(255, 255, 255, 0.33)');
    } else {
        root.style.setProperty('--main-clr', 'rgba(94, 115, 142, .7)');
        root.style.setProperty('--secondary-clr', '#fff');
        root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.33)');
    }

    root.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
}

function applyStoredTheme() {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        root.style.setProperty('--main-clr', '#fff');
        root.style.setProperty('--secondary-clr', 'rgba(94, 115, 142, .7');
        root.style.setProperty('--shadow', 'rgba(255, 255, 255, 0.33)');
    } else {
        root.style.setProperty('--main-clr', 'rgba(94, 115, 142, .7)');
        root.style.setProperty('--secondary-clr', '#fff');
        root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.33)');
    }

    root.setAttribute('data-theme', storedTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();
    showData();
});

document.documentElement.setAttribute('data-theme', 'light');

const listContainer = document.querySelector('#list-container');
const input = document.querySelector('input');

function addTask() {
    if (input.value.trim() === '') {
        alert('You must enter a task');
    } else {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="title">${input.value}</div>
            <span></span>`;
        listContainer.appendChild(li);
        saveData();
        input.value = '';

        const check = li.querySelector('span');
        const task = li.querySelector('.title');

        check.addEventListener('click', () => {
            toggleCheck(check, task);
            saveData();
        });
    }
}

function toggleCheck(check, task) {
    if (check.classList.contains('checked')) {
        check.classList.remove('checked');
        check.classList.remove('material-symbols-outlined');
        task.classList.remove('checked');
        check.innerHTML = '';
    } else {
        check.classList.add('checked');
        check.classList.add('material-symbols-outlined');
        task.classList.add('checked');
        check.innerHTML = 'check';
    }
}

const deleteFn = document.querySelector('.bottom--info span');

deleteFn.addEventListener('click', () => {
    const checkedTasks = document.querySelectorAll('.checked');

    checkedTasks.forEach(task => {
        task.parentElement.remove();
    });

    saveData();
});

const addBtn = document.querySelector('.bottom--addtask');
const modal = document.querySelector('.modal');
const added = document.querySelector('.btn');

addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

added.addEventListener('click', () => {
    addTask();
    modal.style.display = 'none';
});

function saveData() {
    localStorage.setItem('taskData', listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem('taskData');
    const checks = document.querySelectorAll('.bottom--list__container span');
    const tasks = document.querySelectorAll('.bottom--list__container .title');

    checks.forEach((check, index) => {
        const task = tasks[index];
        check.addEventListener('click', () => {
            toggleCheck(check, task);
            saveData();
        });
    });
}

const start = document.querySelector('.body--top');
const clock = document.querySelector('.time');
const pause = document.querySelector('#pause'); 
const resume = document.querySelector('#restart'); 
const pomo = document.querySelector('.header--bottom__btn:nth-child(1)');
const shortBreak = document.querySelector('.header--bottom__btn:nth-child(2)');
const longBreak = document.querySelector('.header--bottom__btn:nth-child(3)');
let timerInterval;
let timerDuration = 25 * 60 * 1000; 
let timeRemaining = timerDuration; 
let pausedTimeRemaining = 0;
let isPaused = false; 
let timerStarted = false; 

function startTimer() {
    displayTime(timeRemaining);

    timerInterval = setInterval(() => {
        if (!isPaused && timerStarted) {
            timeRemaining -= 1000; 
            displayTime(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerFinished();
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    pausedTimeRemaining = timeRemaining; 
    isPaused = true;
}

function resumeTimer() {
    if (isPaused) {
        timeRemaining = pausedTimeRemaining; 
        isPaused = false;
        startTimer();
    }
}

function resetTimer(duration) {
    clearInterval(timerInterval);
    timerDuration = duration;
    timeRemaining = timerDuration;
    pausedTimeRemaining = 0;
    displayTime(timeRemaining);
    timerStarted = true; 
}

function displayTime(timeRemaining) {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    clock.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function timerFinished() {

}

start.addEventListener('click', () => {
    startTimer();
    timerStarted = true; 
});

pause.addEventListener('click', () => {
    pauseTimer();
});

resume.addEventListener('click', () => {
    resumeTimer();
});

pomo.addEventListener('click', () => {
    resetTimer(25 * 60 * 1000); 
});

shortBreak.addEventListener('click', () => {
    resetTimer(5 * 60 * 1000); 
});

longBreak.addEventListener('click', () => {
    resetTimer(10 * 60 * 1000); 
});