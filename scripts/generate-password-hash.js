// Script untuk generate password hash untuk D1 seed
// Usage: node scripts/generate-password-hash.js <password>

const bcrypt = require('bcryptjs')

const password = process.argv[2] || 'admin123'

const hash = bcrypt.hashSync(password, 10)
console.log('Password:', password)
console.log('Hash:', hash)
console.log('\nCopy hash di atas untuk digunakan di seed-d1.sql')

