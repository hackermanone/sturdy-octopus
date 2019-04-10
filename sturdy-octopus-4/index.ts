// What is a decorator?
// A decorator is just a function that allows you to hook into your source code to allow for extension (alter the behaviour)
// should be reserved for logic that is stable

// Can be used for 
// - class definitions
// - properties
// - methods  
// - accessors ^^ similar to method decorator 
// - parameters


// class
// Note : If the class decorator returns a value, it will replace the class declaration with the provided constructor function
export function Frozen(constructor: Function) {
    console.log(constructor.toString());
}

// property
export function hehe() {
    return function(target: Object, key: string | symbol) {
        let prop;
        console.log('hehe target', target);
        console.log('hehe key', key);

        const getter = () => {
            return prop;
        }

        const setter = (next) => {
            prop = `changed ${next}`;
        }

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        })
    }
}

// Accessor
// Note: If the Accessor decorator returns a value, it will be used as the property descriptor for the method
export function WithTax(rate: number) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.get;

        descriptor.get = function() {
            const result = original.apply(this);
            return (result * (1 + rate)).toFixed(2);
        }
        return descriptor;
    }
}




// Method
// Note: If the method decorator returns a value, it will be used as the property descriptor for the method
export function log(message: string) {
    /**
     * target: parent class
     * key: name of function
     * descriptor: function itself
     */
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function () {
            // call the original function
            console.log("OVERRIDDEN BOIIII");
        }
    }
}

// Parameter
export function required(target: Object, key: string, index: number) {
    console.log('fungi', target, '\nkey', key, '\nindex', index);
}