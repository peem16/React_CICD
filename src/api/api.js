import axios from "axios";
import crypto from "crypto";

const host = process.env.HOST || "https://aroiibot.herokuapp.com"

function encode_signature(body) {
  return crypto
    .createHmac("SHA256", process.env.CHANNEL_SECRET)
    .update(body)
    .digest("base64");
}

export default {
  linebot: {
    push: body => {
      const signature = encode_signature(body);
      axios.defaults.headers = {
        "x-line-signature": signature
      };
      return axios.post(
        `${host}/aroii/api/:clientId/callback/push`,
        body
      );
    },
    multicast: body => {
      const signature = encode_signature(body);
      axios.defaults.headers = {
        "x-line-signature": signature
      };
      return axios.post(
        `${host}/aroii/api/:clientId/callback/multicast`,
        body
      );
    }
  },
  merchant: {
    getstore: body => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.get(`${host}/aroii/api/store`, body);
    },
    addstore: body => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.post(`${host}/aroii/api/store`, body);
    },
    editstore: body => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.put(`${host}/aroii/api/store`, body);
    },
    delstore: idstore => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.delete(`${host}/aroii/api/store`, {
        data: { idstore: idstore }
      });
    },
    getcoupon: idstore => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.get(`${host}/aroii/api/coupon`, {
        params: { idstore: idstore }
      });
    },
    addcoupon: body => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.post(`${host}/aroii/api/coupon`, body);
    },
    editcoupon: body => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.put(`${host}/aroii/api/coupon`, body);
    },
    delcoupon: idcoupon => {
      axios.defaults.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      return axios.delete(`${host}/aroii/api/coupon`, {
        data: { idcoupon: idcoupon }
      });
    }
  }
};
