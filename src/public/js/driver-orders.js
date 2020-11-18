$(document).ready(function () {

     /**
     * Function to load all user orders
     */
    function loadOrders() {
        $('#tbody-orders').html('Cargando pedidos...');
        $.ajax({
            type: 'get',
            url: '/order',
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
                    $('#tbody-orders').append(generateTableOrdersBodyTemplate(order.orderId,order.createdAt, order.codeDelivery, order.clientName, order.phone, order.city, order.distric,state, order.orderDescription))
                })
            
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#tbody-orders').empty();
                    $('#tbody-orders').html('No tiene pedidos asignados');
                } else {
                    alert('NO ESTA AUTORIZADO');
                    window.location.replace('/');
                }
            },
        });
    }

     /**
     * Function to generate table order template
     * @param {*} orderId
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

    function generateTableOrdersBodyTemplate(orderId,createdAt, idDelivery, clientName, phone, city,distric, state, orderDescription) {
        return    '<tr data-id="'+orderId+'">'+
    '    <td>   '+
    '        <div class="form-group form-check">'+
    '            <input type="checkbox" class="form-check-input" id="exampleCheck1">'+
    '            <label class="form-check-label" for="exampleCheck1">Entregado</label>'+
    '          </div>'+
    '    </td>'+
    '    <td>'+createdAt+'</td>'+
    '    <td>'+clientName+'</td>'+
    '    <td>'+idDelivery+'</td>'+
    '    <td>'+city +', '+ distric +'</td>   '+
    '    <td>'+phone+'</td>   '+
    '    <td>'+orderDescription+'</td>  '+
    '    <td>'+state+'</td> '+
    '  </tr>';
    }


        // Load initial orders
        if (window.localStorage.getItem('x-access-token')) {
        loadOrders()
        } else {
            window.location.replace('/');
        }
        

});