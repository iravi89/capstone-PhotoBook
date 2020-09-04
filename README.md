# MyPhotoBook 
###Your Own Personal Album.

Udacity Cloud Developer Capstone Project

The purpose of this project is to create a online personal photo album.It will provide a place where you can create your own personal gallery of photos. 

The backend of application is based on  RESTful API  using serverless framework, It continues the work of project 4 which include the automatically deployment to AWS resources include APIGateway, Lambda and DynamoDB.


The frontend client is developed using REACT and Semantic UI. To use this application, you just have to clone the repo,and navigate to `client` directory.under `/client` folder, run `npm install` and `npm run start`. It will start a local client on localhost:3000,

For Authentication I have used `Auth0` authencication services.

![Login/SignUp Page](screenshoots/login.png?raw=true "Image 4")

## Features

### Authentication

User need to login/signup and after proper authentication user can access the content of this application. I have used 3rd party service provider `Auth0` to handle the authentication.

Welcome page for new users:

![Home Page](screenshoots/home.png?raw=true "Image 5")

### Content


![Menu](screenshoots/MenuList.png?raw=true "Image 2")


There is a menu item at top-left from where user can navigate to `MyAlbum` and `Favorite` pages anytime.

![DashBoard](screenshoots/albumList.png?raw=true "Image 1")


The Dashboard shows all the album created by signed user. User can create albums, edit album ,upload images to particular album. 


![MyAlbum](screenshoots/album.png?raw=true "Image 3")

My Album screen list all the album created by user. All album card stores the following informations about the Album:
1. Name: Name of the Album
2. Location: Location of album mention by the user.
3. Time: Time at which this album was created.
4. Description: Brief about the album like a small story or something.
5. Image: Count of images stored in that album.


All album cards are provided with two buttons, green button to edit the album and red button to delete the album.

User have the functionality to modify the details of the album anytime like change in name,location or description. date and tiem of modification gets stored automatically to database.


![EditAlbum](screenshoots/editAlbum.png?raw=true "Image 6")



For uploading the images into album user can click the name of album , after this user will get navigate to upload image page. There user have to mention the title of the image and can upload the image from system. 
![Image Upload](screenshoots/upload.png?raw=true "Image 7")

User can also save some images from multiple album to their favorite image list. For this user just have to open the album and pin the selected image which they want to save in favorite list. User can also delete the image from there itself.There user are provided with both the options.
After succesfull pin, there will be confirmation message pop up for acknowledgement.

![Pin Image](screenshoots/FavImage.png?raw=true "Image 8")



Now User can navigate to `Favorite` tab through Menu. There user can see all the favorite images pined by him.


![Favorite Image](screenshoots/favImages.png?raw=true "Image 9")

## Next steps

Future improvements will include the work in following areas: 

1. Allow user to organize favourite images into categories.
2. Allow user to add frames or other effects to their photos.
3. Allow user to create collage of the photots.
4. Allow user to add stories also for each album and geo-tagging.
5. Better contents and themes. For example, provide search or recommendations function in the search page.
