/**
 * Helpers para convertir un string a un Uint8Array, el formato que acepta WebCrypto API
 */

export const stringToArrayBuffer = (str: string) =>
  new TextEncoder().encode(str);

export const arrayBufferToString = (buffer: ArrayBuffer) =>
  new TextDecoder().decode(buffer);

/*
    Función para connvertir clave AES de 256 bits usando SHA-256
*/
const deriveKey = async (password: string) => {
  const rawKey = stringToArrayBuffer(password); // Convertimos la clave a ArrayBuffer
  const hashedKey = await crypto.subtle.digest("SHA-256", rawKey); // Hash de la clave

  return crypto.subtle.importKey(
    "raw",
    hashedKey, // Usamos el hash de la clave como entrada
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"] // Permisos para cifrar y descifrar
  );
};

export const generateKey = async () =>
  deriveKey(import.meta.env.VITE_ENCRYPTION_KEY);

export const encrypt = async (data: string) => {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Vector de Inicialización aleatorio
  const key = await generateKey();

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    stringToArrayBuffer(data) // Convertir los datos a ArrayBuffer
  );

  const encryptedBase64 = btoa(
    String.fromCharCode(...new Uint8Array(encrypted))
  );
  const ivBase64 = btoa(String.fromCharCode(...iv));

  return `${ivBase64}:${encryptedBase64}`; // Retornar Vector de Inicialización + datos cifrados
};

export const decrypt = async (encryptedData: string) => {
  const [ivBase64, encryptedBase64] = encryptedData.split(":");
  const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));
  const encrypted = Uint8Array.from(atob(encryptedBase64), (c) =>
    c.charCodeAt(0)
  );

  const key = await generateKey();

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );

  return arrayBufferToString(decrypted);
};
