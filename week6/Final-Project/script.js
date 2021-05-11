const config = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    storageBucket: storageBucket,
    projectId: projectId,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
  };
  
//firebase.analytics();
firebase.initializeApp(config);

// connect to your Firebase application using your reference URL
const messageAppReference = firebase.database();

//console.log('hello!');

msgRef = messageAppReference.ref('trails'); // reference to the Trails DB
// const allPosts = []; - no longer needed with the 'on' functionality in the getAllPosts function

getAllPosts(msgRef); // read and post messages from the DB to the page

const submitBtn = document.querySelector('.btn-submit');

// listener for the user input form button
submitBtn.addEventListener('click',function(evt) {
    evt.preventDefault();
    const myLoc = document.querySelector('#location-input');
    const myCond = document.querySelector('#conditions-input');
    const errMsg = document.querySelector('#err-text');

    // get the form input but throw errors if something is blank
    if(myLoc.value !== '' && myCond.value !== '') {
        // console.log(myLoc.value);
        const msg = {
            location: myLoc.value,
            conditions: myCond.value};

        const msgDetails = new Message(msg);

        //console.log(allPosts);

        //allPosts.push(msgDetails);
        //displayMessages(allPosts);

        const thisKey = msgRef.push({msgDetails});

        clearForm(myLoc,myCond,errMsg);
    } else if(myLoc.value === '' && myCond.value === '') {
        errMsg.textContent = 'You need to enter something!';
    } else if(myLoc.value === '') {
        errMsg.textContent = 'You need to enter a Place!';
    } else {
        errMsg.textContent = 'You need to enter the Conditions!';
    }

})

//==========================================
// Functions
//==========================================

// clears the input form
function clearForm(L,C,E) {
    L.value = '';
    C.value = '';
    E.textContent = '';
}

// Clears displayed posts to reset order
// === no longer required with the innerHTML clear ===
function resetMainSection () {
    const mainSec = document.querySelector('#main');

    while(mainSec.firstChild) {
        mainSec.removeChild(mainSec.lastChild);
    }
}

// display the messages on the webpage
function displayMessages(msgArray) {
    const mainSec = document.querySelector('#main');
    mainSec.innerHTML = ''; // clears Main section for repopulating the posts on page
    //resetMainSection();

    // for loop to display each message and set individual listeners
    for(let m=0;m<msgArray.length;m++) {
        const mObj = msgArray[m];
        const post = document.createElement('article');
        post.setAttribute('class','article');

        const pSection = document.createElement('section');
        pSection.setAttribute('class','content');

        const pTitle = document.createElement('h3');
        pTitle.textContent = mObj.location;
        
        const pDesc = document.createElement('p');
        pDesc.textContent = mObj.conditions;

        const options = document.createElement('section');
        options.setAttribute('class','opts');

        const msgLikes = document.createElement('i');
        msgLikes.textContent = `Score: ${mObj.likes}`;

        const upVote = document.createElement('i');
        upVote.setAttribute('id','up-vote');
        upVote.textContent = '--Upvote';

        const downVote = document.createElement('i');
        downVote.setAttribute('id','down-vote');
        downVote.textContent = '--DownVote';

        const del = document.createElement('i');
        del.setAttribute('id','delete');
        del.textContent = '--Delete';

        setListeners(mObj,msgLikes,upVote,downVote,del);

        options.appendChild(msgLikes);
        options.appendChild(upVote);
        options.appendChild(downVote);
        options.appendChild(del);

        pSection.appendChild(pTitle);
        pSection.appendChild(pDesc);
        pSection.appendChild(options);

        mainSec.appendChild(post)
            .appendChild(pSection);
    }
}

// sets Listeners for the Up/Down voting and Delete 'buttons'
function setListeners(msgObj,like,up,down,del) {
    up.addEventListener('click', function () {
        msgObj.liked();
        if(typeof(msgObj.dbKey) === 'undefined') {
            like.textContent = `Score: ${msgObj.likes}`;
        } else {
            const updateLikes = {};
            updateLikes[msgObj.dbKey + '/msgDetails/likes'] = msgObj.likes;
            msgRef.update(updateLikes);
        }
    })

    down.addEventListener('click', function() {
        msgObj.unliked();
        if(typeof(msgObj.dbKey) === 'undefined') {
            like.textContent = `Score: ${msgObj.likes}`;
        } else {
            const updateLikes = {};
            updateLikes[msgObj.dbKey + '/msgDetails/likes'] = msgObj.likes;
            msgRef.update(updateLikes);
        }
    })

    del.addEventListener('click', function() {
        msgObj.unlockMessage();
        if(msgObj.isLocked) {
            //console.log(`This message is still relevant, can't delete yet`);
            const e = document.querySelector('#err-text');
            e.textContent = `This message is still relevant, can't delete yet`;
            setTimeout(function () {e.textContent = '';},3500); // clear error message after 3.5 sec.
        } else {
            const rem = {};
            rem[msgObj.dbKey] = null;
            msgRef.update(rem);
        }
    })

}

// reads from the DB to retrieve all posts for updates or page reload
function getAllPosts(dbRef) {

    dbRef.on('value', function (results) {
        const posts = [];
        const allDBPosts = results.val();
        
        for(let msgKey in allDBPosts) {
            //console.log(allDBPosts[msg]); // This is the Post KEY
            //console.log(allDBPosts[msgKey].msgDetails); // this is the message obj DETAILS
            const thisMsg = new Message(allDBPosts[msgKey].msgDetails,msgKey); // need to reconstruct message objs or listeners don't work
            posts.push(thisMsg);
        }
        displayMessages(posts);
    })
}