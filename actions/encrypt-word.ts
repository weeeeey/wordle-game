import CryptoJS from 'crypto-js';

/**
 *
 * @param word
 * 랜덤으로 얻어 온 단어를 암호화 하는 함수입니다.
 */
const encryptWord = (word: string) => {
    const encrypted = CryptoJS.AES.encrypt(word.toUpperCase(), 'SECRETKEY');
    const base64 = encrypted.toString();
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export default encryptWord;
