export default function (d: String<any>) {
  return new Date(d).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  })
}