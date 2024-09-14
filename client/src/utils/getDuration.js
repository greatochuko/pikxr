export function getDuration(oldDate, today = new Date().getTime()) {
  let suffix = " seconds ago";
  const date = new Date(oldDate).getTime();
  let duration = (today - date) / 1000;
  if (duration >= 60) {
    duration = Math.floor(duration / 60);
    suffix = " minutes ago";
    if (duration >= 60) {
      duration = Math.floor(duration / 60);
      suffix = " hours ago";
      if (duration >= 24) {
        duration = Math.floor(duration / 24);
        suffix = " days ago";
      }
    }
  }
  return duration + suffix;
}
