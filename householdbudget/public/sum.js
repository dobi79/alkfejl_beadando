$(function(){
    var budgets = document.getElementsByName('money');
    var money = 0
    for(i=0; i < budgets.length; ++i){
        money += +budgets[i].innerText;
    }
    var sumDiv = document.getElementById('sum');
    sumDiv.innerHTML = "<h1>Összesen: "+money+"</h1>";
});