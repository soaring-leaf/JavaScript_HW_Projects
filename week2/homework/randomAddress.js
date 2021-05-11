const addressNum = [23, 532, 8, 893, 56, 91, 278, 400, 95, 72];
const streetName = ['First Ave','2nd Street','Main St', 'Delaware Ave','Pine St', 'Oak St'];
const city = ['Buffalo','Springville','Rome','Saranac Lake','Forest Groove'];
const state = ['NY','MA','CO','CA','CT','NV','MI','MD','VT']
const zip = [14203,56002,31523,87221,21110,34334];

let myRandAddress = '';

let i = getRandom(addressNum.length);
myRandAddress += addressNum[i] + ' ';

i = getRandom(streetName.length);
myRandAddress += streetName[i] + ', ';

i = getRandom(city.length);
myRandAddress += city[i] + ', ';

i = getRandom(state.length);
myRandAddress += state[i] + '  ';

i = getRandom(zip.length);
myRandAddress += zip[i];

console.log(myRandAddress);

// Function
function getRandom(arrayLen) {
    let num = Math.random();
    num *= arrayLen;
    return Math.floor(num);
}