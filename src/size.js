var BIT = {name: 'bit', value: 1};
var BYTE = {name: 'byte', value: 8};
var KB = {name: 'kilobyte', value: 1024*8};
var MB = {name: 'megabyte', value: 1024*1024*8};


getReadableSize(size){
	return (size / KB.value);
}
console.log(getReadableSize(8));