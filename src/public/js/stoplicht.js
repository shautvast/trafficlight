get("#happy").addEventListener('click', happy);
get('#unsure').addEventListener('click', unsure);
get('#sad').addEventListener('click', sad);
get('#username').addEventListener("keydown", event => {
    checkError();
    if (event.which == 13) {
        get('#password').focus();
        event.preventDefault();
    }
});
get('#password').addEventListener("keydown", event => {
    checkError();
    if (event.which == 13) {
        get('#username').focus();
        event.preventDefault();
    }
});

function handle(event, next) {
    if (event.which == 13) {
        get(next).focus;
        event.preventDefault();
    }
}

function happy() {
    emotion().value = "3";
    submit();
}

function unsure() {
    emotion().value = "2"
    submit();
}

function sad() {
    emotion().value = "1";
    submit();
}

function emotion() {
    return get('#emotion');
}

function submit() {
    get('#timestamp').value = formatDate(new Date());
    get('#emotionsForm').submit;
}

function checkError(){
    if (getValue("#username") != '' && getValue("#password") !=''){
        setHtml("#errorMessage",'');
    }
}

function get(element){
    return document.querySelector(element);
}

function getValue(element) {
    return get(element).value;
}

function setHtml(element, innerHtml) {
    let object = get(element);
     if (object){
         object.innerHTML=innerHtml;
     }
}

function formatDate(date){
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}
