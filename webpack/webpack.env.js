const prod = process.env.NODE_ENV === "production" || process.argv.find(a => a === "-p");
if (prod) {
    process.env.prod = true;
    process.env.NODE_ENV = "production";
}
const isDevBuild = !prod;
console.log(`isDevBuild: ${isDevBuild}`);
module.exports = {
    isDevBuild
};