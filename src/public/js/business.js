$(document).ready(function () {



    /**
    * Function to load all business
    */
    function loadBusiness() {
        $('#tbody-business').html('Cargando empresas...');
        $.ajax({
            type: 'get',
            url: '/api/business',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            success: function (data) {
                $('#tbody-business').empty();
                data.data.forEach(function (business) {
                    $('#tbody-business').append(generateTableTemplate(business.name, business.description, business.code))
                })
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#tbody-business').empty();
                    $('#tbody-business').html(xhr.responseJSON.error);
                    Swal.fire({
                        icon: 'error',
                        title: xhr.responseJSON.error,
                        timer: 2500
                    });
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
     * Event to create a new Business
     */
    $('#btn-newBusiness').on('click', function () {
        let businessName = $('#businessName').val();
        let businessDescription = $('#descriptionBusiness').val();

        //We verify if the fields are empty
        if (businessName === '' || businessDescription === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacios',
                timer: 2500
            });
        } else {
            newBusiness(businessName, businessDescription);
            //We clean the form
            $('#businessName').val('');
            $('#descriptionBusiness').val('');
        }

    });

    /**
     * Fuction to generate a new business
     * @param {*} businessName 
     * @param {*} businessDescription 
     */
    function newBusiness(businessName, businessDescription) {
        $.ajax({
            type: 'post',
            url: '/api/business',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            data: JSON.stringify({
                businessName: businessName,
                businessDescription: businessDescription
            }),
            dataType: 'json',
            success: function (data) {
                //We notificate that the action is done
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    timer: 2500
                });
                //We charge the business in the database
                loadBusiness();
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                    Swal.fire({
                        icon: 'error',
                        title: xhr.responseJSON.error,
                        timer: 2500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos vacios',
                        timer: 2500
                    });
                }
            },
        })
    }

    /**
     * Function to generate table template
     * @param {*} Nombre 
     * @param {*} descripcion 
     * @param {*} Code
     */
    function generateTableTemplate(nombre, descripcion, code) {
        return '<tr>' +
            '<td>' + nombre + '</td>' +
            '<td>' + code + '</td>' +
            '<td>' + descripcion + '</td>' +
            '</tr>';
    }
    

    // Load initial orders
    if (window.localStorage.getItem('x-access-token')) {
        loadBusiness()
    } else {
        window.location.replace('/');
    }
});