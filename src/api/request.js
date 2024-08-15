import { http } from "@tauri-apps/api";
import { getItem } from "@/utils/index.js";
const token = getItem("itoken");
export function request(config) {
  return new Promise((resolve, reject) => {
    http
      .fetch("https://kestrel-task.cn" + config.url, {
        method: "POST",
        body: http.Body.json(config.data),
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function requestGet(config, d) {
  let url = d ? config.url : "https://kestrel-task.cn" + config.url;
  return new Promise((resolve, reject) => {
    http
      .fetch(url, {
        method: "get",
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        resolve(d ? res.data : res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
