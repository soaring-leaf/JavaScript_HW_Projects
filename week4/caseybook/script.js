console.log("Hello world!");
/**
    Create a people variable which is an empty array
    Using a for loop, access the randomuser api (https://randomuser.me/api/)
    and create 5 random users. Each time you create a user,
    push that user into the people array.
*/
const people = [];

for(let i=0; i<5; i++) {
    fetch(`https://randomuser.me/api/`)
      .then(function(res) {
        return res.json();
      })
      .then(function(user) {
        console.log(user);
        people.push(user.results[0]);

        const name = document.createElement('h3');
        name.textContent = people[i].name.first + ' ' + people[i].name.last;
        
        const email = document.createElement('h4');
        email.textContent = people[i].email;

        const img = document.createElement('img');
        img.src = people[i].picture.large;

        const pList = document.querySelector('.people'); // '.' because this is a CLASS not an ID
        pList.appendChild(img);
        pList.appendChild(name);
        pList.appendChild(email);
      })
}

/**
  Now that we have our people array populated,
  loop over the array and create our DOM elements:
    1.) h3 element -> add the first and last name
    2.) h4 element -> add the email address
    3.) img element -> add the large sized picture as an
          src attribute
    4.) (BONUS!) add a button element along
          with adding a click event handler.
      a.) On click of the button, we want to add the string 'FRIEND'
            in place of where the button was
    5.) (SUPER BONUS!!) add in some styling
    6.) (EXTRA SUPER BONUS!!!) If a user is a 'friend' have their
            'profile' appear on the right hand side of the screen
            else have their profile appear on the left
*/
