const Emitter = function() {
	// private listener array
	const listenerArray = [];
	// general add function, will bind it later
	const add = function(once,priority,listenerName,cb) {
		if(priority) {
			listenerArray.unshift({
				name: listenerName,
				deleted: once,
				cb

			});
		} else {
			listenerArray.push({
				name: listenerName,
				deleted: once,
				cb
			});
		}
	};
	// binds for different conditions
	this.on = add.bind(null, false, false);
	this.once = add.bind(null, true, false);
	this.onPriority = add.bind(null, false, true);
	this.oncePriority = add.bind(null, true, true);
	

	this.emit = function(listenerName) {
		listenerArray.forEach((listener,index) => {
			if(listener.name === listenerName) {
				listener.cb();
				if(listener.deleted) {
					listener.splice(index,1);
				}

			}
		});
	};

	this.removeOne = function(listenerName,cb) {
		// if there is no cb remove all the available objects
		listenerArray.forEach((listener,index) => {
			const hasCB = cb ? listener.cb === cb : true;
			if(listener.name === listenerName && hasCB) {
				listenerArray.splice(index,1);
			}
		});
	};

	this.removeAll = function(arr) {
		// get the all names
		const listenerNames = listenerArray.map(listener => {
			return listener.name;
		});
		// delete all the objects with matching names (multiple names cannot be deleted in same time)
		arr.forEach(name => {
			const bridge = listenerNames.indexOf(name) >= 0 ? listenerArray.splice(listenerNames.indexOf(name)) : null;
		});
	};
}