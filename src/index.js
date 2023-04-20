import './style.css'

function createGrid(gridArea) {
    console.log(gridArea)
    let grid = document.createElement('div')
    grid.classList.add('grid');
    // make a certain amount of row
    for (let r = 0; r < 10; r++) {
        let newRow = document.createElement('div');
        newRow.classList.add("row");
        for (let c = 0; c < 10; c++) {
            let newBlock = document.createElement('div');
            newBlock.classList.add("block");
            newRow.appendChild(newBlock);
        }
        grid.appendChild(newRow);
    }
    gridArea.appendChild(grid);
}

// make the playerGrid
createGrid(document.querySelector('.playerGrid'));

createGrid(document.querySelector('.computerGrid'));
