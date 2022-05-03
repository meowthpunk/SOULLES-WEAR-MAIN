from flask import Flask, render_template, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///s-wear.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

tokenBotApi = '5388724168:AAGck_2xlwnIr4ZH9GyQLsfwEBDS4NBKL1k'


def smbtgrm(token, chatid, message):
    url = f'https://api.telegram.org/bot{token}/sendMessage?chat_id={chatid}&text={message}'
    requests.get(url)

# ----- ПРОДУКТ -----
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    category = db.Column(db.Integer, db.ForeignKey('category.id'))
    image = db.Column(db.String)
    name = db.Column(db.String)
    description = db.Column(db.String)
    stoplist = db.relationship('StopList', backref = 'stoplist')
    order_Products = db.relationship('OrderProduct', backref = 'orderproducts')

    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __repr__(self):
        ...
# ----- КАТЕГОРИЯ -----
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    icon = db.Column(db.String)
    products = db.relationship('Product', backref = 'products')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        ...

# ----- РАЗМЕРЫ -----
class Size(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    stoplist = db.relationship('StopList', backref = 'stop_list')
    order = db.relationship('OrderProduct', backref = 'order_products_size')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        ...

# ----- СТОП-ЛИСТ -----
class StopList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.Integer, db.ForeignKey('product.id'))
    size = db.Column(db.Integer, db.ForeignKey('size.id'))
    quantity = db.Column(db.Integer)

    def __init__(self, product, size, quantity):
        self.product = product
        self.size = size
        self.quantity = quantity


    def __repr__(self):
        ...

# ----- ЗАКАЗЧИК -----
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tg_id = db.Column(db.Integer)
    name = db.Column(db.String)
    phone_number = db.Column(db.Integer)
    news = db.Column(db.Boolean)
    news_frst = db.Column(db.Boolean)
    order = db.relationship('Order', backref='orders')
    chat = db.relationship('Chat', backref='chat')

    def __init__(self, tg_id):
        self.tg_id = tg_id

    def __repr__(self):
        ...

# ----- ЗАКАЗ -----
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer = db.Column(db.Integer, db.ForeignKey('customer.id'))
    cost = db.Column(db.Integer)
    status_pay = db.Column(db.Boolean)
    status_delivery = db.Column(db.Boolean)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    order_products = db.relationship('OrderProduct', backref='order_products')

    def __init__(self, customer_id):
        self.customer = customer_id
        self.cost = 0
        self.status_pay = 0
        self.status_delivery = 0
        self.rating = 5
        self.comment = 'comment'


    def __repr__(self):
        ...

# ----- ПРОДУКТЫ ЗАКАЗА -----
class OrderProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, db.ForeignKey('order.id'))
    product = db.Column(db.Integer, db.ForeignKey('product.id'))
    size = db.Column(db.Integer, db.ForeignKey('size.id'))
    quantity = db.Column(db.Integer)

    def __init__(self, order, product, size, quantity):
        self.order = order
        self.product = product
        self.size = size
        self.quantity = quantity

    def __repr__(self):
        ...

# ----- Чат -----
class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer = db.Column(db.Integer, db.ForeignKey('customer.id'))

    def __init__(self, customer):
        self.customer = customer

    def __repr__(self):
        ...

# ----- Собщение -----
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.Integer, db.ForeignKey('chat.id'))
    text = db.Column(db.String)
    status_read = db.Column(db.Boolean)
    date = db.Column(db.DateTime)

    def __init__(self):
        ...

    def __repr__(self):
        ...

# ----- Админ -----
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tg_id = db.Column(db.Integer)
    status_admin = db.Column(db.Integer, db.ForeignKey('adminstatus.id'))

    def __init__(self):
        ...

    def __repr__(self):
        ...

# ----- Статус админа -----
class Adminstatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self):
        ...

    def __repr__(self):
        ...

# @app.route('/create-article')
# def create_article():
#     return


