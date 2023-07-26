export const warehouseItemCount = (state) => {
    return state.warehouseImportTicketItems ? state.warehouseImportTicketItems.length : 0;
}