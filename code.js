let operators = ['x', '/', '+', '-', '='];
const el = document.querySelector(".visor")


function ApontarValorParaOVisor(valor) {
    if (valor.length == 1) {
        if (valor === "C") {
            el.innerText = "0";
        } else if (valor === "=") {
            el.innerText = orquestrador();;
        } else {
            concat(valor);
        }
    }
}

function concat(concatable) {
    if (el.innerText === "0") {
        el.innerText = concatable;
    } else {
        el.innerText = el.innerText + concatable;
    }
}

function orquestrador() {
    let value = el.innerText;

    let hasFinish = false;
    let hasOperated;

    do {
        if (value[0] == '-' && value[1] == '-')
            return value.slice(1);

        hasOperated = false;

        if (value.includes('x')) {
            value = parseador(value, 'x');
            hasOperated = true;
        }

        if (value.includes('%')) {
            value = parseador(value, '%');
            hasOperated = true;
        }
        if (value.includes('+')) {
            value = parseador(value, '+');
            hasOperated = true;
        }
        if (value.includes('-')) {
            value = parseador(value, '-');
            hasOperated = true;
        }
        if (hasOperated === false) {
            hasFinish = true;
        }

    } while (!hasFinish);

    return value;
}

function parseador(value, operacao) {


    let head1 = 0;
    let tail1 = 0;
    let head2 = 0;
    let tail2 = 0;
    let substring = "";
    let substring2 = "";
    let result

    let calculate = strategySetter(operacao);

    for (let i = 0; i < value.length; i++) {
        if (value[i] === operacao) {
            substring = FindA(i);
            substring2 = FindB(i);
        }
    }


    if (head1 > 0 && value[head1 - 1] == '-') {
        result = calculate.calculate("-" + substring, substring2);
        console.info(value.replaceAt(head1 - 1, tail2, result));
        result = value.replaceAt(head1 - 1, tail2, result);
    } else {
        result = calculate.calculate(substring, substring2);
    }

    console.info(substring, head1, tail1, substring2, head2, tail2, result, value);


    return value.replaceAt(head1, tail2, result);

    function FindB(i) {
        head2 = i + 1;
        for (let k = i; k < value.length; k++) {

            tail2 = k + 1;
            if (operators.includes(value[k + 1])) {
                ++tail2;
                break;
            }
        }
        if (head2 === tail2) {
            return value[i + 1];
        } else {
            return value.slice(head2, tail2 + 1);
        }
    }

    function FindA(i) {
        tail1 = i - 1;
        for (let k = i; k >= 0; k--) {
            head1 = k;
            if (operators.includes(value[k - 1])) {
                break;
            }
        }
        if (head1 === tail1) {
            return value[i - 1];
        } else {
            return value.slice(head1, tail1 + 1);
        }
    }
}

String.prototype.replaceAt = function (startIndex, endIndex, replacement) {
    return this.substring(0, startIndex) + replacement + this.substring(endIndex);
}

let Calculadora = function () {
    this.strategy = "";
};

Calculadora.prototype = {
    setStrategy: function (strategy) {
        this.strategy = strategy;
    },

    calculate: function (a, b) {
        return this.strategy.calculate(a, b);
    }
};

let MULT = function () {
    this.calculate = function (a, b) {
        return Number.parseFloat(a) * Number.parseFloat(b);
    }

    this.toString = function () {
        return `Multiplicacao Stratategy: `
    }
}

let DIVISION = function () {
    this.calculate = function (a, b) {
        if (b == 0) {
            throw Error;
        }
        return (Number.parseFloat(a) / Number.parseFloat(b)).toFixed(2);
    }

    this.toString = function () {
        return `Divisão Stratategy: `
    }
}

let PLUS = function () {
    this.calculate = function (a, b) {
        return Number.parseFloat(a) + Number.parseFloat(b);
    }

    this.toString = function () {
        return `Soma Stratategy: `
    }
}

let SUB = function () {
    this.calculate = function (a, b) {
        return Number.parseFloat(a) - Number.parseFloat(b);
    }

    this.toString = function () {
        return `Subtração Stratategy: `
    }
}

function strategySetter(operacao) {
    let calculate = new Calculadora();
    if (operacao === "x") {
        calculate.setStrategy(new MULT());
    } else if (operacao === "%") {
        calculate.setStrategy(new DIVISION());
    } else if (operacao === "+") {
        calculate.setStrategy(new PLUS());
    } else if (operacao === "-") {
        calculate.setStrategy(new SUB());
    } else {
        throw Error;
    }
    return calculate;
}

document.querySelector(".holder").addEventListener("click", function (event) {
    //console.log(`${event.target.innerText}`);
    ApontarValorParaOVisor(event.target.innerText)
}, false);

function debugRunner() {
    /*

    let calculate = new Calculadora();

    let op = new DIVISION();
    calculate.setStrategy(op);
    console.log("Operacao Strategy: " + calculate.calculate(4, 5));
    parseador('85-85-85', '-');
    */
}
debugRunner()
