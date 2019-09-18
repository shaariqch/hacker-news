export function buildDateTimeString(obj) {
  let dd = obj.getDay();
  let mm = obj.getMonth() + 1;
  let yyyy = obj.getFullYear();

  let m = obj.getMinutes();
  let hh = obj.getHours();
  let time = hh > 12 ? `${hh % 12}:${m}` : `${hh}:${m}`;

  return `${dd}/${mm}/${yyyy}, ${time}`;
}
