import request from "@/utils/request";

export function listFishNode() {
  return request({
    url: "/fish/node/list",
    method: "get",
  });
}
