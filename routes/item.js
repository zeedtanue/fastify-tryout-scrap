const {getItems, getItem, addItem, deleteItem, updateItem} = require('../controllers/items')

//item Schema
const Item= {
    type:'object',
    properties:{
        id:{type:'string'},
        name:{type:'string'}
    }
}



//Options for all get items
const getItemsOpts = {
    schema:{
        response:{
            200:{
                type:'array',
                items:Item
            }
        }
    },
    handler: getItems
}

const getItemsSingularOpts= {
    schema:{
        200:Item
    },
    handler: getItem
}


const deleteOpts={
    schema:{
        response:{
            200:{
                type:'object',
                properties:{
                    message: {type:'string'}
                }
            }
        }
    },
    handler: deleteItem
}


const postItemsOpts= {
    schema:{
        body:{
            type:'object',
            required:['name'],
            properties:{
                name:{type:'string'}
            }
        },
        201:Item
    },
    handler: addItem
}

const updateOpts={
    schema:{
        200:Item
    },
    handler: updateItem
}



function itemRoutes(fastify, options, done){
    fastify.get('/items', getItemsOpts )
    
    fastify.get('/items/:id', getItemsSingularOpts)
    //add item
    fastify.post('/items',postItemsOpts)
    //delete item
    fastify.delete('/items/:id', deleteOpts)
    //update
    fastify.put('/items/:id',updateOpts)
    done()
}

module.exports= itemRoutes