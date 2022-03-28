reporting.bruceandjason135.site/home - dashboard
login info (Basic):
username: Jason
password: pass

login info (Admin):
username: Admin
password: password

Design Decisions
    For all the pages, we used bootstrap because it was fast and we were relatively familiar with it. Although our html suffered from some serious div-itis, we concluded that it was the right choice to make given the time constraint. 

    Authentication
    
    For user management and auth, we used passportJS, express-session, mongoDB and bcrypt to hash our passwords. The reason we chose this was becuase there was a vast amount of resources and help that we could find, from both the TA and the Internet, so that we could develop in time and well. These frameworks and technology is new to us both so it was fun to learn this. The user management table for admins is quite simple and straightforward, with buttons at the top of the table to create, update and delete users.


    Dashboard

    Among the options we had for our collector.js script from homework 3, we decided to go 
    for Total Load Time for each user visit, cookies enabled and the screen innerwidth, innerheight
    outerwidth, and outerheight. Although we had a limited collector.js script in terms of what
    we managed to collect, these 3 data are the ones that we thought were most fitting to fit into
    2 charts and 1 grid. 

    For total load time, we decided to use a bar chart with the Y-axis as the time in miliseconds, 
    X-axis for the visitor number. As we have learnt in lecture, the professor spoke about the RAIL model. The L in RAIL stands for Load which is what we tried to capture in this metric. We chose a bar chart because we thought that it will be clear to show which users has what load time.
    Following the RAIL model, anything above 1000 ms load time is bad. Thus, we took advantage of this to create a marker labelled critical to clearly indicate to the admin that there are visitors who have load time above 1000 ms and thus might be worth looking into when we want to deliver a good user experience. Furthermore, the bar chart also provides us a clear view of the range of load times per user. We can also extract more useful information from this such as the average load time across all visitors in our site. Also, we chose this metric to further expand upon for the report in part 4.

    For cookies enabled, we decided to use a pie chart. Since this is a boolean, we felt that a pie chart is the most appropriate as we can easily compare and contrast the percentage and number(when you hover over the pie chart) between visitors who has cookies enabled and those who do not. Cookies are an important tool for user experience and to identify whether or not an overwhelming amount of users has their cookies disabled can affect design choices for the site to deliver a good user experience.

    For screen dimensions, we decided to use a grid/table. We thought that the screen dimensions per user was appropriate to show in a grid. Because screen dimensions have both inner and outer width and height, a grid would clearly show this with each row being a unique visitor. We feel that this is an important metric because this can affect a our styling and determining our user interface. The lecture that came to mind was on data viz when the professor was speaking about a dashboard of a car - there are many things going around in the dashboard of a car and most people do not use them. With that in mind, our thought process was that we can have the ability to style accordingly to average screen dimensions. This means that the individual size of the buttons, media assets and interface as a whole has to fit within what our visitors use the most. 

    Report

    For the reports page, we wanted to expand upon total load times. Because the RAIL model is user-centric, load times per user was a perfect choice to tackle the L part of RAIL. As supporting charts, we went for effective connection type(ECT) and further information about the timing object, specifically domContentLoadEventStart, domContentLoadEventEnd, DOM load and requestStart. The timing object was represented in a grid while the ECT was represented in a bar chart. 

    ECT was best reprented in a bar chart. Since there was only 3 types of connection types, we thought that the bar chart can best represent this information and can find which connection type was the most popular among our users.

    The timing object different attributes and because of this, it was best displayed in a grid. 

    You can find a more detialed explanation of our supporting metrics for load time and the L in RAIL in the reports page. 

***Please not that we set a timeout for rendering the zingcharts