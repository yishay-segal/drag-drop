import {elements, newBox, note} from './base.js';

export default class AddBox{
    constructor() {
        this.displayAddBox();
        this.addbox = document.querySelector('.add-box');
        this.eventCloseOverlay();
    }

    displayAddBox() {
        const html = `
            <div class="add-box">
                <p><span class="plus">+</span> add column</p>
            </div> 
        `;
        elements.boxCont.insertAdjacentHTML('beforeend', html);
    }

    deleteAddBox() {
        document.querySelector('.add-box').remove();
    }

    eventCloseOverlay() {
        const func = (e) => {
            if (e.target === elements.overlay) {
                elements.overlay.classList.remove('display');
                [...elements.overlay.children].forEach(elem => {
                    elem.classList.remove('display');
                });
            }
        }
        document.addEventListener('click', func);
    }

    getData() {
        return elements.headInput.value;
    }

    clearInput(input) {
        input.value = '';
    }

    displayNewBox(item) {
        const newBoxElem = newBox(item.header, item.id);
        elements.boxCont.insertAdjacentHTML('beforeend', newBoxElem);
        elements.headBtn.disabled = true;
        elements.headBtn.classList.add('disabled');
    }

    addInputNote(e) {
        const divNote = e.target.parentElement.previousElementSibling;
        divNote.classList.toggle('display');
    }

    addNewNote(e, id) {
        const input = e.target.parentElement.previousElementSibling;
        const elem = note(input.value, id);
        input.value = '';
        const box = e.target.parentElement.parentElement.parentElement.parentElement;
        box.insertAdjacentHTML('beforeend', elem);
        console.log(document.querySelector('.dm-note'));
        input.parentElement.classList.remove('display');
    }

    btnDisable(input, btn) {
        input.addEventListener('input', () => {
            if (input.value ==='' || input.value.trim() === '') {
                btn.classList.add('disabled');
                btn.disabled = true; 
                
            } else {
                btn.disabled = false;
                btn.classList.remove('disabled');
            }
        });
    }

    toggleDropDownMenu(elem) {
        elem.parentElement.nextElementSibling.classList.toggle('display');
    }

    renderSaveNote(item) {
        const elem = note(item.text, item.id);
        const anc = document.querySelector(`[data-id="${item.id.split('/')[0]}"]`);
        anc.insertAdjacentHTML('beforeend', elem);
    }

    renderStorage(items, handler) {
        items.forEach((elem) => {
            this.displayNewBox(elem);
            handler(elem.id);
            if(elem.children.length) {
                elem.children.forEach(elem => {
                    this.renderSaveNote(elem);
                })
            }
        })
    }
}
