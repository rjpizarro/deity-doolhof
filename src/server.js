"use strict";
exports.__esModule = true;
var path_1 = require("path");
var express_1 = require("express");
var app = express_1["default"]();
app.get("/", function (req, res) {
    res.sendFile(path_1["default"].join('../dist/index.html'));
});
app.listen(8000, function () {
    console.log("App running on port " + 1234);
});
