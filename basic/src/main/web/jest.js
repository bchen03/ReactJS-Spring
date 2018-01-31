// Function for Jest testing (w/o React)
function sum(a, b) {
    return a + b;
}

const sum_curried = a => b => a + b;

module.exports = { sum: sum, sum_curried: sum_curried };

