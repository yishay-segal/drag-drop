import {elements, note, showOverlayDefault, closeOverlay,eventCloseOverlay, newBox} from './view/base.js';
import addBox from './view/viewAddBox.js';
import searchView from './view/searchView.js';
import dropMenuView from './view/dropMenuView.js';
import dragDropView from './view/drag&dropView.js';
import deleteView from './view/deleteItems.js';
import DataBase from './model/DataBase.js';
import Column from './model/Column.js';

const state = {};

// start data base
const dataBaseController = async() => {
    state.dataBase = new DataBase();
    await state.dataBase.init();
    await state.dataBase.readStorage();
    console.log(state.dataBase.items);
}

//add box controller 
const addBoxView = new addBox();
const dragdropView = new dragDropView();
//redner storage columns
(async() => {
    await dataBaseController();
    console.log(state.dataBase.items);
    addBoxView.renderStorage(state.dataBase.items, dropController);
    addBoxView.deleteAddBox();
    addBoxView.displayAddBox();
    state.column = new Column(state.dataBase.items);
    dragdropView.dragDrop(state.column.onDragend.bind(state.column), state.dataBase.editColumn.bind(state.dataBase));
})();

const addBoxController = async() => {
    showOverlayDefault('add-box');
    addBoxView.btnDisable(elements.headInput, elements.headBtn);
}

const newBoxController = () => {
    const header = addBoxView.getData();
    if (header) {
        if (!state.column) state.column = new Column(state.dataBase.items);
        const item = state.column.addColumn(header);
        state.dataBase.addObject(item);
        console.log(state);
        addBoxView.displayNewBox(item);
        dragdropView.dragDropColumn(item.id);
        addBoxView.deleteAddBox();
        addBoxView.displayAddBox();
        addBoxView.btnDisable(document.querySelector('#input-note'), document.querySelector('.add-btn'));
        addBoxView.clearInput(elements.headInput);
        closeOverlay();
        dropController(item.id);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.matches('.plus-new')){
        addBoxView.addInputNote(e);
    } 
});

const addNoteController = (e) => {
    const ancestor = e.target.closest('.content-box').dataset.id;
    const text = e.target.parentElement.previousElementSibling.value;
    const item = state.column.addNote(text, ancestor);
    state.dataBase.addNote(item.anc);
    addBoxView.addNewNote(e, item.note.id);
    dragdropView.dragDropNote(item.note.id , state.column.onDragend.bind(state.column), state.dataBase.editColumn.bind(state.dataBase));
}

elements.boxCont.addEventListener('click', (e)=> {
    if (e.target.matches('.cancel-btn')) {
        e.target.parentElement.parentElement.classList.remove('display');
    
    } else if (e.target.matches('.add-btn')) {
        addNoteController(e);

    } else if (e.target.matches('#input-note')) {
        addBoxView.btnDisable(e.target, e.target.nextElementSibling.firstElementChild);
    }
});

document.addEventListener('click', (e) => {
    const target = e.target.closest('.add-box');
    if (target) {
        addBoxController();
    }
});
elements.headBtn.addEventListener('click', newBoxController);
elements.headInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        newBoxController();
    }
});
document.addEventListener('click', (e) => {
    if (e.target.matches('#column-dots')){
        addBoxView.toggleDropDownMenu(e.target);
    } else if(e.target.matches('#dots-card')){
        addBoxView.toggleDropDownMenu(e.target);
    }
});

// remove the dm on click on another thing exept from him
document.addEventListener('click', (e) => {
    const target = e.target.closest('.dropdown-menu--text');
    if ( !target && !e.target.matches('.dots') ) {
        if (document.querySelector('.dropdown-menu')) {
            document.querySelectorAll('.dropdown-menu').forEach(elem => {
                elem.classList.remove('display');
            });
        }
    } 
});

// drop meunu controller 
const dropView = new dropMenuView();
addBoxView.btnDisable(document.querySelector('.edCo-input'), document.querySelector('.edCo-btn'));
addBoxView.btnDisable(document.querySelector('.edNo-input'), document.querySelector('.edNo-btn'));
const dropController = (id) => {
    dropView.setEvents(id);
    // addBoxView.btnDisable(document.querySelector('.edCo-input'), document.querySelector('.edCo-btn'));
    // addBoxView.btnDisable(document.querySelector('.edNo-input'), document.querySelector('.edNo-btn'));
};

// hadale edit column name
document.querySelector('#edit-column').addEventListener('click', (e) => {
    if (e.target.matches('.edCo-btn')) {
        const id = dropView.id;
        const value = dropView.getINput(e.target);
        const item = state.column.saveEditColumn(id, value);
        state.dataBase.editColumn(item);
        dropView.renderEditColumn(id, value);
        console.log(state)
    }
});

// handle delete column
const deletV = new deleteView();
document.querySelector('#delete-column').addEventListener('click', (e) => {
    if (e.target.matches('.cancel-delete-column')) {
        closeOverlay();

    } else if(e.target.matches('.btn-delete')) {
        const id = dropView.id;
        console.log(id);
        state.column.deleteColumn(id);
        state.dataBase.deleteColumn(id);
        deletV.deleteColumn(id);
        closeOverlay();
    }
});

// handele event of edit column 
document.querySelector('#edit-note').addEventListener('click', (e) => {
    if (e.target.matches('.edNo-btn')) {
        const id = dropView.id;
        const value = dropView.getINput(e.target);
        const item = state.column.saveEditNote(id, value);
        state.dataBase.editColumn(item.item);
        dropView.renderEditNote(id, value);
    }
});

export const deleteNote = () => {
    const id = dropView.id;
    const item = state.column.deleteNote(id);
    state.dataBase.deleteNote(item, id);
    deletV.deleteNote(id);
}

// serch controller
const searchV = new searchView();