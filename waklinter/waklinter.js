﻿ /**  * @fileOverview module to scan through all the js files in a project and send back an * array of errors for the first file found to have errors. *  * the main function to run is...  run() * * @author Welsh Harris * @created 01/21/2014 *//*globals File, module */var JSLINT = require("waklinter/jslint").JSLINT,	_ = require("underscore"),	jslint_options = {},	jsFiles = [],	skipFiles = [];	//load the jslint options and globalsfunction loadOptionsAndGlobals() {	"use strict";		var parentFolder,		optionsText,		globalsText,		textStream,		skipFilesText;		//get the parent folder path	parentFolder = new File(module.filename).parent.path;		//yank in the options	textStream = new TextStream(parentFolder + "jslint_options.json");	optionsText = textStream.read(0);	textStream.close();	jslint_options = JSON.parse(optionsText);		//yank in the globals	textStream = new TextStream(parentFolder + "jslint_globals.json");	globalsText = textStream.read(0);	textStream.close();	jslint_options.predef = JSON.parse(globalsText);		//also load the skip files	textStream = new TextStream(parentFolder + "skip_files.json");	skipFilesText = textStream.read(0);	textStream.close();	skipFiles = JSON.parse(skipFilesText);	}	function getJsFilePathsForFolder(folder) {	"use strict";		folder.forEachFile(function(file) {		if (file.extension === "js") { 			jsFiles.push(file.path);		}	});  }	function getJsFilePaths(mainFolder) {	"use strict";		getJsFilePathsForFolder(mainFolder);	mainFolder.forEachFolder(function(folder) {		getJsFilePaths(folder);	});		}function removeSkipFiles() {	"use strict";	jsFiles = _.reject(jsFiles, function(filePath) {		var reject = false;				_.each(skipFiles, function(skipFile) {			if (filePath.indexOf(skipFile) !== -1) {				reject = true;			}		});				return reject;			});}function errorCheck(errors) {	"use strict";		var nullPos;		//check for null in the errors array	nullPos = errors.indexOf(null);	if (nullPos >= 0) {		errors[nullPos] = {"evidence": "especially heinous"};	}		//skip errors we don't care about	errors = _.reject(errors, function(error) {		var reject = false;				if (typeof error.evidence !== "undefined") {			switch (error.evidence) {				case "})();// @endlock":					reject = true;					break;				case "(function Component (id) {// @lock":					reject = true;					break;			}						if (error.evidence.indexOf("//jslint_ignore") !== -1) {				reject = true;			}		}		return reject;			});			return errors;	}exports.run = function(mainFolder) {	"use strict";		var textStream,		code = "",		errors = [],		i;			//if not passed a folder default to the project folder	if (typeof mainFolder === "undefined") {		mainFolder = getFolder();	} 			//get path to all our js files	jsFiles.length = 0;	getJsFilePaths(mainFolder); 	removeSkipFiles();		//jslint each file	for (i = 0; i < jsFiles.length; i++) {		textStream = new TextStream(jsFiles[i]);		code = textStream.read(0);		textStream.close();				JSLINT(code, jslint_options);		errors = JSLINT.errors;		errors = errorCheck(errors);		if (errors.length > 0) {			errors.unshift(jsFiles[i]);			break;		}	}	return errors;};//need to load the options and globalsloadOptionsAndGlobals();