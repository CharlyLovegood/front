export function getReadableSize(bytes, si) {
    if (typeof(bytes) === 'undefined') {
        throw new Error('Empty value');
    }
    if (typeof(bytes) !== 'number') {
        return false;
    }
    let thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    
    let units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    
    let u = -1;
    while (Math.abs(bytes) >= thresh && u < units.length - 1) {
        bytes /= thresh;
        ++u;
    };
    return bytes.toFixed(1)+' '+units[u];
};