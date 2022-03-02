import request from "@/utils/request";

export function getCommandRecord() {
  return request({
    url: "/command/get",
    method: "get",
  });
}

export function removeCommand(recordId) {
  return request({
    url: `/command/remove/${recordId}`,
    method: "delete",
  });
}

export function saveCommand(body) {
  return request({
    url: `/command/save`,
    data: body,
    method: "post",
  });
}
