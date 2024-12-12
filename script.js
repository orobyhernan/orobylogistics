/*Now this code will execute a few functions including the function that adds more 
rows to the prodcut table*/

document.addEventListener('DOMContentLoaded', function() {
    const AddRowButton = document.getElementById('AddRowButton');
    const CalculatePriceButton = document.getElementById('CalculatePriceButton');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const warningMessage = document.getElementById('warningMessage');
    const inputWarning = document.getElementById('inputWarning');
    const ResultDisplay = document.getElementById('ResultDisplay');
    const CategoryInputField = document.querySelector('.categoryInputContainer input');
    let rowCount = productTable.rows.length; /* Initially we have one row */
    const maxRows = 11; /* Max no. of rows that can be inputted */

    /* This functionality inserts a new row each time you click the "AddRowButton" button */ 
    AddRowButton.addEventListener('click', function() {
        if (rowCount < maxRows) {
            const newRow = productTable.insertRow();

            /* Create new cells with input elements */
            const productCell = newRow.insertCell(0);
            const categoryCell = newRow.insertCell(1);
            const priceCell = newRow.insertCell(2);
            const unitsCell = newRow.insertCell(3);

            productCell.innerHTML = '<input type="text">';
            categoryCell.innerHTML = '<input type="text">';
            priceCell.innerHTML = '<input type="text">';
            unitsCell.innerHTML = '<input type="text">';

            rowCount++;
            warningMessage.style.display = "none";
            inputWarning.style.display = "none";
        } else {
            warningMessage.style.display = "block";
        }
    });

    /* This functionality calculates the total price based on the selected category */
    CalculatePriceButton.addEventListener('click', function() {
        const categoryInput = CategoryInputField.value.trim().toLowerCase();
        let totalPrice = 0;
        let allFieldsValid = true;
        let categoryFound = false;

        // Hide the ResultDisplay by default
        ResultDisplay.innerHTML = '<p>Your results will be displayed here.</p>'; // Placeholder text before calculations ResultDisplay.style.display = 'block';

        if (categoryInput === '') {
            inputWarning.style.display = 'block';
            ResultDisplay.innerHTML = ''; // Clear previous results
            return;
        } else {
            inputWarning.style.display = 'none';
        }

        // Iterate over table rows to sum the total price for the given category
        for (let i = 0; i < productTable.rows.length; i++) {
            const row = productTable.rows[i];
            const category = row.cells[1].querySelector('input').value.trim().toLowerCase();
            const price = row.cells[2].querySelector('input').value.trim();
            const units = row.cells[3].querySelector('input').value.trim();
            
            let numericPrice = Number(price);
            let numericUnits = Number(units);

            if (category === categoryInput && price !== '' && units !== '') {
                categoryFound = true;

                // Check if conversion results are indeed numbers
                if (!isNaN(numericPrice) && !isNaN(numericUnits)) {
                    totalPrice += numericPrice * numericUnits;
                } else {
                    allFieldsValid = false;
                    inputWarning.style.display = 'block';
                    ResultDisplay.innerHTML = ''; // Clear previous results
                    return; // Exit the function if invalid data is encountered
                }
            }
        }

        // Display the result if all required fields are valid and category was found
        if (categoryFound && allFieldsValid) {
            ResultDisplay.style.display = 'flex'; ResultDisplay.innerHTML = '';
            ResultDisplay.innerHTML = `
                <p>So here is the recap:</p>
                <p>The total price for all ${categoryInput} products is $${totalPrice.toFixed(2)}.</p>
            `;
        } else if (!categoryFound) {
            ResultDisplay.style.display = 'flex'; // Keep the div visible
            ResultDisplay.innerHTML = `<p>No matching products found for the category: ${categoryInput}.</p>`;
            ResultDisplay.innerHTML = `<p>No matching products found for the category: ${categoryInput}.</p>`;
        }
    });
});


/*This code will control some style changes that CSS alone can't control*/

document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('productTable');
    var headers = table.querySelectorAll('th');
    var rows = table.querySelectorAll('tbody tr');

    rows.forEach(function(row) {
        var cells = row.querySelectorAll('td');

        cells.forEach(function(cell,index) {
            cell.addEventListener('mouseenter', function() {
                headers[index].classList.add('highlight-header');
            });

            cell.addEventListener('mouseleave', function() {
                headers[index].classList.remove('highlight-header');
            });
        });
    });
});


/*This will direct you to the learn more page when you click on the "Learn more" button
on the index html page */
document.getElementById("learn-more-btn").onclick = function () {
    window.location.href = "learnmore.html";
};