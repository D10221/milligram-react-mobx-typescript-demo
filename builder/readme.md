
local build scripts:

    node builder/

*builds all from [cwd]/build.config.js*

    node builder/ [package_name]

*builds package name*

    node builder/ --clean

*run clean before build*

    node builder/ --link

*link target project into top level modules*

    node builder/ --link-save

*save link target into top level package.json*

