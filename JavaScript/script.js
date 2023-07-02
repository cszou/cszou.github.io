console.log("sucess!")

const mySkills = [
    "Python",
    "C++",
    "Java",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "Git",
];

const skillDiv = document.createElement("div");
skillDiv.classList.add("content-wrap");
skillDiv.innerHTML = "<h2>Skills</h2>";
const skillList = document.createElement("ul");
mySkills.forEach(skills => {
    const listItem = document.createElement("li")
    listItem.innerHTML = `${skills}`;
    skillList.append(listItem)
});
skillDiv.appendChild(skillList);
document.querySelector(".skills").append(skillDiv);