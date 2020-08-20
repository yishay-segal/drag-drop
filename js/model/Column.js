export default class Column {
    constructor(columns) {
        this.items = [];
        this.columns = columns;
        this.readStorage();
    }

    addColumn (header) {
        const box = {
            id: Date.now(),
            header,
            children: []
        }
        this.items.push(box);
        this.currentID = box.id;
        return box;
    }

    addNote(text, ancestor) {
        const note = {
            id: `${ancestor}/${Date.now()}`,
            text
        }
        const anc = this.items.find(elem => elem.id == ancestor);
        anc.children.push(note);
        return {note, anc};
    }

    saveEditColumn(id, value) {
        const item = this.items.find(elem => elem.id == id);
        item.header = value;
        return item;
    }

    saveEditNote(id, value) {
        const anc = id.split('/')[0];
        const item = this.items.find(elem => elem.id == anc);
        const itemNote = item.children.find(elem => elem.id === id);
        itemNote.text = value;
        return {item, anc};
    }

    deleteNote(id){
        const anc = id.split('/')[0];
        const item = this.items.find(elem => elem.id == anc);
        const index = item.children.findIndex(elem => elem.id === id);
        item.children.splice(index, 1);
        return item;
    }

    deleteColumn(id) {
        const index = this.items.findIndex(elem => elem.id === id);
        this.items.splice(index, 1);
    }

    readStorage() {
        if(this.columns.length){
            this.items = this.columns;
            console.log(this.items);
        }
    }

    onDragend(child, anc) {
        const parent = this.items.find(elem => elem.id == anc);
        const preAnc = this.items.find(elem => elem.id == child.split('/')[0]);
        this.deleteNote(child);
        const note = document.querySelector(`[data-id="${child}"]`);
        const item = this.addNote(note.querySelector('p').textContent, anc);
        note.setAttribute('data-id', item.note.id);
        return {parent, anc, preAnc};
    }
}