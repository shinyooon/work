<%
	String scheme = request.getScheme();
	String server = request.getServerName();
	String uri = request.getRequestURI();
	String www = "";
	boolean isChangeURL = false;

	if(server.indexOf("www.") == -1){
		//response.sendRedirect("http://www."+server+uri);
		isChangeURL = true;
		www = "www.";
	}
	
	if( uri.indexOf("/mobile/") != -1 && scheme.equals("http") ){
		isChangeURL = true;
		scheme = "https";
	}
	
	if(isChangeURL){
		response.sendRedirect(scheme + "://" + www + server + uri);
	}
	
			
			//out.print(scheme + "://" + www + server + uri);
			
	boolean isLogin = false;
	String id = (String)session.getAttribute("USERID");
	String type = (String)session.getAttribute("TYPE");
	String userLevel = (String)session.getAttribute("USERLEVEL");
	String image = (String)session.getAttribute("IMAGE");
	String name = (String)session.getAttribute("DISPLAYNAME");
	String choice = (String)session.getAttribute("CHOICE");

	
	
	String index = "index2.jsp";
	String lobby = "lobby.jsp";
	
	
	if(userLevel == null){
		isLogin = false;
	}else if(userLevel.equals("0") || userLevel.equals("1")){
		isLogin = true;
	}
	
	String indexURL = "";
	if(isLogin){
		indexURL = lobby;
	}else{
		indexURL = index;
	}
	
	





/*
	out.println("id:"+id);
	out.println(",  userLevel:"+userLevel);
	out.println(",  type:"+type);
	out.println(",  image:"+image);
	out.println(",  name:"+name);
	out.println(",  choice:"+choice);
*/



%>
