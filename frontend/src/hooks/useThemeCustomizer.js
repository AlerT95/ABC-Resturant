/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';

// ThemeCustomizer class
class ThemeCustomizer {
  constructor() {
    this.html = document.getElementsByTagName('html')[0];
    this.config = {};
    this.defaultConfig = window.config;
  }

  initConfig() {
    this.defaultConfig = JSON.parse(JSON.stringify(window.defaultConfig));
    this.config = JSON.parse(JSON.stringify(window.config));
    this.setSwitchFromConfig();
  }

  changeMenuColor(e) {
    this.config.menu.color = e;
    this.html.setAttribute('data-menu-color', e);
    this.setSwitchFromConfig();
  }

  changeLeftbarSize(e, t = true) {
    this.html.setAttribute('data-sidenav-size', e);
    if (t) {
      this.config.sidenav.size = e;
      this.setSwitchFromConfig();
    }
  }

  changeLayoutMode(e, t = true) {
    this.html.setAttribute('data-layout-mode', e);
    if (t) {
      this.config.layout.mode = e;
      this.setSwitchFromConfig();
    }
  }

  changeLayoutPosition(e) {
    this.config.layout.position = e;
    this.html.setAttribute('data-layout-position', e);
    this.setSwitchFromConfig();
  }

  changeLayoutColor(e) {
    this.config.theme = e;
    this.html.setAttribute('data-bs-theme', e);
    this.setSwitchFromConfig();
  }

  changeTopbarColor(e) {
    this.config.topbar.color = e;
    this.html.setAttribute('data-topbar-color', e);
    this.setSwitchFromConfig();
  }

  changeSidebarUser(e) {
    this.config.sidenav.user = e;
    if (e) {
      this.html.setAttribute('data-sidenav-user', e);
    } else {
      this.html.removeAttribute('data-sidenav-user');
    }
    this.setSwitchFromConfig();
  }

  resetTheme() {
    this.config = JSON.parse(JSON.stringify(window.defaultConfig));
    this.changeMenuColor(this.config.menu.color);
    this.changeLeftbarSize(this.config.sidenav.size);
    this.changeLayoutColor(this.config.theme);
    this.changeLayoutMode(this.config.layout.mode);
    this.changeLayoutPosition(this.config.layout.position);
    this.changeTopbarColor(this.config.topbar.color);
    this.changeSidebarUser(this.config.sidenav.user);
    this._adjustLayout();
  }

  initSwitchListener() {
    const n = this;
    document.querySelectorAll('input[name=data-menu-color]').forEach((t) => {
      t.addEventListener('change', function (e) {
        n.changeMenuColor(t.value);
      });
    });

    document.querySelectorAll('input[name=data-sidenav-size]').forEach((t) => {
      t.addEventListener('change', function (e) {
        n.changeLeftbarSize(t.value);
      });
    });

    document.querySelectorAll('input[name=data-bs-theme]').forEach((t) => {
      t.addEventListener('change', function (e) {
        n.changeLayoutColor(t.value);
      });
    });

    document.querySelectorAll('input[name=data-layout-mode]').forEach((t) => {
      t.addEventListener('change', function (e) {
        n.changeLayoutMode(t.value);
      });
    });

    document.querySelectorAll('input[name=data-layout-position]').forEach((t) => {
      t.addEventListener('change', function (e) {
        n.changeLayoutPosition(t.value);
      });
    });

    document.querySelectorAll('input[name=data-layout]').forEach((t) => {
      t.addEventListener('change', function (e) {
        window.location = t.value === 'horizontal' ? 'layouts-horizontal.html' : 'index.html';
      });
    });

    document.querySelectorAll('input[name=data-topbar-color]').forEach((t) => {
      t.addEventListener('change', function (e) {
        n.changeTopbarColor(t.value);
      });
    });

    document.querySelectorAll('input[name=sidebar-user]').forEach((t) => {
      t.addEventListener('change', function (e) {
        n.changeSidebarUser(t.checked);
      });
    });

    const lightDarkMode = document.getElementById('light-dark-mode');
    lightDarkMode &&
      lightDarkMode.addEventListener('click', function (e) {
        n.config.theme === 'light' ? n.changeLayoutColor('dark') : n.changeLayoutColor('light');
      });

    const resetLayout = document.querySelector('#reset-layout');
    resetLayout &&
      resetLayout.addEventListener('click', function (e) {
        n.resetTheme();
      });

      const buttonToggleMenu = document.querySelector('.button-toggle-menu');
      buttonToggleMenu &&
        buttonToggleMenu.addEventListener('click', () => { // Use arrow function to maintain 'this' context
          const currentSize = this.config.sidenav.size; 
    
          if (window.innerWidth <= 767.98) { 
            // Small screen: Toggle between "full" and "condensed"
            
            this.changeLeftbarSize(currentSize === 'full' ? 'default' : 'full', true);
          } else {
            // Larger screen: Toggle between "default" and "condensed"
            this.changeLeftbarSize(
              currentSize === 'default' ? "condensed" : 'default',
              true
            );
          }
    
          this.html.classList.toggle('sidebar-enable'); 
        });
  }

