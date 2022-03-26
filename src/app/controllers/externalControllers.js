const controller = {}
const { checkBusinessCodeInDatabase, } = require('../services/business')
const { checkUserCodeInDatabase, getUserById } = require('../services/auth')
const { getBusinessById } = require('../services/business');
const { newOrder, checkCodeDeliveryInDatabase, getOrderbyCodeDelivery } = require('../services/orders');


const { generateRandomString } = require('../utils/randomCode');
const dbUtils = require('../utils/db');


controller.newOrder = async (req, res, next) => {
    try {
        const { codeUser, codeBusiness,
            clientName, phone, city, distric, amountPakages,
            totalDimensions, directionDetails, orderDescription, limitDate, payment
        } = req.body;


        const createdAt = await dbUtils.actualDate()
        var randomCode = ''
        var codeDelivery = ''
        //State of new order
        var state = 1;
        //We verify the empty fields
        if (!codeUser || !codeBusiness) {
            return res.status(400).json({
                success: false,
                code: 'E501',
                error: 'Empty Fields'
            });
        }

        //We verify the business code
        const checkBusinessCode = await checkBusinessCodeInDatabase(codeBusiness);

        if (checkBusinessCode) {
            const checkUserCode = await checkUserCodeInDatabase(codeUser);

            if (checkUserCode) {
                //We get the user id to use later
                var userId = checkUserCode.data.id;
                var userInfo = await getUserById(userId)
                //We get the business id to use later
                var businessId = checkBusinessCode.data.id;
                var businessInfo = await getBusinessById(businessId);

                //We verify if the business and user are relacionated
                if (businessInfo.id === userInfo.businessId) {

                    //We generate a new delivery code
                    codeDelivery = generateRandomString();
                    console.log(codeDelivery, userId);
                    try {
                        //We validate that the delivery code in the database
                        const checkCodeDelivery = await checkCodeDeliveryInDatabase(codeDelivery, userId)
                        while (checkCodeDelivery) {
                            codeDelivery = generateRandomString();
                            checkCodeDelivery = await checkCodeDeliveryInDatabase(codeDelivery, userId)
                        }
                    } catch (err) {
                        //We create a new order
                        newOrder(clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions,
                            directionDetails, orderDescription, limitDate, payment, createdAt[0].date, userId);
                    }
                    //If exist the delivery code we generate it again     
                    return res.status(200).json({
                        success: true,
                        code: '0',
                        message: 'Order acepted'
                    });


                } else {
                    //If the user and business not are relacionated we send the response
                    return res.status(400).json({
                        success: false,
                        code: 'E502',
                        message: 'User code and business code not match'
                    });
                }
            }
        }
        return res.status(200).json({
            success: true,
            code: '0',
            message: 'Order acepted'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            code: 'E500',
            error: `Authorization negated`
        });
    }
}

controller.getOrderbyCodeDelivery = async (req, res, next) => {
    try {
        const codeUser = req.params.codeUser
        const codeBusiness = req.params.codeBusiness
        const deliveryCode = req.params.deliveryCode
        var checkUserCode = '';
        //We verify the empty fields
        if (!codeUser || !codeBusiness) {
            return res.status(400).json({
                success: false,
                code: 'E501',
                error: 'Empty Fields'
            });
        }
        checkUserCode = await checkUserCodeInDatabase(codeUser);
        if (checkUserCode) {
            //We get the user id to use later
            var userId = checkUserCode.data.id;
            var userInfo = await getUserById(userId)
            //We verify the business code
            const checkBusinessCode = await checkBusinessCodeInDatabase(codeBusiness);

            //We get the business id to use later
            var businessId = checkBusinessCode.data.id;
            var businessInfo = await getBusinessById(businessId)

            //We verify if the business and user are relacionated
            if (businessInfo.id === userInfo.businessId) {
                //
                var order = await getOrderbyCodeDelivery(deliveryCode, userId);
                return res.status(200).json({
                    success: true,
                    code: '0',
                    data: order,
                });
            } else{
                return res.status(400).json({
                    success: false,
                    code: 'E502',
                    message: 'User code and business code not match'
                });
            }
        }
    } catch (err) {

        res.status(500).json({
            success: false,
            code: 'E500',
            error: `Authorization negated`
        });
    }
}



module.exports = controller;