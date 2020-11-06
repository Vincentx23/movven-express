$(document).ready(function () {


    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/auth/login',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                email: $('#email').val(),
                password: $('#password').val()
            }),
            dataType: 'json',
            success: function (data) {
                const token = data.token;
                window.localStorage.setItem('x-access-token', token);
                if(data.user.rol === 0) {
                    window.location.replace('/admin');
                }else if(data.user.rol === 1) {
                    window.location.replace('/dashboard');
                }
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                    document.getElementById('alert1').innerHTML =
                    '<div class="alert alert alert-danger alert-dismissible fade show" role="alert" id="alert1" >\n'+
                        ' <p>' + xhr.responseJSON.error + '</p>' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>\n' +
                        '</button>  \n'+ 
                    '</div>'
                } else {
                    alert('Error desconocido')
                }
            },
        })
    })
})