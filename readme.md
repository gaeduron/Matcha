
# Matcha
 Link to app: https://matcha-duron.herokuapp.com/.

_(* the page can take some times to load because our free heroku server becomes idle after 30 mins of inactivity)_

Writen by [@gduron](https://github.com/gaeduron) and [@bduron](https://github.com/bduron) 

![dashboard](https://preview.ibb.co/f36Dh7/Capture_d_e_cran_2018_03_25_a_22_13_13.png)

## Install
	git clone https://github.com/gaeduron/Matcha.git 
	yarn  
	yarn dev:back
	yarn dev:front

## Subject 
	This project is about creating a dating website. 
	You will need to create an app allowing two potential lovers to meet, 
	from the registration to the final encounter.
	
	A user will then be able to register, connect, fill his/her profile, 
	search and look into the profile of other users, like them, 
	chat with those that “liked” back.

## Key concepts 
	* Single page application
	* Front-end framework
	* Build tools
	* Micro-framework 
	* Advanced user registration and sign-in
	* Real-time application
	* Geolocation 
	* Security (OWASP 10, XSS, SQL injection, cookie session fixation...) 
	* Data validation
	* UX / UI Design 

## Our stack 
	* React 
	* React-router
	* Redux (+ middleware)
	* Express (+ middleware)
	* Node.js
	* JavaScript ES6+
	* PostgreSQL
	* Webpack
	* SCSS (w/ BEM methodology)
 	* OAuth
	* Socket.io  


## Project’s constraints 

	Mandatory tools: 
		* Relational database 

	Forbidden tools:
		* ORM/ODM
		* MVC framework
		* Validators 
		* Registration / Authentication library 


## Key learnings  

We deliberately omitted unit tests as it would have significantly increased the project duration. 
Still we know their importance and wrote our last project (link) with 100% tests coverage. 
Here are some key points we should improve in our next projects. 

### Architecture 
As the project resources didn't need to be available to third party developers or clients (native app) and the app needed to be real-time, we chose to only utilize web sockets to communicate between the server and the client. We came up with an RPC like architecture. But compounded with the project constraints, that quickly resulted in substantial code overhead to implement each subsequent features. 

In hindsight we should have designed a standard RESTful API, as it would have been cleaner, more scalable and faster to write. 

### Code quality / linter
For maintenability sake it would have been cleaner to use a linter and stick to a proven coding convention/standard.

![5](https://resources-live.sketch.cloud/files/8811ed42-c902-4ee4-9cad-f23f5432d2b8.png?Expires=1522273496&Key-Pair-Id=APKAIZ4KEFPO7VL7CCPQ&Signature=FhD3fwUiQkBpaZG~iI0YJUj2ofAOeYMalm~i9YpSsYz7XesvaEB0q3xtetYtxw-MjkXWwhWWijxWCfwn1BeLkIubSOfkvPlsDYJsQC34wycL2PDwMpby~MeWFrU0~MeiTKcxXg21YmY1rtpx7K3NlXc5eRpnA3XfEqzpxp4KO3n3a~xUZgKa9taIep5-Xe0qdeBr~5QWg724Jz-hu102uHeNy2zxpcfnwWgw0S2K6cvV5JxY2NsmAurn0lqcQcnwOUEC47K9-sjhgbYQYYke~Tt1pcGCiUALjiYJIg5rXdwrFmSq0OKx9XSKBFa9lmhm3tqCqIZubemN3DGfMNmBWg__)

![1](https://preview.ibb.co/ka6X9n/Capture_d_e_cran_2018_03_25_a_21_54_37.png)

![4](https://preview.ibb.co/cgoC9n/Capture_d_e_cran_2018_03_25_a_21_51_42.png)
