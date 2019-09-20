export function buildDateTimeString(obj) {
  let dd = obj.getDay();
  let mm = obj.getMonth() + 1;
  let yyyy = obj.getFullYear();

  let m = obj.getMinutes();
  m = m < 10 ? `0${m}` : m;
  let hh = obj.getHours();
  hh = hh === 0 ? 12 : hh;
  let time = hh > 12 ? `${hh % 12}:${m} PM` : `${hh}:${m} AM`;

  return `${dd}/${mm}/${yyyy}, ${time}`;
}
