

// 기본 플래시				
function flashObj(URL,SizeX,SizeY,LnkId,param) // quick
{
    document.write('            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ');
    document.write('                    codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" ');
    document.write('                    width="'+SizeX+'" height="'+SizeY+'"  id="'+LnkId+'" align="middle">');
    document.write('            <param name="movie"     value="'+URL+'" />');
    document.write('            <param name="quality"   value="high" />');
    document.write('        <param name="wmode"     value="transparent"/>');
	document.write('   <param name="allowScriptAccess" value="always"/> ');
	document.write('   <param name="base" value="." />');
	document.write('<param name="flashvars" value="' + param + '"/>');
	document.write('            <embed base="." src="'+URL+'" quality="high" width="'+SizeX+'" height="'+SizeY+'"  align="middle" ');
	document.write('         wmode="transparent" ');
	document.write('             type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowScriptAccess="always" swLiveConnect=true name="'+LnkId+'"  />');
	document.write('            </embed></object>');
}

function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter =
	"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	obj.src=''; 
	return '';
}
