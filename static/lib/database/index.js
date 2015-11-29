'use strict';


const sqlite3 = require('sqlite3').verbose();

class Database {

	constructor(filename) {
		this.db = new sqlite3.Database(filename);
	}
	upsert(data) {
		let id=data.id||null;
		let stmt = this.db.prepare("INSERT OR REPLACE  INTO markdown VALUES (?, ?, ?, ?, ?, ?)");
		let title=data.title||null;
		let cat=data.category||null;
		let content=data.content||null;
		data.create = Date.now();
		data.modified = data.create;
		stmt.run( id,title,  cat, content, data.create, data.modified);
		stmt.finalize();
	}
	defaultTable(callback) {
		let table = "CREATE TABLE `markdown` (	`_id`	INTEGER,	`title`	TEXT,	`category`	TEXT,	`content`	TEXT,	`create`	INTEGER,	`modified`	INTEGER,	PRIMARY KEY(_id));"
		this.db.run(table, callback);
	}
	close(){
		if (this.db) {
			this.db.close();
		}
	}
}

module.exports=Database;