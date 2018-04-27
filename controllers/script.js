//this script will just handle a single page now,
//and only have the functions fo rthe blockchain,
let url = "http://ec2-18-222-95-22.us-east-2.compute.amazonaws.com";

function getBalance(){
    var account = document.getElementsByClassName("account");

    $.ajax({
        url: url + "/balance",
        method: "post",
        data: {
            account: account[0].value
        }
    }).success(function(response){
        document.getElementsByClassName("balance")[0].innerHTML = response.balance;
    }).error(function(response){
        alert("Error in getting balance");
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
