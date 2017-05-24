 wip:

 src/demo: Milligram's own example with React, Mobx, Typescript
    
    ...and Electron;

### Notes:

Make mac icon:
    
    nicns --in resources/icon.png --out icon.icns


npm package.json def:   

schema from [http://json.schemastore.org/package](http://json.schemastore.org/package)

see: [https://bcherny.github.io/json-schema-to-typescript-browser/](https://bcherny.github.io/json-schema-to-typescript-browser/)  


### build:   
*it's complicated... :)**  

the idea it to try work packages ala monorepo but thinking on 'ejecting them'  
to their respective repos, perhaps/eventually.  
as in incubating them ...   
because of that:  
'dependecies' must be track per sub-project and not in root-project
and kept as self contained as possible  
so at the time of 'ejection' we should simply remove .npmrc
an copy them to a 'new' repo, then 'npm install'

see "this/npm-builder"  
jsut runs npm build on all packages/[project]

*Notice:* .npmrc per project  
where prefix is '../../node_modules' pointing to root project
where 'link = true'  
root project also prefixed to same location 

... see scripts/collect-packages.js  
collects all dependecies (ignores version ... currently)   
so we can 'npm install from root project"