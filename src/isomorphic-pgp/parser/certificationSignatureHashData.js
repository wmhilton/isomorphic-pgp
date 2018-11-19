import concatenate from "concat-buffers";
import * as Signature from "./Packet/Signature.js";
import * as PublicKey from "./Packet/PublicKey.js";
import * as UserId from "./Packet/UserId.js";

export async function certificationSignatureHashData(publicKeyPacket, userIdPacket, signaturePacket) {
  let pubkeyBuffer = PublicKey.serializeForHash(publicKeyPacket);
  let useridBuffer = UserId.serializeForHash(userIdPacket);
  let trailer = Signature.serializeForHashTrailer(signaturePacket);
  return concatenate([pubkeyBuffer, useridBuffer, trailer]);
}
