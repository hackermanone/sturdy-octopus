// What is a decorator?
// A decorator is just a function that allows you to hook into your source code to allow for extension (alter the behaviour)
// should be reserved for logic that is stable

// Can be used for 
// - class definitions
// - properties
// - methods
// - accessors
// - parameters

// class
export function Frozen(constructor: Function) {
    console.log(constructor.toString());
}

// property
export function hehe() {
    return function(target: Object, key: string | symbol) {
        let prop;

        const getter = () => {
            return prop;
        }

        const setter = (next) => {
            prop = `changed ${next}`;
            console.log('setted', prop)
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
export function WithTax(rate: number) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        console.log('target',target);
        console.log('key', key);
        console.log('descriptor', descriptor.get);
    }
}
