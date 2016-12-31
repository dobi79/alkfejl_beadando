$(function(){
    var $forms=$('.delete');
    var $form

    $('.modal .modal-ok').on('click', function(){
        $.ajax({
            url: '/ajax'+$form.attr('action'),
            data: $form.serializeArray(),
            type: 'DELETE',
            dataType: 'html',
        }).done(function(resp){
            var data=JSON.parse(resp);
            $('.container').html(data.message);
            location.assign('/home');
        })
        .fail(function(){
            alert('hiba!')
        });
    });

    $forms.on('submit', function(event){
        $form=$(event.target);
        $('.modal').modal('show');
        event.preventDefault();
    });
});