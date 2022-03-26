
$(document).ready(function () {


    /**
     * Event to create a new user
     */
    $('#btn-newUser').on('click', function (e) {
        e.preventDefault();
        let rol = $('#select-rol option:selected').val();

        if (rol === null) {
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
                data.data.forEach(function (user) {
                    if (user.userType === 0) {
                        rol = 'Administrador'
                    } else if (user.userType === 1) {
                        rol = 'Cliente'
                    } else {
                        rol = 'Conductor'
                    }
                    $('#tbody-users').append(generateTableUsersBodyTemplate(user.name, user.email, rol, user.codeUser, user.id));
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

    function generateTableUsersBodyTemplate(nombre, correo, rol, code, idUser) {
        return '<tr>' +
            '<td>' + nombre + '</td>' +
            '<td>' + correo + '</td>' +
            '<td>' + rol + '</td>' +
            '<td>' + code + '</td>' +
            '<td> ' +
            ' <a type="button" data-id="' + idUser + '" id="btnUserDetail" class="btn btn-sm detalle" data-toggle="modal" data-target="#modal-detail-users"><i class="fas fa-eye"></i></a>' +
            ' <a type="button" data-id="' + idUser + '" id="btnAsingBusiness" class="btn btn-sm business" data-toggle="modal" data-target="#modal-asing-business"> <i class="fas fa-building"></i></a>' +
            '</td>' +
            '</tr>';
    }


    /**
     * Event to generate user detail modal
     */
    $(this).on('click', '#btnUserDetail', function () {

        var userId = $(this).attr('data-id');

        getUserById(userId);

    })


    /**
     * Function get user buy Id
     * @param {*} userId 
     */
    function getUserById(userId) {
        $.ajax({
            type: 'get',
            url: '/user/' + userId,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            success: function (data) {
                $('#modalDetailUserBody').empty()
                console.log(data)
                var userInfo = data.user;
                var rol = '';

                var businessName = userInfo.businessName;
                var businessCode = userInfo.businessCode;
                var businessDescription = userInfo.description;


                //We verify if the user have some business asigned
                if (userInfo.businessId === null) {
                    businessCode = 'No empresa asignada';
                    businessName = 'No empresa asignada';
                    businessDescription = 'No empresa asignada'
                }

                //We verify the user type
                if (userInfo.userType === 0) {
                    rol = 'Administrador'
                } else if (userInfo.userType === 1) {
                    rol = 'Cliente'
                } else {
                    rol = 'Conductor'
                }

                //We construct the modal with the information
                $('#modalDetailUserBody').append(detailModalTemplate(userInfo.name, userInfo.email, rol, userInfo.codeUser,
                    businessName, businessCode, businessDescription));
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#modalDetailUserBody').empty()
                    Swal.fire({
                        icon: 'error',
                        title: 'Error, no se puede consultar los datos',
                        timer: 2500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error desconocido',
                        timer: 2500
                    });
                }
            }
        })
    }
    /**
     * Function to generate detail user template
     * @param {*} userName 
     * @param {*} userMail 
     * @param {*} userRol 
     * @param {*} userCode 
     * @param {*} businessName 
     * @param {*} businessCode 
     * @param {*} businessDescription 
     * @returns 
     */
    function detailModalTemplate(userName, userMail, userRol, userCode, businessName, businessCode, businessDescription) {
        return ' <div class="container-fluid">' +
            '    <div class="col-md-12">' +
            '        <div class="row">' +
            '            <div class="col-sm-12" >' +
            '                <h4>Información del usuario</h4>' +
            '                <br>' +
            '                    <div class="row">' +
            '                        <!-- Usuario -->' +
            '                        <div class="col-4 col-sm-6">' +
            '                            <h6 class="m-0 font-weight-bold movven-color">' +
            '                                <i class="fas fa-building"></i> Nombre' +
            '                            </h6>' +
            '                            <span> ' + userName + ' </span>' +
            '                        </div>' +
            '                        <!-- Fecha -->' +
            '                        <div class="col-4 col-sm-6">' +
            '                            <h6 class="m-0 font-weight-bold movven-color">' +
            '                                <i class="fas fa-calendar-alt"></i> Correo electronico' +
            '                            </h6>' +
            '                            <span>' + userMail + '</span>' +
            '                            <br>' +
            '                                <br>' +
            '                                </div>' +
            '                                <div class="col-4 col-sm-6">' +
            '                                    <h6 class="m-0 font-weight-bold movven-color">' +
            '                                        <i class="fas fa-barcode"></i> Rol' +
            '                                    </h6>' +
            '                                    <span>' + userRol + '</span>' +
            '                                </div>' +
            '                                <div class="col-4 col-sm-6">' +
            '                                    <h6 class="m-0 font-weight-bold movven-color">' +
            '                                        <i class="fas fa-address-card"></i> Codigo de usuario' +
            '                                    </h6>' +
            '                                    <span>' + userCode + '</span>' +
            '                                    <br>' +
            '                                        <br>' +
            '                                        </div>' +
            '                                        <div class="col-4 col-sm-6">' +
            '                                            <h6 class="m-0 font-weight-bold movven-color">' +
            '                                                <i class="fas fa-building"></i> Empresa' +
            '                                            </h6>' +
            '                                            <span >' + businessName + '</span>' +
            '                                        </div>' +
            '                                        <div class="col-4 col-sm-6">' +
            '                                            <h6 class="m-0 font-weight-bold movven-color">' +
            '                                                <i class="fas fa-file-alt"></i> Codigo de empresa' +
            '                                            </h6>' +
            '                                            <span >' + businessCode + '</span>' +
            '                                            <br>' +
            '                                                <br>' +
            '                                                </div>' +
            '                                                <!-- Descripcxion -->' +
            '                                                <div class="col-4 col-sm-12">' +
            '                                                    <h6 class="m-0 font-weight-bold movven-color">' +
            '                                                        <i class="fas fa-file-alt"></i> Descripción de la empresa' +
            '                                                    </h6>' +
            '                                                    <span> ' + businessDescription + '</span>' +
            '                                                    <br>' +
            '                                                        <br>' +
            '                                                        </div>' +
            '                                                </div>' +
            '                                        </div>' +
            '                                </div>' +
            '                        </div>' +
            '                    </div>' +
            '            </div>';
    }



    /**
    * Function to load all business
    */
    function loadBusiness() {
        $.ajax({
            type: 'get',
            url: '/api/business',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            success: function (data) {
                $('#asingBusiness').empty();
                $('#asingBusiness').append(selectListGeneralOption());
                data.data.forEach(function (business) {
                    $('#asingBusiness').append(selectListTemplate(business.id, business.name))
                })
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#asingBusiness').empty();
                    $('#asingBusiness').html(xhr.responseJSON.error);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'NO ESTA AUTORIZADO',
                        timer: 2500
                    });
                    window.location.replace('/');
                }
            },
        });
    }



    /**
     * Select list template
     * @param {*} businessName 
     * @param {*} businessId 
     * @returns {String}
     */
    function selectListTemplate(businessId, businessName) {
        return '<option value="' + businessId + '">' + businessName + '</option>'
    }

    /**
     * Select list general 
     * @returns {String}
     */
    function selectListGeneralOption() {
        return '<option value="null"> Seleccione una opcion </option>'
    }


    /**
   * Event to generate user detail modal
   */
    $(this).on('click', '#btnAsingBusiness', function () {

        var userId = $(this).attr('data-id');
        $('#usertoasingbusiness').val(userId);

    })

    /**
     * Event to asing a business to a user
     */
    $('#btn-asingButton').on('click', function( ){
        var userId = $('#usertoasingbusiness').val();
        var businessId = $('#asingBusiness option:selected').val();

        asingBusinessToUser(businessId, userId)
    })



     /**
       * Function to update orders status
       * @param {*} userId 
       * @param {*} orderId 
       * @param {*} conductorId 
       */
      function asingBusinessToUser(businessId, userId){
          console.log(businessId);
          console.log(userId);
        $.ajax({
            type: 'put',
            url: '/api/business',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            data: JSON.stringify({
                businessId: businessId,
                userId: userId
            }),
            dataType: 'json',
            success: function (data) {
                
                Swal.fire({
                    icon: 'success',
                    title: 'Empresa asignada',
                    timer: 2500
                });      
                $('#asingBusiness').prop('selectedIndex', 0)   
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                    Swal.fire({
                        icon: 'error',
                        title: error,
                        timer: 2500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos requeridos vacios',
                        timer: 2500
                    });
                }
            },
        })
      }


    // Load initial users
    if (window.localStorage.getItem('x-access-token')) {
        loadUsers()
        loadBusiness()
    } else {
        window.location.replace('/');
    }

})