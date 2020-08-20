export const elements = {
    overlay: document.querySelector('.overlay'), 
    overlayContent: document.querySelector('.overlay-content'),
    boxCont: document.querySelector('.box-cont'),
    headInput: document.querySelector('#input-name'),
    headBtn: document.querySelector('.btn-create'),
    searchInput: document.querySelector('.search-input'), 
    divAddNote: document.querySelector('.div-note'),
    boxContent: document.querySelector('.content-box')
};

export const newBox = (header, id) => `
    <div class="content-box" data-id="${id}">
        <div class="details">
            <p class="head">${header}</p>
            <div class="div-note">
                <textarea spellcheck="false" class="Xinput-text" id="input-note" placeholder="Add a note"></textarea>
                <div class="div-btn ">
                    <button disabled class="add-btn disabled">Add</button>
                    <button class="cancel-btn">Cancel</button>
                </div>
            </div>
            <div class="sub-nav">
                <span class="plus-new">+</span>
                <div class="dots-div">
                    <span class="dots" id="column-dots">...</span>
                </div>
                <div class="dropdown-menu dm-column">
                    <div class="dropdown-menu--text">
                        <ul>
                            <li class="edCo-btn"><button>Edit column</button></li>
                            <li class="delCo-btn"><button>Delete column</button></li>
                        </ul>
                    </div>
                </div>
            </div>
                
        </div>
    </div>
`;

export const note = (text, id) => 
    `<div class="notes-div" data-id="${id}" draggable="true">
        <i class="far fa-sticky-note"></i>
        <p>${text}</p>
        <div class="sub-nav">
            <div class="dots-div">
                <span class="dots" id="dots-card">...</span>
            </div>
            <div class="dropdown-menu dm-note">
                <div class="dropdown-menu--text">
                    <ul>
                        <li class="edNo-btn"><button>Edit note</button></li>
                        <li class="delNo-btn"><button>Delete note</button></li>
                    </ul>
                </div>
            </div>
        </div>     
    </div>
    `
;

export const showOverlayDefault = (id) => {
    elements.overlay.classList.add('display');
    elements.overlay.querySelector(`#${id}`).classList.add('display');
}

export const showOverlay = (id, header, type) => {
    elements.overlay.classList.add('display');
    const overlayContent = elements.overlay.querySelector(`#${id}`);
    overlayContent.querySelector('.overlay-title').textContent = `Edit ${header}`;
    overlayContent.querySelector(`${type}`).value = header;
    overlayContent.classList.add('display');
    overlayContent.querySelector(`${type}`).focus();
}

export const eventCloseOverlay = () => {
    document.addEventListener('click', closeOverlay);
}

export const closeOverlay = (e) => {
    elements.overlay.classList.remove('display');
    [...elements.overlay.children].forEach(elem => {
        elem.classList.remove('display');
    });
}