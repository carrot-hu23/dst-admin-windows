const compressing = window.require('compressing');

async function zip(source, dest, success, error) {
    await compressing.zip.compressDir(source, dest + '.zip')
        .then(() => {
            success()
        }).catch(err => {
            error(err)
        });
}

async function unzip(source, dest, success, error) {
    // uncompress a file
    await compressing.zip.uncompress(source, dest)
        .then(() => {
            success()
        })
        .catch(err => {
            error(err)
        })
}

export {
    zip,
    unzip
}