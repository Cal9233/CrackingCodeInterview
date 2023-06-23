//Binary Search is an Algorithm used to find target value of a sorted list

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const binarySearch = (list, target, first = 0, last = list.length) => {

    //middle index of array
    let middle = Math.floor((first + last) / 2);

    //return target
    if(list[middle] === target) return middle;
    //target is before middle index so we use recursion to search updated array where middle index is set as last element
    if(list[middle] > target) return binarySearch(list, target, first, middle - 1);
    //opposite
    else return binarySearch(list, target, middle + 1, last);
};

//console.log(binarySearch(array, 6));