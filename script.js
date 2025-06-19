const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const modal = document.getElementById('event-modal');
const modalDate = document.getElementById('modal-date');
const eventText = document.getElementById('event-text');
const saveEventBtn = document.getElementById('save-event');
const closeModal = document.getElementById('close-btn');

let currentDate = new Date();
let selectedDate = null;

function generateCalendar() {
  calendar.innerHTML = '';
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  monthYear.textContent = `${currentDate.toLocaleString('default', {
    month: 'long'
  })} ${year}`;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let d of days) {
    const day = document.createElement('div');
    day.textContent = d;
    day.style.fontWeight = 'bold';
    calendar.appendChild(day);
  }

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  for (let date = 1; date <= lastDate; date++) {
    const cell = document.createElement('div');
    cell.textContent = date;
    const cellDate = `${year}-${month + 1}-${date}`;
    
    if (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add('today');
    }

    if (localStorage.getItem(cellDate)) {
      cell.classList.add('has-event');
    }

    cell.addEventListener('click', () => openModal(cellDate));
    calendar.appendChild(cell);
  }
}

function openModal(dateStr) {
  selectedDate = dateStr;
  modal.classList.remove('hidden');
  modalDate.textContent = `Event on ${selectedDate}`;
  eventText.value = localStorage.getItem(dateStr) || '';
}

saveEventBtn.addEventListener('click', () => {
  if (eventText.value.trim()) {
    localStorage.setItem(selectedDate, eventText.value.trim());
  } else {
    localStorage.removeItem(selectedDate);
  }
  modal.classList.add('hidden');
  generateCalendar();
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

generateCalendar();