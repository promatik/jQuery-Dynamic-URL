/**
 * jQuery Dynamic URL Plugin
 * version: 1.0 (2013-01-15)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Toni Almeida wrote this plugin, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK."
 *
 * Copyrighted 2013 by Toni Almeida, promatik.
 */

(function( $ ) {

    var	domain, path, search;

    /**
     * jQuery.loadState
     *
     * @param url string
     *
     * This function is the initializer, doesn't need to be called, is only for forcing the URL
     *
     */

    $.loadURL = function( url ) {
    	var parsed = parseURL(url ? url : window.location.href);
    	path = cleanArray(parsed.pathname.split("/"));
    	search = parsed.search != "" ? splitSearch( parsed.search ) : new Array();
    	domain = parsed.protocol + "//" + parsed.host;
    };
    $.loadURL();

    /**
     * jQuery.getState
     *
     * @param {int} level
     * 
     * @return {Array/String} Array of Paths, or single path (string)
     * 
     * Will return an array with all the paths, if the level has been passed the return is the level item (string)
     *
     */
    $.getPath = function( level ) {
        return level == undefined ?  path : path[level];
    };

    /**
     * jQuery.pushState
     *
     * @param {int} level
     * @param {string} newpath
     * @param {object} data Object stored each url update, this data will be returned with the event onPopState
     * 
     * @return {string} The new URL
     *
     * pushPath will insert a new path to URL, at the level passed, the user can also store a data object associated to this new history mark, this data will be returned with the eventlistener onPopState
     *
     */
    $.pushPath = function( level, newpath, data ) {
        path[level] = newpath;
        return applyURLChanges(data);
    };

    /**
     * jQuery.popState
     *
     * @param {int} level
     * @param {bool} updateURL Default is true, if false, the URL will not be updated
     * 
     * @return {string} The new URL
     *
     * popPath will delete all entry in array, that are after the level passed (ex: ".com/1/2/3/", popPath(1) = ".com/1/") 
     *
     */
    $.popPath = function( level, updateURL ) {
        while(path.length > level) path.pop();
        return applyURLChanges(undefined, updateURL);
    };

    /**
     * jQuery.getVars
     * 
     * @return {Array} Array of params, key = name vars, values = vars values
     *
     * getVars returns an Array of the url params (ex: arr.sky = "blue"; arr.grass = "green";)
     *
     */
    $.getVars = function() {
    	return search;
    };

    /**
     * jQuery.setVars
     *
     * @param {Array} Array with tha vars
     * @param {object} data Object stored each url update, this data will be returned with the event onPopState
     * @param {bool} updateURL Default is true, if false, the URL will not be updated
     * 
     * @return {string} The join of all URL Vars (ex: ?sky=blue&grass=green)
     *
     * Description
     *
     */
    $.setVars = function(arr, data, updateURL) {
    	search = arr;
    	applyURLChanges(data, updateURL);
    	return joinSearch( search );
    };

    /**
     * jQuery.pushVar
     *
     * @param {string} key Name of the variable
     * @param {string} value Variable
     * @param {object} data Object stored each url update, this data will be returned with the event onPopState
     * @param {bool} updateURL Default is true, if false, the URL will not be updated
     * 
     * @return {string} The join of all URL Vars (ex: ?sky=blue&grass=green)
     *
     * pushVar will insert a new var to the url parameters (ex: ?newvar=somevalue)
     *
     */
    $.pushVar = function(key, value, data, updateURL) {
    	search[key] = value;
    	applyURLChanges(data, updateURL);
    	return joinSearch( search );
    };

    /**
     * jQuery.popVar
     *
     * @param {string} key Name of the variable to be deleted
     * @param {bool} updateURL Default is true, if false, the URL will not be updated
     *
     * @return {string} The join of all URL Vars (ex: ?sky=blue&grass=green)
     * 
     * popVar will delete a var in the url params
     *
     */
    $.popVar = function(key, updateURL) {
    	delete search[key];
    	applyURLChanges(undefined, updateURL);
    	return joinSearch( search );
    };

    /**
     * jQuery.clearVars
     *
     * @param {bool} updateURL Default is true, if false, the URL will not be updated
     *
     * @return {string} The new URL
     * 
     * clearVars will delete all vars in the url params
     *
     */
    $.clearVars = function(updateURL) {
    	search = new Array();
    	applyURLChanges(undefined, updateURL);
    	return $.getURL();
    };

    /**
     * jQuery.getURL
     *
     * @return {string} The actual state of URL
     * 
     * getURL will return the actual state of URL 
     *
     */
    $.getURL = function() {
    	return domain + pathString();
    };

    /**
     * jQuery.onPopState
     *
     * @param {function} callback function to be called when this event occurs
     *
     * With this, you can listening to window popstate, its called when user go back or forward in browser history
     *
     */
    $.onPopState = function(callback) {
    	window.onpopstate = callback;
    };
    
    /* Private Functions */
    
    function applyURLChanges(data, applyURL){
    	if(applyURL == undefined || applyURL) try { window.history.pushState(data, "", pathString()); } catch(e) {}
    	return $.getURL();
    }
    
    function pathString( ) {
        return "/" + path.filter(function(e){return e;}).join("/") + joinSearch(search);
    }
    
    function splitSearch( search ) {
    	var elem, result = new Array(), i = 0, elems = search.substring(1).split("&");
        for (i; i<elems.length; i++) {
        	elem = elems[i].split(/=(.+)?/);
        	result[ elem[0] ] = elem[1];
        }
        return result;
    }
    
    function joinSearch( ) {
    	var elem, result = "?";
    	for(elem in search){
    		result += elem + "=" + search[elem] + "&";
    	}
        return result.slice(0, -1);
    }
    
    function parseURL(path) {
    	var parser = document.createElement('a');
    	parser.href = path;
    	return parser;
    }
    
    function cleanArray(actual){
		var newArray = new Array();
		for(var i=0; i<actual.length; i++) {
			if (actual[i]) newArray.push(actual[i]);
		}
		return newArray;
	}

})( jQuery );
