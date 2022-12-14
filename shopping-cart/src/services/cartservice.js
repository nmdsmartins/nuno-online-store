var Cart = require('../entities/cart').Cart;
var Item = require('../entities/cart').Item;
var redis = require('redis');

var initRedis = function(){
    var client = redis.createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    return client;
}

class CartService {
    constructor(){
        this.client = initRedis();
    }

    async add(key, item, quantity, price){
        var value = await this.get(key);
        var cart = value != null ? Object.assign(new Cart(), value) : new Cart();

        cart.add(new Item(item, quantity, price));

        await this.client.connect();
        await this.client.set(key, JSON.stringify(cart));
        await this.client.disconnect();
    }

    async get(key){
        await this.client.connect();
        var result = await this.client.get(key);
        await this.client.disconnect();

        return JSON.parse(result);
    }

    async delete(key, item){
        var value = await this.get(key);

        if(value != null){
            var cart = Object.assign(new Cart(), value);
            
            cart.remove(item);
            
            await this.client.connect();
            if(cart.isEmpty()){
                await this.client.del(key);
                
            }else{
                await this.client.set(key, JSON.stringify(cart));
            }
            await this.client.disconnect();
        }       
    }
}

module.exports = CartService;