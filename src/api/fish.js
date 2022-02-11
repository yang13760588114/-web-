import request from "@/utils/request";

export function listFishNode() {
  return request({
    url: "/node/list",
    method: "get",
  });
}
