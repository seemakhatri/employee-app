import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  showSnackbar(message: string, actionText: string, actionCallback: () => void) {
    const snackbar = document.getElementById('snackbar');
    if (snackbar) {
      snackbar.innerHTML = `
        <span>${message}</span>
        <button id="snackbar-action" class="text-blue-400 hover:text-blue-300 font-medium">${actionText}</button>
      `;

      snackbar.classList.remove('hidden');
      snackbar.classList.add('flex');

      // Handle action button click
      document.getElementById('snackbar-action')?.addEventListener('click', () => {
        actionCallback();
        this.hideSnackbar();
      });

      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.hideSnackbar();
      }, 3000);
    }
  }

  hideSnackbar() {
    const snackbar = document.getElementById('snackbar');
    snackbar?.classList.remove('flex');
    snackbar?.classList.add('hidden');
  }
}
