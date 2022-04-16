import request from "@/utils/request";

export function getCommandRecord() {
  return request({
    url: "/command/get",
    method: "get",
  });
}

export function pageCommands(commandRequest) {
  return request({
    url: "/command/page",
    method: "post",
    data: commandRequest,
  });
}

export function pageHostCommands(commandRequest) {
  return request({
    url: "/command/host/page",
    method: "post",
    data: commandRequest,
  });
}

export function getCommand(id) {
  return request({
    url: `/command/get/${id}`,
    method: "get",
  });
}

export function removeCommand(recordId) {
  return request({
    url: `/command/remove/${recordId}`,
    method: "delete",
  });
}

export function removeHostCommand(recordId) {
  return request({
    url: `/command/host/remove/${recordId}`,
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
