//can I say prepend new found articles to the same place in my handlebars file?

console.log("yo");


$("#clearButton").on("click", function (event) {
    event.preventDefault();
    //on the main page clear out your articles none should appear until you hit the scrapeData button 
    console.log("this clear function is running");
    $(".allHeadlines").hide();
});

$("#scraperButton").on("click", function (event) {
    event.preventDefault();

    $(".allHeadlines").hide();
    $.post("/all").then(function (err, data) {
        //grab this data and display it in the main page
        if (err) {
            console.log(err);
        }
        $(".allHeadlines").show();
        console.log(data);
    });
});

$(".saveButton").on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).data("id");
    $.post("/save/" + thisId).then(function (saved) {
        console.log(saved);
        //grab this item and remove it 
        $("#" + thisId).hide();

    });
});

$(".saveNote").on("click", function (event) {
    event.preventDefault();
    //add a note to an article
    //this is where we use populate
    var thisId = $(this).attr("data-id");
    var note = $("#noteAdded").val().trim();
    $.post("/headline").then(function (response) {
        $(".modal-body").append(note);
        window.location.reload();
    })
});

$(".openNote").on("click", function (event) {
    event.preventDefault();
    $.get("/notes").then(function (err, response) {
        if (err) throw err;
        $(".modal-body").append(response);
    })
});

$(".removeSaved").on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).data("id");
    $.post("/delete/" + thisId).then(function (removed) {
        console.log(removed);
        //grab this item and remove it 
        $("#" + thisId).hide();

    });
});