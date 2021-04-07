- Install Dependencies `npm install`

- RUN `npm run start`

- MONGO Query to SQL Conversions

## Type 1

### Query 1

` SELECT tpep_pickup_datetime as dateString, SUM(passenger_count) AS sumPassengers FROM trips GROUP BY custom_id, dateString`

### Query 2

`SELECT tpep_pickup_datetime as dateString, SUM(trip_distance) AS total SUM(tpep_pickup_datetime) AS countOfDate FROM trips WHERE trip_distance <= TRIP_DISTANCE GROUP BY custom_id, dateString ORDER BY total`

### Query 3

`SELECT tpep_pickup_datetime, trip_distance FROM trips ORDER BY trip_distance DESC LIMIT 5`
