var BYTE = {name: 'B', value: 1};
var KB = {name: 'KB', value: 1024};
var MB = {name: 'MB', value: 1024*1024};


function getReadableSize(size) {
	size = Math.floor(size / KB.value);
	return (size + ' ' + KB.name);
};
