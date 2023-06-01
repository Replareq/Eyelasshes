function chooseMonth(){
    let links = document.getElementsByClassName("a_choose");
    for (let item of links) {
        if (item.getAttribute("hidden") !== null){
            item.removeAttribute("hidden");
        } else {
            item.setAttribute("hidden", "");
        }
    }
}