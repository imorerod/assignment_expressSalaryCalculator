
$(document).ready(onReady);

let employeeArray = [];//position is global; can be called anywhere b/c its outside of
let monthlyBudget = 20000;

function onReady() {
    render();

    $('#addEmployee').on('submit', submitEmployee);
    $('.container').on('click', '.deleteBtn', clickDeleteButton);
}

function submitEmployee(event) {
    event.preventDefault();
    let entry = {};
    $(this).serializeArray().forEach(function (item) {
        entry[item.name] = item.value; // 'item' comes from submitted form
    });
    $(this).trigger('reset'); // resets form
    employeeArray.push(entry);
    render();
}

function clickDeleteButton() {
    // $(this).parent().remove; // this is just able to delete employee; not updating cost
    let indexForDelete = $(this).parent().data('id');
    employeeArray.splice(indexForDelete, 1); // indexForDelete means where to start, 1 is how many
    render();
}

function render() {
    $('.container').empty(); // destroy old list, build new list
    for (let i = 0; i < employeeArray.length; i++) {
        $('.container').append('<div></div>'); // puts div inside .container
        let newDiv = $('.container').children().last(); // div inside div targeting last 'child'
        newDiv.data('id', i); // no idea
        let person = employeeArray[i];
        newDiv.append('<p class="sideBySide">' + person.firstName + '</p>');
        newDiv.append('<p class="sideBySide">' + person.lastName + '</p>');
        newDiv.append('<p class="sideBySide">' + person.employeeID + '</p>');
        newDiv.append('<p class="sideBySide">' + person.title + '</p>');
        newDiv.append('<p class="sideBySide">' + person.annualSalary + '</p>');
        newDiv.append('<button class="deleteBtn">Delete</button>');
    }
    calculateMonthly(employeeArray);
}

function calculateMonthly() {
    let totalSalary = 0;
    let monthlyCost = 0;

    for (let i = 0; i < employeeArray.length; i++) {
        let employee = employeeArray[i];

        totalSalary += parseInt(employee.salary);
    }

    monthlyCost = totalSalary / 12;

    if (monthlyCost > monthlyBudget) {

    $('#totalMonthly').text('Total Monthly Budget: $' + monthlyCost);
        $('#body').css('background', 'red');
    }
};