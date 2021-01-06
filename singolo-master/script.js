'use strict';
window.onload = function () {
    const MENU = document.getElementById('menu');
    const TABS = document.getElementById('tabs_menu');
    const PROJECTS = document.getElementById('projects');



    //Реализуем активные пункты меню при перемещении по ним

    function chooseItemMenu(event) {
        MENU.querySelectorAll('a').forEach(el =>
            el.classList.remove('navigation__link_state_active'));

        event.target.classList.add('navigation__link_state_active');
    }
 

    //Плавный скролл до нужного раздела
    document.addEventListener('scroll', onScroll);

    function onScroll(event) {
        const curPos = window.scrollY;
        const sections = document.querySelectorAll('header, section');
        const links = document.querySelectorAll('#menu a');

        sections.forEach((el) => {
            el.getAttribute('id');
            console.log(el.getAttribute('id'));

            if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
                links.forEach((a) => {
                    a.classList.remove('navigation__link_state_active');
                    if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                        a.classList.add('navigation__link_state_active');
                    }
                })
            }
        });


    }

    //Переключение слайдов бесконечной каруселькой
    const ARROW_PREV = document.getElementById('arrow-prev');
    const ARROW_NEXT = document.getElementById('arrow-next');

    const SLIDER = document.getElementById('slider');
    const SLIDES = document.querySelectorAll('.slider__item');
    let currentSlide = 0;
    let isEnabled = true;

    function changeCurrentSlide(n) {
        currentSlide = (n + SLIDES.length) % SLIDES.length; //делаем промотку, доходя до границы получаем 0
    }

    function hideSlide(direction) {
        isEnabled = false;
        SLIDES[currentSlide].classList.add(direction);
        SLIDES[currentSlide].addEventListener('animationend', function () {
            this.classList.remove('slider__item_active', direction);
        })
    }

    function showSlide(direction) {
        SLIDES[currentSlide].classList.add('slider__item_next', direction);
        SLIDES[currentSlide].addEventListener('animationend', function () {
            this.classList.remove('slider__item_next', direction);
            this.classList.add('slider__item_active');
            isEnabled = true;
        })
    }

    function previousSlide(n) {
        hideSlide('to-right');
        changeCurrentSlide(n - 1);
        showSlide('from-left');
        SLIDER.classList.toggle("slider_blue");
        document.querySelector(".slider__arrow.left").classList.toggle("arrow_color");
        document.querySelector(".slider__arrow.right").classList.toggle("arrow_color");
        document.querySelector('.slider__item_back-slide').classList.add('show')
    }

    function nextSlide(n) {
        hideSlide('to-left');
        changeCurrentSlide(n + 1)
        showSlide('from-right');
        SLIDER.classList.toggle("slider_blue");
        document.querySelector(".slider__arrow.left").classList.toggle("arrow_color");
        document.querySelector(".slider__arrow.right").classList.toggle("arrow_color");
        document.querySelector('.slider__item_back-slide').classList.add('show')

    }

    ARROW_PREV.addEventListener('click', function () {
        // changeCurrentSlide(currentSlide - 1);
        if (isEnabled) {
            previousSlide(currentSlide);
        }
    })

    ARROW_NEXT.addEventListener('click', function () {
        if (isEnabled) {
            nextSlide(currentSlide);
        }
    })

    // Переключение табов Portfolio
    TABS.addEventListener('click', (Event) => {
        TABS.querySelectorAll('button').forEach(el => el.classList.remove('portfolio__tabs-item_active'));
        Event.target.classList.add('portfolio__tabs-item_active');
        console.log(Event);

        let arrOfSrc = [];
        PROJECTS.querySelectorAll('img').forEach((el) => {
            arrOfSrc.push(el.src);
            el.src = '';
        })
        let randomArr = arrOfSrc.sort(() => Math.random() - 0.5);
        PROJECTS.querySelectorAll('img').forEach((el, i) => el.src = randomArr[i]);
    });

}
