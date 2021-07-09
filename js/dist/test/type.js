"use strict";
/**
 * Boolean
 */
let isDone = false;
console.log('Boolean', isDone);
/**
 * Number
 */
let decimal = 6; // 浮動小数点数
let hex = 0xf00d; // 16進数
let binary = 0b1010; // 2進数
let octal = 0o744; // 8進数
console.log('Number', decimal, hex, binary, octal);
/**
 * String
 */
let blue = "blue"; // 文字列（ダブルクオート））
let red = 'red'; // 文字列（シングルクオート
let fullName = `Bob Bobbington`;
let age = 37;
let sentence = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`; // 埋め込み式
console.log('String', blue, red, sentence);
/**
 * Array
 */
let listA = [1, 2, 3];
let listB = [1, 2, 3];
console.log('Array', listA, listB);
/**
 * Tuple
 */
let ok = ["hello", 10]; // タプル（OK）
// let ng: [string, number] = [10, "hello"]; // タプル（NG）
console.log('Tuple', ok);
/**
 * Enum
 */
var ColorA;
(function (ColorA) {
    ColorA["Red"] = "#ff0000";
    ColorA["Green"] = "#00ff00";
    ColorA["Blue"] = "#0000ff";
})(ColorA || (ColorA = {})); // 全指定
var ColorB;
(function (ColorB) {
    ColorB[ColorB["Red"] = 0] = "Red";
    ColorB[ColorB["Green"] = 1] = "Green";
    ColorB[ColorB["Blue"] = 2] = "Blue";
})(ColorB || (ColorB = {})); // 未指定 = 0番目が`0`となり、以降インクリメントされる
var ColorC;
(function (ColorC) {
    ColorC[ColorC["Red"] = 1] = "Red";
    ColorC[ColorC["Green"] = 2] = "Green";
    ColorC[ColorC["Blue"] = 3] = "Blue";
})(ColorC || (ColorC = {})); // 0番目だけを指定 = 0番目の値からインクリメントされる
let color = ColorB.Green;
console.log('Enum', color);
/**
 * Any
 */
let notSure = 4; // 始めは数値
console.log('Any:number', notSure);
notSure = "maybe a string instead"; // 文字列を代入可能
console.log('Any:string', notSure);
notSure = false; // ブール値を代入可能
console.log('Any:boolean', notSure);
// コンパイラはチェックしなため通る
// let notSure2: any = 4;
// notSure2.hoge();
// コンパイルエラー
// let prettySure: Object = 4;
// prettySure.hoge();
/**
 * Void
 */
function warnUser() {
    console.log("This is my warning message");
}
let unusable = undefined; // undefined のみ代入可能
console.log('void', unusable, warnUser());
/**
 * Null と Undefined
 * ※ 全ての型のサブタイプとなっているため、number型の変数に null をセットすることができる
 */
let u = undefined; // それぞれの型が用意されている
let n = null; // それぞれの型が用意されている
// let no: number = null;     // 他の型に代入できる (tsconfig.json - strict: false)
console.log(u, n);
/**
 * Never
 * ※ 決して発生しない値 を表現します
 *   例) 必ず例外が発生するような関数の戻り値などに利用します
 */
function error(message) {
    throw new Error(message);
}
/**
 * Object
 */
function create(o) {
    console.log('Object', `created: ${o}`);
}
create({ prop: 0 }); // OK
create(null); // OK
// create(42);          // Error
// create("string");    // Error
// create(false);       // Error
// create(undefined);   // Error (--strictNullChecks オプションが有効な場合のみ)
/**
 * 型アサーション (型変換 => cast)
 * ※ JSXを利用する場合、`<変換したい型>値`はJSXの記法と競合する
 */
let someValue = "this is a string";
let strLength1 = someValue.length;
let strLength2 = someValue.length;
console.log('cast', someValue, strLength1, strLength2);
//# sourceMappingURL=type.js.map