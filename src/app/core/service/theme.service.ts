import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    this.loadThemeFromStorage();
   }
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode; 
    this.updateHtmlClass();        
    this.saveThemeToStorage();    
  }

  private updateHtmlClass(): void {
    const html = document.documentElement; // 🎯 Target <html>
    if (this.darkMode) {
      html.classList.add('dark'); // 🌚 Add dark class
    } else {
      html.classList.remove('dark'); // 🌞 Remove dark class
    }
  }

  private saveThemeToStorage(): void {
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    // 💾 Save "dark" or "light" string
  }

  private loadThemeFromStorage(): void {
    const storedTheme = localStorage.getItem('theme');
    this.darkMode = storedTheme === 'dark'; 
    this.updateHtmlClass(); // 🎨 Make sure the correct class is applied on load
  }
}
