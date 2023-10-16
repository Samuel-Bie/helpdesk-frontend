  **Front end service installation**


1. Clone on github
	```sh
	git clone https://github.com/Samuel-Bie/helpdesk-frontend.git
	```

2. Build the docker image

	```bash
	docker build -t vuejs-cookbook/dockerize-vuejs-app .
	```
3. Running the image

	```bash
	docker run -it -p 8080:80 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app
	```

4. Accessing the app
Once the containers are up and running, you can access the application at http://localhost:8080 .
Bellow are the test users

	As employee
	```
	employee.user@test.com
	password
	```
	For testing in the regular user
	```
	regular.user@test.com
	password
	```