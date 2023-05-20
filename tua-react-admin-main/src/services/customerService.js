import axios from "axios";
import { menuAPI } from "../constants/const";
import { getAuthorizationHeader } from "./axiosClient";

export const customerService = {
  listAll: function () {
    return axios.get(menuAPI.customer, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listAllTrainer: function () {
    return axios.get(menuAPI.trainer, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listAllSchedule: function () {
    return axios.get(menuAPI.schedule, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  listAllClasses: function () {
    return axios.get(menuAPI.classes, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  create: function (customer) {
    return axios.post(`${menuAPI.class}`, JSON.stringify(customer), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  update: function (id, values) {
    return axios.put(`${menuAPI.customer}/${id}`, JSON.stringify(values), {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  remove: function (class_id) {
    return axios.put(`${menuAPI.class}`, JSON.stringify(class_id), {
      headers: {
        "content-type": "application/json",
        // Authorization: getAuthorizationHeader(),
      },
    });
  },
  search: function (searchParams) {
    return axios.get(`${menuAPI.customer}/f?search=${searchParams}`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  getTickets: function (id) {
    return axios.get(`${menuAPI.customer}/${id}/tickets`, {
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorizationHeader(),
      },
    });
  },
  deleteMulti: function (data) {
    return axios({
      method: "delete",
      url: "http://localhost:8080/v1/customers/delete_multi",
      headers: {
        Authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
  },
};
