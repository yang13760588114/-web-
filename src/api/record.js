import request from "@/utils/request";

export function realTimeRecords(nodeId) {
  return request({
    url: `/record/node`,
    params: { nodeId },
    method: "get",
  });
}

export function latestTimeRecord(nodeId) {
  return request({
    url: `/record/latest`,
    params: { nodeId },
    method: "get",
  });
}

export function pageHistoryRecords(pageRequest) {
  return request({
    url: "/record/page",
    data: pageRequest,
    method: "post",
  });
}

export function removeRecord(recordId) {
  return request({
    url: `/record/remove/${recordId}`,
    method: "delete",
  });
}