def create_order(customer_id, productList):
    orderUpdCost = 0
    createItemOrder = Order(customer_id)
    # print(createItemOrder)
    db.session.add(createItemOrder)
    db.session.commit()
    order_id = createItemOrder.id

    for product in range(len(productList)):

        product_id = productList[product][0]
        size_id = productList[product][1]
        quantity = productList[product][2]

        createItemOrderProduct = OrderProduct(
        order_id,
        product_id,
        size_id,
        quantity,
        )

        stop_upd = db.update(StopList).where((StopList.product == product_id) & (StopList.size ==  size_id)).values(quantity = StopList.quantity - quantity).execution_options(synchronize_session="fetch")
        db.session.execute(stop_upd)
        db.session.commit()

        ProductQer = db.session.query(Product).filter(Product.id == product_id).first()
        orderUpdCost += ProductQer.price * quantity

        db.session.add(createItemOrderProduct)
        db.session.commit()




    upd = db.update(Order).where(Order.id == order_id).values(cost = orderUpdCost).execution_options(synchronize_session="fetch")
    db.session.execute(upd)
    db.session.commit()


def creatingSize():
    sizes = ['standart', 'S', 'M', 'L', 'XL', 'XXL']
    for count in range(len(sizes)):
        add_size = Size(sizes[count])
        db.session.add(add_size)
        db.session.commit()

def add_Product(name, price):
    add = Product(name, price)
    db.session.add(add)
    db.session.commit()

    for i in range(6):          ###### ИЗМЕНИТЬ АЙДИШНИКИ САЙЗОВ
        stop = StopList(add.id, i+1, 0)
        db.session.add(stop)
        db.session.commit()

def add_quantity_size(product_id, size_id, quantity):
    upd = db.update(StopList).where((StopList.product == product_id)&(StopList.size == size_id)).values(quantity = quantity).execution_options(synchronize_session="fetch")
    db.session.execute(upd)
    db.session.commit()

def delete_order(order_id):
    order = db.session.query(Order).filter(Order.id == order_id).first()
    orderList = db.session.query(OrderProduct).filter(OrderProduct.order == order.id).all()
    for orders in range(len(orderList)):
        stop_upd = db.update(StopList).filter((StopList.product == orderList[orders].product) & (StopList.size == orderList[orders].size)).values(quantity = StopList.quantity + orderList[orders].quantity).execution_options(synchronize_session="fetch")
        db.session.execute(stop_upd)
        db.session.commit()

    del_order_product = db.delete(OrderProduct).where(OrderProduct.order == order.id).execution_options(synchronize_session="fetch")
    del_order = db.delete(Order).where(Order.id == order.id)
    db.session.execute(del_order_product)
    db.session.execute(del_order)
    db.session.commit()

def set_category(product_id, category_id):
    upd = db.update(Product).filter(Product.id == product_id).values(category = category_id).execution_options(synchronize_session="fetch")
    db.session.execute(upd)
    db.session.commit()

def create_category(name):
    add = Category(name)
    db.session.add(add)
    db.session.commit()

def create_customer(tg_id):
    check = db.session.query(Customer).filter(Customer.tg_id == tg_id).all()
    if len(check) == 0:
        add = Customer(tg_id)
        db.session.add(add)
        db.session.commit()
    else:
        print('Пльзователь существует')

def customer_set_news(customer_id, status):
    customer = db.update(Customer).filter(Customer.id == customer_id).values(news = status).execution_options(synchronize_session="fetch")
    db.session.execute(customer)
    db.session.commit()

# def customer_get_news(customer_id):
#     customer = db.session.query(Customer).filter(Customer.id == customer_id).first()
#     print(customer.news)

def query_news():
    listNone = []
    listTrue = []
    listOfCustomers = []

    query = db.session.query(Customer).filter(Customer.news == None).all()
    for i in range(len(query)):
        # print(query[i].tg_id)
        listNone.append(query[i].tg_id)

    query = db.session.query(Customer).filter(Customer.news == True).all()
    for i in range(len(query)):
        # print(query[i].tg_id)
        listTrue.append(query[i].tg_id)

    listOfCustomers.append(listNone)
    listOfCustomers.append(listTrue)

    return listOfCustomers


