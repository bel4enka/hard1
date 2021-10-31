const switchTheme = document.querySelector('.switch-theme');

/**
 * Переключатель темы. Само изменение темы ещё не работает.
 */
function toggleSwitchTheme () {
    switchTheme.classList.toggle('switch-theme_dark')
    document.querySelector('.body').classList.toggle('body_theme_dark')
}

/**
 * Отрытие меню
 */
document.querySelector('.nav__wrap').addEventListener('click', function () {
    document.querySelector('.nav').classList.toggle('nav_opened')
    document.querySelector('.menu').classList.toggle('menu_opened')
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
