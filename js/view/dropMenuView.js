import {showOverlay, closeOverlay, eventCloseOverlay ,showOverlayDefault} from './base.js';
import {deleteNote} from '../index.js';

export default class DropMenu {

    setEvents(id) {
        const box = document.querySelector(`[data-id="${id}"]`);
        box.addEventListener('click', (e) => {
            const target = e.target.closest('li');
            if (target) {
                const id = e.target.closest('li').id;
                if (target.closest('.dm-note')) {
                    if (target.matches('.edNo-btn')) {
                        this.closeMenu(target);
                        const existBox = target.closest('[data-id]');
                        const content = existBox.querySelector('p').textContent;
                        showOverlay('edit-note', content, 'textarea');
                        this.id = target.closest('[data-id]').dataset.id;
                        
                    } else{
                        console.log(target);
                        this.closeMenu(target);
                        this.id = target.closest('[data-id]').dataset.id;
                        const question = confirm('This will remove the note from the project');
                        if (question) {
                            deleteNote();
                        }
                    }

                } else {
                    if(target === box.querySelector('.edCo-btn')){
                        this.closeMenu(target);
                        const existBox = target.closest('[data-id]');
                        const content = existBox.querySelector('.head').textContent;
                        showOverlay('edit-column', content, 'input');
                        this.id = target.closest('[data-id]').dataset.id;

                    } else {
                        this.closeMenu(target);
                        showOverlayDefault('delete-column');
                        this.id = target.closest('[data-id]').dataset.id;
                    }
                }
            }
        });
    }

    closeMenu(target) {
        const menu = target.parentElement.parentElement.parentElement;
        menu.classList.remove('display');
    }

    renderEditColumn(id, value) {
        const newId = id;
        const column = document.querySelector(`[data-id="${newId}"]`);
        column.querySelector('.head').textContent = value;
        closeOverlay();
    }

    renderEditNote(id, value){
        const note = document.querySelector(`[data-id="${id}"]`);
        note.querySelector('p').textContent = value;
        closeOverlay();
    }

    getINput(target) {
        const value = target.parentElement.previousElementSibling.lastElementChild.value;
        return value;
    }

}