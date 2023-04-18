import { remote } from "~/composables";
//操作记录分页
export function getOperationRecordPaged({ page, size }) {
  return remote.postForm({
    url: "/operation_record/list",
    params: {
      page,
      size,
    },
    silent: true,
  });
}

//操作记录分页
export function addOperationRecord(data) {
  return remote.postForm({
    url: "/operation_record/add",
    params: data,
    silent: true,
    showErrorMessage: false,
  });
}
