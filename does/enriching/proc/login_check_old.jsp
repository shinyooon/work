<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page session="true" %>
<%@ include file="../lab/conn.jsp" %>
<%@ page import = "org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page import = "com.does.AES" %>

<%
	
	
	
	String type = request.getParameter("type");

	Connection conn = null;
	Statement stmt = null;

	String accessID = "";
	String accessPW = "";
	String userLevel = "";
	String userName = "";
	String choice =  "";
	String displayName = "";
	

	// 로그인 관련 아이디가 있을 경우만 세션 적용. 
		
		
		if(type.equals("default")){
			//out.print("1");
			String id = StringEscapeUtils.escapeHtml4(request.getParameter("id"));
			String password = StringEscapeUtils.escapeHtml4(AES.encrypt(request.getParameter("password")));
			
			
			
			String image = request.getParameter("image");
			
			if(image != null || image != ""){
				session.setAttribute("IMAGE",image);
			}
			
			String name = request.getParameter("displayName");
			
			if(name != null || name != ""){
				session.setAttribute("DISPLAYNAME",name);
			}

			try{
				conn = connect();
				String q = "select * from dbo.e_User where LoginID =? AND Password =?";

				pstmt = conn.prepareStatement(q);  //실서버

				pstmt.setString(1,id);
				pstmt.setString(2,password);

				ResultSet rs = pstmt.executeQuery();

				if(rs.next()) {
					accessID = rs.getString("LoginID");
					accessPW = rs.getString("Password");
					userLevel = rs.getString("UserLevel");
					userName = rs.getString("UserName");
					choice = rs.getString("Choice");
					displayName = rs.getString("DisplayName");

					if(accessID.equals(id) && accessPW.equals(password)){
						session.setAttribute("USERID",id);
						session.setAttribute("CHOICE",choice);
						session.setAttribute("USERLEVEL",userLevel);
						session.setAttribute("TYPE","default");
						session.setAttribute("DISPLAYNAME",displayName);
						
						if(userLevel.equals("1")){ // 이벤트 참여했을 경우.
							session.setAttribute("USERNAME",userName);
							out.print("loginComplete({'result':'success', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
						}else if(userLevel.equals("0")){
							out.print("joinProcess({'result':'goEvent', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
						}
						
					}
				} else {
						session.setAttribute("TYPE","default");
						out.print("joinProcess({'result':'goRegist', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
				}
				rs.close();

			} catch (Exception e) {
				e.printStackTrace(System.out);
			} finally {
				if(stmt != null) try{stmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}

		}else if(type.equals("fb")){
			//out.print("2");
			String id = request.getParameter("id");
			String image = request.getParameter("image");
			
			if(image != null || image != ""){
				session.setAttribute("IMAGE",image);
			}
			
			String name = request.getParameter("displayName");
			
			if(name != null || name != ""){
				session.setAttribute("DISPLAYNAME",name);
			}
			
			try{
				conn = connect();
				stmt = conn.createStatement();

				String q = "select * from dbo.e_User where LoginID = '" +id+ "'";
				ResultSet rs = stmt.executeQuery(q);
				//out.println("id:"+id);
				if(rs.next()) {
					accessID = rs.getString("LoginID");
					userLevel = rs.getString("UserLevel");
					userName = rs.getString("UserName");
					choice = rs.getString("Choice");
					displayName = rs.getString("DisplayName");
					
					if(accessID.equals(id)){
						session.setAttribute("USERID",accessID);
						session.setAttribute("CHOICE",choice);
						session.setAttribute("USERLEVEL",userLevel);
						session.setAttribute("TYPE","fb");
						session.setAttribute("DISPLAYNAME",displayName);
						if(userLevel.equals("1")){ // 이벤트 참여했을 경우.
							session.setAttribute("USERNAME",userName);
							out.print("loginComplete({'result':'success', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
						}else if(userLevel.equals("0")){
							out.print("joinProcess({'result':'goEvent', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
						}
					}
				} else {
						session.setAttribute("USERID",id); // 페북 로그인은 했으나, 등록되지 않은 아이디 일 경우 
						session.setAttribute("TYPE","fb");
						out.print("joinProcess({'result':'goRegist', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
				}
				rs.close();

			} catch (Exception e) {
				e.printStackTrace(System.out);
			} finally {
				if(stmt != null) try{stmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}
		}else if(type.equals("tw")){
			//out.print("3");
			String id = request.getParameter("id");
			String image = request.getParameter("image");
			
			if(image != null || image != ""){
				session.setAttribute("IMAGE",image);
			}
			
			String name = request.getParameter("displayName");
			
			if(name != null || name != ""){
				session.setAttribute("DISPLAYNAME",name);
			}
		
			try{
				conn = connect();
				stmt = conn.createStatement();

				String q = "select * from dbo.e_User where LoginID = '" +id+ "'";
				ResultSet rs = stmt.executeQuery(q);

				if(rs.next()) {
					accessID = rs.getString("LoginID");
					userLevel = rs.getString("UserLevel");
					userName = rs.getString("UserName");
					choice = rs.getString("Choice");
					displayName = rs.getString("DisplayName");

					if(accessID.equals(id)){
						session.setAttribute("USERID",accessID);
						session.setAttribute("CHOICE",choice);
						session.setAttribute("USERLEVEL",userLevel);
						session.setAttribute("TYPE","tw");
						session.setAttribute("DISPLAYNAME",displayName);

						if(userLevel.equals("1")){ // 이벤트 참여했을 경우.
							session.setAttribute("USERNAME",userName);
							out.print("loginComplete({'result':'success', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
						}else if(userLevel.equals("0")){
							out.print("joinProcess({'result':'goEvent', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
						}
					}
				} else {
						session.setAttribute("USERID",id); // 트위터 로그인은 했으나, 등록되지 않은 아이디 일 경우 
						session.setAttribute("TYPE","tw");
						out.print("joinProcess({'result':'goRegist', 'type':'"+type+"', 'id':'"+id+"', 'level':'"+userLevel+"'})");
				}
				rs.close();

			} catch (Exception e) {
				e.printStackTrace(System.out);
			} finally {
				if(stmt != null) try{stmt.close();}catch(SQLException ex){}
				if(conn != null) try{conn.close();}catch(SQLException ex){}
			}
		}else if(type.equals("logout")){
			//out.print("3");
			
			session.invalidate(); 
			out.print("loginComplete({'result':'logout'})");
		}else{
			//out.print("4");
			out.print("loginComplete({'result':'error'})");
		}



%>