var url = "http://localhost:8888";


function registerUser() {
    var username = document.getElementsByClassName("username");
    var password = document.getElementsByClassName("password");

    $.ajax({
        url: url + "/register",
        method: "post",
        data: {
            username: username[0].value,
            password: password[0].value
        }
    }).success(function(response){
        alert(response.message);
    }).error(function(response) {
        alert(response.message);
    });
}
function loginUser() {
    var username = document.getElementsByClassName("username");
    var password = document.getElementsByClassName("password");

    $.ajax({
        url: url + "/login",
        method: "post",
        data: {
            username: username[0].value,
            password: password[0].value
        }
    }).success(function(response){
        window.location.assign("/home");
    }).error(function(response) {
        alert("Incorrect Username or password!");
    });
}

function getUser(){
    var username = document.getElementsByClassName("username");

    $.ajax({
        url: url + "/user",
        method: "get"
    }).success(function(response){
        document.getElementsByClassName("username")[0].innerHTML = response.username;
    }).error(function(response){
        alert("Cannot fetch data. Please try again");
    });

    $.ajax({
        url: url + "/items",
        method: "get"
    }).success(function(response){
        //grab all the items and append them to the table
        //displays all the item the owner has
        for(var i = 0; i < response.length; i++){
            var item = response[i];

            $("#itemtable").append("<tr>" + 
            "<td>" + item._id + "</td>" +
            "<td>" + item.details + "</td>" + 
            "<td>" + item.post_time + "</td>" +
            "<td>" + item.edit_time + "</td>" +
            '<td><button onclick = "editItem(\'' + item._id + '\')">edit</button></td>' +
            '<td><button onclick = "deleteItem(\'' + item._id + '\')"> delete </button></td>' +
            "<td>" + item.isPublic + "</td>" +
        "</tr>");
        }
    }).error(function(response){
        alert("Cannot fetch data. please try again or cry");
    });
}
function editItem(id) {
    var details = prompt("please enter new details (" + id + ")", "");

    if(details === null)
        return;
    
        var isPublic = prompt("change public post? (true/false)","");
    if(isPublic === null)
        return;
    
        if(details !== "" && isPublic !== ""){

            if(isPublic .toLowerCase() === "true" || isPublic.toLowerCase() === "false"){
                $.ajax({
                    url: url + "/edit",
                    method: "post",
                    data: {
                        _id: id,
                        details: details,
                        isPublic: isPublic
                    }
                }).success(function(response){
                    alert("Item successfully edited!");
                    window.location.assign("/home");
                }).error(function(response){
                    alert("Cannot edit item. Please try again");
                });
            } else {
                alert('please only place true of flase for public post?');
            }
        } else { 
            alert('please put something, you cant leave this blank')
        }
}

function deleteItem(id){
    var decision = confirm("you are about to delete this row(" + id+ "), Are you sure you want to delete it?");

    if(decision){
        $.ajax({
            url: url + "/delete",
            method: "post",
            data: {
                _id: id
            }
        }).success(function(response){
            alert("Item successfully deleted!");
            window.location.assign("/home");
        }).error(function(response){
            alert("cannot delete this ite, try again");
        });
    }
}

function addItem(){
    var details = document.getElementsByClassName("details")[0];
    var isPublic = document.getElementsByClassName("isPublic")[0];

    console.log(isPublic.checked);

    $.ajax({
        url: url + "/add",
        method: "post",
        data: {
            details:details.value,
            isPublic: isPublic.checked
        }
    }).success(function(response){
        console.log(response);
        alert("Item successfully added!");

        //add data to table
        $("#itemtable").append("<tr>" + 
                "<td>" + response.item.id + "</td>" +  
                "<td>" + response.item.details + "</td>" +
                "<td>" + response.item.post_time + "</td>" + 
                "<td>" + response.item.edit_time + "</td>" +
                '<td><button onclick = "editItem(\'' + response.item._id + '\')">edit</button></td>' +
                '<td><button onclick = "deleteItem(\'' + response.item._id + '\')"> delete </button></td>' +
                "<td>" + response.item.isPublic + "</td>" +
            "</tr>");
    }).error(function(responese){
        alert("Cannot add iteam. please try again");
    });
}
 function getPublicItems(){
    
               
        $.ajax({
            url: url + "/items/public",
            method: "get"
        }).success(function(response){
            //grab all the items and append them to the table
            //displays all the item the owner has
            for(var i = 0; i < response.length; i++){
                var item = response[i];
    
                $("#publicitemtable").append("<tr>" + 
                "<td>" + item._id + "</td>" +
                "<td>" + item.details + "</td>" + 
                "<td>" + item.post_time + "</td>" +
                "<td>" + item.edit_time + "</td>" +
            "</tr>");
            }
        }).error(function(response){
            alert("Cannot fetch data. please try again or cry");
        });
}