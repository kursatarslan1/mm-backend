const punctuations = /[.,;:?!\"()\-\—\/{}\[\]\\]/g; 
const number = /\d+'[a-zA-ZğüşöçıİĞÜŞÖÇ]+/g; // xxxx'den gibi ifadeleri kaldırmak için regex
module.exports = { punctuations, number };
