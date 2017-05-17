 wip:

 src/demo: Milligram's own example with React, Mobx, Typescript
    
    ...and Electron;

### Notes:

debug:  
-    [browser-support](https://www.npmjs.com/package/debug#browser-support)

fonts:  
- see: [google-fonts-offline](https://github.com/makovich/google-fonts-offline)  
- then: 

        $npm install -g google-fonts-offline
        $goofoffline outDir="src/fonts" "https://fonts.googleapis.com/css?family=Roboto"

  remove *.eot lines, until automated

### build: 

- npm tasks: 
    - 'build+bundle': create electron's main & window's index
    - 'build+bundle+vendor': above+vendor dll 

