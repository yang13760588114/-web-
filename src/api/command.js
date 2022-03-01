import request from "@/utils/request";

export function pageCommandRecords(pageRequest) {
  return request({
    url: "/command/page",
    data: pageRequest,
    method: "post",
  });
}

export function removeCommand(recordId) {
  return request({
    url: `/record/remove/${recordId}`,
    method: "delete",
  });
}
