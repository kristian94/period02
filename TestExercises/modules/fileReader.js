/**
 * Created by Kristian Nielsen on 08-09-2016.
 */
var fs = require('fs')


function filterList(list, filter){
    var filtered = []
    list.forEach(function(entry){
        if(entry.indexOf(filter) != -1) filtered.push(entry)
    })
    return filtered
}

function readDirFiltered(dir, filter, callback) {

    fs.readdir(dir, function(err, list){
        if(err){
            callback(err, null)

        }else{

            callback(null, filterList(list, filter))

        }
    })
}

function createDirectoryAndPopulate(directory, files, done){
    var count = 0;
    fs.mkdir(directory, function(){
        console.log('created directory: ' + directory)
        files.forEach(function(entry){
            var fullFileDir = fileNameWDir(directory, entry);
            fs.writeFile(fullFileDir, function(){
                console.log('created file: '+ fullFileDir)
                count++;
                if(count == files.length){
                    done()
                }
            })
        })
    })
}

function deleteDirectoryAndFiles(directory, done){
    fs.readdir(directory, function(err, list){
        // console.log('attempting to clear dir: ' + directory)
        var count = 0;
        if(err){
            console.error(err)
        }else{
            list.forEach(function(entry){
                // console.log('attempting to remove file: ' + entry)
                var fullFileDir = fileNameWDir(directory, entry)
                fs.unlink(fullFileDir, function(err){
                    if(err){
                        console.error(err)
                    }else{
                        console.log('removing file: ' + fullFileDir)
                        count++;
                        if(count == list.length){
                            setTimeout(function(done){
                                console.log('idk')
                                done()
                            }, 1000)
                            fs.rmdir(directory, function(err){
                                if(err){
                                    console.error(err)
                                }
                                console.log('removing dir: ' + directory)
                                done()

                            })
                        }
                    }
                })
            })
        }
    })
}

function fileNameWDir(dir, file){
    return dir + '\\' + file;
}

module.exports = {
    filterList: filterList,
    readDirFiltered: readDirFiltered,
    createDirectoryAndPopulate: createDirectoryAndPopulate,
    deleteDirectoryAndFiles: deleteDirectoryAndFiles
}




