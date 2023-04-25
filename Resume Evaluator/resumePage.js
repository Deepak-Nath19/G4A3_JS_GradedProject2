// fetching data from json file
const fetchData = fetch('./Data.json')
	.then((response) => response.json())
	.then((content) => {
		return content;
	}
	);
//console.log(fetchData);


//search functinality
const searchBar = document.getElementById("search-bar");
//searchBar.addEventListener("input", searchTheResume);
searchBar.addEventListener("keyup", searchTheResume);

//next fnctonality
const nextButton = document.getElementById("next");
nextButton.addEventListener('click', goToNextResume);

//previous functionality
const previousButton = document.getElementById("previous");
previousButton.addEventListener('click', goToPreviousResume);

let id = 0;
let indexHandler = [];

function begin() {
	fetchData.then(function (record) {
		let resumes = record.resume;
		for (const item in resumes) {
			indexHandler.push(resumes[item].id - 1);
		}
		writeDetailsIntoTheResume(indexHandler[0]);
		hidePreviousButton();
		document.getElementById("no-match").style.display = "none";
	});
}

begin();



function hideNextButton() {
	document.getElementById("next").style.display = "none";
}

function hidePreviousButton() {
	document.getElementById("previous").style.display = "none";
}

function displayNextButton() {
	document.getElementById("next").style.display = "block";
}

function displayPreviousButtton() {
	document.getElementById("previous").style.display = "block";
}

function goToPreviousResume() {
	id--;
	writeDetailsIntoTheResume(indexHandler[id]);
	if (id == 0) hidePreviousButton();
	if (id < (indexHandler.length - 1)) displayNextButton();
}


function goToNextResume() {
	id++;
	writeDetailsIntoTheResume(indexHandler[id]);
	if (id == (indexHandler.length - 1)) hideNextButton();
	if (id > 0) displayPreviousButtton();
}

function resetId() {
	id = 0;
}

function resetIndexHandler() {
	fetchData.then(function (record) {
		let resumes = record.resume;
		indexHandler.length = 0;
		for (const item in resumes) {
			indexHandler.push(resumes[item].id - 1);
		}
	});
};

function searchTheResume(event) {

	if (event.keyCode !== 13) {
		document.getElementById("no-match").style.display = "none";
		document.getElementById("template").style.display = "block";
	}

	if (searchBar.value == "") {
		displayNextButton();
		resetId();
		resetIndexHandler();
		writeDetailsIntoTheResume(id);
	}
	else {
		let input = searchBar.value;
		fetchData.then(function (record) {
			let resumes = record.resume;
			indexHandler.length = 0;
			for (const item in resumes) {
				if (resumes[item].basics.AppliedFor.toLowerCase() === input.toLowerCase()) {
					indexHandler.push(resumes[item].id - 1);
				}
			}
			if (indexHandler.length == 0) {
				console.log("no matching element found");
				hideNextButton();
				hidePreviousButton();
				if (event.keyCode === 13) {
					document.getElementById("template").style.display = "none";
					document.getElementById("no-match").style.display = "block";
					//console.log("enter pressed");
				}
			}
			else {
				console.log(indexHandler.length == 1)
				if (indexHandler.length == 1) {
					hideNextButton();
					hidePreviousButton();
					resetId();
					writeDetailsIntoTheResume(indexHandler[id]);
				}
				else {
					resetId();
					writeDetailsIntoTheResume(indexHandler[id]);
					displayNextButton();
				}
			}
		})
	}
};

function writeDetailsIntoTheResume(index) {
	console.log("Inserting the record. ");
	fetchData.then(function (record) {
		let resumes = record.resume;

		//Inserting Basic details
		document.getElementById("name").innerText = resumes[index].basics.name;
		document.getElementById("postion").innerText = resumes[index].basics.AppliedFor;
		document.getElementById("phone-number").innerText = resumes[index].basics.phone;
		document.getElementById("gmail").innerText = resumes[index].basics.email;
		document.getElementById("linkedin").innerText = resumes[index].basics.profiles.url;

		// Inserting  skills details
		let skillsArray = resumes[index].skills.keywords;
		let skillsString = skillsArray.join('<br>');
		let skillsOutput = `<p>  ${skillsString} </p>`;
		document.getElementById("skills").innerHTML = skillsOutput;

		//Inserting hobbies details
		let hobbiesInArray = resumes[index].interests.hobbies;
		let hobbiesString = hobbiesInArray.join('<br>');
		let hobbiesOutput = `<p> ${hobbiesString} </p>`
		document.getElementById("hobbies").innerHTML = hobbiesOutput;

		// Inserting  company details
		document.getElementById("company-name").innerText = resumes[index].work["Company Name"];
		document.getElementById("position").innerText = resumes[index].work.Position;
		document.getElementById("start-date").innerText = resumes[index].work["Start Date"];
		document.getElementById("end-date").innerText = resumes[index].work["End Date"];
		document.getElementById("summary").innerText = resumes[index].work.Summary;

		// Inserting Projects details
		document.getElementById("project-name").innerText = resumes[index].projects.name;
		document.getElementById("project-description").innerText = resumes[index].projects.description;

		// Inserting Education  UG details
		let ugEdu = resumes[index].education.UG;
		let ugInArray = Object.values(ugEdu);
		let UgInString = ugInArray.join(', ');
		document.getElementById("UG").innerText = UgInString;

		// Inserting Education  Senior Secondary details
		let senSecEdu = resumes[index].education["Senior Secondary"];
		let senSecInArray = Object.values(senSecEdu);
		let senSecInString = senSecInArray.join(', ');
		document.getElementById("SS").innerText = senSecInString;

		// Inserting  Education High School details
		let hiScEdu = resumes[index].education["High School"];
		let hiScInArray = Object.values(hiScEdu);
		let hiScInString = hiScInArray.join(', ');
		document.getElementById("HS").innerText = hiScInString;

		// Inserting  Internship details
		document.getElementById("internship-company").innerText = resumes[index].Internship["Company Name"];
		document.getElementById("internship-position").innerText = resumes[index].Internship["Position"];
		document.getElementById("internship-start-date").innerText = resumes[index].Internship["Start Date"];
		document.getElementById("internship-end-date").innerText = resumes[index].Internship["End Date"];
		document.getElementById("internship-summary").innerText = resumes[index].Internship["Summary"];

		// Inserting  Achievement details
		document.getElementById("achievement-summary").innerText = resumes[index].achievements.Summary;
	});
};
