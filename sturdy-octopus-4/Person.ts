
import * as fun from './index';

class Person {
    @fun.hehe()
    _name: string = 'hahahahah';
    _balance: number;

    constructor(name: string, balance: number) {
        this._name = name;
        this._balance = balance;
    }

    @fun.WithTax(0.15)
    get balance() {
        return this._balance;
    }

    set balance(value: number) {
        if (value < 0) {
            throw new Error("No such thing as negative balance :)")
        }
        this._balance = value;
    }
}

let a = new Person("Ricky", 100);
console.log(a._name);
