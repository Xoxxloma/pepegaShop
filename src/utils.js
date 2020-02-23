export const saleIds = [2, 6];
export const saleRatio = 0.7;
export const changeRatio = id => (saleIds.includes(id) ? saleRatio : 1);

