let operators = ['x', '%', '+', '-', '='];
let keyboardOperators = ['*', '/', '+', '-', '='];

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
    } else if (valor.length == 2) {
        if (el.innerText.length > 1) {
            el.innerText = el.innerText.substring(0, el.innerText.length - 1)
        } else {
            el.innerText = "0";
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
        for (let i = value.length - 1; i >= 0; i--) {
            if (value[i] === "-") {
                if (i > 0 && value[i - 1] === "-") {
                    value = value.substring(0, i - 1) + value.substring(i);
                    ++i;
                }
                if (i == 0 && String(value).split("-").length === 2) {
                    let isFinnish = true;
                    for (let entity in operators) {
                        if (entity != "3") {
                            if (String(value).includes(operators[entity])) {
                                isFinnish = false;
                            }
                        }
                    }
                    if (isFinnish) {
                        return value;
                    }
                }
            }
        }

        hasOperated = false;
        if (!hasOperated && String(value).includes('%')) {
            value = parseador(value, '%');
            hasOperated = true;
        }

        if (!hasOperated && String(value).includes('x')) {
            value = parseador(value, 'x');
            hasOperated = true;
        }

        if (!hasOperated && String(value).includes('+')) {
            value = parseador(value, '+');
            hasOperated = true;
        }

        if (!hasOperated && String(value).includes('-')) {
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
    } else {
        result = calculate.calculate(substring, substring2);
    }

    return String(value).replaceAt(head1, tail2, result);

    function FindB(i) {
        head2 = i + 1;
        for (let k = i; k < value.length; k++) {

            tail2 = k;
            if (operators.includes(value[k + 1])) {
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
    return this.substring(0, startIndex) + replacement + this.substring(endIndex + 1);
}

class Calculadora {
    constructor() {
        this.strategy = "";
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    calculate(a, b) {
        return this.strategy.calculate(a, b);
    }
}


class MULT {
    constructor() {
        this.calculate = function (a, b) {
            ({ a, b } = hateNan(a, b));
            return Number.parseFloat(a) * Number.parseFloat(b);
        };

        this.toString = function () {
            return `Multiplicacao Stratategy: `;
        };
    }
}

class DIVISION {
    constructor() {
        this.calculate = function (a, b) {
            ({ a, b } = hateNan(a, b));
            if (b == 0) {
                throw Error;
            }
            return (Number.parseFloat(a) / Number.parseFloat(b)).toFixed(2);
        };

        this.toString = function () {
            return `Divisão Stratategy: `;
        };
    }
}

class PLUS {
    constructor() {
        this.calculate = function (a, b) {
            ({ a, b } = hateNan(a, b));
            return Number.parseFloat(a) + Number.parseFloat(b);
        };

        this.toString = function () {
            return `Soma Stratategy: `;
        };
    }
}

class SUB {
    constructor() {
        this.calculate = function (a, b) {
            ({ a, b } = hateNan(a, b));
            return Number.parseFloat(a) - Number.parseFloat(b);
        };

        this.toString = function () {
            return `Subtração Stratategy: `;
        };
    }
}

function hateNan(a, b) {
    if (Number.isNaN(Number.parseFloat(a)))
        a = 0;
    if (Number.isNaN(Number.parseFloat(b)))
        b = 0;
    return { a, b };
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
    ApontarValorParaOVisor(event.target.innerText)
}, false);

let element = document.body;
element.addEventListener('keydown', event => {
    console.log(`${event.key}`)
    for (let entity in keyboardOperators) {
        if (String(event.key).includes(keyboardOperators[entity])) {
            if (keyboardOperators[entity] === "*") {
                ApontarValorParaOVisor("x")
            } else if (keyboardOperators[entity] === "/") {
                ApontarValorParaOVisor("%")
            } else {
                ApontarValorParaOVisor(event.key)
            }
        }
    }
    if (!Number.isNaN(Number.parseInt(event.key))) {
        ApontarValorParaOVisor(event.key);
    } else if (event.key == 'Enter') {
        el.innerText = orquestrador();
    } else if (event.key == "Backspace") {
        if (el.innerText.length > 1) {
            el.innerText = el.innerText.substring(0, el.innerText.length - 1)
        } else {
            el.innerText = "0";
        }
    }
}, false);
