* simple traffic light application to store ratings ('happy', 'unsure', 'unhappy') for a user 
* stores data in local csv file

* docker build -t shautvast/trafficlight .
* docker run -d -p5555:5000 -v/tmp:/data -e DATA_PATH=/data shautvast/trafficlight

 
