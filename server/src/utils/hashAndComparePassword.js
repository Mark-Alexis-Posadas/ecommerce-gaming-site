
// const bcrypt = require('bcrypt');

const salt = 'EcommerceGaming';


const hashPassword = (password) => {
    return btoa(password+salt);
}

const comparePassword = (password, hashed) => {
    // const hashedInput = hashPassword(password);
    // return hashedInput === hashed;
    // return btoa.compare(password, hashed)
    return btoa(password + salt) === hashed;
}


// const hashedPassword = hashPassword(password);
// console.log('Original password:', password);
// console.log('Hashed password:', hashedPassword);

// //test comparison
// const isMatch = comparePassword(password, hashedPassword);
// console.log('Password match:', isMatch);

// //test with wrong password
// const wrongPassword = 'wrongpass';
// const isWrongMatch = comparePassword(wrongPassword, hashedPassword);
// console.log('Wrong password match:', isWrongMatch);

// if (isMatch) {
//     console.log('Password comparison: MATCH - Access granted');
// } else {
//     console.log('Password comparison: NO MATCH - Access denied');
// }

// if (isWrongMatch) {
//     console.log('Wrong password comparison: MATCH - Access granted');
// } else {
//     console.log('Wrong password comparison: NO MATCH - Access denied');
// }

// console.log(hashPassword('Greendee'))
module.exports = {
    hashPassword,
    comparePassword
}