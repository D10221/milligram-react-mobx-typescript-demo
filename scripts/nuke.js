#!/usr/bin/env node
const path = require("path");
const shell = require("shelljs");
const dirRecursive = require("./get-dir-recursive");
const argos = require("argos");
const args = argos.ArgsQuery();

const isDir = args.getFlag("isDir"); 

if(!isDir.exists()) {
    throw new Error("required --is-dir");
}

const pattern = args.params().toString();
if("" === pattern){
    throw new Error("required <pattern:regex> before flags")
}

const dirs = ()=> dirRecursive({
    root: path.join(process.cwd(), "packages"), 
    pattern: new RegExp(pattern), 
    isDir: isDir.toBool()
});

const nuke = args.getFlag("nuke").exists();
const showList = args.getFlag("list").exists();

try{

if (nuke) {
    dirs()
        .forEach(dir => {
            if (shell.exec(`rm -R ${dir}`).code !== 0) {
                throw "Wtf?";
            }
        })
    return ''
} 
 if (showList){
    console.log(
        dirs().join("\n")
    )    
    return ;
} 
 console.error(
        "usage: --nuke | --list"
    )
} catch(e) {
    console.error(e.message);
    process.exit(-1);
}
console.log("bye!");
process.exit();
