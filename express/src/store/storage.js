// memoryStorage is a useful last fallback to ensure that the cached data is complete even when the app restarts.
import fs from 'fs'
import path from 'path'

const jsonPath = path.resolve(__dirname, '../../storage.json')
let memoryStorage = {}

function read(key) {
	return memoryStorage[key]
}

function write(key, data) {
	memoryStorage[key] = data
}

function each(callback) {
	for (let key in memoryStorage) {
		if (memoryStorage.hasOwnProperty(key)) {
			callback(memoryStorage[key], key)
		}
	}
}

function remove(key) {
	delete memoryStorage[key]
}

function clearAll() {
	memoryStorage = {}
}

function writeToJSON() {
	try {
		fs.writeFileSync(jsonPath, JSON.stringify(memoryStorage))
	} catch(err) {
		console.log('write failed')
	}
}

function readFromJSON () {
	try {
		const content = fs.readFileSync(jsonPath)
		memoryStorage = JSON.parse(content)
	} catch(err) {
		console.log('read Failed')
		memoryStorage = {}
	}
	
}

const storage =  {
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
	writeToJSON: writeToJSON,
	readFromJSON: readFromJSON
}

export default storage