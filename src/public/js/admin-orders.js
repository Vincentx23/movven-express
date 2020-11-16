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
            loadConductors(state, date);
            
        }
    });

    
    /**
     * 
     * Function to get conductors users
     * 
     */
    function loadOrderStateById (orderId) {
        $.ajax({
            type: 'get',
            url: '/orderState/' + orderId,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },       
            success: function (data) {
                $('#lista-estado').empty()
                data.data.forEach(function(state) {
                    let states; 
                    if(state.newState === 1){
                        states='No verificado'
                    } else if(state.newState === 2) {
                        states = 'Verificado'
                    }else if(state.newState === 3) {
                        states = 'Procesado'
                    } else if(state.newState === 4) {
                        states = 'Completado'
                    } else if(state.newState=== 5) {
                        states = 'Retirado'
                    } else if(state.newState=== 6) {
                        states = 'Entregado'
                    } else if(state.newState === 7) {
                        states = 'No entregado'
                    } else {
                        states = 'Rechazado'
                    }
                   $('#lista-estado').append(generateStateLine(states,state.hora,state.fecha ))
                }
                )
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#lista-estado').empty()
                    $('#lista-estado').append(generateStateLineError());
                } else {
                    alert('Error desconocido');
                }
            },
        });
    }

    /**
     * 
     * Function to get conductors users
     * 
     */
    function loadConductors (state, date) {
        $.ajax({
            type: 'get',
            url: '/usersRole/' + 2,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token')
            },       
            success: function (data) {
                data.data.forEach(function(user) {
                    loadOrders(state,date, user.name, user.id)
                }
                )
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    loadOrders(state,date, 'No tiene conductores', 'No tiene conductores registrados')
                } else {
                    alert('Error desconocido');
                }
            },
        });
    }
     /**
     * Function to load all user orders
     */
    function loadOrders(state, date, conductorName, conductorVal) {
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
                    $('#tbody-orders').append(generateTableOrdersBodyTemplate(order.id,order.createdAt, order.codeDelivery, order.name, order.phone, order.city, order.distric,state, order.orderDescription, conductorName, conductorVal))
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

    function generateTableOrdersBodyTemplate(orderId,createdAt, idDelivery, clientName, phone, city,distric, state, orderDescription, conductorName, conductorVal) {
        return '<tr>'+
        '<td>'+createdAt+'</td>' +
        '<td>'+clientName+'</td>' +
        '<td>'+idDelivery + '</td>' +
        '<td>' +
            '<select class="form-control" id="select-conductor">'+
                '<option value="null">Seleccione conductor</option>'+
               '<option value="'+conductorVal+'">'+conductorName+'</option>'+
            '</select>'+
        '</td>' +
        '<td>'+phone+'</td>'+
        '<td>'+orderDescription + '</td>'+
        '<td>' +                                
          '<select class="form-control" id="order-status">'+
            '<option value=null>Seleccione un estado</option>'+
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
          '<button type="button" data-id="'+ orderId+'" id="btnDetalle" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-content-orders"><i class="fas fa-eye"></i> Más detalles</button></td>' +
        '</td>' +
      '</tr>'; 
    }

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
            url: '/adminOrder/' + orderId,
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
                    $('#modalDetailsBody').empty()
                    $('#modalDetailsBody').append(generateDetailModal(order.name, order.createdAt, order.codeDelivery, order.conductor, order.city, order.distric, order.directionDetails,order.limitDate,order.amountPakages, order.totalDimensions, order.phone, state, order.orderDescription, order.payment))
                })
                loadOrderStateById(orderId)

            },
            error: function (xhr, status, error) {
                if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                    $('#modalDetailsBody').empty()
                    $('#modalDetailsBody').append(generateDetailErrorMoral())
                } else {
                    alert('NO ESTA AUTORIZADO');
                    //window.location.replace('/');
                }
            },
        });
    }


    function generateDetailModal(name,createdAt,codeDelivery, conductor, city, distric, directionDetails, limitDate, amountPakages, totalDimensions, phone,state, orderDescription, payment){
        return' <div class="container-fluid">'+
        '<div class="row">'+
          '<div class="col-md-7">  '+
            '<div class="row">'+
              '<div class="col-sm-9">'+
    '            <h4>Información del pedido</h4>'+
    '            <br>                 '+
    '            <div class="row">'+
    '              <!-- Empresa -->'+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-building"></i> Empresa'+
    '                </h6>'+
    '                <span> '+name+' </span>                         '+
    '              </div>                        '+
    '              <!-- Fecha -->'+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-calendar-alt"></i> Fecha de creación'+
    '                </h6>'+
    '                <span> '+createdAt+' </span>  '+
    '                <br> '+
    '                <br>                      '+
    '              </div>'+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-barcode"></i> ID Delivery '+
    '                </h6>'+
    '               <span>'+ codeDelivery+'</span>'+
    '              </div>'+
  ''+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-address-card"></i> Conductor'+
    '                </h6>'+
    '               <span>'+conductor+'</span>'+
    '               <br> '+
    '               <br> '+
    '              </div>'+
  ''+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-phone"></i> Teléfono'+
    '                </h6>'+
    '               <span >'+phone +'</span>'+
    '              </div>'+
  ''+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-map-signs"></i> Provincia y Distrito'+
    '                </h6>'+
    '               <span >'+ city + ' - '+  distric + '</span>'+
    '               <br> '+
    '               <br> '+
    '              </div>'+
    '              <!-- Descripcxion -->'+
    '              <div class="col-4 col-sm-12">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-file-alt"></i> Descripción'+
    '                </h6>'+
    '                <span> '+orderDescription+'</span>'+
    '                <br> '+
    '                <br> '+
    '             </div>   '+
  ''+
    '              <!-- Direccion Apartte -->'+
    '              <div class="col-4 col-sm-12">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-map"></i>  Dirección'+
    '                </h6>'+
    '                <p>'+ directionDetails +'</p>'+
    '            '+
    '              </div>'+
    '              <!-- fecha -->'+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-clock"></i>Fecha límite para entregar'+
    '                </h6>'+
    '                <span >'+ limitDate+'</span>           '+
    '              </div>'+
    '              <!-- fecha -->'+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-cube"></i>  Cantidad de paquetes'+
    '                </h6>'+
    '                <span>'+amountPakages+'</span>'+
    '                <br> '+
    '                <br> '+
    '              </div>'+
    '              <!-- peso y dimenciones -->'+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-weight-hanging"></i>   Peso y dimensiones'+
    '                </h6>'+
    '                <span >'+totalDimensions+'</span>'+
    '             '+
    '              </div>'+
    '              <!-- peso y dimenciones -->'+
    '              <div class="col-4 col-sm-6">'+
    '                <h6 class="m-0 font-weight-bold movven-color">'+
    '                  <i class="fas fa-money-bill"></i>   Pago total'+
    '                </h6>'+
    '                <span >'+payment+'</span>'+
    '          '+
    '              </div>'+
    '            </div>'+
    '          </div>'+
    '        </div>'+
    '      </div>'+
    '      <!-- Area de estado de verificado o no , recibido, entregado o no -->'+
    '      <div class="col-md-5" >'+
            '  <div class="container ">'+
        '          <div class="row">'+
        '            <div class="col-md-12 ">'+
        '              <h4>Línea de Estados</h4>'+
        '              <ul class="timeline"id="lista-estado">'+

        '              </ul>'+
        '            </div>'+
        '          </div>'+
        '        </div>'+
    '      </div>'+
    '    </div>'+
    '  </div>'+
    '</div>';
    }

    function generateStateLine(estado, hora, fecha ){
        return'                <li>'+
        '                  <strong>'+estado+'</strong>'+
        '                  <div>                             '+
        '                    <span> <i class="fas fa-clock"></i> Hora:</span> <span>'+hora+'</span>'+
        '                    <br>'+
        '                    <span> <i class="fas fa-calendar-day"></i> Fecha:</span> <span>'+fecha+'</span>'+
        '                  </div> '+
        '                </li>';
    }

    function generateStateLineError(estado, hora, fecha ){
        return'           <li>'+
        '                  <strong>No hay estado registrado</strong>'+
        '                </li>';
    }

    function generateDetailErrorMoral(){
        return' <div class="container-fluid">'+
        '<div class="row">'+
          '<div class="col-md-7">  '+
            '<div class="row">'+
              '<div class="col-sm-9">'+
    '            <h4>Información del pedido</h4>'+
    '            <br>                 '+
                '<div class="row">'+
                    'Seleccione un conductor para el pedido ' +
                '</div>'+
              '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '</div>';
    }

    // Load initial orders
    if (window.localStorage.getItem('x-access-token')) {
        loadConductors(null,null)
    } else {
        window.location.replace('/');
    }
    

})