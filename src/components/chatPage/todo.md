
# Realtime chat architecture

A = user A 
B = user B 
S = server


1) [A] Login to matcha 
	client -> server(db) -> redux :: Load notification badges

2) [A] Open chat page 
	redux -> server(db) -> redux 
		:: Load all conversations (user profile, messages) 	
		LEFT PANEL 
		:: Display conv sorted by date 
		:: Set seen / unseen color for each conv
		:: Focus on most recent conv
		MAIN CHAT
		:: Load most recent conv messages 





Redux state : 
	message in bulk, grouped by with selectors and filters 


Selectors : 



Actions : 




------------------------------------------------------

		user connected indicator 


		new conv appear while in chat 
		new message appear in other conv whil in chat 
		new message appear in the current conf 

		no notif if in chat 


-----------------------------------------------------


# Badge notification architecture 

1) [A] Login to matcha 
	redux(SERVER/GET_UPDATES) -> server(db) -> redux([] ADD_UPDATE) 
		:: Load all notifications
			- SQL SELECT * FROM like WHERE to = user_id    
			- SQL SELECT * FROM message WHERE to = user_id  COUNT 
			- SQL SELECT * FROM visit WHERE to = user_id   

2) [A] Open either Chat or News 		
	redux -> server(db) -> redux
		:: Clear notification badges
			- [ids of notifs] for each SET seen to TRUE 

3) [A] Clicks on unclicked notification
	redux -> server(db) -> redux
		:: Clear unclicked notifs 
			- [ids of notifs] for each SET clicked to TRUE 


4) [S] Sends a new notification to [A]
	server(ws) -> client(listener) -> redux([] ADD_UPDATE) 





# Like architecture 

1) [A] Login to matcha
	
	:: Load list of all users that like me & I like 


TABLE like 
	id 
	from
	to 
	date
	seen







