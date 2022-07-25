const switchTheme = document.querySelector('.switch-theme');
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const aboutWrap = document.querySelector('.about__articles');
const buttonNext = document.querySelector('.arrow__next');
const buttonPrev = document.querySelector('.arrow__prev');
const classShow = 'about__item_show';

/**
 * Смена показа блока "about"
 */
function showNextAbout (e) {
    const elementShow = document.querySelector(`.${classShow}`);

    if (elementShow.nextElementSibling) {
        elementShow.nextElementSibling.classList.add(classShow)
        elementShow.classList.remove(classShow)
    }
    else {
        aboutWrap.firstElementChild.classList.add(classShow)
        aboutWrap.lastElementChild.classList.remove(classShow)
    }
    e.preventDefault()
}

function showPrevAbout (e) {
    const elementShow = document.querySelector(`.${classShow}`);
    
    if (elementShow.previousElementSibling) {
        elementShow.previousElementSibling.classList.add('about__item_show')
        document.querySelector(`.${classShow}`).nextElementSibling.classList.remove(classShow)
    }
    else {
        aboutWrap.lastElementChild.classList.add(classShow)
        document.querySelector(`.${classShow}`).classList.remove(classShow)
       
    }
    e.preventDefault()
}

/**
 * Выбор категорий для просмотра карточек
 */
function selectCategory(category) {
    document.querySelector('.cards__list_show').classList.remove('cards__list_show')
    document.querySelector('.cards__link_active').classList.remove('cards__link_active')
    document.querySelector(`[aria-labelledby=${category}]`).classList.add('cards__link_active')
    document.querySelector('.cards__select').value = category
    document.querySelector('.pagination__point_active').classList.remove('pagination__point_active')
    document.querySelector('.pagination__point').classList.add('pagination__point_active')
    
    const card = document.getElementById(category)
    if (card instanceof Element) {
        card.classList.add('cards__list_show')
    } else {
        throw `Элемент с ID "${category}" не найден.`
    }
    document.getElementById(category).classList.add('cards__link_active')
}

function showSwitchTheme () {
    if (document.querySelector('.menu_opened')) {
        document.querySelector('.switch-theme').classList.add('switch-theme_active')
    }
    else
        document.querySelector('.switch-theme').classList.remove('switch-theme_active')
}
/**
 * Открыть/Закрыть меню
 */
function toggleMenu () {
    document.querySelector('.nav').classList.toggle('nav_opened')
    document.querySelector('.menu').classList.toggle('menu_opened')
    showSwitchTheme()
    /**
     * Закрыть меню при скролле
     */
    window.addEventListener('scroll', function () {
        nav.classList.remove('nav_opened')
        menu.classList.remove('menu_opened')
        showSwitchTheme()
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
 * Переключение точек у маленького слайдера
 */
function selectPoint (index, event) {
    document.querySelector('.cards__list_show').querySelector('.card_show').classList.remove('card_show')
    document.querySelector('.cards__list_show').querySelectorAll('.card')[index].classList.add('card_show')
    document.querySelector('.pagination__point_active').classList.remove('pagination__point_active')
    event.classList.add('pagination__point_active')
}

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

/**
 * Отрытие меню
 */
document.querySelector('.nav__wrap').addEventListener('click', function () {
    toggleMenu()
})

switchTheme.addEventListener('click', toggleSwitchTheme)
buttonNext.addEventListener('click', showNextAbout)
buttonPrev.addEventListener('click', showPrevAbout)

document.querySelector('.cards__links').addEventListener('click', function (e) {
    const category = e.target.getAttribute('aria-labelledby')
    selectCategory(category)
    e.preventDefault()
})

document.querySelectorAll('.pagination__point').forEach(element => element.addEventListener('click', function () {
    if (Array.from(element.parentNode.children).indexOf(element) === 1) {
        selectPoint(1, this)
    }
    else if (Array.from(element.parentNode.children).indexOf(element) === 2) {
        selectPoint(2, this)
    }
    else if (Array.from(element.parentNode.children).indexOf(element) === 0) {
        selectPoint(0, this)
    }
}))

document.querySelector('.cards__select').addEventListener('change', function () {
    const category = this.value;
    selectCategory(category)
})