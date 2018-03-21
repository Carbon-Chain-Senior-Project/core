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
}

function getBalance(){
    var account = document.getElementsByClassName("account");

    $.ajax({
        url: url + "/balance",
        method: "post",
        data: {
            account: account[0].value
        }
    }).success(function(response){
        console.log(account + "has a balance of " + response.balance + "CarbonLinks");
        document.getElementsByClassName("balance")[0].innerHTML = response.balance;
    }).error(function(response){
        //handle case for account not existing in blockchain thus balance is zero, 
        //there could be other eeros
        console.log(account + "is not in chain, and balance is 0");
        document.getElementsByClassName("balance")[0].innerHTML = 0;
    });
}

function addPOP(){
    let customer = document.getElementsByClassName("customerAddress");
    let business = document.getElementsByClassName("businessAddress");
    let amount = document.getElementsByClassName("popAmt");

    $.ajax({
        url: url + "/pop",
        method: "post",
        data: {
            customer: customer[0].value,
            business: business[0].value,
            amount: amount[0].value
        }
    }).success(function(reponse){
        alert(reponse.message);
    }).error(function(err){
        alert("error in posting pop")
    });
}

function addTransaction(){
    let sender = document.getElementsByClassName("sendAddress");
    let recipent = document.getElementsByClassName("recpAddress");
    let amount = document.getElementsByClassName("txAmount");

    $.ajax({
        url: url + "/transaction",
        method: "post",
        data: {
            sender: sender[0].value,
            recipent: recipent[0].value,
            amount: amount[0].value
        }
    }).success(function(reponse){
        alert(reponse.message);
    }).error(function(err){
        alert("error in posting transaction")
    });
}