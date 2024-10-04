import CryptoJS from 'crypto-js';
/**
 *
 * @param encryptedWord
 * 해시 되어 있는 단어를 복호화하여 정답인 단어를 리턴해줍니다.
 */

const decryptWord = (encryptedWord: string) => {
    const base64 = encryptedWord.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        '='
    );
    const decrypted = CryptoJS.AES.decrypt(paddedBase64, 'SECRETKEY');
    return decrypted.toString(CryptoJS.enc.Utf8);
};

export default decryptWord;
