# What is the output of the following snippet

```
function myFunction(person) {
  const person2 = person;
  person2.id = 4;
  person2.name = 'Jawwad';
  return person;
}

const newCandidate = {
  id: 5,
  name: 'Tayeba'
};

myFunction(newCandidate);

console.log(newCandidate);
```

The output is: { id: 4, name: 'Jawwad' }
Explanation:
- When myFunction(newCandidate) is called, 'person2' is created referencing the same object as 'newCandidate' object outside of the function. By calling the function, the id of 'person2' is set to '4' and the 'name' property is set to 'Jawwad'. Because 'person2' and 'newCandidate' are referencing the same object, 'newCandidate''s id is '4' and name is 'Jawwad' after calling the function.
