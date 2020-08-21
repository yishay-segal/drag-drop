import {elements} from './base.js';

export default class SearchView {
    constructor() {
        this.icon = document.querySelector('.icon-search');
        this.setEvents();
    }

    setEvents() {
        this.icon.addEventListener('click', () => {elements.searchInput.focus()});
        elements.searchInput.addEventListener('focus', () => {
            document.querySelector('.search-bar').classList.add('focus');
        });
        elements.searchInput.addEventListener('blur', () => {
            document.querySelector('.search-bar').classList.remove('focus');
        })
    }

    getSearchInput() {
        return elements.searchInput.value;
    }

    showSearchItem(array) {
            const elements = [...document.querySelectorAll('.content-box')];

            elements.forEach(elem => {
                elem.classList.remove('searching');
            })

            array.forEach(id => {
                const anc = document.querySelector(`[data-id="${id}"]`).parentElement;
                console.log(anc);
                anc.classList.add('searching');
                anc.classList.remove('display-none');
            });
            
            elements.forEach(elem => {
                if(!elem.className.includes('searching')) {
                    elem.classList.add('display-none');
                }
            })
    }

    showAllElements() {
        const elements = [...document.querySelectorAll('.content-box')];
        elements.forEach(elem => {
            elem.classList.remove('display-none');
            elem.classList.remove('searching');
        })
    }
}