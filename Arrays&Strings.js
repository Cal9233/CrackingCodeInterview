//Hash Tables/Hash Map
//data structure that maps keys to values for efficient look up
//Does have risk of collision so you need to chain into linked lists to avoid that
//In javascript always use Map() for hash instead of Object{}, you can overwrite properties in an object which causes an error
//implementation:

const collection = new Map();

//Must you get() and set() methods in order to define and retrieve key:value pairs
collection.set("Cal", 26);
collection.set("Nicole", 24);

//console.log(collection.get("Cal"));
//The name is the key and the age is the pair, I am getting the key and console logging the value of that key which is age

//Can aso iterate through object
for(const [key, value] of collection){
    //console.log(`key: ${key}, value: ${value}`);
}

//Common coding interview question is to create a hash table through class, initial properties should always be size and table

class HashTable {
    constructor() {
        this.table = new Array(127);
        this.size = 0;
    }
    //Key:Value pairs will be stored in table property, up to 127 pairs. Current size of table is 0 so it's empty
    //In order to store we need to create a hash method
    //Hash method accepts the key:value pair and transforms it into a index which is stored in the table
    // _ indicates that it is a private method
    //need to use charCodeAt method, returns unicode value of specified index location
    //since HashTable only has 127 buckets we must ensure that hash method only returns index from 0 - 127, use modulo for this
    _hash(key) {
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    }
    //now we must rewrite set and get methods
    //make sure to add two arrays in set method to avoid collision of indexes
    set(key, value){
        //uses hash method to transform key:value pair to index
        const index = this._hash(key);
        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){
                //find the key value pair in the chain
                if(this.table[index][i][0] === key){
                    this.table[index][i][1] = value;
                    return;
                }
            }
            //not found than push to table
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [];
            this.table[index].push([key, value]);
        }
        //now increment table size
        this.size++;
    }
    get(key){
        //key is not the index in the table, so we must use hash method to transform it to an index
        const index = this._hash(key);
        //check if multiple exist in table
        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    return this.table[index][i][1]
                }
            }
        } else return undefined;
    }
    remove(key){
        const index = this._hash(key);
        if(this.table[index] && this.table[index].length){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    this.table[index].splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        } else return false;
    }
    display(){
        this.table.forEach((values, indexes) => {
            const chainedValues = values.map(([key, value]) => `[${key}, ${value}]`);
            console.log(`${indexes}: ${chainedValues}`);
        })
    }
}


const table = new HashTable();
table.set("testing 1", 1);
table.set("testing 2", 2);
table.set("testing 3", 3);
table.set("testing 4", 4);
table.remove("testing 3");
//table.display();

// Assignment: Phone Book
// Description: Create a phone book using a hash table. 
//Implement functions to add contacts, search for a contact by name, update contact details, and delete a contact.
// Requirements:
// The hash table should use the contact's name as the key and store the contact's details as the value.
// Implement the following functions:
// addContact(name, phoneNumber): Adds a new contact to the phone book.
// searchContact(name): Searches for a contact by name and returns the contact's details.
// updateContact(name, newPhoneNumber): Updates the phone number of an existing contact.
// deleteContact(name): Deletes a contact from the phone book.

class PhoneBook {
    constructor(){
        this.table = new Array(200);
        this.size = 0;
    };
    _hash(key){
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    };
    addContact(name, number){
        const index = this._hash(name);
        const table = this.table;
        if(table[index]){
            for(let i = 0; table[index].length; i++){
                if(table[index][i][0] === name){
                    table[index][i][1] = number;
                    return;
                }
                table[index].push([name, number]);
            }
        } else {
            table[index] = [];
            table[index].push([name, number]);
        }
        this.size++;
    };
    searchContact(name){
        const index = this._hash(name);
        const table = this.table;
        if(table[index]){
            for(let i = 0; i < table[index].length; i++){
                if(table[index][i][0]){
                    return table[index][i][1];
                }
            }
        } else return undefined;
    };
    updateContact(name, newPhoneNumber){
        const index = this._hash(name);
        const table = this.table;
        if(table[index]){
            for(let i = 0; i < table[index].length; i++){
                if(table[index][i][0] === name){
                    table[index][i][1] = newPhoneNumber; 
                }
            }
        } else return undefined;
    };
    deleteContact(name){
        const index = this._hash(name);
        const table = this.table;
        if(table[index] && table[index].length){
            for(let i = 0; i < table.length; i++){
                if(table[index][i][0] === name){
                    table[index].splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        } else return false
    }
    display(){
        const table = this.table
        table.forEach((values, indexes) => {
            const chainedValues = values.map(([key, values]) => `[${key}, ${values}]`);
            console.log(`${indexes}: ${chainedValues}`)
        });
    }
}

let pb = new PhoneBook();
pb.addContact('Cal', 305305305);
pb.addContact('Susan', 907907907);
pb.addContact('John', 201201201);
pb.addContact('Alinee', 786786786);
pb.updateContact('Cal', 205205205);
pb.deleteContact('Susan');
//pb.display();



// Assignment: Word Frequency Counter
// Description: Implement a word frequency counter using a hash table. 
//Create a function that takes a string as input and returns a hash table containing each unique word and its frequency.
// Requirements:
// The hash table should use the word as the key and store the frequency as the value.
// Ignore case sensitivity and punctuation while counting word frequencies.
// Implement the following function:
// countWordFrequency(text): Takes a string text as input and returns a hash table with word frequencies.






class WordCounter {
    constructor() {
        this.table = new Array(200);
        this.size = 0;
    }
}

















// Assignment: Cache Implementation
// Description: Implement a cache using a hash table to store key-value pairs. 
//The cache should have a maximum capacity, and if the cache exceeds the capacity, the least recently used item should be evicted.
// Requirements:
// The hash table should use the key as the hash key and store the corresponding value.
// Implement the following functions:
// get(key): Retrieves the value associated with the given key from the cache. If the key is not found, return null.
// put(key, value): Inserts a new key-value pair into the cache. If the cache exceeds its capacity, evict the least recently used item before inserting the new pair.

class CacheHash {
    constructor(){
        this.table = new Array(5);
        this.size = 0;
    }
    _hash(key){
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    };
    get(key) {
        const index = this._hash(key);
        const table = this.table;
        if (table[index]) {
            for (let i = 0; i < table[index].length; i++) {
                if (table[index][i] && table[index][i][0] === key) {
                    return table[index][i][1];
                }
            }
        }
        return null;
    };
    put(key, value){
        const index = this._hash(key);
        const table = this.table;
        if(this.size === 5) table.shift();
        if(table[index]){
            for(let i = 0; i < table[index].length; i++){
                if(table[index][i][0] && table[index][i][0] === key){
                    table[index][i][1] = value;
                    return;
                }
                table[index].push([key, value]);
            }
        } else {
            table[index] = [];
            table[index].push([key, value]);
        }
        this.size++;
    };
    display(){
        this.table.forEach((values, indexes) => {
            const chainedValues = values.map(([key, value]) => `[${key}, ${value}]`);
            console.log(`${indexes}: ${chainedValues}`);
        });
    }
};

const c = new CacheHash();
c.put("Cache 1", 1);
c.put("Cache 2", 2);
c.put("Cache 3", 3);
//c.get("Cache 1");
c.put("Cache 4", 4);
c.put("Cache 5", 5);
c.put("Cache 6", 6);
console.log(c.get("Cache 1"));
console.log(c.get("Cache 2"));
console.log(c.get("Cache 3"));
console.log(c.get("Cache 4"));
console.log(c.get("Cache 5"));
console.log(c.get("Cache 6"));
c.display();