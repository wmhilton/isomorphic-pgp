import crc24 from "crc/crc24";
import base64 from "base64-js";

export function parse(str) {
  let matches;
  matches = str.match(/-----BEGIN (.*)-----/);
  if (matches === null) throw new Error("Unable to find an OpenPGP Armor Header Line");
  let type = matches[1];
  matches = str.match(/\r?\n\r?\n([\S\s]*)\r?\n=/);
  if (matches === null) throw new Error("Unable to find main body of OpenPGP ASCII Armor");
  let text = matches[1].replace(/\r/g, "").replace(/\n/g, "");
  console.log(`"${text}"`, text.length);
  let data = base64.toByteArray(text);
  return { type, data };
}

export function serialize({ type, data }) {
  let rawCRC = crc24(data);
  let crcBytes = new Uint8Array([(rawCRC >> 16) & 255, (rawCRC >> 8) & 255, rawCRC & 255]);
  let crcBase64 = base64.fromByteArray(crcBytes);
  let text = base64.fromByteArray(data);
  // Wrap every 64 characters
  let matches = text.match(/(.{1,64})/g);
  return `-----BEGIN ${type}-----

${matches.join("\n")}
=${crcBase64}
-----END ${type}-----`;
}
