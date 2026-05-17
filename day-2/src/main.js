const people = [
  {
    first: "Grace",
    last: "Rasaily",
    section: "P"
  },
  {
    first: "Sakshyam",
    last: "Rimal",
    section: "P"
  },
  {
    first: "Sangam",
    last: "Pandey",
    section: "C"
  }
];



people.map((person, index) => {
  console.log(`${index}. ${person.first} is a student in section ${person.section}`);
});

let [{ first }] = people.filter(person => person.section == "C");
console.log(first);


let selector = prompt("What key?");
let section_c_2 = people.filter(person => {
  if (person.section == "C") {
    return person;
  }
})[0];
console.log(section_c_2[selector]);