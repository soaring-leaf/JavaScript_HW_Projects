/*
Must have one FarmAnimal prototype that all other objects extend.
    'FarmAnimal' must have name and image instance properties as well as a 
    talk instance method.

    You should create at least five different animals for your farm.
    At least two animals must have subclasses. For example, if you create a 
    Cow prototype it would have two types of cow objects extend from it 
    (i.e. Angus & Texas Longhorn).

    Use vanilla JS or jQuery to create elements based off your FarmAnimal 
    objects and bind them to the DOM. add the class animal to each element.

    When you click on animal an alert should show display the sound 
    it makes (i.e. mooo!).

    Each animal element should have position styles, such as left and top, 
    so images aren't stacked on one another.
*/

class FarmAnimal {
    constructor(name, image, sound) {
        this.name = name;
        this.img = image;
        this.sound = sound;
    }

    talk() {
        return this.sound;
    }
}

class Cow extends FarmAnimal {
    constructor(name, image, bell) {
        super(name, image, 'Mooo!');
        this.bell = bell;
    }
}

const angus = new Cow('betty','angus.jpg',false);
const longHorn = new Cow('ted','image2.jpg',true);
const chicken = new FarmAnimal('larry','image3.jpg','cluck');
const pig = new FarmAnimal('doug','image4.jpg','oink');
const horse = new FarmAnimal('Stan','image5.jpg','ney');

console.log(angus);

const angusElement = document.createElement('img');
angusElement.setAttribute('src',angus.img);
angusElement.setAttribute()

const farm = document.querySelector('div');
farm.appendChild(angusElement);

angusElement.addEventListener('click',function(evt) {
    evt.preventDefault();
    console.log(this.talk);
  })