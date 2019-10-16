function display_date() {
    let day_date = document.getElementById('day_date');
    let getD = new Date();
    let today = getDayToString(getD.getDay());
    day_date.innerText = today + ', '
        + getD.getDate() + '/'
        + getD.getMonth() + '/'
        + getD.getFullYear();
}

function getDayToString(today) {
    let day = '';
    switch (today) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 0:
            day = "Sunday";
            break;
    }
    return day;
}
display_date();