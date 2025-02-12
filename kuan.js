function generatePassword(length) {
    let symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';

    let result = "";
    for (let i = 0; i < length; i++) {
        result += symbols[Math.floor(Math.random() * symbols.length)];
    }

    return result;
}

console.log(generatePassword(16));