export var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["Bnb"] = 0] = "Bnb";
    PaymentMethod[PaymentMethod["Bep20"] = 1] = "Bep20";
})(PaymentMethod || (PaymentMethod = {}));
export var SaleType;
(function (SaleType) {
    SaleType[SaleType["Direct"] = 0] = "Direct";
    SaleType[SaleType["Offer"] = 1] = "Offer";
    SaleType[SaleType["Both"] = 2] = "Both";
})(SaleType || (SaleType = {}));
export var SaleState;
(function (SaleState) {
    SaleState[SaleState["Open"] = 0] = "Open";
    SaleState[SaleState["Closed"] = 1] = "Closed";
    SaleState[SaleState["Cancelled"] = 2] = "Cancelled";
})(SaleState || (SaleState = {}));
