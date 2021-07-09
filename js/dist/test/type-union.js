"use strict";
// Unions provide a way to handle different types too
function getLength(obj) {
    obj = wrapInArray(obj);
    return obj.length;
}
/**
 * <タイプ判定>
 *  string     typeof s === "string"
 *  number     typeof n === "number"
 *  boolean    typeof b === "boolean"
 *  undefined  typeof undefined === "undefined"
 *  function   typeof f === "function"
 *  array      Array.isArray(a)
 */
function wrapInArray(obj) {
    if (typeof obj === "string") {
        return [obj];
        // ^ = (parameter) obj: string
    }
    else {
        return obj;
    }
}
const hoge = true;
const fuga = 'open';
console.log('hoge', hoge);
console.log('fuga', fuga);
console.log('getLength', getLength(['Hoge', 'Fuga']));
//# sourceMappingURL=type-union.js.map