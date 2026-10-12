const conductorSizeInput = document.getElementById('conductorSizeInput');
const demandInput = document.getElementById('demandInput');
const result = document.getElementById('result');
const temperatureInput = document.getElementById('temperatureInput');
const tableBody = document.querySelector('tbody')

const conductors = [
    { size: '14', amp60: 15, amp75: 20, amp90: 25 },
    { size: '12', amp60: 20, amp75: 25, amp90: 30 },
    { size: '10', amp60: 30, amp75: 35, amp90: 40 },
    { size: '8', amp60: 40, amp75: 50, amp90: 55 }
];

conductors.forEach(function (conductor) {
    const option = document.createElement('option');
    option.value = conductor.size;
    option.textContent = conductor.size;
    conductorSizeInput.appendChild(option);

    const row = document.createElement('tr');
    row.dataset.size = conductor.size;
    row.dataset.amp60 = conductor.amp60;
    row.dataset.amp75 = conductor.amp75;
    row.dataset.amp90 = conductor.amp90;

    const sizeCell = document.createElement('td');
    sizeCell.textContent = conductor.size;
    row.appendChild(sizeCell);

    const cell60 = document.createElement('td');
    cell60.textContent = conductor.amp60 + ' A';
    row.appendChild(cell60);

    const cell75 = document.createElement('td');
    cell75.textContent = conductor.amp75 + ' A';
    row.appendChild(cell75);

    const cell90 = document.createElement('td');
    cell90.textContent = conductor.amp90 + ' A';
    row.appendChild(cell90);

    tableBody.appendChild(row);
})

const rows = document.querySelectorAll ('tr');

function updateTable() {
    let suitableRow = null;
    result.textContent = '';

    rows.forEach(function (row) {
        row.classList.remove('highlight');
        row.classList.remove('fade');
    });

    const demand = Number(demandInput.value);
    if (demandInput.value !== " " && demand < 0) {
        result.textContent = 'Demand cannot be negative';
        return;
    }

    const selectedSize = conductorSizeInput.value;
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
    const amp = Number(row.dataset[temperatureInput.value]);

    if (amp >= demand && suitableRow === null) {
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

temperatureInput.addEventListener ('change', function() {
    updateTable();
})
