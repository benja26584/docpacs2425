var readline = require('readline-sync');

var orders = []

while (true) {
    var order = {
        name: '',
        address: '',
        items: []
    }
    var selection = readline.keyInSelect(['Start A New Order', 'Edit Existing Order', 'Show All Orders'], 'Select an Option');

    switch (selection) {
        case 0:
            console.clear()
            order.name = readline.question('What is your name?')
            order.address = readline.question('What is your address?')
            orders.push(order)
            break;
        case 1:
            console.clear()
            var selection = []
            for (var i = 0; i < Object.keys(orders).length; i++) {
                var orderS = orders[i]
                selection.push(orderS.name)
            }
            if (selection.length > 0) order = orders[readline.keyInSelect(selection, 'Which one is yours?')]
            var editing = true
            while (editing) {
                console.clear()
                switch (readline.keyInSelect(['Add Item', 'Finish Editing'], 'Select an Option')) {
                    case 0:
                        console.clear()
                        var Name = readline.question('Whats the name of this product?')
                        var Price = parseFloat(readline.question('Whats the esitmated price?'))
                        var Amount = parseFloat(readline.question('How many do you want?'))

                        var item = {
                            name: Name,
                            price: Price,
                            amount: Amount
                        }
                        order.items.push(item)
                        break;
                    case 1:
                        console.clear()
                        var shipFee = 5
                        var total = 0
                        order.items.forEach(item => {
                            total += item.price * item.amount
                        });
                        order.total = total
                        var tax = total * 0.06
                        order.tax = tax
                        if (total + tax > 50) shipFee = 0
                        order.shippingFee = shipFee
                        editing = false
                        var total = total + tax + shipFee
                        order.total = total
                        break;
                }
            }
            break;
        case 2:
            console.clear()
            console.log(orders)
            orders.forEach(tOrder => {
                console.log('')
                console.log(tOrder)
            });
            break;
            
    }
}

