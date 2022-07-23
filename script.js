const INNER_BOXES = 15;
const container = document.querySelector('.container');

function addBoxes() {
    for (let index = 0; index < INNER_BOXES; index++) {
        const box = document.createElement('DIV');
        const span = document.createElement('SPAN');
        span.textContent = index;
        box.classList.add('box');
        box.setAttribute('draggable', true);
        box.setAttribute('position-count', index);
        box.append(span);
        container.append(box);
    }
}

addBoxes();
const boxes = document.querySelectorAll('.box');
let iniiatorIndex = -1;

boxes.forEach(box => {
    box.addEventListener('dragstart', (e) => dragAction(e, true));
    box.addEventListener('dragover', (e) => e.preventDefault());
    box.addEventListener('dragend', (e) => dragAction(e, false));
    box.addEventListener('drop', drop);
});

// container.addEventListener('dragover', drop);

function drop(event) {
    console.log('drop is successful');
    event.preventDefault();
    const dropedElement = event.target;
    const initiatedElement = container.querySelector('.dragging');
    dropAndSwapping(dropedElement, initiatedElement);
}

function dragAction(event, start) {
    // console.log(event);
    if (start) {
        event.target.classList.add('dragging');
    } else {
        event.target.classList.remove('dragging');
    }
}

function dropAndSwapping(nodeA, nodeB) {
    // const droppedIndex = droppedElement.getAttribute('position-count');
    // const initiatorIndex = initiatorElement.getAttribute('position-count');
    // droppedElement.setAttribute('position-count', initiatorIndex);
    // initiatorElement.setAttribute('position-count', droppedIndex);
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
    // container.replaceChild(droppedElement, initiatorElement);
    // container.insertBefore()
    // container.replaceChild(initiatorElement, droppedElement);



    // console.log('the element is dropped on ', droppedIndex, ' and initiated by ', initiatorIndex);
}