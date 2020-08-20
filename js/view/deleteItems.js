export default class Delete {

    deleteColumn(id) {
        const column = document.querySelector(`[data-id="${id}"]`);
        column.remove();
    }

    deleteNote(id) {
        const anc = document.querySelector(`[data-id="${id.split('/')[0]}"]`);
        const note = anc.querySelector(`[data-id="${id}"]`);
        note.remove();
    }
}