"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiSlice = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var API_URI = "http://localhost:5000/api";
var baseQuery = (0, _react.fetchBaseQuery)({
  baseUrl: API_URI
});
var apiSlice = (0, _react.createApi)({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: function endpoints(builder) {
    return {};
  }
});
exports.apiSlice = apiSlice;
//# sourceMappingURL=apiSlice.dev.js.map
