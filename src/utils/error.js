const http = require('http')
const path = require('path')
const fs = require('fs')

class ServerError extends Error {
	constructor(message) {
		super()
		this.status = 500
		this.message = "Internal Server Error: " + message
	}
}

class ClientError extends Error {
	constructor(status, message) {
		super()
		this.status = status
		this.message = http.STATUS_CODES[status] + ": " + message
	}
}




module.exports = {
	ClientError,
	ServerError
}