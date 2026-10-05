const conductorSizeInput = document.getElementById('conductorSizeInput');
const rows = document.querySelectorAll ('tbody tr');
const demandInput = document.getElementById('demandInput');
const result = document.getElementById('result');


function updateTable() {
    let suitableRow = null;
    result.textContent = '';

    const demand = Number(demandInput.value);
    const selectedSize = conductorSizeInput.value;

    rows.forEach(function (row) {
        row.classList.remove('highlight');
        row.classList.remove('fade');
    });

    if (demandInput.value === '' && selectedSize === '') {
        return;
    }

    if (selectedSize !=='') {
        rows.forEach(function (row) {
            if (row.dataset.size === selectedSize) {
                row.classList.add('highlight');
            }
            else {
                row.classList.add('fade');
            }
        })
        return;
    }
    
    rows.forEach(function (row) {
    const ampacity = Number(row.dataset.ampacity);

    if (ampacity >= demand && suitableRow === null) {
            suitableRow = row;
        }
    });

    if (suitableRow === null) {
        result.textContent = 'No suitable conductor found.';
    }
    else {
        result.textContent = 'Recommended conductor size: ' + suitableRow.dataset.size + ' AWG';
    }

    rows.forEach(function (row) {
        if (row === suitableRow) {
            row.classList.add('highlight');
        }
        else {
            row.classList.add('fade');
        }
    }); 
}

conductorSizeInput.addEventListener ('input', function () {
    demandInput.value = '';
    updateTable();
});

demandInput.addEventListener('input', function (){
    conductorSizeInput.value = '';
    updateTable();
});
