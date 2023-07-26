import { LocalStorage } from "quasar";

export const addProductToWarehouse = ({ commit }, { product }) => {
    let products = LocalStorage.getItem('warehouseImportTicketItems')
    if (products && products.length > 0) {
        const isFound = products.find(el => {
            if (el.product.productVariationId == product.productVariationId) 
                return true
            return false
        })
        if (!isFound && !products.includes(product)) commit('ADD_TO_WAREHOUSE', { product })
        else {
            let sum = parseInt(isFound.product.amount) + parseInt(product.amount)
            if (sum > product.totalTobeImport) product.amount = product.totalTobeImport
            else product.amount = sum
            commit('UPDATE_AMOUNT_ITEM', { product })
        }
    } else {
        commit('ADD_TO_WAREHOUSE', { product })
    }
}

export const getWarehouseImportTicketItems = ({ commit }) => {
    commit('SET_WAREHOUSE', LocalStorage.getItem("warehouseImportTicketItems") != null ? LocalStorage.getItem("warehouseImportTicketItems") : []);
}

export const removeItem = ({ commit }, { product }) => {
    commit('REMOVE_ITEM', { product });
}

export const updateAmountItem = ({ commit }, { product }) => {
    commit('UPDATE_AMOUNT_ITEM', { product });
}

export const resetWarehouse = ({ commit }) => {
    commit('RESET_WAREHOUSE');
}
