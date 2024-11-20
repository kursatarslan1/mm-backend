const punctuations = /[.,;:?!"'()\-\—\/{}\[\]\\]/g; 
const number = /\d+['’][a-zA-ZğüşöçıİĞÜŞÖÇ]+/g;
const numbers = /\d+/g;
module.exports = { punctuations, number, numbers };
