const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const key = Buffer.from(process.env.ENCRYPTION_KEY || '31358739941083324302270277474557')
function encrypt(text) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return {
        iv : iv.toString('hex'),
        data : encrypted
    }
}
function decrypt(data, ivHex) {
    const ivBuffer = Buffer.from(ivHex, 'hex')
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer)
    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted = decipher.final('utf8')
    return decrypted
}
module.exports = {
    encrypt,
    decrypt
}