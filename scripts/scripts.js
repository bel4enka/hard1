const switchTheme = document.querySelector('.switch-theme');
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');

/**
 * Открыть/Закрыть меню
 */
function toggleMenu () {
    document.querySelector('.nav').classList.toggle('nav_opened')
    document.querySelector('.menu').classList.toggle('menu_opened')

    /**
     * Закрыть меню при скролле
     */
    window.addEventListener('scroll', function () {
        nav.classList.remove('nav_opened')
        menu.classList.remove('menu_opened')
    })
}

/**
 * Переключатель темы
 */
function toggleSwitchTheme () {
    switchTheme.classList.toggle('switch-theme_dark')
    document.querySelector('.body').classList.toggle('theme-dark')
    document.querySelector('.body').classList.toggle('theme-light')
}

/**
 * Отрытие меню
 */
document.querySelector('.nav__wrap').addEventListener('click', function () {
    toggleMenu()
})


/**
 * Плавный якорный переход по ссылкам
 */
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}


switchTheme.addEventListener('click', toggleSwitchTheme)
