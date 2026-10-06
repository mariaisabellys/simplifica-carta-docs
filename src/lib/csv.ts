export function criarCsv(rows: readonly (readonly string[])[]): string {
  if (rows.length === 0) return "";
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\r\n") + "\r\n";
}

function escapeCsvCell(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}
