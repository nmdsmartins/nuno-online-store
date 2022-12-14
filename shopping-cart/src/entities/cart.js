class Cart {
    constructor(){
        this.items = []
    }

    add(item){
        this.items.push(item);
    }

    remove(item){
        var result = this.items.find(i => i.item == item);
        if(result != null){
            this.items.splice(this.items.indexOf(result), 1);
        }
    }

    isEmpty(){
        return this.items.length == 0;
    }
}

class Item{
    constructor(item, quantity, price){
        this.item = item;
        this.quantity = quantity;
        this.price = price;
    }
}

module.exports = {
    Cart,
    Item
};