export function parse(a) {
  let byte1 = a.b[a.i++];
  if (byte1 < 192) {
    return byte1;
  } else if (byte1 < 255) {
    let byte2 = a.b[a.i++];
    return ((byte1 - 192) << 8) + (byte2 + 192);
  } else {
    return (
      (a.b[a.i++] << 24) + (a.b[a.i++] << 16) + (a.b[a.i++] << 8) + a.b[a.i++]
    );
  }
}

export function serialize(length) {
  if (length < 192) {
    return new Uint8Array([length]);
  } else if (length < 16319) {
    let octet2 = (length - 192) & 255;
    let octet1 = ((length >> 8) + 192) & 255;
    return new Uint8Array([octet1, octet2]);
  } else {
    return new Uint8Array([
      255,
      (length >> 24) & 255,
      (length >> 16) & 255,
      (length >> 8) & 255,
      length & 255
    ]);
  }
}
