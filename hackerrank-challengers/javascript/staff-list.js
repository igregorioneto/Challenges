'use strict';
class StaffList {
    //add your code here
    arr = [];

    add(name, age) {
        if (age <= 20) {
            throw new Error('Staff member age must be greater than 20');
        }
        this.arr.push({ name, age });
    }

    remove(name) {
        const indexStaff = this.arr.findIndex((person) => person.name === name);
        if (indexStaff !== -1) {
            this.arr.splice(indexStaff, 1);
            return true;
        }
        return false;
    }

    getSize() {
        return this.arr.length;
    }
}

const obj = new StaffList();
obj.add("João", 25);
obj.add("Fernanda", 23);
console.log(obj.getSize());
console.log(obj.remove("Fernanda"));
console.log(obj.getSize());