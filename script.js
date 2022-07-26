const INNER_BOXES = 15;
const container = document.querySelector('.container');

function addBoxes() {
    for (let index = 0; index < INNER_BOXES; index++) {
        const box = document.createElement('DIV');
        const span = document.createElement('SPAN');
        span.textContent = index;
        box.classList.add('box');
        box.style.backgroundColor = generateRandomColor();
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
    box.addEventListener('dragenter', (e) => dragAction(e, true, 'outline'));
    box.addEventListener('dragleave', (e) => dragAction(e, false, 'outline'));
    box.addEventListener('dragover', (e) => e.preventDefault());
    box.addEventListener('drop', drop, true);
    box.addEventListener('dragend', (e) => dragAction(e, false));
});

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

// container.addEventListener('dragover', drop);

function drop(event) {
    // console.log('drop is successful');
    event.preventDefault();
    const dropedElement = event.target;
    if (!dropedElement.classList.contains('box')) {
        return;
    }
    dragAction(event, false, 'outline')
    const initiatedElement = container.querySelector('.dragging');
    dropAndSwapping(dropedElement, initiatedElement);
}

function dragAction(event, start, className = 'dragging') {
    // console.log(event);
    if (start) {
        event.target.classList.add(className);
    } else {
        event.target.classList.remove(className);
    }
}

function selectTheParent() { }

function dropAndSwapping(nodeA, nodeB) {
    const parent = container;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parent.insertBefore(nodeB, siblingA);
    // console.log(nodeA, nodeB);
}