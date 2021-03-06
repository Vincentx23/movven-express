$(document).ready(function () {

    /**
     * Event to create a new order
     */
    $('#btn-newOrder').on('click', function (e) {
        
        let clientName = $('#clientName').val(); 
        let phone = $('#phone').val(); 
        let city= $('#city').val();
        let distric = $('#distric').val();
        let amountPakages = $('#amountPakages').val(); 
        let totalDimensions= $('#totalDimensions').val();
        let directionDetails =  $('#directionDetails').val();
        let orderDescription = $('#orderDescription').val();
        let limitDate = $('#limitDate').val();
        let codeDelivery = $('#codeDelivery').val();
        let payment =  $('#payment').val();

        newOrder(clientName,phone, city, distric, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, codeDelivery, payment);
        
    });

    function newOrder (clientName, phone, city, distric, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, codeDelivery, payment) {
        $.ajax({
            type: 'post',
            url: '/order',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },
            data: JSON.stringify({
                clientName:clientName,
                phone: phone,
                city: city,
                distric: distric,
                amountPakages: amountPakages,
                totalDimensions: totalDimensions,
                directionDetails: directionDetails,
                orderDescription: orderDescription,
                limitDate: limitDate,
                codeDelivery: codeDelivery,
                payment: payment
            }),
            dataType: 'json',
            success: function (data) {

                alert('Pedido ingresado satisfactoriamente')
                $("#form-order")[0].reset();
                loadOrders(null, null);
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
    }
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
     * Event to load specific order data by id
     */
    $(this).on('click','#btnDetalle', function (e) {
        e.preventDefault();
        let orderId = $(this).attr('data-id')
        loadOrderById(orderId)
    })

    /**
     * Function to get an order data by id
     * @param {*} orderId 
     */
    function loadOrderById(orderId) {
        $.ajax({
            type: 'get',
            url: '/order/' + orderId ,
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
                    $('#staticBackdrop').empty()
                    $('#staticBackdrop').append(generateModal(order.createdAt, order.codeDelivery, order.city, order.distric, order.directionDetails,order.limitDate,order.amountPakages, order.totalDimensions, order.payment))
                })
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    alert('no data')
                } else {
                    alert('NO ESTA AUTORIZADO');
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
        return '<tr>\n' +
            '<td>'+ createdAt +'</td>\n' +
            '<td id="td-codeDelivery" name="td-codeDelivery">'+idDelivery+'</td>\n' +
            '<td>'+clientName+'</td>\n' +
            ' <td>'+phone+'</td>\n' +
           // '<td>'+city+'</td>\n' +
            '<td>'+orderDescription+'</td>\n' +
            '<td>'+state+'</td>\n' +
            '<td> <button type="button" id="btnDetalle" data-id="'+orderId+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#staticBackdrop"><i class="fas fa-eye"></i> Más detalles</button></td>'+
            '</tr>';
        

    }

    function generateModal(createdAt,codeDelivery, city, distric, directionDetails, limitDate, amountPakages, totalDimensions, pago){
        // Modal 
    return'<div class="modal-dialog">\n' +
        '<div class="modal-content">\n' +
        '<div class="modal-header">\n' +
            '<h5 class="modal-title" id="staticBackdropLabel">Detalles</h5>\n' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
            '<span aria-hidden="true">&times;</span>\n' +
            '</button>\n' +
        '</div>\n' +
        '<div class="modal-body">\n' +
        '<div class="container">\n' +
            '<div class="row">\n' +
                '<div class="col-sm">\n' +
                     //iddelivery
                    '<h6 class="m-0 font-weight-bold movven-color"><i class="fas fa-barcode"></i> ID Delivery </h6>\n' +codeDelivery +
                '</div>\n' +
                '<div class="col-sm">\n' +                  
                    //Provincia
                     '<h6 class="m-0 font-weight-bold movven-color"><i class="fas fa-map-signs"></i> Provincia y Distrito</h6>\n' +city +', '+ distric + 
                '</div>\n' +
            
            '</div>\n' + 
         
            '<div class="row">\n' +            
                '<div class="col-sm">\n' +
                '<br>\n' + 
                     //Direccion
                    '<h6 class="m-0 font-weight-bold movven-color"><i class="fas fa-map"></i> Dirección </h6>\n' +directionDetails +
                '</div>\n' + 
                '<div class="col-sm">\n' + 
                '<br>\n' +    
                    //Límite de tiempo para entrega.
                    '<h6 class="m-0 font-weight-bold movven-color"><i class="fas fa-clock"></i> Límite de tiempo para entrega</h6>\n' +limitDate  +
                '</div>\n' + 
            '</div>\n' + 
            '<div class="row">\n' +            
                '<div class="col-sm">\n' +
                '<br>\n' +  
                    //Cantidad de paquetes
                    '<h6 class="m-0 font-weight-bold movven-color"><i class="fas fa-cubes"></i> Cantidad de paquetes</h6>\n' +amountPakages+
                        // Modal +
                '</div>\n' + 
                '<div class="col-sm">\n' + 
                '<br>\n' +    
                    // Peso y dimensiones
                    '<h6 class="m-0 font-weight-bold movven-color"><i class="fas fa-weight-hanging"></i> Peso y dimensiones</h6>\n' +totalDimensions+
                '</div>\n' + 

            '</div>\n' +   
            '<div class="row">\n' +            
                '<div class="col-sm">\n' +
                '<br>\n' +  
                    //Pago total
                    '<h6 class="m-0 font-weight-bold movven-color"><i class="fas fa-money-bill"></i> Pago total</h6>\n' +pago+' $'+       
                '</div>\n' +  
            '</div>\n' +
        '</div>\n' +



        '</div>\n' +
        '<div class="modal-footer">\n' +
            '<button type="button" class="btn btn-outline-dark" data-dismiss="modal">Cerrar</button>\n' +
          
    '</div>\n' +
    '</div>\n' +
    '</div>\n';

        }
    /**
     * Function to load all user orders
     */
    function loadOrders(state, date) {
        $('#tbody-orders').html('Cargando pedidos...');
        $.ajax({
            type: 'get',
            url: '/userOrders/' + state + '/' + date,
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
                    $('#tbody-orders').append(generateTableOrdersBodyTemplate(order.id,order.createdAt, order.codeDelivery, order.clientName, order.phone, order.city, order.distric,state, order.orderDescription))
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