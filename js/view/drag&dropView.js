export default class DragDrop {

    dragDrop(handler, handler2) {
        const notes = document.querySelectorAll('.notes-div');
        const columns = document.querySelectorAll('.content-box');
    
        notes.forEach(note => {
            note.addEventListener('dragstart', () => {
                note.classList.add('dragging');
            });
    
            note.addEventListener('dragend', (e) => {
                note.classList.remove('dragging');
                console.log('end');
                const child = note.closest('[data-id]').dataset.id;
                const anc = e.target.parentElement.dataset.id;
                const item = handler(child, anc);
                console.log(item.parent, item.preAnc);
                handler2(item.parent);
                handler2(item.preAnc);
                
            })
        })
    
        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = getDragAfter(column, e.clientY);
                const draggable = document.querySelector('.dragging');
                if (afterElement == null) {
                    column.append(draggable);
                } else {
                    column.insertBefore(draggable, afterElement);
                }
               
            })
        })
    
        function getDragAfter(container, y) {
            const elements = [...container.querySelectorAll('.notes-div:not(.dragging)')];
    
            return elements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return {offset: offset, element: child}
                } else{
                    return closest;
                }
            }, {offset: Number.NEGATIVE_INFINITY}).element;
        }
    }
    
    dragDropNote = (id , handler, handler2) => {
        const note = document.querySelector(`[data-id="${id}"]`);
    
        note.addEventListener('dragstart', () => {
            note.classList.add('dragging');
        });
    
        note.addEventListener('dragend', (e) => {
            note.classList.remove('dragging');
            console.log('end');
            const child = note.closest('[data-id]').dataset.id;
            const anc = e.target.parentElement.dataset.id;
            const item = handler(child, anc);
            console.log(item.parent, item.preAnc);
            handler2(item.parent);
            handler2(item.preAnc);
        });
    }
    
    dragDropColumn = (id) => {
        const column = document.querySelector(`[data-id="${id}"]`);
    
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfter(column, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                column.append(draggable);
            } else {
                column.insertBefore(draggable, afterElement);
            }
            
        })
    
        function getDragAfter(container, y) {
            const elements = [...container.querySelectorAll('.notes-div:not(.dragging)')];
    
            return elements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return {offset: offset, element: child}
                } else{
                    return closest;
                }
            }, {offset: Number.NEGATIVE_INFINITY}).element;
        }
    }
}