  showBackdrop() {
    const e = document.createElement('div');
    e.id = 'custom-backdrop';
    e.classList.add('offcanvas-backdrop', 'fade', 'show');
    document.body.appendChild(e);
    document.body.style.overflow = 'hidden';
    if (window.innerWidth > 767) {
      document.body.style.paddingRight = '15px';
    }
    const t = this;
    e.addEventListener('click', function (e) {
      t.html.classList.remove('sidebar-enable');
      t.hideBackdrop();
    });
  }

  hideBackdrop() {
    const e = document.getElementById('custom-backdrop');
    e && document.body.removeChild(e);
    document.body.style.overflow = null;
    document.body.style.paddingRight = null;
  }

  initWindowSize() {
    const t = this;
    window.addEventListener('resize', function (e) {
      t._adjustLayout();
    });
  }

  _adjustLayout() {
    const e = this;
    if (window.innerWidth <= 767.98) {
      e.changeLeftbarSize('full', false);
    } else if (window.innerWidth >= 767 && window.innerWidth <= 1140) {
      if (e.config.sidenav.size !== 'full') {
        e.changeLeftbarSize('condensed', false);
      }
    } else {
      e.changeLeftbarSize(e.config.sidenav.size);
      e.changeLayoutMode(e.config.layout.mode);
    }
  }

  setSwitchFromConfig() {
    sessionStorage.setItem('__CONFIG__', JSON.stringify(this.config));
    document.querySelectorAll('#theme-settings-offcanvas input[type=checkbox]').forEach((e) => {
      e.checked = false;
    });
    const c = this.config;
    if (c) {
      const e = document.querySelector(`input[type=checkbox][name=data-bs-theme][value=${c.theme}]`);
      const t = document.querySelector(`input[type=checkbox][name=data-layout-mode][value=${c.layout.mode}]`);
      const n = document.querySelector(`input[type=checkbox][name=data-topbar-color][value=${c.topbar.color}]`);
      const a = document.querySelector(`input[type=checkbox][name=data-menu-color][value=${c.menu.color}]`);
      const o = document.querySelector(`input[type=checkbox][name=data-sidenav-size][value=${c.sidenav.size}]`);
      const i = document.querySelector(`input[type=radio][name=data-layout-position][value=${c.layout.position}]`);
      const r = document.querySelector('input[type=checkbox][name=sidebar-user]');

      e && (e.checked = true);
      t && (t.checked = true);
      n && (n.checked = true);
      a && (a.checked = true);
      o && (o.checked = true);
      i && (i.checked = true);
      r && c.sidenav.user.toString() === 'true' && (r.checked = true);
    }
  }

  init() {
    this.initConfig();
    this.initSwitchListener();
    this.initWindowSize();
    this._adjustLayout();
    this.setSwitchFromConfig();
  }
}

// React hook
function useThemeCustomizer() {

  useEffect(() => {
    const themeCustomizer = new ThemeCustomizer();
    themeCustomizer.init();

    return () => {
      // Add any necessary cleanup code here, if needed.
    };
  }, []);

  return null;
}

export default useThemeCustomizer;