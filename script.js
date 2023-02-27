// skapar alla variabler som ska användas
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

// Vid varje tick (som man bestämt ovan) ska denna funktion ske
TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    // om "isDeleting = true", skriv ut en karaktär i "txt"-variabeln
    // om "isDeleting = true", radera en karaktär i "txt"-variabeln
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Detta elements innehåll ändras
    this.el.innerHTML = "<span class='wrap'>We " + this.txt + "</span>";

    // random numbers för att ändra hastigheten
    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    // om "isDeleting = true" och "txt = [Texten som ska skrivas ut]" ändra 
    // delta (håller koll på vilket ord som skrivs ut) och ändra isDeleting
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    // Vänta en tick
    setTimeout(function () {
        that.tick();
    }, delta);
};

// vänta tills dokumentet laddas sedan starta hela denna "typing-effect"
window.onload = function () {
    var elements = document.getElementsByClassName('typing-effect');
    for (var i = 0; i < elements.length; i++) {
        // toRotate är den data i html attributet "data-type".
        // Datan är i JSON format. Dessa strings är de som skrivs ut.
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};  