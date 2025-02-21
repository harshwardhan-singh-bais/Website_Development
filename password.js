import { generateHashedPassword } from "./models/admin.js"; // Include `.js` extension

const { salt, hashedPassword } = generateHashedPassword("bankai");
console.log("Salt:", salt);
console.log("Hashed Password:", hashedPassword);
