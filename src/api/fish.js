import request from "@/utils/request";

export function listFishNode() {
  return request({
    url: "/node/list",
    method: "get",
  });
}

export function removeFishNode(id) {
  return request({
    url: "/node/" + id,
    method: "delete",
  });
}

export function updateFishNode(node) {
  return request({
    url: "/node/edit",
    data: node,
    method: "post",
  });
}
