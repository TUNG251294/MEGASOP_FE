import { LocalStorage } from "quasar";

export const ADD_TO_WAREHOUSE = (state, { product }) => {
    let warehouseItems = state.warehouseImportTicketItems.find(item => {
        return item.product.productVariationId == product.productVariationId;
    });

    if (warehouseItems) {
        warehouseItems.product.amount = parseInt(warehouseItems.product.amount) + parseInt(product.amount);
        LocalStorage.set("warehouseImportTicketItems", state.warehouseImportTicketItems);
        return;
    }

    state.warehouseImportTicketItems.push({
        product
    })

    LocalStorage.set("warehouseImportTicketItems", state.warehouseImportTicketItems);

}

export const SET_WAREHOUSE = (state, cartItems) => {
    state.warehouseImportTicketItems = cartItems;
}

export const REMOVE_ITEM = (state, { product }) => {
    state.warehouseImportTicketItems = state.warehouseImportTicketItems.filter(item => {
        return item.product.productVariationId != product.productVariationId;
    });

    LocalStorage.set("warehouseImportTicketItems", state.warehouseImportTicketItems);
}

export const UPDATE_AMOUNT_ITEM = (state, { product }) => {
    let warehouseItems = state.warehouseImportTicketItems.find(item => {
        return item.product.productVariationId == product.productVariationId;
    });

    if (warehouseItems) {
        warehouseItems.product.amount = parseInt(product.amount);
        LocalStorage.set("warehouseImportTicketItems", state.warehouseImportTicketItems);
        return;
    }
}

export const RESET_WAREHOUSE = (state) => {
    state.warehouseImportTicketItems = [];
    LocalStorage.set("warehouseImportTicketItems", state.warehouseImportTicketItems);
}