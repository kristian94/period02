/**
 * Created by Kristian Nielsen on 08-09-2016.
 */
var assert = require('assert')
var path = require('path')
var operations = require(path.join(__dirname, './modules/operations.js'))
var fileReader = require(path.join(__dirname, './modules/fileReader.js'))

describe('Operations', function () {
    describe('Add', function () {
        it('Should return the added value of two numbers', function () {
            assert.equal(operations.add(1, 5), 6)
        })
    })
    describe('Subtract', function () {
        it('Should return the subtracted value of two numbers', function () {
            assert.equal(operations.subtract(5, 2), 3)
        })
    })
    describe('Mulitply', function () {
        it('Should return the multiplied value of two numbers', function () {
            assert.equal(operations.multiply(2, 2), 4)
        })
    })
    describe('Divide', function () {
        it('Should return the divided value of two numbers', function () {
            assert.equal(operations.divide(6, 3), 2)
        })
    })
})

describe('FileReader', function () {
    describe('readDirFiltered', function () {

        var dir = 'C:\\FileReaderTestDir'
        var files = ['file01.txt', 'file02.txt', 'excludeme.txt']
        var filter = 'file'
        var expectedFilteredList = fileReader.filterList(files, filter)

        var filteredList = [];
        before(function (done) {
            setTimeout(function () {
                fileReader.createDirectoryAndPopulate(dir, files, function () {
                    fileReader.readDirFiltered('C:\\FileReaderTestDir', 'file', function (err, list) {
                        list.forEach(function (entry) {
                            filteredList.push(entry)
                        })
                        done()
                    })
                })
            }, 1000)
        })

        after(function (done) {
            setTimeout(function () {
                fileReader.deleteDirectoryAndFiles(dir, done)

            }, 1000)
        })

        it('Should return an array with fileNames, filtered by a provided string', function () {
            for (var i = 0; i < filteredList.length; i++) {
                assert.equal(filteredList[i], expectedFilteredList[i])
            }
        })



    })
})



