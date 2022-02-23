import request from "@/utils/request";

export function realTimeRecords(nodeId) {
  return request({
    url: `/record/node/${nodeId}`,
    method: "get",
  });
}
