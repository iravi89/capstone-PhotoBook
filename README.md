# PhotoBook 
###Your Own Personal Album.

Udacity Cloud Developer Capstone Project

The purpose of this project is to create a online personal photo album.It will provide a place where you can create your own personal gallery of photos. 

The backend of application is based on  RESTful API  using serverless framework, It continues the work of project 4 which include the automatically deployment to AWS resources include APIGateway, Lambda and DynamoDB.

The frontend client is developed using REACT and Semantic UI. To use this application, you just have to clone the repo,and naviugate to `client` directory.under `/client` folder, run `npm install` and `npm run start`. It will start a local client on localhost:3000,
For Authencication I have used `Auth0` authencication services.

![Login/SignUp Page](screenshoots/login.png?raw=true "Image 5")

## Features

### Authentication

User need to login/signup and after proper authentication user can access the content of this application. I have used 3rd party service provider `Auth0` to handle the authentication.

Greeting page for new users:

![DashBoard](screenshoots/dashboard.png?raw=true "Image 1")

### Content

My Album  page stores all the album created by signed user. User can create albums, upload images to particular album. User will have two choices for every images of each album. User either can delete it or can pin it to their favourite image list.

![MyAlbum](screenshoots/album.png?raw=true "Image 2")

![Favourite](screenshoots/favourite.png?raw=true "Image 3")


## Next steps

Future improvements will include the work in following areas: 

1. Allow user to organize favourite images into categories.
2. Allow user to add frames or other effects to their photos.
3. Allow user to create collage of the photots.
4. Allow user to add stories also for each album and geo-tagging.
5. Better contents and themes. For example, provide search or recommendations function in the search page.
