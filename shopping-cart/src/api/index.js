'use strict';

const express = require('express');
const router = express.Router();
const CartService = require('../services/cartservice');
/**
 * @openapi
 * /:
 *    health:
 *      summary: Health check of this service
 *      operationId: Health-Check
 *      tags: []
 *      responses:
 *        200:
 *          description: The service is healthy
 *        500:
 *          description: The service is unhealthy
 */
router.get('/health', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

/**
* @openapi
* /:
*    add:
*      summary: Adds a new item to the shopping cart
*      operationId: Add to Cart
*      tags: [ Item, Cart ]
*      responses:
        200:
          description: The item was successfuly added
        500:
          description: It was not possible to add the item to the shopping cart
*/
router.post('/add', async (req, res) => {
  var cart = new CartService();
  
  await cart.add(req.body.key, req.body.item, req.body.quantity, req.body.price);

  return res.json({
    "result": "ok"
  })
});

/**
* @openapi
* /:
*    get:
*      summary: Gets the current user's shopping cart
*      operationId: Get Shopping Cart
*      tags: [ Cart ]
*      responses:
        200:
          description: The cart was successfuly fetched
*/
router.get('/get', async (req, res) => {
  return res.json({
    cart: await new CartService().get(req.query.key)
  })
});

/**
* @openapi
* /:
*    delete:
*      summary: Removes an item from the user's shopping cart
*      operationId: Remove from Cart
*      tags: [ Item, Cart ]
*      responses:
        200:
          description: The item was successfuly removed
*/
router.delete('/delete', async (req, res) => {
  await new CartService().delete(req.body.key, req.body.item);

  return res.json({
    "result": "ok"
  });
});

module.exports = router;
