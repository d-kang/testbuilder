// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

const network = {}
network["Diner's Club"] = {};
network["Diner's Club"].prefix = ['38', '39'];
network["Diner's Club"].length = [14];

network["American Express"] = {};
network["American Express"].prefix = ['34', '37'];
network["American Express"].length = [15];

network["Visa"] = {};
network["Visa"].prefix = ['4'];
network["Visa"].length = [13, 16, 19];

network["MasterCard"] = {};
network["MasterCard"].prefix = ['51', '52', '53', '54', '55' ];
network["MasterCard"].length = [16];



var detectNetwork = function(cardNumber) {
  let len = cardNumber.length;
  for (let key in network) {
    let prefix = cardNumber.slice(0, network[key].prefix[0].length)

    if (network[key].prefix.includes(prefix) && network[key].length.includes(len)) {
      return key;
    }
  }
};


console.log(detectNetwork('38345678901234')); // (Diner's Club)
console.log(detectNetwork('39345678901234')); // (Diner's Club)
console.log(detectNetwork('343456789012345')); // (American Express)
console.log(detectNetwork('373456789012345')); // (American Express)
console.log(detectNetwork('4123456789012')); // (Visa)
console.log(detectNetwork('4123456789012345')); // (Visa)
console.log(detectNetwork('4123456789012345678')); // (Visa)
console.log(detectNetwork('5112345678901234')); // (MasterCard)
console.log(detectNetwork('5212345678901234')); // (MasterCard)
console.log(detectNetwork('5312345678901234')); // (MasterCard)
console.log(detectNetwork('5412345678901234')); // (MasterCard)
console.log(detectNetwork('5512345678901234')); // (MasterCard)
