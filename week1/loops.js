const teams = ["Bruins","Sabres","Leafs","Penguins"];
// Loop over teams array and print on new lines
for (let i=0;i<teams.length;i++) {
    console.log(i,teams[i]);
}

teams.forEach(function(team) {
    console.log(team);
});

const bestTeam = teams.filter(function(team) {
    return team === "Sabres";
});

console.log(bestTeam);