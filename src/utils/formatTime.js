/**
 * Returns hours, minutes, seconds, hh:mm:ss and ISO 8601 formatted duration
 * representations of remainingSeconds.
 *
 * Hours are omitted from hhmmss when hours = 0.
 *
 * @param {Number} remainingSeconds The number of remaining seconds.
 */
export default function formatTime(remainingSeconds) {
  let h = Math.floor(remainingSeconds / 3600)
  let m = Math.floor(remainingSeconds / 60) % 60
  let s = remainingSeconds % 60

  // Omit hours from hhmmss if hours = 0
  let parts = h == 0 ? [m, s] : [h, m, s]

  let hhmmss = parts.map(v => v.toString().padStart(2, '0')).join(':')
  let isoDuration = `P${h}H${m}M${s}S`

  return { hours: h, minutes: m, seconds: s, hhmmss, isoDuration }
}