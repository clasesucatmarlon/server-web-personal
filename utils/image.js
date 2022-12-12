function getImagePath (file) {
    const filePath = file.path;
    const splitFile = filePath.split('\\');
    const joinFile = splitFile.splice(1, splitFile.length - 1).join('/');
    return joinFile;
}

module.exports = {
    getImagePath
}
