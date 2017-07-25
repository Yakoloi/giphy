$(document).ready(function () {

    var animalArray = [];

    function renderButtons() {
        $("#animalButtons").empty();

        for (var i = 0; i < animalArray.length; i++) {

            var button = $("<button>");
            button.addClass("animal");
            button.attr("data-name", animalArray[i]);

            button.text(animalArray[i]);

            $("#animalButtons").append(button);
        };

    };

    $("#addAnimal").on("click", function (event) {

        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animalArray.push(animal);
        renderButtons();

        console.log(animal)


        $(".animal").on("click", function () {
            var animal = $(this).attr("data-name");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g&rating=pg";

            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .done(function (response) {
                    var results = response.data;
                    console.log("response" + response)

                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='item'>");

                        var p = $("<p>").text("Rating: " + results[i].rating);

                        var animalImage = $("<img>");
                        animalImage.attr("data-state", "animate")
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-animate", results[i].images.fixed_height.url);
                        animalImage.attr("src", results[i].images.fixed_height.url);
                        animalImage.attr("id", "gif");

                        gifDiv.prepend(p);
                        gifDiv.prepend(animalImage);

                        $("#animals").prepend(gifDiv);
                    }
                });
        });
    });
    renderButtons();

    $(document).on('click', '#gif', function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});
