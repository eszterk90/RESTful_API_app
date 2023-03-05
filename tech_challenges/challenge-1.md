# What is the output of the following snippet

```
function outer(x) {
  return (y) => {
    return x + y;
  };
}

const outer1 = outer(1);
const outer2 = outer(2);

console.log(outer1(3)); // output: 4
console.log(outer2(4)); // output: 6
```

Explanation: The "outer" function takes one parameter (x) and returns a function that takes another parameter (y). When the inner function is called, it returns the sum of (x) and (y).
outer1(3) // output: 4
- outer1 is assigned with the result of calling outer(1)
- calling outer1(3) is like calling the inner function returned by outer(1) with the argument (3). This function takes the value from the outer function (1) and adds it to (3), so that the result of calling outer1(3) returns 4.
- the same process happens when outer2 is assigned with the result of calling outer(2), so that the output of calling outer2(4) is equal to 6.