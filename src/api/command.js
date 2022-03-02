import request from "@/utils/request";

export function getCommandRecord() {
  return request({
    url: "/command/get",
    method: "get",
  });
}

export function removeCommand(recordId) {
  return request({
    url: `/record/remove/${recordId}`,
    method: "delete",
  });
}
