const form = document.getElementById('flashcard-form');
const flashcardsContainer = document.getElementById('flashcards');
const clearAllBtn = document.getElementById('clear-all');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

function saveFlashcards() {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

function renderFlashcards() {
  flashcardsContainer.innerHTML = '';
  flashcards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'flashcard';
    cardEl.textContent = card.question;

    cardEl.addEventListener('click', () => {
      if (cardEl.classList.toggle('flipped')) {
        cardEl.textContent = card.answer;
      } else {
        cardEl.textContent = card.question;
      }
    });

    const deleteBtn = document.createElement('div');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      flashcards.splice(index, 1);
      saveFlashcards();
      renderFlashcards();
    });

    cardEl.appendChild(deleteBtn);
    flashcardsContainer.appendChild(cardEl);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (question && answer) {
    flashcards.push({ question, answer });
    saveFlashcards();
    renderFlashcards();
    form.reset();
  }
});

clearAllBtn.addEventListener('click', () => {
  if (confirm('Clear all flashcards?')) {
    flashcards = [];
    saveFlashcards();
    renderFlashcards();
  }
});

renderFlashcards();

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch((err) => console.error('Service Worker registration failed:', err));
}