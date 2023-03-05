# Practical Datastructure

- Design a datastructure to allow capturing all updates/delete on all tables with a generic implementation.
- It should be able to store (at minimum)
	- the previous value of a record
	- the new value of a record
	- timestamp(s)
	- (any additional information that might help for easy access/query)

Bonus question:
 - Also be able to tell if a record was deleted. 


## E.g Database:


```
// User Model

{
    id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
}
```


```
// Analysis Model

{
    id: { type: String },
    user_id: { type: String },
    scoreParts: {
      type: Object,
      health: { type: Number, default: null },
      mood: { type: Number, default: null },
      medicines: { type: Number, default: null },
    },
}
```
## Solution

First I would define a schema for log entries:

````
const mongoose = require('mongoose);
const Schema = mongoose.Schema;

const logSchema = new Schema({
  table_name: {type: String, required: true},
  record_id: {type: String, required: true},
  previous_value: {type: mongoose.Schema.Types.Mixed},
  new_value: {type: mongoose.Schema.Types.Mixed},
  timestamp: {type: Date, default: Date.now},
  additional_info: {type: String}
});

const Log = mongoose.model('Log', logSchema);
````

After that, I would create a function to log updates and deletes for a generic table:

````
const logUpdateDelete = async(table_name, record_id, previous_value, new_value, additional_info) {
  const logEntry = new Log({
    table_name,
    record_id,
    previous_value,
    new_value,
    additional_info
  });
  await logEntry.save();
}
````

To log an update to the users table and create a new entry in the "Log" collection, call logUpdateDelete() function and pass the table name, record ID, previous value, new value and additional information as arguments, like in the example below:
````
logUpdateDelete('users', 1, 'Eszter', 'Barka', 'Update name');
````

I would create a function 'getUpdates' to get all updates and deletes for a given table sorted by timestamps in descending order.

````
const getUpdates = async(table_name, record_id) {
  const updates = await Log.find({
    table_name,
    record_id
  }).sort({timestamp: -1});
  return updates;
}
````
