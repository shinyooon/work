<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.awt.image.BufferedImage" %>
<%@ page import="java.awt.Graphics" %>
<%@ page import="java.io.*" %>
<%@ page import="java.net.URL" %>
<%@ page import="javax.imageio.ImageIO" %>

<%

	String requestMethod = request.getMethod();
	if (!requestMethod.equals("POST")) {
		response.sendRedirect("../error.jsp");
		return;
	}
 

/*
	URL url = new URL("https://graph.facebook.com/marko/picture");

	File file = new File("https://graph.facebook.com/marko/picture");
	
	BufferedImage bi = ImageIO.read(file);

	out.println(bi);
	
*/
	
/*
	String url = request.getParameter("url");
	String filename = request.getParameter("filename");
	
	
	
	
	try {
		URL u = new URL(url);
		
		InputStream fin = u.openStream();
		OutputStream fos = new FileOutputStream("lotte/" + filename + ".jpg");
		
		while(true){
			int data = fin.read();
			if(data == -1){
				System.out.println("파일 끝");
				break;
			}
	
			fos.write(data);
		}

		
		
		fin.close();
		fos.close();
		
		out.print("profileSaveComplete({'result':'success', 'filename':'"+filename+"'})");
	
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		out.print("profileSaveComplete({'result':'error', 'filename':'"+filename+"'})");
	} 
*/
	
	
		
	
	try {
	



	BufferedImage image = null;

	String profile = request.getParameter("profile");
	String id = request.getParameter("id");



	String filename = "tw_" + id;



	//out.print(url);
	//out.print("1");
	//url = "http://profile.ak.fbcdn.net/hprofile-ak-prn1/573001_100001957807805_611116054_q.jpg";
	
	image = ImageIO.read(new URL(profile));
	
	//out.print("2");
	
	BufferedImage bufferedImage = new BufferedImage(image.getWidth(),image.getHeight(), BufferedImage.TYPE_INT_BGR);
	//out.print("3");
	Graphics g = bufferedImage.getGraphics();
	//out.print("4");
	g.drawImage(bufferedImage, 0, 0, null);
	//out.print("5");
	
	
	
	ImageIO.write(image,"jpg", new File("D:/does/lotte/profile_image/"+filename+".jpg"));
	//out.print("6");
	
	out.print("profileSaveComplete({'result':'success', 'filename':'"+filename+".jpg', 'id':'"+id+"'})");



} catch (Exception e) { 
	e.printStackTrace(); 
	out.print("profileSaveComplete({'result':'error', 'message':'"+e+"'})");
} 





%>