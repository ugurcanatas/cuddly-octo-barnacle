import mongoose from "mongoose";

const { Schema } = mongoose;

const TaxiZoneSchema = new Schema({
  LocationID: Number,
  Borough: String,
  Zone: String,
  service_zone: String,
});

const TripSchema = new Schema({
  VendorID: Number,
  tpep_pickup_datetime: Date,
  tpep_dropoff_datetime: Date,
  passenger_count: Number,
  trip_distance: mongoose.Types.Decimal128,
  RatecodeID: Number,
  store_and_fwd_flag: String,
  PULocationID: Number,
  DOLocationID: Number,
  payment_type: Number,
  fare_amount: mongoose.Types.Decimal128,
  extra: mongoose.Types.Decimal128,
  mta_tax: mongoose.Types.Decimal128,
  tip_amount: mongoose.Types.Decimal128,
  tolls_amount: mongoose.Types.Decimal128,
  improvement_surcharge: mongoose.Types.Decimal128,
  total_amount: mongoose.Types.Decimal128,
  congestion_surcharge: mongoose.Types.Decimal128,
});

const TaxiZone = mongoose.model("TaxiZone", TaxiZoneSchema);
const Trip = mongoose.model("Trip", TripSchema);

export { TaxiZone, Trip };
