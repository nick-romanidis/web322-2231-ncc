// Wait for the document to be ready ...
$(function() {
    $("button#getAllUsers").on("click", function() {
        $.get("/api/users", function(objFromJson, status) {
            console.log(objFromJson);
            $("#lastMessage").html(objFromJson.messageHtml);

            var $li = $("<li></li>").html(objFromJson.messageHtml).addClass("eventListItem");
            $("#eventList").append($li);
        });
    });

    $("button.getOneUser").on("click", function() {
        var id = $(this).attr("user-id");

        $.get(`/api/users/${id}`, function(objFromJson, status) {
            console.log(objFromJson);
            $("#lastMessage").html(objFromJson.messageHtml);

            var $li = $("<li></li>").html(objFromJson.messageHtml).addClass("eventListItem");
            $("#eventList").append($li);
        });
    });

    $("#eventList").on("click", "li", function() {
        $(this).css("color", "red");
    });
});

