/**
 * Created by Kristian Nielsen on 09-09-2016.
 */
var express = require('express')
var path = require('path')
var fileReader = require(path.join(__dirname, './modules/fileReader.js'))

fileReader.readDirFiltered('C:\\Users\\Kristian Nielsen\\WebstormProjects\\Period01\\learnyounode', 'lynex', function(err, list){
    if(err){
        console.error(err)
    }else{
        list.forEach(function(entry){
            console.log(entry)
        })
    }

})

fileReader.createDirectoryAndPopulate('C:\\FileReaderTestDir', ['file01.txt', 'file02.txt', 'excludeme.txt'], function(){
    fileReader.deleteDirectoryAndFiles('C:\\FileReaderTestDir')
})



