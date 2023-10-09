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
