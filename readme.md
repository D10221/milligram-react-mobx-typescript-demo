 wip:

 src/demo: Milligram's own example with React, Mobx, Typescript
    
    ...and Electron;

### Notes:

build: 

    npm run build

*it builds packages and bundles app, @see /builder*

release:

    npm run release

*creates platform packages and releases to github*


Make mac icon:
    
    nicns --in resources/icon.png --out icon.icns


npm package.json def:   

schema from [http://json.schemastore.org/package](http://json.schemastore.org/package)

see: [https://bcherny.github.io/json-schema-to-typescript-browser/](https://bcherny.github.io/json-schema-to-typescript-browser/)  

Until it's fixed    

before pack:
    On Windows: // electron-builder doesn't follow the simlinks
        cwd: [root@project]  
        npm install packages/electron-window-state  
        npm install packages/electron-json-storage-async
    
    if electron-window-state not there
        
        cp -R packages/electron-window-state node_modules/electron-window-state

    then on dev cycle , do link it again

        $root@project:/ npm link packages/electron-window-state
        $root@project:/ npm link packages/electron-json-storage-async