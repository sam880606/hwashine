// Modal related variables and functions
let modalElement, modalTitleElement, modalBodyElement, modalCloseBtnElement, modalOverlayElement;

// Function to query and cache modal DOM elements
function queryModalElements() {
    if (!modalElement) { // Query only once
        modalElement = document.getElementById('tds-modal');
        if (modalElement) {
            modalTitleElement = document.getElementById('modal-title');
            modalBodyElement = document.getElementById('modal-body');
            modalCloseBtnElement = document.getElementById('modal-close-btn');
            modalOverlayElement = modalElement.querySelector('.modal-overlay');
        } else {
            console.error('Modal root element (#tds-modal) not found.');
        }
    }
}

export function openModal(title, contentHtml) {
    queryModalElements();
    if (!modalElement || !modalTitleElement || !modalBodyElement) {
        console.error('Cannot open modal: one or more modal elements are missing.');
        return;
    }
    modalTitleElement.textContent = title;
    modalBodyElement.innerHTML = contentHtml;
    modalElement.setAttribute('aria-hidden', 'false');
    modalElement.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    if (modalCloseBtnElement) modalCloseBtnElement.focus(); // For accessibility
}

export function closeModal() {
    queryModalElements();
    if (!modalElement) {
        console.error('Cannot close modal: modal element not found.');
        return;
    }
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.style.display = 'none';
    document.body.style.overflow = ''; // Restore background scrolling
}

export function initModal() {
    queryModalElements(); // Ensure elements are queried

    if (modalCloseBtnElement) {
        modalCloseBtnElement.addEventListener('click', closeModal);
    } else {
        console.warn('Modal close button not found.');
    }

    if (modalOverlayElement) {
        modalOverlayElement.addEventListener('click', closeModal);
    } else {
        console.warn('Modal overlay not found.');
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalElement && modalElement.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });
}