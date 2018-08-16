<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.net.*" %>
<%@ page import="java.io.*" %>

<%
	String addrQry = request.getParameter("dong");
	String apiurl = "http://www.multiculturebridge.org/zipcode/checkPost.jsp?dong=";

	HttpURLConnection conn = null;
	Exception exception=null;
	String output = "";
	if(addrQry != null && addrQry.trim().length()>0){	


		 try{
			apiurl += URLEncoder.encode(addrQry.trim(),"EUC-KR");
			URL url = new URL(apiurl);
			conn = (HttpURLConnection) url.openConnection();
			InputStream in = conn.getInputStream();


			StringBuffer sb = new StringBuffer();
			byte[] b = new byte[4096];
			for (int n; (n = in.read(b)) != -1;) {
				sb.append(new String(b, 0, n, "UTF-8"));
			}
			output= sb.toString();
			
/*			StringBuilder sb=new StringBuilder();
			output += " 666";
			BufferedReader br = new BufferedReader(is);
			String read = br.readLine();			
			while(read != null) {
			    sb.append(read);
			    read =br.readLine();			
			}
			output= sb.toString();
*/
		
		 }catch(Exception e){
			 exception = e;
			 output = exception.getMessage();
		 }

	 }
%>
<%=output%>