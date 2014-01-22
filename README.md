waklinter
=========

Wakanda server side script to jslint all the js files in a project

Installation
=========

You should put the waklinter folder in your Project/Modules folder.

You will also need to download a copy of jslint.js and put it in the waklinter folder.

You will also need to have a copy of underscore.js in your Modules folder.  In the end you should have this:

* Project/Modules/underscore.js
* Project/Modules/waklinter/jslint_globals.json
* Project/Modules/waklinter/jslint_options.json
* Project/Modules/waklinter/jslint.js
* Project/Modules/waklinter/package.json
* Project/Modules/waklinter/skip_files.json
* Project/Modules/waklinter/waklinter.js

Usage
=========

Just open any .js file in Wakanda Studio, paste in this code and run it.  Waklinter will scan through all the .js files in the project.  The first time it finds a .js file with an error it will display the errors in the console.

```javascript
var waklinter = require("waklinter/waklinter");
waklinter.run();
```

You can optionally pass a Wakanda Folder object to  waklinter.run() and it will recursively find and jslint any .js files within that folder and any of its subfolders.

You can modify jslint_globals.json and jslint_options.json to update the jslint directives used.

You can modify skip_files.json to tell waklinter which files you want to skip.

Last but not least, if jslint is reporting an error and you think Crockford is just wrong! You can put a comment on that line and waklinter will skip the error:
```javascript
//ignore_jslint
```

License (MIT License)
=========

Copyright (c) 2014 CoreBits DataWorks LLC

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.