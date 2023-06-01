
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function checkPhone() {
    let input_value = document.getElementById("clientAddTel");
    //не удаляются скобки (если только не выбрать все и удалить)
    input_value.value = input_value.value.replace(/\D/g, '').replace(/(\d{1})(\d{1})?(\d{1,3})?(\d{1,4})?/, function(_, p1, p2, p3, p4){
        let output = ""
        if (p1) output = `(${p1}`;
        if (p2) output += `${p2})`;
        if (p3) output += ` ${p3}`;
        if (p4) output += ` ${p4}`;
        return output;
    });
}

function onClickTab(tab) {
    let clientBlock = document.getElementById("clientsBlock");
    let bookingBlock = document.getElementById("bookingBlock");
    let calendarBlock = document.getElementById("calendarBlock");

    clientBlock.setAttribute("hidden", "");
    bookingBlock.setAttribute("hidden", "");
    calendarBlock.setAttribute("hidden", "");
    document.getElementById("tittleClientsBlock").style.setProperty("background-color", "#DDDDDD");
    document.getElementById("tittleBookingBlock").style.setProperty("background-color", "#DDDDDD");
    document.getElementById("tittleCalendarBlock").style.setProperty("background-color", "#DDDDDD");

    document.getElementById(tab).style.setProperty("background-color", "#FAFAFA");

    switch (tab){
        case 'tittleClientsBlock':
            clientBlock.removeAttribute("hidden");
            break;
        case 'tittleBookingBlock':
            bookingBlock.removeAttribute("hidden");
            break;
        case 'tittleCalendarBlock':
            calendarBlock.removeAttribute("hidden");
            break;
        default:
            alert("Error switch");
            break;
    }
}

function changeHiddenAddClient(){
    let addBlock = document.getElementById("addClientBlock");
    let addButton = document.getElementById("addClientButton");
    if (addBlock.getAttribute("hidden") !== null){
        addBlock.removeAttribute("hidden");
        addButton.textContent = "Скрыть форму добавления";
    } else {
        addBlock.setAttribute("hidden", "");
        addButton.textContent = "Добавить пользователя";
    }
}

function formClientValidator(form) {
    if (form.clientAddTel.value.replace(/\D/g,'').length != 9){
        alert("Неправильный ввод телефона (9 цифр, учитывая код)");
        return false;
    }
    else {
        return true;
    }
}

function removeClient(){
    let clients = document.getElementsByClassName("checkbox_client");
    let choosePhoneClients = [];
    for (let client of clients) {
        if (client.checked){
            choosePhoneClients.push(client.id);
        }
    }
    //are you sure
    const agreement = confirm('Вы уверены, что хотите удалить ' + choosePhoneClients.length + ' пользователя(ей) (' + choosePhoneClients + ')?');
    if (agreement && choosePhoneClients.length != 0) {
        fetch(remove_client_link, {
            method: "POST",
            headers: {'Content-Type': 'application/json', "X-CSRFToken": csrf},
            body: JSON.stringify({
                nameBlock: 'removeClients',
                dataClientsRemove: choosePhoneClients
            })
        }).then(response => {
            //console.log("Response text: " + response.text());
            window.location.href = response.url;
        });
    }
}

function changeBanClient(tel){
    fetch(change_link, {
        method: "POST",
        headers: {'Content-Type': 'application/json', "X-CSRFToken": csrf},
        body: JSON.stringify({
            nameBlock: 'changeBanClient',
            telClient: tel
        })
    }).then((response) => {
        //console.log("Response text: " + response.text());
        window.location.href = response.url;
    });
}

/*function editClient(tel) {
    document.getElementById("edit" + tel + "Button").setAttribute("hidden", "");
    document.getElementById("change" + tel + "Button").removeAttribute("hidden");

    tableNameBlock = document.getElementById("table" + tel + "Tel");
    tableTelBlock = document.getElementById("table" + tel + "Name");

    tableNameBlock.innerHTML = '<input value="' + tableNameBlock + '" type="text"/>';
}*/

/*function changeClient(tel){
    document.getElementById("edit" + tel + "Button").removeAttribute("hidden");
    document.getElementById("change" + tel + "Button").setAttribute("hidden", "");
}*/

function onClickCheckClient(value){
    let all_check = document.getElementById(value);
    let clients = document.getElementsByClassName("checkbox_client");
    for (let client of clients) {
        if (all_check.checked){
            client.checked = true;
        }
        else {
            client.checked = false;
        }
    }
}

function changeHiddenAddBooking(){
    let addBlock = document.getElementById("addBookingBlock");
    let addButton = document.getElementById("addBookingButton");
    if (addBlock.getAttribute("hidden") !== null){
        addBlock.removeAttribute("hidden");
        addButton.textContent = "Скрыть форму добавления";
    } else {
        addBlock.setAttribute("hidden", "");
        addButton.textContent = "Добавить новые записи";
    }
}

function addTimesBookingButton(button){
    let input = document.createElement("input");
    input.type = "time";
    input.name = "time"; //+ (times++);
    input.setAttribute("required", "");
    input.setAttribute("class", "inputTime");

    let del_button = document.createElement("button");
    del_button.setAttribute("onclick", "removeTimesBookingButton(this)");
    del_button.setAttribute("type", "button");
    del_button.setAttribute("class", "removeTimeButton")
    del_button.innerHTML = "-";

    button.parentNode.insertBefore(document.createElement("br"), button);
    button.parentNode.insertBefore(del_button, button);
    button.parentNode.insertBefore(input, button);
}

function removeTimesBookingButton(button){
    button.previousSibling.remove();
    button.nextSibling.remove();
    button.remove();
    //times--;
}

function onClickCheckBooking(checkObject){
    let booking = document.getElementsByClassName("checkbox_booking");
    for (let book of booking) {
        if (checkObject.checked){
            book.checked = true;
        }
        else {
            book.checked = false;
        }
    }
}

function removeBooking(){
    let booking = document.getElementsByClassName("checkbox_booking");
    let chooseBook = [];
    for (let book of booking) {
        if (book.checked){
           chooseBook.push(book.id);
        }
    }
    //are you sure
    const agreement = confirm('Вы уверены, что хотите удалить ' + chooseBook.length + ' запись(ей)?');
    if (agreement) {
        fetch(remove_booking_link, {
            method: "POST",
            headers: {'Content-Type': 'application/json', "X-CSRFToken": csrf},
            body: JSON.stringify({
                nameBlock: 'removeBooking',
                dataBookingRemove: chooseBook
            })
        }).then(response => {
            //console.log("Response text: " + response.text());
            window.location.href = response.url;
        });
    }
}
