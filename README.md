- Install Dependencies `npm install`

- RUN `npm run start`

- MONGO Query to SQL Conversions

## Type 1

### Query 1

` SELECT tpep_pickup_datetime as dateString, SUM(passenger_count) AS sumPassengers FROM trips GROUP BY _id, dateString`
