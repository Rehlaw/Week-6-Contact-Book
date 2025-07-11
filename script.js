// GLOBAL VARIABLES
let apiKey = '';
const rootPath = 'https://mysite.itvarsity.org/api/ContactBook/';

// CHECK IF API KEY EXISTS WHEN PAGE LOADS
function checkApiKey() {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
        apiKey = storedApiKey;
        // SHOW CONTACTS PAGE (SHOW PAGE)
        showContacts();
        // GET CONTACTS (API CALL)
        getContacts()
    }
}

// SET THE API KEY AND STORE IT
function setApiKey() {
    const inputApiKey = document.getElementById('apiKeyInput').value.trim();

    if (!inputApiKey){
        alert('Please enter an API key!');
        return;
    }

    // VALIDATE API KEY FIRST
    fetch(rootPath + "controller/api-key/?apiKey=" + inputApiKey)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            if (data == "1") {
                apiKey = inputApiKey;
                localStorage.setItem("apiKey", apiKey);
                showContacts();
                getContacts();
            } else {
                alert("Invalid API key entered!");
            }
        })
        .catch(function (error) {
            alert('Error validation your API Key. Please try again.');
        });
}

// SHOW DIFFERENT PAGES
function showPage(pageId) {
    // HIDE ALL PAGES
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // SHOW SELECTED PAGE
    document.getElementById(pageId).classList.add('active');
}

function showContacts() {
    showPage('contactsPage');
}

function showAddContacts() {
    showPage('addContactPage');
    // CLEARTHE FORM
    document.getElementById('addContactForm').reset();
}

function showEditContact(contactId) {
    showPage('editContactPage')
    // LOAD CONTACT DATA FOR EDITING
    loadContactForEdit(contactId);
}