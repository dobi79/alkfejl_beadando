$(function(){
    $('#search [name=q]').on('input', function(){
        $.get('/ajax/search',{
            q:$(this).val()
        }).done(function(result){
            let html = '';
            for(let i = 0; i < result.length; i++){
                const user = result[i];
                    if(user.id != 1111){
                        html += '<a class="list-group-item" href="/changeUser/' + user.id + '">' + user.lastname + " " + user.firstname + '</a>';
                    } 
            }
            $('.suggestions').html(html);
        });
    });
})