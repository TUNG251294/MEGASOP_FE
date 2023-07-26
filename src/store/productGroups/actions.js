export const addProductGroups = ({ commit }, { nodeLv0Id, nodeLv1Id, nodeLv2Id, product, category }) => {
    commit('ADD_TO_GROUPS', { nodeLv0Id, nodeLv1Id, nodeLv2Id, product, category });
}

export const addProducts = ({ commit }, { product }) => {
    commit('ADD_PRODUCT_IN_GROUPS', { product }); 
}

export const removeProduct = ({ commit }, { product }) => {
    commit('REMOVE_PRODUCT', { product });
}

export const setProductGroups = ({ commit }) => {
    commit('SET_PRODUCT_GROUPS', []);
    commit('SET_PRODUCTS', []);
    commit('SET_GROUPS', []);
    commit('SET_LEVEL_GROUPS', []);
    commit('SET_REWARD_GROUPS', []);
}

export const confirmGroups = ({ commit }, { index, group }) => {
    commit('CONFIRM_ADD_GROUP', { index, group });
}

export const updateDescription = ({ commit }, { node, value }) => {
    commit('UPDATE_DESCRIPTION', { node, value })
}

export const clearProductGroups = ({ commit }) => {
    commit('CLEAR_PRODUCT_GROUPS');
}

export const updateLevelGroups = ({ commit }, { index, productIndex }) => {
    commit('UPDATE_LEVEL_GROUPS', { index, productIndex });
}

export const addLevelGroup = ({ commit }, { index, productIndex }) => {
    commit('ADD_NEW_LEVEL_GROUP', { index, productIndex });
}

export const removeLevelGroup = ({ commit }, { index }) => {
    commit('REMOVE_LEVEL_GROUP', { index });
}

export const updateDescreaseValue = ({ commit }, { index, group, product, value }) => {
    commit('UPDATE_DESCREASE_VALUE', { index, group, product, value });
}

export const updateFixValue = ({ commit }, { index, productIndex, value }) => {
    commit('UPDATE_FIX_VALUE', { index, productIndex, value });
}

export const updateFromValue = ({ commit }, { index, productIndex, value }) => {
    commit('UPDATE_FROM_VALUE', { index, productIndex, value });
}

export const updateToValue = ({ commit }, { index, productIndex, value }) => {
    commit('UPDATE_TO_VALUE', { index, productIndex, value });
}

export const confirmBack = ({ commit }) => {
    commit('CONFIRM_BACK');
}

export const updateDescreaseGroupValue = ({ commit }, { index, productIndex, value }) => {
    commit('UPDATE_DESCREASE_GROUP_VALUE', { index, productIndex, value });
}

export const addPresentToGroup = ({ commit }, { levelGroupIndex, groupId, presents }) => {
    commit('ADD_PRESENT_TO_GROUP', { levelGroupIndex, groupId, presents });
}

export const removePresentFromGroup = ({ commit }, { levelGroupIndex, groupId, presentId }) => {
    commit('REMOVE_PRESENT_FROM_GROUP', { levelGroupIndex, groupId, presentId });
}

export const changeAmount = ({ commit }, { groupId, levelGroupIndex, presentId, value }) => {
    commit('CHANGE_AMOUNT_REWARD', { groupId, levelGroupIndex, presentId, value });
}

export const removeProductFromGroup = ({ commit }, { product }) => {
    commit("REMOVE_PRODUCT_FROM_GROUP", { product });
}

export const addProductInGroup = ({ commit }, { index, products, category }) => {
    commit('ADD_PRODUCT_INTO_GROUP', { index, products, category });
}