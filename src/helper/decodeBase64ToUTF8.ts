export function decodeBase64ToUTF8(base64: string): string {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(
    Array.from(binaryString, char => char.charCodeAt(0))
  );
  const decoded = new TextDecoder('utf-8').decode(bytes);
  return decoded;
}
