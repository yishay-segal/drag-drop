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
}