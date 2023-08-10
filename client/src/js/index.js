import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

// Clear the content of the main element
const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner
const displaySpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Instantiate the editor
const editor = new Editor();

// If the editor is not instantiated properly, display a loading spinner
if (typeof editor === 'undefined') {
  displaySpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the Workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
