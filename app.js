const { MongoClient} = require("mongodb");
const bcrypt = require("bcryptjs")
const { faker } = require('@faker-js/faker');
// Connection URI
const uri =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.98hil.mongodb.net/MDBU?retryWrites=true&w=majority";
// Create a new MongoClientongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=
const client = new MongoClient(uri);

const newDocument = async () => {
    const database = client.db().collection('profile')

    const randomFirstName = faker.name.firstName(); // Rowan Nikolaus
    const randomLastName = faker.name.lastName();
    const randomEmail = randomFirstName + '.' + randomLastName + '@gmail.com'; // Kassandra.Haley@erich.biz
    const randomPhoneNumber = faker.phone.phoneNumber('01########'); // (279) 329-8663 x30233
    const randomPass = faker.internet.password();

    const saltRounds = 10
    const newPass = await bcrypt.hashSync(randomPass, saltRounds )

    const data = {
        name : randomFirstName + ' ' + randomLastName,
        email : randomEmail,
        phonenumber : randomPhoneNumber,
        password : newPass,
    }  
    
    const result = await database.insertOne(data)
    console.log(result)
}
    
    const connectMongo = async () => {
        await client.connect(err =>{
            if(err) {
                console.log(err.message)
                return
            }
            console.log('Connected to Mongo DB');
            newDocument()
            })
    
    }
    connectMongo()
