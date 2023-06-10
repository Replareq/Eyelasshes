function chooseMonth(){
    let links = document.getElementsByClassName("choose_month");
    for (let item of links) {
        if (item.getAttribute("hidden") !== null){
            item.removeAttribute("hidden");
        } else {
            item.setAttribute("hidden", "");
        }
    }
}

function selectNewMonth(newMonth){
    let oldMonth = document.getElementById("selectedMonth");
    oldMonth.innerHTML = newMonth.textContent;
}

function selectMonthYear(){
    let month = document.getElementById("selectedMonth").textContent.trim();
    let year = document.getElementById("selectedYear").value;

    window.location.href = "?monthYear=" + month + " " + year;
}