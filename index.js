const mongoose = require('mongoose');

//****************************************************************************
//  CREATE CONNECTION
//****************************************************************************
mongoose.connect('mongodb://localhost:27017/cars', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(() => console.error('Error al conectarse'));

//****************************************************************************
//  CREATE SCHEMA IN MONGOOSE
//****************************************************************************
/**
 * Puedes buscar mas valodaciones para cada campo de la base de datos
 * Pueden ser de mucha utilidad
 * https://mongoosejs.com/docs/schematypes.html
 */
const carSchema = new mongoose.Schema({
  company: String,
  model  : String,
  price  : Number,
  year   : Number,
  sold   : Boolean,
  extra  : [String],
  date   : {
    type: Date,
    default: Date.now
  }
});

const Car = mongoose.model('car', carSchema);

//****************************************************************************
//  GET ALL CARS
//****************************************************************************
// getCars();
async function getCars() {
  const cars = await Car.find();
  console.log(cars);
}

//****************************************************************************
//  LEAKS - FILTERS
//****************************************************************************
// getCompanyAndSoldFilterCars();
async function getCompanyAndSoldFilterCars() {
  const cars = await Car.find({
    company: 'Ferrari',
    sold   : true
  });

  console.log(cars);
}

//****************************************************************************
//  MORE LEAKS - FILTERS
//****************************************************************************
// getMoreFilterCars();
async function getMoreFilterCars() {
  const cars = await Car.find({
    company: 'Ferrari',
    sold   : true
  })
  .sort({
    price: -1
  })
  .limit(5)
  .select({company: 1, model: 1, price: 1});

  console.log(cars);
}

//****************************************************************************
//  FILTER PRICE AND COMPANY CAR
//****************************************************************************
// getFilterPriceCar();
async function getFilterPriceCar() {
  const cars = await Car.find({
    price: {
      $gte: 1000000
    },
    company: {
      $ne: 'Mclaren'
    }
  });

  console.log(cars);
}

//****************************************************************************
//  COUNT
//****************************************************************************
// count();
async function count() {
  const cars = await Car.find().countDocuments();
  console.log(cars);
}

//****************************************************************************
//  PAGINATION RECORDS
//****************************************************************************
// paginationCars();
async function paginationCars() {
  const pageNumber = 1;
  const pageSize   = 2;

  const cars =  await Car.find().skip((pageNumber - 1) * pageSize).limit(pageSize);
  console.log(cars);
}

//****************************************************************************
//  CREATE A RECORD IN MONGODB
//****************************************************************************
// createCar();
async function createCar() {
  const car = new Car({
    company : 'Pagani',
    model   : 'Zonda',
    price   : 1349800,
    year    : new Date().getFullYear(),
    sold    : true,
    extra   : ['Automatic', 'Leather seats', 'Turbo'],
  });

  const result = await car.save();
  console.log(result);
}

//****************************************************************************
//  UPDATE A RECORD IN MONGODB
//****************************************************************************
// updateCar('5d9b5d28a13456304a3d8706');
async function updateCar(_id) {
  const result = await Car.updateOne({ _id }, {
    $set: {
      model: 'Chiron',
      sold : true
    }
  })

  console.log(result);

  // const car = await Car.findById(_id);

  // if (!car) return;

  // car.model = 'Chiron !!'
  // car.sold  = false;

  // const result = await car.save();
  // console.log(result);
}

//****************************************************************************
//  DELETE A RECORD
//****************************************************************************
// deleteCar('5d9b67cc67f2343975a6f8ff');
async function deleteCar(_id) {
  const result = await Car.deleteOne({ _id });
  console.log(result);
}