# Schedulogram
An app to make student's scheduling tasks much easier!!

This app will help you to create your time-table or schedule for your classes. The application has following features:-

* You can mark which time-range is your your break all the days.
* You can mark any day of the week as your holiday For e.g., sometimes saturdays are considered as holiday.
* You can mark your attendance.
* Edit title of the subject at any point of the time.
* Add description of the subject (you can add your teachers name if you want) or it can be left blank.
* All your attendance is stored in the mongodb database.

#### To run the app in your local follow these Steps:-

1) Add application.properties in `backend/src/main/resources`.
2) In application.properties add folowing lines:
   
   `spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster>.bhrvg.mongodb.net/contents`
    `spring.data.mongodb.database=contents`

3) Run file ModelApplication using IDE or terminal.
4) Type npm install inside terminal of VS code of frontend.
5) Type npm start and ENJOY!!!
