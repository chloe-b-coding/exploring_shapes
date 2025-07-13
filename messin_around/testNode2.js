let x0 = 1;
let x1 = 1;
let x = 0;

console.log("Fibonacci numbers");
process.stdout.write(`${x0} ${x1} `);

while (x < 100) {
  x = x0 + x1;
  process.stdout.write(`${x} `);
  x0 = x1;
  x1 = x;
}

console.log("");