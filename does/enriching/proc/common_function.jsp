<%!

public static String base64Encode(String str)  throws java.io.IOException {
  if ( str == null || str.equals("") ) {
     return "";
  } else {
     sun.misc.BASE64Encoder encoder = new sun.misc.BASE64Encoder();
     byte[] b1 = str.getBytes();
     String result = encoder.encode(b1);
     return result;
  }
}


public static String base64Decode(String str)  throws java.io.IOException {
  if ( str == null || str.equals("") ) {
     return "";
  } else {
     sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
     byte[] b1 = decoder.decodeBuffer(str);
     String result = new String(b1);
     return result;
  }
}  

public static String removeTag(String str)  throws java.io.IOException {
	String content = str.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	return content;
}  


public String htmlRemove(String str) {
  StringBuffer t = new StringBuffer();
  StringBuffer t2 = new StringBuffer();
  
 
  char[] c = str.toCharArray();
  char ch;
  int d = 0;
  boolean check = false;
  boolean scriptChkeck = false;
  boolean styleCheck = false;
  for(int i=0,len = c.length;i<len;i++) {
   ch = c[i];
   if(ch=='<') {
    check = true;
   }
   
   if(!check&!scriptChkeck&&!styleCheck){
    
    t.append(ch);
   }

    d++;
    t2.append(ch);
    if(d>9){
     t2.delete(0,1);

    }
    
    
    if(!scriptChkeck) {
     if(t2.toString().toLowerCase().indexOf("<script")==0){
      scriptChkeck = true; 
     }
     
    }
    if(scriptChkeck) {
     if(t2.toString().toLowerCase().indexOf("</script>")==0){
     
      scriptChkeck = false; 
     }

    }
    
    
    if(!styleCheck) {
     if(t2.toString().toLowerCase().indexOf("<style")==0){
      styleCheck = true; 
     }
     
    }
    if(styleCheck) {
     
     if(t2.toString().toLowerCase().indexOf("</style>")==0){
      styleCheck = false; 
     }

    }
    
    if(ch=='>') {
     check = false;
    }
   }
  
    
  return  t.toString();  
 }
 


%>