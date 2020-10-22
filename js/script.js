(function () {
    const selectTheme = document.getElementById('select-theme');
    const light = document.querySelector('.light');
    const lightOn = light.querySelector('.light--on');
    let localPreference = window.localStorage.getItem('keisto-theme');

    const checkLight = function () {
        if (!document.documentElement.classList.contains('theme--dark')) {
            lightOn.setAttribute('stroke', '#000000');
            light.style.paddingBottom = '0';
        } else {
            lightOn.setAttribute('stroke',  'rgba(0, 0, 0, 0)');
            light.style.paddingBottom = '3px';
        }
    };

    const themeUpdate = function () {
        const mediaPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        localPreference = this.value;

        window.localStorage.setItem('keisto-theme', localPreference);

        if ((localPreference === 'system' && mediaPrefersDark.matches) || localPreference === 'dark') {
            document.documentElement.classList.add('theme--dark');
        } else if (document.documentElement.classList.contains('theme--dark')) {
            document.documentElement.classList.remove('theme--dark');
        }

        checkLight();
    }

    if (localPreference) {
        selectTheme.value = localPreference;
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)')) {
            selectTheme.value = 'dark';
        }
        selectTheme.value = 'system';
    }

    selectTheme.addEventListener('change', themeUpdate);

    checkLight();
})();
