const { ProductDataBuilder } = require('./productDataBuilder');

class ProductMotherObject {
    static valid() {
        return ProductDataBuilder.newProduct().build()
    }

    static withInvalidId() {
        return ProductDataBuilder.newProduct().withInvalidId().build()
    }

    static withInvalidName() {
        return ProductDataBuilder.newProduct().withInvalidName().build()
    }

    static withInvalidPrice() {
        return ProductDataBuilder.newProduct().withInvalidPrice().build()
    }

    static withInvalidCategory() {
        return ProductDataBuilder.newProduct().withInvalidCategory().build()
    }
}

module.exports = { ProductMotherObject };