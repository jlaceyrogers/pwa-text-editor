const installButton = document.getElementById('buttonInstall');

// Show install button when beforeinstallprompt event is triggered
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the deferred event
  window.deferredPrompt = event;
  installButton.classList.remove('hidden');
});

// Add event listener to the install button
installButton.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Trigger the prompt
  promptEvent.prompt();

  // Clear the deferred prompt
  window.deferredPrompt = null;

  // Hide the install button
  installButton.classList.add('hidden');
});

// Clear the deferred prompt when the app is successfully installed
window.addEventListener('appinstalled', () => {
  window.deferredPrompt = null;
});
