- Install Dependencies `npm install`

- RUN `npm run start`

- MONGO Query to SQL Conversions

## Type 1

### Query 1

` SELECT tpep_pickup_datetime AS dateString, SUM(passenger_count) AS sumPassengers FROM trips GROUP BY custom_id, dateString`

### Query 2

`SELECT tpep_pickup_datetime AS dateString, SUM(trip_distance) AS total COUNT(tpep_pickup_datetime) AS countOfDate FROM trips WHERE trip_distance <= TRIP_DISTANCE GROUP BY custom_id, dateString ORDER BY total`

### Query 3

`SELECT tpep_pickup_datetime, trip_distance FROM trips ORDER BY trip_distance DESC LIMIT 5`

## Type 2

### Query 1

#### incomplete

`SELECT SUM(PULocationID) AS countOfVehicles WHERE PULocationID=LOCATION AND tpep_pickup_datetime BETWEEN DATE_START AND DATE_END GROUP BY PULocationID`

### Query 2

#### incomplete

`SELECT AVG(total_amount) AS avarageTotalAmount FROM trips GROUP BY tpep_pickup_datetime`

### Query 2

#### incomplete

`SELECT * FROM trips WHERE tpep_pickup_datetime BETWEEN START_DATE AND END_DATE ORDER BY trip_distance DESC LIMIT 10`
