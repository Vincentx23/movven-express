$(document).ready(function () {
    
    
    /**
     * Event to create a new user
     */
    $('#btn-newUser').on('click', function (e) {
        e.preventDefault();
        let rol = $('#select-rol option:selected').val();

        if(rol === null) {
            alert('Seleccione el rol del usuario')
        }

        $.ajax({
            type: 'post',
            url: '/auth/register',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            data: JSON.stringify({
                name: $('#userName').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                passwordCheck: $('#passwordCheck').val(),
                rol: rol,
                }),
            dataType: 'json',
            success: function () {
                alert('Usuario ingresado satisfactoriamente')
                $("#form-user")[0].reset();
                loadUsers();
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                    document.getElementById('alert1').innerHTML =
                        '<div class="alert alert alert-danger alert-dismissible fade show" role="alert" id="alert1" >\n' +
                        ' <p>' + xhr.responseJSON.error + '</p>' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>\n' +
                        '</button>  \n' +
                        '</div>'
                } else {
                    alert('Campos requeridos vacios')
                }
            },
        })
    });


    /**
     * Function to load all users
     */
    function loadUsers() {
        $('#tbody-users').html('Cargando pedidos...');
        $.ajax({
            type: 'get',
            url: '/users/' + 0,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                Accept: 'application/json',

                'x-access-token': window.localStorage.getItem('x-access-token')
            },       
            success: function (data) {
                $('#tbody-users').empty();
                let rol;
                data.data.forEach(function(user) {
                    if(user.userType === 0){
                        rol = 'Administrador'
                    } else if (user.userType === 1) {
                        rol = 'Cliente'
                    } else {
                        rol = 'Conductor'
                    }
                    $('#tbody-users').append(generateTableUsersBodyTemplate(user.name, user.email, user.password, rol));                
                })
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#tbody-users').empty();
                    $('#tbody-users').html(xhr.responseJSON.error);
                } else {
                    alert('NO ESTA AUTORIZADO');
                    window.location.replace('/');
                }
            },  
        });
    }

    
    /**
     * Function to generate table users template
     * @param {*} Nombre 
     * @param {*} Correo 
     * @param {*} Contraseña 
     * @param {*} Rol 
     */

    function generateTableUsersBodyTemplate(nombre, correo, contra, rol) {
        return '<tr>' +
        '<td>' + nombre + '</td>' +
        '<td>' + correo + '</td>' +
        '<td>' + contra + '</td>' +
        '<td>' + rol + '</td>' +
        '</tr>';
    }
  
     // Load initial users
     if (window.localStorage.getItem('x-access-token')) {
        loadUsers()
    } else {
        window.location.replace('/');
    }
    
})