def get_id(tg_id):
    take = db.session.query(Customer).filter(Customer.tg_id == tg_id).first()
    return take.id



@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.json
        product_data = data['expProduct']
        id_data = data['id']
        print(product_data)
        print(id_data)
        takedList = []
        messageCr = '📦 Products in your order: \n'
        for i in range(len(product_data)):
            takedList.append([
                product_data[i]['product_id'],
                product_data[i]['size_id'],
                product_data[i]['counter'],
            ])
            messageCr += '\n' + str(product_data[i]['product_name']) + ' | Size - ' + str(product_data[i]['size_name']) + '\nPrice - $' + str(product_data[i]['price']) + ' | In quantity ' + str(product_data[i]['counter']) + '\n'
        messageCr += '\n💵 Total cost - $' + str(data['cost'])
        smbtgrm(tokenBotApi, id_data, messageCr)
        # create_order(4, takedList)
        print(takedList)
    print('pizdec')
    gavno = db.session.query(Product)
    cats = db.session.query(Category)
    stop_list = db.session.query(StopList)
    sizes = db.session.query(Size)
    productList = db.session.query()
    db.create_all()
    return render_template('index.html', gavno = gavno, cats = cats, stop_list = stop_list, sizes = sizes)


@app.route('/getted/pizdec', methods=['GET', 'POST'])
def zhopa():
    if request.method == 'POST':
        data = request.json
        print(data)
        messageCr = 'Products in your order: \n\n'
        smbtgrm(tokenBotApi, 1066007752, '123321')
        print('gavno')
    print('pizdec')
    gavno = db.session.query(Product)
    cats = db.session.query(Category)
    stop_list = db.session.query(StopList)
    sizes = db.session.query(Size)
    productList = db.session.query()
    return render_template('index.html', gavno = gavno, cats = cats, stop_list = stop_list, sizes = sizes)

# @Func.route('/func', methods = ['GET', 'POST'])
# def func():
#     dataGet = request.get_json(force=True)
#     return jsonify()

if __name__ == '__main__':
    # creatingSize()

    # productList = [['1', '5', 3], ['1', '2', 2]]
    # # create_order(4, productList)

    # add = Product('Gbpltw', 5000)
    # db.session.add(add)
    # db.session.commit()
    # add_Product('Шапка', 500)
    # add_Product('Футболка', 1500)
    # add_Product('Худи', 3000)
    # add_Product('Свитшот', 2500)
    # add_quantity_size(1, 5, 20)
    # add_quantity_size(1, 2, 30)
    # add_quantity_size(1, 1, 10)
    # add_quantity_size(2, 5, 20)
    # add_quantity_size(2, 2, 30)
    # add_quantity_size(2, 1, 10)
    # add_quantity_size(3, 5, 20)
    # add_quantity_size(3, 2, 30)
    # add_quantity_size(3, 1, 10)
    # add_quantity_size(4, 5, 20)
    # add_quantity_size(4, 2, 30)
    # add_quantity_size(4, 1, 10)
    #

    db.create_all()
    # delete_order(17)

    # create_category('Шапки')
    # create_category('Футболки')
    # create_category('Hoodies')
    # create_category('Sweatshirts')
    #
    # set_category(1, 1)

    # create_customer(89242184474)
    # create_customer(201392)
    # create_customer(2149120490)
    # customer_set_news(6, False)
    # customer_get_news(2)
    # query_news()
    # add_Product('Sweatshirt Rize', 45)
    # add_Product('Sweatshirt Touka', 40)
    # add_Product('Sweatshirt Eto', 42)
    # add_Product('Hoodie Rize', 65)
    # add_Product('Hoodie Eto', 60)
    # add_Product('Hoodie Touka', 60)
    # creatingSize()

    app.run() #debug=True)
