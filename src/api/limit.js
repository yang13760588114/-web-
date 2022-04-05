import request from "@/utils/request";

// 获取鱼缸温度上下限
export function getLimit(nodeId) {
  return request({
    url: `/limit/get/${nodeId}`,
    method: "get",
  });
}

// 修改鱼缸温度上下限
export function saveOrUpdateLimit(limitRequest) {
  return request({
    url: "/limit/saveOrUpdate",
    data: limitRequest,
    method: "post",
  });
}

export function updateStatus(command) {
  return request({
    url: "/limit/command",
    data: command,
    method: "post",
  });
}
