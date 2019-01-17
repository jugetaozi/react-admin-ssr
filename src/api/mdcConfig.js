import {get, post} from 'utils/http'

export function getNewList() {
  const result = get('/ad/newestPublishAdMaterialInfo1');
  return result;
}