$(document).ready(function () {

    /**
     * Event to create a new order
     */
    $('#btn-newOrder').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/order',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            data: JSON.stringify({
                clientName: $('#clientName').val(),
                phone: $('#phone').val(),
                city: $('#city').val(),
                distric: $('#distric').val(),
                amountPakages: $('#amountPakages').val(),
                totalDimensions: $('#totalDimensions').val(),
                directionDetails: $('#directionDetails').val(),
                orderDescription: $('#orderDescription').val(),
                limitDate: $('#limitDate').val(),
                codeDelivery: $('#codeDelivery').val()
            }),
            dataType: 'json',
            success: function (data) {

                alert('Pedido ingresado satisfactoriamente')
                $("#form-order")[0].reset();
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
     * Event to load order data by date and state
     */
    $('#btn-order').on('click', function (e) {
        let state= $('#order-status option:selected').val();
        let date= $('#order-date').val();
        loadOrders(state, date);
    });

    /**
     * Event to load specific order data by code
     */
    $(this).on('click','#btnDetalle', function (e) {
        e.preventDefault();
        let code = $(this).attr('data-id')
        loadOrderById(code)
    })

    /**
     * Function to get an order data by code (id)
     * @param {*} codeDelivery 
     */
    function loadOrderById(codeDelivery) {
        $.ajax({
            type: 'get',
            url: '/order/' + codeDelivery,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },       
            success: function (data) {
                data.data.forEach(function(order) {
                    let state; 
                    if(order.state === 1){
                        state='No verificado'
                    } else if(order.state === 2) {
                        state = 'Verificado'
                    }else if(order.state === 3) {
                        state = 'Procesado'
                    } else if(order.state === 4) {
                        state = 'Completado'
                    } else if(order.state === 5) {
                        state = 'Retirado'
                    } else if(order.state === 6) {
                        state = 'Entregado'
                    } else if(order.state === 7) {
                        state = 'No entregado'
                    } else {
                        state = 'Rechazado'
                    }
                    alert(order.createdAt, order.codeDelivery, order.clientName, order.phone, order.city, order.distric,state)
                })
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    alert('no data')
                } else {
                    alert('NO ESTA AUTORIZADO');
                    window.location.replace('/');
                }
            },
        });
    }

    /**
     * Function to generate table order template
     * @param {*} createdAt 
     * @param {*} idDelivery 
     * @param {*} clientName 
     * @param {*} phone 
     * @param {*} city 
     * @param {*} distric 
     * @param {*} state 
     */

    function generateTableOrdersBodyTemplate(createdAt, idDelivery, clientName, phone, city,distric, state) {
        return '<tr>\n' +
            '<td>'+ createdAt +'</td>\n' +
            '<td id="td-codeDelivery" name="td-codeDelivery">'+idDelivery+'</td>\n' +
            '<td>'+clientName+'</td>\n' +
            ' <td>'+phone+'</td>\n' +
            '<td>'+city+'</td>\n' +
            '<td>'+distric+'</td>\n' +
            '<td>'+state+'</td>\n' +
            '<td> <button type="button" id="btnDetalle" data-id="' + idDelivery + '" class="btn btn-info"> Mas detalles </button></td>'+
            '</tr>\n';
    }
    /**
     * Function to load all user orders
     */
    function loadOrders(state, date) {
        $('#tbody-orders').html('Cargando pedidos...');
        $.ajax({
            type: 'get',
            url: '/order/' + state + '/' + date,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },       
            success: function (data) {
                $('#tbody-orders').empty();
                data.data.forEach(function(order) {
                    let state; 
                    if(order.state === 1){
                        state='No verificado'
                    } else if(order.state === 2) {
                        state = 'Verificado'
                    }else if(order.state === 3) {
                        state = 'Procesado'
                    } else if(order.state === 4) {
                        state = 'Completado'
                    } else if(order.state === 5) {
                        state = 'Retirado'
                    } else if(order.state === 6) {
                        state = 'Entregado'
                    } else if(order.state === 7) {
                        state = 'No entregado'
                    } else {
                        state = 'Rechazado'
                    }
                    $('#tbody-orders').append(generateTableOrdersBodyTemplate(order.createdAt, order.codeDelivery, order.clientName, order.phone, order.city, order.distric,state))
                })
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#tbody-orders').empty();
                    $('#tbody-orders').html(xhr.responseJSON.error);
                } else {
                    alert('NO ESTA AUTORIZADO');
                    window.location.replace('/');
                }
            },
        });
    }
 // Load initial orders
  if (window.localStorage.getItem('x-access-token')) {
    loadOrders(null,null)
  } else {
    window.location.replace('/');
  }
  

});