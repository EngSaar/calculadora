let operators = ['x', '/', '+', '-', '='];

function ApontarValorParaOVisor(valor) {
    if (valor.length == 1) {
        if (valor === "C") {
            const el = document.querySelector(".visor");
            el.innerText = "0";
        } else {
            concat(valor);
        }
    }
}

function concat(concatable) {
    const el = document.querySelector(".visor")
    if (el.innerText === "0") {
        el.innerText = concatable;
    } else {
        el.innerText = el.innerText + concatable;
    }
}

function orquestrador() {
    const el = document.querySelector(".visor");
    let value = el.innerText;

    parseador(value, 'x')
}

function parseador(value, operacao) {
    //let array = value.split(operacao)

    let head1 = 0;
    let tail1 = 0;
    let head2 = 0;
    let tail2 = 0;
    let substring = "";
    let substring2 = "";
    let result

    let calculate = new Calculadora();
    if (operacao === "x") {
        calculate.setStrategy(new MULT());
    } else if (operacao === "%") {
        //TODO: criar a estrategia de divisao
    } else if (operacao === "+") {
        //TODO: criar a estrategia de soma
    } else if (operacao === "-") {
        //TODO: criar a estrategia de subtração
    } else {
        throw Error;
    }

    for (let i = 0; i < value.length; i++) {


        if (value[i] === operacao) {


            tail1 = i - 1;
            for (let k = i; k >= 0; k--) {
                head1 = k;
                if (operators.includes(value[k - 1])) {
                    ++tail1;
                    break;
                }
            }
            if (head1 === tail1) {
                substring = value[i - 1];
            } else {
                substring = value.slice(head1, tail1 + 1)
            }


            head2 = i + 1;
            for (let k = i; k < value.length; k++) {

                tail2 = k + 1;
                if (operators.includes(value[k + 1])) {
                    --tail2;
                    break;
                }
            }
            if (head2 === tail2) {
                substring2 = value[i + 1];
            } else {
                substring2 = value.slice(head2, tail2 + 1)
            }
        }
    }

    console.log(calculate.strategy.toString() + calculate.calculate(substring, substring2));
    result = calculate.calculate(substring, substring2);
    console.log(substring, head1, tail1, substring2, head2, tail2, result, value);

    console.log(value.replaceAt(head1, tail2, String(result)));

}

String.prototype.replaceAt = function (startIndex, endIndex, replacement) {
    return this.substring(0, startIndex) + replacement + this.substring(endIndex);
}


function plus(a, b) {
    return a + b;
}

function div(a, b) {
    if (b == 0) {
        throw Error;
    }
    return a / b;
}

function sub(a, b) {
    return a - b;
}

document.querySelector(".holder").addEventListener("click", function (event) {
    console.log(`${event.target.innerText}`);
    ApontarValorParaOVisor(event.target.innerText)
}, false);


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
        return Number.parseInt(a) * Number.parseInt(b);
    }

    this.toString = function () {
        return `Multiplicacao Stratategy: `
    }
}

function debugRunner() {

    let calculate = new Calculadora();

    let mult = new MULT()
    calculate.setStrategy(mult);
    console.log("MULTIPLICACAO Strategy: " + calculate.calculate(4, 5));

}
debugRunner()
