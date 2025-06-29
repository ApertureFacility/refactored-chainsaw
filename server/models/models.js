const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING,unique: true,allowNull: false,validate: {isEmail: true}},      
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartItem = sequelize.define('cart_Item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER,allowNull: false,defaultValue: 1,validate: {min: 1}}
      
})

const Item = sequelize.define('Item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    stock_quantity: {type: DataTypes.INTEGER,allowNull: false,defaultValue: 0,validate: {min: 0}},
    discount_price: {type: DataTypes.DECIMAL(10, 2),allowNull: true,validate: {min: 0}},
    description: { type: DataTypes.TEXT, allowNull: true }
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER,allowNull: false,validate: {min: 1,max: 5}}
})

const ItemInfo = sequelize.define('Item_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

Type.hasMany(Item)
Item.belongsTo(Type)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(CartItem)
CartItem.belongsTo(Item)

Item.hasMany(ItemInfo, { as: 'info', foreignKey: 'ItemId' });


ItemInfo.belongsTo(Item, { foreignKey: 'ItemId' });


Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Cart,
    CartItem,
    Item,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ItemInfo
}




