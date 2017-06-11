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

network["Discover"] = {};
network["Discover"].prefix = ['6011', '644', '645', '646', '647', '648', '649', '65']
network["Discover"].length = [16, 19]

network["Maestro"] = {};
network["Maestro"].prefix = ['5018', '5020', '5038', '6304']
network["Maestro"].length = [12, 13, 14, 15, 16, 17, 18, 19]

network["Switch"] = {};
network["Switch"].prefix = ['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759']
network["Switch"].length = [16, 18, 19]

// 622126-622925, 624-626, or 6282-6288
network["China UnionPay"] = {};
network["China UnionPay"].prefix = [[622126, 622925], [624, 626], [6282, 6288]]
network["China UnionPay"].length = [16, 17, 18, 19]


var detectNetwork = function(cardNumber) {
  let len = cardNumber.length;
  let isSwitchLen = (len === 16 ? true : len === 18 ? true : len === 19 ? true : false);
  // edge case for Switch
  if (cardNumber.startsWith('49') && isSwitchLen) {
    if (network["Switch"].prefix.includes(cardNumber.slice(0, 4))) {
      return 'Switch';
    }
  }
  // network["China UnionPay"].prefix = [[622126, 622925], [624, 626], [6282, 6288]]
  // network["China UnionPay"].length = [16, 17, 18, 19]
  for (let key in network) {
    let isKey = network[key].prefix.some(function(pref) {
      if (!Array.isArray(pref)) {
        return network[key].length.includes(len) && cardNumber.startsWith(pref);
      } else {
        // to handle china union pay
        var prefixLength = String(pref[0]).length;
        var cardPrefix = cardNumber.slice(0, prefixLength);
        var cardPrefixToNum = Number(cardPrefix);
        var doesPrefixMatch = cardPrefixToNum >= pref[0] && cardPrefixToNum <=pref[1]

        // console.log('cardNumber', cardNumber, cardNumber.length);
        // console.log('network[key].length.includes(len)', network[key].length.includes(len), len);
        // console.log('doesPrefixMatch', doesPrefixMatch);
        return doesPrefixMatch && network[key].length.includes(len);
      }
    })

    if (isKey) return key;
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


// STEP FOUR:
// Excellent work! Write your own tests and make them pass for the last two networks:
//
// China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
// Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
//
// Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with the longer prefix.
//
// When detectNetwork returns the correct network for every prefix and length combination for Diner's Club, American Express, Visa, MasterCard, Discover, Maestro, China UnionPay, and Switch you can invoke nextStep:
