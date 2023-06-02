//Hash Tables/Hash Map
//data structure that maps keys to values for efficient look up
//Does have risk of collision so you need to chain into linked lists to avoid that
//In javascript always use Map() for hash instead of Object{}, you can overwrite properties in an object which causes an error
//implementation:

const collection = new Map();

//Must you get() and set() methods in order to define and retrieve key:value pairs
collection.set("Cal", 26);
collection.set("Nicole", 24);

console.log(collection.get("Cal"));
//The name is the key and the age is the pair, I am getting the key and console logging the value of that key which is age

//Can aso iterate through object
for(const [key, value] of collection){
    console.log(`key: ${key}, value: ${value}`);
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
            const chainedValues = values.map(([key, values]) => `[${key}, ${values}]`);
            console.log(`${indexes}: ${chainedValues}`);
        })
    }
}


const table = new HashTable();
table.set("testing 1", 1);
table.set("testing 2", 2);
table.set("testing 3", 3);
table.set("testing 4", 4);
table.display();