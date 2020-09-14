$(document).ready(function () {


    function loadUserData () {
        $.ajax({
            type: 'get',
            url: '/auth/me',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            success: function (data) {
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    alert('Error desconocido');
                    window.location.replace('/');
                } else {
                    alert('NO ESTA AUTORIZADO');
                    window.location.replace('/');
                }
            },
        });
    }
     // Load user initial Data
     if (window.localStorage.getItem('x-access-token')) {
        loadUserData()
    }else {
        alert('Error desconocido');
        window.location.replace('/');
    }

});