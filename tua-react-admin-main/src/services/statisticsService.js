import axios from "axios";
import { menuAPI } from "../constants/const";
import { GroupBy } from "./filter/GroupByFilter";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const config = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const statisticsService = {
  revenueByDay: function (startDate, endDate, address_id) {
    return axios.get(
      `${menuAPI.statistics}/?start_date=${startDate}&end_date=${endDate}&type=${GroupBy.DAY_FILTER}&address_id=${address_id}`,
      config
    );
  },
  revenueByMonth: function (startDate, endDate, address_id) {
    return axios.get(
      `${menuAPI.statistics}/?start_date=${startDate}&end_date=${endDate}&type=${GroupBy.MONTH_FILTER}&address_id=${address_id}`,
      config
    );
  },
  registerByDay: function (startDate, endDate, address_id) {
    return axios.get(
      `${menuAPI.register_statistics}/?start_date=${startDate}&end_date=${endDate}&type=${GroupBy.DAY_FILTER}&address_id=${address_id}`,
      config
    );
  },
  registerByMonth: function (startDate, endDate, address_id) {
    return axios.get(
      `${menuAPI.register_statistics}/?start_date=${startDate}&end_date=${endDate}&type=${GroupBy.MONTH_FILTER}&address_id=${address_id}`,
      config
    );
  },
  topProduct: function(startDate, endDate, top) {
    return axios.get(
      `${menuAPI.statistics}/product/used?startDate=${startDate}&endDate=${endDate}&top=${top}`,
      config);
  },
  topService: function(startDate, endDate, top) {
    return axios.get(
      `${menuAPI.statistics}/service/used?startDate=${startDate}&endDate=${endDate}&top=${top}`,
      config);
  },


  topCustomer: function(top) {
    return axios.get(
      `${menuAPI.statistics}/customer/top?top=${top}`,
      config);
  },
  newCustomerByDate: function(startDate, endDate) {
    return axios.get(
      `${menuAPI.statistics}/customer/new/day?startDate=${startDate}&endDate=${endDate}`,
      config);
  },
  newCustomerByMonth: function(startDate, endDate) {
    return axios.get(
      `${menuAPI.statistics}/customer/new/month?startDate=${startDate}&endDate=${endDate}`,
      config);
  },
};
