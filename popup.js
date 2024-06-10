document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['temperature', 'description', 'icon'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving chrome.storage:', chrome.runtime.lastError);
        return;
      }
      if (result.temperature !== undefined && result.description !== undefined && result.icon !== undefined) {
        document.getElementById('temperature').textContent = `${result.temperature}°C`;
        document.getElementById('description').textContent = result.description;
        document.getElementById('weatherIcon').src = `icons/${result.icon}`;
      } else {
        console.error('Weather data is not available.');
        document.getElementById('temperature').textContent = 'N/A';
        document.getElementById('description').textContent = 'N/A';
        document.getElementById('weatherIcon').src = 'icons/default.png'; // иконка по умолчанию
      }
    });
  });
  