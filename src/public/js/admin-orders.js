$(document).ready(function () {
    
     /**
     * Event to load order data by date and state
     */
    $('#btn-order').on('click', function (e) {
        let state= $('#order-status option:selected').val();
        let date= $('#order-date').val();

        if(!date){
            date = null
        }
        if( state === 'null' && date){
            alert('Seleccione un estado de pedido')
        } 
        else {
            loadOrders(state, date);
        }
    });

     /**
     * Function to load all user orders
     */
    function loadOrders(state, date) {
        $('#tbody-orders').html('Cargando pedidos...');
        $.ajax({
            type: 'get',
            url: '/orders/' + state + '/' + date,
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
                    $('#tbody-orders').append(generateTableOrdersBodyTemplate(order.createdAt, order.codeDelivery, order.name, order.phone, order.city, order.distric,state, order.orderDescription))
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

    
    /**
     * Function to generate table order template
     * @param {*} createdAt 
     * @param {*} idDelivery 
     * @param {*} clientName 
     * @param {*} phone 
     * @param {*} city 
     * @param {*} distric 
     * @param {*} state 
     * @param {*} orderDescription
     * @param {*} limitDate
     */

    function generateTableOrdersBodyTemplate(createdAt, idDelivery, clientName, phone, city,distric, state, orderDescription) {
        return '<tr>'+
        '<td>'+createdAt+'</td>' +
        '<td>'+clientName+'</td>' +
        '<td>'+idDelivery + '</td>' +
        '<td><input type="text" class="form-control" id=""placeholder="Nombre"></td>' +
        '<td>'+phone+'</td>'+
        '<td>'+orderDescription + '</td>'+
        '<td>' +                                
          '<select class="form-control" id="order-status">'+
            '<option value=null>Seleccione un estado</option>'+
            '<option value=null>Mostrar todos</option>'+
            '<option value=1>No verificado</option>'+
            '<option value=2>Verificado</option>'+
            '<option value=3>Procesado</option>'+
            '<option value=4>Completado</option>'+
            '<option value=5>Retirado</option>' +
            '<option value=6>Entregado</option>' +
            '<option value=7>No Entregado</option>' +
            '<option value=8>Rechazado</option> ' +
         '</select>'+
        '</td>'+
        '<td>'+                 
          '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-content-orders"><i class="fas fa-eye"></i> Más detalles</button></td>' +
        '</td>' +
      '</tr>'; 
    }


    // Load initial orders
    if (window.localStorage.getItem('x-access-token')) {
        loadOrders(null,null)
    } else {
        window.location.replace('/');
    }
    

})