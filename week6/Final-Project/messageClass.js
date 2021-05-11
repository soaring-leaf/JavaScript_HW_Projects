class Message {
    
    constructor (anonObj,dbKey) {
        this.location = anonObj.location;
        this.conditions = anonObj.conditions;
        this.isLocked = true;

        // can't push undefined values to the DB, need to protect on new messages
        if(typeof(dbKey) === 'undefined') {
            this.dbKey = null;
        } else {
            this.dbKey = dbKey;
        }
        
        if(!isNaN(anonObj.likes)) {
            this.likes = anonObj.likes;
        } else {
            this.likes = 0;
        }

        if(typeof(anonObj.posted) !== 'undefined') {
            // check to see if we can unlock message when reading from the DB
            this.posted = anonObj.posted;
            this.postDate = anonObj.postDate;
            this.unlockMessage();
        } else {
            // else this is a new message
            this.setTime();
        }
    }

    // sets the time/date for the new post
    setTime() {
        const myDate = new Date();
        this.posted = Date.now();
        this.postDate = {
            day: myDate.getDate(),
            month: myDate.getMonth()+1,
            year: myDate.getFullYear(),
            hour: myDate.getHours(),
            min: myDate.getMinutes(),
            sec: myDate.getSeconds()
        }
    }

    // unlocks the message for deleting if applicable; otherwise, does nothing
    unlockMessage() {
        // if message is over a day old (10 seconds for testing), unlock it and allow deletion
        if(Date.now() - this.posted > 10000) {
            this.isLocked = false;
        }
    }

    // increases the upVote count
    liked() {
        this.likes++;
    }

    // decreases the count but not below 0
    unliked() {
        // Don't allow negative likes
        if(this.likes > 0) {
            this.likes--;
        }
    }

}