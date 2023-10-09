# HelpDesk Front End



# Runing the app

Bulding the image
```bash
docker build -t vuejs-cookbook/dockerize-vuejs-app .

```

Running the image
```bash
docker run -it -p 8080:80 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app

```

The app will be available at http://localhost:8080



### Access the Application:

Once the containers are up and running, you can access your Laravel application at http://localhost:8080 .

```
employee.user@test.com
password

```

For testing in the regular user
```
regular.user@test.com
password

```