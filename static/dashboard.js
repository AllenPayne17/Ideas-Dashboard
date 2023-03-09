// define the URL for the APIs
const baseUrl = "http://127.0.0.1:5000";

// define the function to get all ideas
function getAllIdeas() {
    fetch(`${baseUrl}/idea`)
    .then(response => response.json())
    .then(data => {
        const ideasTableBody = document.getElementById("ideas-table-body");
        ideasTableBody.innerHTML = "";
        data.forEach(idea => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idea[1]}</td>
                <td>${idea[2]}</td>
                <td>$${idea[3]}</td>
                <td>$${idea[4]}</td>
                <td>${idea[5]}</td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit-idea-modal" onclick="editIdea(${idea[0]})">Edit</button></td>
                <td><button type="button" class="btn btn-danger" onclick="deleteIdea(${idea[0]})">Delete</button></td>
            `;
            ideasTableBody.appendChild(row);
        });
    })
    .catch(error => console.log(error));
}

// call the function to get all ideas on page load
getAllIdeas();

// define the function to add an idea
function addIdea() {
    const form = document.getElementById("add-idea-form");
    const data = {
        title: form.title.value,
        competitors: form.competitors.value,
        price: form.price.value,
        cost: form.cost.value,
        market_size: form.market_size.value
    };
    fetch(`${baseUrl}/addidea`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getAllIdeas();
        $("#add-idea-modal").modal("hide");
        form.reset();
    })
    .catch(error => console.log(error));
}

$(document).ready(function() {
    // get the "Add Idea" form
    var addIdeaForm = $('#add-idea-form');
  
    // add an event listener to the form submission
    addIdeaForm.on('submit', function(event) {
      event.preventDefault(); 
      addIdea()
    });
});

$(document).ready(function() {
    // get the "Add Idea" button
    var addIdeaBtn = $('button[data-target="#add-idea-modal"]');
  
    // add an event listener to the button to trigger the modal
    addIdeaBtn.on('click', function() {
      $('#add-idea-modal').modal({
        backdrop: 'static',  // prevent closing on outside click
        keyboard: false  // prevent closing with ESC key
      });
    });
  });



$(document).ready(function() {
    // get the "Add Idea" button
    var editIdeaBtn = $('button[data-target="#edit-idea-modal"]');
  
    // add an event listener to the button to trigger the modal
    editIdeaBtn.on('click', function() {
      $('#edit-idea-modal').modal({
        backdrop: 'static',  // prevent closing on outside click
        keyboard: false  // prevent closing with ESC key
      });
    });
  });















    // define the function to edit an idea
    function editIdea(id) {
        fetch(`${baseUrl}/idea/${id}`)
        .then(response => response.json())
        .then(data => {
            const form = document.getElementById("edit-idea-form");
            form.id.value = data[0];
            form.title.value = data[1];
            form.competitors.value = data[2];
            form.price.value = data[3];
            form.cost.value = data[4];
            form.market_size.value = data[5];
            
            $(document).ready(function() {
                // get the "edit Idea" form
                var editIdeaForm = $('#edit-idea-form');
            
                // add an event listener to the form submission
                editIdeaForm.on('submit', function(event) {
                event.preventDefault(); 

                const form = document.getElementById("edit-idea-form");
                const data = {
                    title: form.title.value,
                    competitors: form.competitors.value,
                    price: form.price.value,
                    cost: form.cost.value,
                    market_size: form.market_size.value
                };
                 fetch(`${baseUrl}/idea/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        getAllIdeas();
                        $("#edit-idea-modal").modal("hide");
                        form.reset();
                    })
                    .catch(error => console.log(error));
                });
            });

        })
        .catch(error => console.log(error));
    }

function deleteIdea(id) {
    fetch(`${baseUrl}/idea/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    getAllIdeas();
    })
  .catch(error => console.error(error));
}


    