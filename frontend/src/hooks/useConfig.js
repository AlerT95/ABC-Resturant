import { useEffect } from 'react';

function useConfig() {
  useEffect(() => {
    // Function to initialize configuration
    const initializeConfig = () => {
      const t = localStorage.getItem('__CONFIG__');
      const e = document.getElementsByTagName('html')[0];
      const i = {
        theme: 'dark',
        nav: 'vertical',
        layout: { mode: 'fluid', position: 'fixed' },
        topbar: { color: 'dark' },
        menu: { color: 'dark' },
        sidenav: { size: 'default', user: false },
      };

      let config = Object.assign(JSON.parse(JSON.stringify(i)), {});
      let o = e.getAttribute('data-bs-theme');
      config.theme = o !== null ? o : i.theme;

      o = e.getAttribute('data-layout');
      config.nav = o !== null ? (o === 'topnav' ? 'horizontal' : 'vertical') : i.nav;

      o = e.getAttribute('data-layout-mode');
      config.layout.mode = o !== null ? o : i.layout.mode;

      o = e.getAttribute('data-layout-position');
      config.layout.position = o !== null ? o : i.layout.position;

      o = e.getAttribute('data-topbar-color');
      config.topbar.color = o != null ? o : i.topbar.color;

      o = e.getAttribute('data-sidenav-size');
      config.sidenav.size = o !== null ? o : i.sidenav.size;

      o = e.getAttribute('data-sidenav-user');
      config.sidenav.user = o !== null || i.sidenav.user;

      o = e.getAttribute('data-menu-color');
      config.menu.color = o !== null ? o : i.menu.color;

      window.defaultConfig = JSON.parse(JSON.stringify(config));
      if (t !== null) {
        config = JSON.parse(t);
      }

      window.config = config;

      if (e.getAttribute('data-layout') === 'topnav') {
        config.nav = 'horizontal';
      } else {
        config.nav = 'vertical';
      }

      if (config) {
        e.setAttribute('data-bs-theme', config.theme);
        e.setAttribute('data-layout-mode', config.layout.mode);
        e.setAttribute('data-menu-color', config.menu.color);
        e.setAttribute('data-topbar-color', config.topbar.color);
        e.setAttribute('data-layout-position', config.layout.position);

        if (config.nav === 'vertical') {
          let t = config.sidenav.size;
          if (window.innerWidth <= 767) {
            t = 'full';
          } else if (window.innerWidth >= 767 && window.innerWidth <= 1140 && self.config.sidenav.size !== 'full') {
            t = 'default';
          }
          e.setAttribute('data-sidenav-size', t);

          if (config.sidenav.user && config.sidenav.user.toString() === 'true') {
            e.setAttribute('data-sidenav-user', true);
          } else {
            e.removeAttribute('data-sidenav-user');
          }
        }
      }
    };

    // Call the initialization function
    initializeConfig();

    // Clean up on unmount (optional, add if needed)
    return () => {
      // ... any cleanup logic ...
    };
  }, []);

  return null;
}

export default useConfig;