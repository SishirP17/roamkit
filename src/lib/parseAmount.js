// Parses user-typed numbers tolerantly across locales: "1,234.56",
// "1.234,56", "1234,56" and "1234.56" all yield 1234.56. Android keyboards
// (and paste on any platform) allow both "." and "," so we can't assume
// either one is the decimal separator.
export function parseAmount(raw) {
  if (raw == null) return NaN;
  let s = String(raw).trim().replace(/\s/g, '');
  if (!s) return NaN;
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma !== -1 && lastDot !== -1) {
    // Both separators present: the rightmost one is the decimal point.
    if (lastComma > lastDot) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
  } else if (lastComma !== -1) {
    // Comma only: a single comma is a decimal point, several are thousands.
    s = s.indexOf(',') === lastComma ? s.replace(',', '.') : s.replace(/,/g, '');
  } else if (lastDot !== -1 && s.indexOf('.') !== lastDot) {
    // Several dots can only be thousands separators ("1.234.567").
    s = s.replace(/\./g, '');
  }
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : NaN;
}
