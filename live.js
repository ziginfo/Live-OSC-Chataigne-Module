//====================================================================
//			VARIABLES 
//====================================================================

var trackcount = local.parameters.numberOfTracks.get() ;
var scenecount = local.parameters.numberOfScenes.get() ;
var markercount = 12 ;
var mark = [] ;
var id = 0 ;
var colorid ;

var advices = ["When these settings are changed, please 'Save' the Session (cmd-S) and than 'Reload' it again (cmd-shift-O) !" , "Save and Reload the Session after Update!"] ;

var trackItems = {
	"nam"	: ["Label", "s", "label"],
	"fad" : ["Fader", "f","fader"],
	"pan" : ["Pan", "fp","pan"],
	"mute" : ["Mute", "b","mute"],
	"eq" : ["EQ", "b","eq"] };


var colors = { 
"1" : ["32192","0.000","0.490","0.753"],"2" : ["49071","0.000","0.749","0.686"],"3" : ["695438","0.039","0.612","0.557"],"4" : ["1090798","0.063","0.643","0.933"],"5" : ["1698303","0.098","0.914","1.000"],"6" : ["1716118","0.102","0.184","0.588"],"7" : ["1769263","0.102","1.000","0.184"],"8" : ["2319236","0.137","0.388","0.518"],"9" : ["2490280","0.145","1.000","0.659"],"10" : ["3101346","0.184","0.322","0.635"],"11" : ["3947580","0.235","0.235","0.235"],"12" : ["4047616","0.239","0.765","0.000"],"13" : ["5480241","0.325","0.624","0.192"],"14" : ["5538020","0.329","0.502","0.894"],"15" : ["6094824","0.361","1.000","0.910"],"16" : ["6441901","0.384","0.294","0.678"],"17" : ["7491393","0.447","0.310","0.255"],"18" : ["8092539","0.482","0.482","0.482"],"19" : ["8237133","0.490","0.690","0.302"],"20" : ["8623052","0.514","0.576","0.800"],"21" : ["8754719","0.522","0.588","0.122"],"22" : ["8758722","0.522","0.647","0.761"],"23" : ["8912743","0.529","1.000","0.404"],"24" : ["8940772","0.533","0.424","0.894"],"25" : ["8962746","0.533","0.761","0.729"],"26" : ["9160191","0.545","0.773","1.000"],"27" : ["9611263","0.573","0.655","1.000"],"28" : ["10056267","0.600","0.447","0.294"],"29" : ["10060650","0.600","0.514","0.416"],"30" : ["10204100","0.608","0.702","0.769"],"31" : ["10208397","0.608","0.769","0.553"],"32" : ["10701741","0.639","0.294","0.678"],"33" : ["10851765","0.647","0.584","0.710"],"34" : ["10927616","0.651","0.745","0.000"],"35" : ["11096369","0.663","0.318","0.192"],"36" : ["11119017","0.663","0.663","0.663"],"37" : ["11442405","0.682","0.596","0.898"],"38" : ["11481907","0.686","0.200","0.200"],"39" : ["11958214","0.714","0.467","0.776"],"40" : ["12026454","0.718","0.510","0.337"],"41" : ["12173795","0.725","0.757","0.890"],"42" : ["12243060","0.729","0.816","0.455"],"43" : ["12349846","0.737","0.443","0.588"],"44" : ["12558270","0.749","0.624","0.745"],"45" : ["12565097","0.749","0.729","0.412"],"46" : ["12581632","0.749","0.984","0.000"],"47" : ["13013643","0.776","0.573","0.545"],"48" : ["13381230","0.800","0.180","0.431"],"49" : ["13408551","0.800","0.600","0.153"],"50" : ["13482980","0.804","0.733","0.894"],"51" : ["13496824","0.804","0.945","0.973"],"52" : ["13684944","0.816","0.816","0.816"],"53" : ["13821080","0.824","0.894","0.596"],"54" : ["13872497","0.827","0.678","0.443"],"55" : ["13958625","0.831","0.992","0.882"],"56" : ["14183652","0.847","0.424","0.894"],"57" : ["14402304","0.859","0.765","0.000"],"58" : ["14837594","0.886","0.404","0.353"],"59" : ["15029152","0.898","0.325","0.627"],"60" : ["15064289","0.898","0.863","0.882"],"61" : ["15597486","0.929","1.000","0.682"],"62" : ["16149507","0.965","0.424","0.012"],"63" : ["16249980","0.969","0.957","0.486"],"64" : ["16725558","1.000","0.212","0.212"],"65" : ["16726484","1.000","0.224","0.831"],"66" : ["16749734","1.000","0.580","0.651"],"67" : ["16753524","1.000","0.639","0.455"],"68" : ["16753961","1.000","0.647","0.161"],"69" : ["16773172","1.000","0.941","0.204"],"70" : ["16777215","1.000","1.000","1.000"] };

var livecolors = [ {"id": 0,"col": 1,"row": 1,"hex": 0xFFFD95A7,"rgb": { "r": 255, "g": 153, "b": 170 },"name": "Fight the Sunrise"},{"id": 1,"col": 2,"row": 1,"hex": 0xFFFDA43A,"rgb": { "r": 255, "g": 160, "b": 62 },"name": "Hawaiian Passion"}, {"id": 2,"col": 3,"row": 1,"hex": 0xFFCB9834,"rgb": { "r": 204, "g": 153, "b": 51 },"name": "Gomashio Yellow"},{"id": 3,"col": 4,"row": 1,"hex": 0xFFF7F384,"rgb": { "r": 247, "g": 235, "b": 131 },"name": "Gold Amber"},{"id": 4,"col": 5,"row": 1,"hex": 0xFFC0F932,"rgb": { "r": 192, "g": 251, "b": 45 },"name": "Spring Green"},{"id": 5,"col": 6,"row": 1,"hex": 0xFF32FD42,"rgb": { "r": 45, "g": 254, "b": 84 },"name": "Bright Light Green"},{"id": 6,"col": 7,"row": 1,"hex": 0xFF39FDAA,"rgb": { "r": 54, "g": 255, "b": 154 },"name": "Eva Green"},{"id": 7,"col": 8,"row": 1,"hex": 0xFF65FEE8,"rgb": { "r": 85, "g": 255, "b": 238 },"name": "Icy Life"}, {"id": 8,"col": 9,"row": 1,"hex": 0xFF8DC6FD,"rgb": { "r": 136, "g": 204, "b": 255 },"name": "Light Cyan"},{"id": 9,"col": 10,"row": 1,"hex": 0xFF5682E1,"rgb": { "r": 85, "g": 136, "b": 221 },"name": "Azur"},{"id": 10,"col": 11,"row": 1,"hex": 0xFF93A9FC,"rgb": { "r": 153, "g": 170, "b": 255 },"name": "Light Blue"},{"id": 11,"col": 12,"row": 1,"hex": 0xFFD670E2,"rgb": { "r": 221, "g": 119, "b": 221 },"name": "Hibiscus Pop"},{"id": 12,"col": 13,"row": 1,"hex": 0xFFE3569F,"rgb": { "r": 221, "g": 85, "b": 153 },"name": "Magenta"},{"id": 13,"col": 14,"row": 1,"hex": 0xFFFFFFFF,"rgb": { "r": 255, "g": 255, "b": 255 },"name": "White"},{"id": 14,"col": 1,"row": 2,"hex": 0xFFFC393D,"rgb": { "r": 255, "g": 64, "b": 64 },"name": "Coral Red"}, {"id": 15,"col": 2,"row": 2,"hex": 0xFFF46C20,"rgb": { "r": 244, "g": 113, "b": 30 },"name": "Apocalyptic Orange"},{"id": 16,"col": 3,"row": 2,"hex": 0xFF98714E,"rgb": { "r": 151, "g": 111, "b": 76 },"name": "Chocolate Milk"},{"id": 17,"col": 4,"row": 2,"hex": 0xFFFEEE4A,"rgb": { "r": 255, "g": 236, "b": 71 },"name": "Rape Blossoms"},{"id": 18,"col": 5,"row": 2,"hex": 0xFF8BFD70,"rgb": { "r": 140, "g": 253, "b": 126 },"name": "Easter Green"},{"id": 19,"col": 6,"row": 2,"hex": 0xFF44C121,"rgb": { "r": 70, "g": 203, "b": 24 },"name": "Harlequin Green"},{"id": 20,"col": 7,"row": 2,"hex": 0xFF1EBEAF,"rgb": { "r": 36, "g": 188, "b": 168 },"name": "Tealish"},{"id": 21,"col": 8,"row": 2,"hex": 0xFF31E9FD,"rgb": { "r": 34, "g": 238, "b": 255 },"name": "Sparky Blue"},{"id": 22,"col": 9,"row": 2,"hex": 0xFF22A5EB,"rgb": { "r": 36, "g": 160, "b": 237 },"name": "Button Blue"},{"id": 23,"col": 10,"row": 2,"hex": 0xFF127EBE,"rgb": { "r": 14, "g": 129, "b": 185 },"name": "Tall Ships"},{"id": 24,"col": 11,"row": 2,"hex": 0xFF8870E1,"rgb": { "r": 147, "g": 112, "b": 219 },"name": "Matt Purple"},{"id": 25,"col": 12,"row": 2,"hex": 0xFFB579C4,"rgb": { "r": 168, "g": 125, "b": 194 },"name": "Wisteria"}, {"id": 26,"col": 13,"row": 2,"hex": 0xFFFD42D2,"rgb": { "r": 255, "g": 72, "b": 208 },"name": "Mat Dazzle Rose"},{"id": 27,"col": 14,"row": 2,"hex": 0xFFD0D0D0,"rgb": { "r": 208, "g": 208, "b": 208 },"name": "Ancestral Water"},{"id": 28,"col": 1,"row": 3,"hex": 0xFFE0685D,"rgb": { "r": 218, "g": 101, "b": 94 },"name": "Salami Slice"},{"id": 29,"col": 2,"row": 3,"hex": 0xFFFDA378,"rgb": { "r": 255, "g": 161, "b": 119 },"name": "Butternut"},{"id": 30,"col": 3,"row": 3,"hex": 0xFFD2AC75,"rgb": { "r": 211, "g": 173, "b": 119 },"name": "Glittering Sun"},{"id": 31,"col": 4,"row": 3,"hex": 0xFFEDFEB2,"rgb": { "r": 238, "g": 255, "b": 170 },"name": "Hawthorn Blossom"},{"id": 32,"col": 5,"row": 3,"hex": 0xFFD2E39C,"rgb": { "r": 213, "g": 230, "b": 157 },"name": "Apple Bob"}, {"id": 33,"col": 6,"row": 3,"hex": 0xFFBACF79,"rgb": { "r": 188, "g": 203, "b": 122 },"name": "Greenish Tan"}, {"id": 34,"col": 7,"row": 3,"hex": 0xFF9CC38F,"rgb": { "r": 154, "g": 191, "b": 141 },"name": "Olive Sand"},{"id": 35,"col": 8,"row": 3,"hex": 0xFFD5FDE2,"rgb": { "r": 208, "g": 247, "b": 228 },"name": "Cactus Water"},{"id": 36,"col": 9,"row": 3,"hex": 0xFFCEF1F8,"rgb": { "r": 209, "g": 240, "b": 246 },"name": "Frostproof"},{"id": 37,"col": 10,"row": 3,"hex": 0xFFB9C2E2,"rgb": { "r": 187, "g": 197, "b": 226 },"name": "California Lilac"},{"id": 38,"col": 11,"row": 3,"hex": 0xFFCDBCE3,"rgb": { "r": 204, "g": 187, "b": 227 },"name": "Drifting Dream"},{"id": 39,"col": 12,"row": 3,"hex": 0xFFAE9AE3,"rgb": { "r": 168, "g": 153, "b": 230 },"name": "Dull Lavender"},{"id": 40,"col": 13,"row": 3,"hex": 0xFFE5DCE1,"rgb": { "r": 229, "g": 218, "b": 225 },"name": "Violet Vapor"},{"id": 41,"col": 14,"row": 3,"hex": 0xFFA9A9A9,"rgb": { "r": 169, "g": 168, "b": 169 }, "name": "Ultimate Gray"},{"id": 42,"col": 1,"row": 4,"hex": 0xFFC5928C,"rgb": { "r": 194, "g": 150, "b": 139 },"name": "Pressed Blossoms"},{"id": 43,"col": 2,"row": 4,"hex": 0xFFB68259,"rgb": { "r": 180, "g": 131, "b": 91 },"name": "Choco Biscuit"},{"id": 44,"col": 3,"row": 4,"hex": 0xFF98836B,"rgb": { "r": 155, "g": 133, "b": 107 },"name": "Broccoli Brown"},{"id": 45,"col": 4,"row": 4,"hex": 0xFFBFB96E,"rgb": { "r": 189, "g": 183, "b": 107 },"name": "Golden Cartridge"},{"id": 46,"col": 5,"row": 4,"hex": 0xFFA6BC25,"rgb": { "r": 164, "g": 191, "b": 32 },"name": "Pea"},{"id": 47,"col": 6,"row": 4,"hex": 0xFF7EAF52,"rgb": { "r": 122, "g": 171, "b": 85 },"name": "Kiwi"},{"id": 48,"col": 7,"row": 4,"hex": 0xFF8AC2BA,"rgb": { "r": 137, "g": 193, "b": 186 }, "name": "Undine"},{"id": 49,"col": 8,"row": 4,"hex": 0xFF9CB3C3,"rgb": { "r": 158, "g": 178, "b": 195 },"name": "Perfect Landing"},{"id": 50,"col": 9,"row": 4,"hex": 0xFF86A5C1,"rgb": { "r": 136, "g": 163, "b": 194 },"name": "Windy City"},{"id": 51,"col": 10,"row": 4,"hex": 0xFF8494CA,"rgb": { "r": 131, "g": 152, "b": 202 },"name": "Grapemist"},{"id": 52,"col": 11,"row": 4,"hex": 0xFFA596B4,"rgb": { "r": 171, "g": 146, "b": 179 },"name": "Glossy Grape"},{"id": 53,"col": 12,"row": 4,"hex": 0xFFBEA0BD,"rgb": { "r": 190, "g": 156, "b": 193 },"name": "Lupine"},{"id": 54,"col": 13,"row": 4,"hex": 0xFFBB7296,"rgb": { "r": 187, "g": 119, "b": 150 },"name": "Benifuji"},{"id": 55,"col": 14,"row": 4,"hex": 0xFF7B7B7B,"rgb": { "r": 123, "g": 124, "b": 125 }, "name": "Namara Grey"},{"id": 56,"col": 1,"row": 5,"hex": 0xFFAD3436,"rgb": { "r": 172, "g": 50, "b": 53 },"name": "Red Ink"},{"id": 57,"col": 2,"row": 5,"hex": 0xFFA75135,"rgb": { "r": 168, "g": 83, "b": 53 },"name": "Orange Roughy"},{"id": 58,"col": 3,"row": 5,"hex": 0xFF714F42,"rgb": { "r": 114, "g": 80, "b": 66 },"name": "Coffee Shop"},{"id": 59,"col": 4,"row": 5,"hex": 0xFFDAC229,"rgb": { "r": 213, "g": 188, "b": 38 },"name": "Indian Pale Ale"}, {"id": 60,"col": 5,"row": 5,"hex": 0xFF85952B,"rgb": { "r": 140, "g": 150, "b": 50 },"name": "Airline Green"}, {"id": 61,"col": 6,"row": 5,"hex": 0xFF559E38,"rgb": { "r": 85, "g": 153, "b": 51 },"name": "Hubert's Truck Green"}, {"id": 62,"col": 7,"row": 5,"hex": 0xFF1B9B8E,"rgb": { "r": 18, "g": 156, "b": 139 },"name": "Flamboyant"}, {"id": 63,"col": 8,"row": 5,"hex": 0xFF266383,"rgb": { "r": 34, "g": 101, "b": 127 },"name": "Georgian Bay"},{"id": 64,"col": 9,"row": 5,"hex": 0xFF1B3393,"rgb": { "r": 34, "g": 51, "b": 153 },"name": "Deep Blue"}, {"id": 65,"col": 10,"row": 5,"hex": 0xFF3154A0,"rgb": { "r": 51, "g": 85, "b": 153 },"name": "Blue"}, {"id": 66,"col": 11,"row": 5,"hex": 0xFF624EAB,"rgb": { "r": 89, "g": 70, "b": 178 },"name": "Swiss Plum"}, {"id": 67,"col": 12,"row": 5,"hex": 0xFFA24EAB,"rgb": { "r": 154, "g": 78, "b": 174 },"name": "Purpureus"},{"id": 68,"col": 13,"row": 5,"hex": 0xFFCA326E,"rgb": { "r": 207, "g": 45, "b": 113 },"name": "Beetroot Purple"},{"id": 69,"col": 14,"row": 5,"hex": 0xFF3C3C3C,"rgb": { "r": 60, "g": 59, "b": 60 },"name": "Shisha Coal"} ] ;




//====================================================================
//			INITIAL FUNCTIONS 
//====================================================================

function init() {

// =====================================================================
// 			CREATE CONTAINERS
// =====================================================================

/*
// >>>>>> TESTINGS !!
	test=local.values.addContainer("test");
	test.addFloatParameter("red", "", 0,0,1);
	test.addFloatParameter("green", "", 0,0,1);
	test.addFloatParameter("blue", "", 0,0,1);
	test.addTrigger("send" , "" , false);
	test.addColorParameter("Color", "Color of Track",[0,0,0]);
*/

	sync = local.values.addTrigger("Sync All" , "Request values from Live !!" , false);
	stopAll = local.values.addTrigger("Stop All Feedback" , "Stop All Feedback" , false);
	syncClips = local.values.clips.addTrigger("Sync Clip Infos" , "Request Clip Infos from Live !!" , false);
	resetClips = local.values.clips.addTrigger("Reset Clip Infos" , "Reset Clip Infos from Live !!" , false);
	selTrack = local.values.addStringParameter("Selected Track", "Shows Selected Track Name","Selected Track");
	selScene = local.values.addStringParameter("Selected Scene", "Shows Selected Scene Name","Selected Scene");
	tempo = local.values.addFloatParameter("Tempo", "Shows the Tempo en BPM", 120, 30, 400);
	tempo.setAttribute("ui", "label") ;
	setTempo = local.values.addTrigger("Set New Tempo" , "Set the New Tempo to the Song !" , false);
//	metersOn = local.values.addTrigger("Activate Meters" , "Request values from Live !!" , false);
//	metersOff = local.values.addTrigger("Stop Meters" , "Stop All Feedback" , false);
	songtimeOff = local.values.addTrigger("Stop Songtime" , "Stop Songtime Feedback" , false);
		
// Track Items Container >>>>>>>>>>>>>>>>>>>>>>
		local.values.tracks.addTrigger("Sync All" , "Request Track Infos from Live !!" , false);
		local.values.tracks.addTrigger("Reset Track Infos" , "Reset Track Infos from Live !!" , false);		
		for (var n = 1; n <= trackcount; n++) {
		trac=local.values.tracks.addContainer("Track "+n);
		trac.setCollapsed(true);
		trac.addColorParameter("Color", "Color of Track",[0,0,0]);
		trac.addStringParameter("Label", "", "");
//		var read=trac.addFloatParameter("Meter", "", 0, 0, 1);
//			read.setAttribute("readonly" ,true);
		var read=trac.addFloatParameter("Fader", "", 0, 0, 1);
			read.setAttribute("readonly" ,true);
		var read=trac.addFloatParameter("Pan","", 0 , -1, 1);
			read.setAttribute("readonly" ,true);
		var read=trac.addBoolParameter("Mute", "", false);
			read.setAttribute("readonly" ,true);
		var read=trac.addBoolParameter("Solo", "", false);
			read.setAttribute("readonly" ,true);
		var read=trac.addBoolParameter("Armed", "", false);
			read.setAttribute("readonly" ,true);
		var read=trac.addBoolParameter("Grouped", "", false);
			read.setAttribute("readonly" ,true);	}
			
// Clips Container >>>>>>>>>>>>>>>>>>>>>>
		for (var n = 1; n <= trackcount; n++) {
		lab = "Track "+n+" Clips" ;
		clip=local.values.clips.addContainer(lab);
		clip.setCollapsed(true);
//		clip.addTrigger("Sync Clip Labels", "Get Labels from Live" , false);
//		clip.addTrigger("Reset Clip Labels", "Reset All Labels" , false);	
		for (var m = 1; m <= scenecount; m++) {
			var nam= "track"+n+"Clips" ;
			add=local.values.clips.getChild(nam) ;
//			add.addColorParameter("Color "+m, "Shows the Clip Color",[1,0,1]);
			add.addStringParameter("Clip "+m, "", ""); } }
			
//Scenes Labels Container >>>>>>>>>>>>>>>>>>>>>>		
		scene=local.values.addContainer("Scenes");
		scene.setCollapsed(true);
		scene.addTrigger("Sync Scenes", "Get Labels from Live" , false);
		scene.addTrigger("Reset Scenes", "Reset All Labels" , false);	
		for (var n = 1; n <= scenecount; n++) {
			scene.addStringParameter("Scene "+n, "", "");  }

/*			
//Markers Container >>>>>>>>>>>>>>>>>>>>>>		
		mark=local.values.addContainer("Markers");
		mark.setCollapsed(true);
		mark.addTrigger("Sync Markers", "Get Labels from Live" , false);
		mark.addTrigger("Reset Values", "Reset All Labels" , false);	
		for (var n = 1; n <= markercount; n++) {
			mark.addStringParameter("Marker "+n, "", "");  }
*/
			
//Track Labels Container >>>>>>>>>>>>>>>>>>>>>>		
		label=local.values.addContainer("Track Labels");
		label.setCollapsed(true);
		label.addTrigger("Sync Labels", "Get Labels from Live" , false);
		label.addTrigger("Reset Labels", "Reset All Labels" , false);	
		for (var n = 1; n <= trackcount; n++) {
//			label.addColorParameter("Color "+n, "Shows the Clip Color",[1,0,1]);
			label.addStringParameter("Label "+n, "", "");  }
			
// Track Faders Container>>>>>>>>>>>>>>>>>>>>>		
		faders = local.values.addContainer("Track Volumes");
		faders.setCollapsed(true);
		faders.addTrigger("Sync Faders", "Get Fader Values from Live" , false);		
		faders.addTrigger("Reset Values", "Reset All Values" , false);		
		for (var n = 1; n <= trackcount; n++) {
			var fade = faders.addFloatParameter("Fader "+n, "", 0, 0, 1);
			fade.setAttribute("readonly" ,true);  }
			
// Channel Meters Container>>>>>>>>>>>>>>>>>>>>>		
		meter = local.values.addContainer("Meters");
		meter.setCollapsed(true);
		meter.addTrigger("Activate Meters" , "Request values from Live !!" , false);
		meter.addTrigger("Stop Meters" , "Stop All Feedback" , false);
		for (var n = 1; n <= trackcount; n++) {
			var met = meter.addFloatParameter("Track "+n, "", 0, 0, 1);
			met.setAttribute("readonly" ,true);  
			}
			
// Session Info>>>>>>>>>>>>>>>>>>>>>		
		info = local.values.addContainer("Infos");
		info.setCollapsed(true);
		info.addTrigger("Sync All", "Synchronise Infos" , false);
//		info.addTrigger("Reset Infos", "Reset Infos" , false);	
		info.addStringParameter("Project Name", "","");
		info.addBoolParameter("Song is Playing", "Shows if the Song is Playing or not",false);
		info.addTrigger("Stop Songtime", "", false);
		info.addIntParameter("Song Time Beats", "Beats", 0);
		info.addIntParameter("Song Time Measure", "Measure", 0);
			var read = info.addIntParameter("Tempo", "Tempo", 1);
			read.setAttribute("readonly" ,true);
			var read = info.addIntParameter("All Tracks", "All Tracks",1);
			read.setAttribute("readonly" ,true);
			var read = info.addIntParameter("All Scenes", "All Tracks",1);
			read.setAttribute("readonly" ,true);
		info.addTrigger("Update Chataigne Settings", "This Trigger will set the Number of shown Tracks and Scenes in the Values-Tab to the number shown above - that is the actual used number of Tracks and Scenes in the Ableton-Live-Session !!", false);
		info.addStringParameter("Advice", "Please Save (cmd-S) and Reload (cmd-shift-O) the Session once you have changed thess values !", "Save and Reload the Session after Update!");
		info.addIntParameter("Color id", "color id", 0,0,69);
		info.addColorParameter("Color", "Shows the Live Color",[0,0,0]);
		info.addStringParameter("Color Name", "Color Name","Color Name");
}

// =====================================================================
// 			PARAM CHANGES
// =====================================================================

function moduleParameterChanged(param) {

		script.log("Param changed : "+param.name) ;

		if (param.name == "numberOfScenes" || param.name == "numberOfTracks"){
		for (var n = 1; n <= trackcount; n++) {
		local.parameters.advice.set(advices[0]) ;
		trac=local.values.tracks.removeContainer("Track "+n);
		trac=local.values.clips.removeContainer("Track "+n+" Clips");}
		for (var m = 1; m <= scenecountcount; m++) {
		trac=local.values.tracks.removeContainer("scene "+m); }
		}  
		
		if (param.name == "setToDefault") {
		local.parameters.numberOfTracks.set(8);
  		local.parameters.numberOfScenes.set(4);}
		
}

// =====================================================================
// 			VALUE CHANGES -> RESET etc...
// =====================================================================

function moduleValueChanged(value) {
		script.log("Values changed : "+value.name) ;

// Show ColorID Name and Hex-Color
	if (value.name == "colorId"){
		var id = local.values.infos.colorId.get()  ;
		var col = livecolors[id].hex;
		var nam = livecolors[id].name;
		local.values.infos.colorName.set(nam);
		local.values.infos.color.set(col);}

// >>>>> Syncing and/or Resetting Clip-Names   
  	if (value.name == "syncClipInfos"){   				
		for (var n = 0; n < trackcount; n++) {
		for (var m = 0; m < scenecount; m++) {
		local.send("/live/clip/get/name", [n,m]); } } 	}
		
/*		if (value.name == "syncClipInfos"){ 
		local.send("/live/track/get/clips/name" , "*" ) ; }
*/	
	
	if (value.name == "resetClipInfos"){   				
		for (var n = 0; n < trackcount; n++) {
		var no = n + 1 ;
		for (var m = 0; m < scenecount; m++) {
		var mo = m + 1 ;
		local.values.clips.getChild('Track'+no+'Clips').getChild('clip'+mo).set("");} } }
		
// >>>>> Sync Scenes 	
 	if (value.name == "syncScenes"){ 
  		local.send("/live/song/get/scene_names") ; }
  		
// >>>>> Sync Markers 	
 	if (value.name == "syncMarkers"){ 
  		local.send("/live/song/get/cue_points") ; } 
  		 		
// >>>>> Stop All Feedback 	
 	if (value.name == "stopAllFeedback"){ 
  		local.send("/live/song/stop_listen/beat") ;  
		local.send("/live/song/stop_listen/*");
		local.send("/live/track/stop_listen/*", "*");
	}
 		
  	if (value.name == "syncInfos"){ 
  		local.send("/live/song/get/num_tracks") ; 
  		local.send("/live/song/get/num_scenes") ;
  		local.send("/live/song/get/tempo") ;}
// >>>>> Sync All  	
  	if (value.name == "syncAll"){ 
  		local.send("/live/song/get/tempo") ;
  		local.send("/live/song/get/num_tracks") ; 
  		local.send("/live/song/get/num_scenes") ;
  		local.send("/live/track/start_listen/name", "*") ;
  		local.send("/live/track/start_listen/color", "*") ;
  		local.send("/live/track/start_listen/volume", "*") ;
  		local.send("/live/track/start_listen/panning", "*") ;
  		local.send("/live/track/start_listen/mute", "*") ;
  		local.send("/live/track/start_listen/solo", "*") ;
  		local.send("/live/track/start_listen/arm", "*") ;
  		local.send("/live/view/start_listen/selected_track") ;
  		local.send("/live/view/start_listen/selected_scene") ;
  		local.send("/live/song/start_listen/is_playing") ;
		local.send("/live/song/start_listen/beat");
		for (var n = 0; n < trackcount; n++) {
		local.send("/live/track/get/is_grouped", n); } 
  	}
// >>>>> Set Tempo  	
  	if (value.name == "setNewTempo"){
  		var temp = local.values.tempo.get() ; 
  		local.send("/live/song/set/tempo", temp) ; }
// >>>>> Stop Songtime  	
  	if (value.name == "stopSongtime"){ 
  		local.send("/live/song/stop_listen/beat") ;  
		local.values.infos.songTimeMeasure.set(1);
		local.values.infos.songTimeBeats.set(1);
	}
// >>>>> Sync Scenes and Tracks Number  	
  	if (value.name == "updateChataigneSettings"){
  		var tranu = local.values.infos.allTracks.get();
  		var scenu = local.values.infos.allScenes.get();
  		local.parameters.numberOfTracks.set(tranu);
  		local.parameters.numberOfScenes.set(scenu);  }
// >>>>> Sync Labels   	
  	if (value.name == "syncLabels"){ 
  		local.send("/live/track/start_listen/name", "*") ;
  		local.send("/live/track/start_listen/color", "*") ;}
// >>>>> Sync  Faders  	
  	if (value.name == "syncFaders"){ 
  		local.send("/live/track/start_listen/volume", "*") ;  }
// >>>>> Activate Meters   	
 	if (value.name == "activateMeters"){ 
 		local.send("/live/track/start_listen/output_meter_level", "*"); }
 	if (value.name == "stopMeters"){ 
 		local.send("/live/track/stop_listen/output_meter_level", "*");
 		for (var n = 0; n < trackcount; n++) {
		var no = n+1 ;
		var child = "fader"+no ;
		local.values.meters.getChild('Track'+no).set(0);
	}  }
// >>>>> Reset Labels 	  	
  	if (value.name == "resetLabels"){ 
  		for (var n = 0; n < trackcount; n++) {
		var no = n+1 ;
		local.values.trackLabels.getChild('Label'+no).set("");
//		local.values.trackLabels.getChild('Color'+no).set(""); 
	} }
// >>>>> Reset Scenes 	  	
  	if (value.name == "resetScenes"){ 
  		for (var n = 0; n < scenecount; n++) {
		var no = n+1 ;
		local.values.scenes.getChild('Scene'+no).set("");
	} }
// >>>>> Reset Track Values		
	if (value.name == "resetValues"){ 
  		for (var n = 0; n < trackcount; n++) {
		var no = n+1 ;
		var child = "fader"+no ;
		local.values.trackVolumes.getChild('Fader'+no).set(0);
		local.values.meters.getChild('Track'+no).set(0);
	} }
// >>>>> Reset  All Track Infos	
	if (value.name == "resetTrackInfos"){ 
  		for (var n = 0; n < trackcount; n++) {
		var no = n+1 ;
		var child = "Track"+no ;
		local.values.tracks.getChild(child).label.set("");
		local.values.tracks.getChild(child).color.set(0,0,0);
		local.values.tracks.getChild(child).meter.set(0);
		local.values.tracks.getChild(child).fader.set(0);
		local.values.tracks.getChild(child).pan.set(0);
		local.values.tracks.getChild(child).mute.set(0);
		local.values.tracks.getChild(child).solo.set(0);
		local.values.tracks.getChild(child).armed.set(0);
		local.values.tracks.getChild(child).grouped.set(0);
	} }
      
}

//============================================================
//			OSC EVENTS
//============================================================

function oscEvent(address, args) {

// >>> Song is Playing ??
 	if (address == "/live/song/get/is_playing") {
 		local.values.infos.songIsPlaying.set(args[0]);}	
 		
// >>> Tempo
 	if (address == "/live/song/get/tempo") {
 		local.values.tempo.set(args[0]);
 		local.values.infos.tempo.set(args[0]);}
 		
// >>> Selected Track
 	if (address == "/live/view/get/selected_track") {
 		local.send("/live/track/get/name",args[0]); }
 	if (address == "/live/track/get/name") {
 		local.values.selectedTrack.set(args[1]);}
 		
// >>> Selected Scene
 	if (address == "/live/view/get/selected_scene") {
 		id = args[0];
 		local.send("/live/song/get/scene_names");}
 		if (address == "/live/song/get/scene_names") {
 		var no = id + 1 ;
 		var val = ""+no+" - "+args[id] ;
 		local.values.selectedScene.set(val);
 		 }
 	
// >>> Song Time 	
 	if (address == "/live/song/get/beat") {
 		var beats = args[0] + 1  ;
		var meas = (args[0] + 4) / 4 ;
//		var calc = local.values.infos.songTimeMeasure.get()  ;
//		beats =  beats - ((calc - 1) * 4);  
		local.values.infos.songTimeMeasure.set(meas);
		local.values.infos.songTimeBeats.set(beats);}
 	
// >>> Number of Scenes
 	if (address == "/live/song/get/num_scenes") {
 		local.values.infos.allScenes.set(args[0]);}
// >>> Number of Tracks
 	if (address == "/live/song/get/num_tracks") {
 		local.values.infos.allTracks.set(args[0]);}	

//  >>>>>>>> INSERT TRACK VALUES <<<<<<<<<<<<	

// >>> insert Track Color	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/color" ;
	if (address == addr) {
	if (args[0] == n){
	var col = args[1] ;	
	var items = util.getObjectProperties(colors);
	var val3 = colors[items[3]][0] ;
	for (var c = 0; c < items.length; c++) {
	if (colors[items[c]][0] == col) {
	var r = colors[items[c]][1] ;
	var g = colors[items[c]][2] ;
	var b = colors[items[c]][3] ;
	local.values.tracks.getChild('Track'+no).color.set(r,g,b);
	}  } } } }

// >>> insert Scene Labels	
	for (var n = 0; n < scenecount; n++) {
	var no = n+1 ;
	var addr = "/live/song/get/scene_names" ;
	if (address == addr){
	var arg = args[n] ;
	local.values.scenes.getChild("scene"+no).set(arg) ; }  }

/*	
// >>> insert Marker Labels	
	for (var n = 0; n < markercount; n++) {
	var no = n+1 ;
	var addr = "/live/song/get/cue_points" ;
	if (address == addr){
	var mark = args[n];
	local.values.markers.getChild("marker"+no).set(mark) ; }  }
*/
	
// >>> insert Track Labels	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/name" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.trackLabels.getChild('Label'+no).set(args[1]);
	 	local.values.tracks.getChild('Track'+no).label.set(args[1]); } }
	}	
// >>> insert Fader Volume	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/volume" ;
	if (address == addr) 
	{if (args[0] == n)
	{	local.values.trackVolumes.getChild("Fader"+no).set(args[1]);
		local.values.tracks.getChild('Track'+no).fader.set(args[1]);} }
	}	
// >>> insert Pan	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/panning" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.tracks.getChild('Track'+no).pan.set(args[1]); } }
	}	
// >>> insert Mute	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/mute" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.tracks.getChild('Track'+no).mute.set(args[1]); } }
	}	
// >>> insert Solo	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/solo" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.tracks.getChild('Track'+no).solo.set(args[1]); } }
	}
// >>> insert Arm	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/arm" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.tracks.getChild('Track'+no).armed.set(args[1]); } }
	}
// >>> insert is_grouped	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/is_grouped" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.tracks.getChild('Track'+no).grouped.set(args[1]); } }
	}		
// >>> insert Meter Value	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/output_meter_level" ;
	if (address == "/live/track/get/output_meter_level")
	{if (args[0] == n)
	{	local.values.meters.getChild("track"+no).set(args[1]);
//		local.values.tracks.getChild('Track'+no).meter.set(args[1]);
	} } }
	
// >>> insert Clip Names	
	for (var n = 0; n < trackcount; n++) {	
	var no = n+1 ;
	var addr = "/live/clip/get/name" ;
//	var addr = "/live/track/get/clips/name" ;
	if (address == addr) {	
	if (args[0] == n) {	
	for (var m = 0; m < scenecount; m++) {
	if (args[1] == m) { 
	var mo = m + 1 ;
	local.values.clips.getChild('Track'+no+'Clips').getChild('clip'+mo).set(args[2]);} } 	
	}  }  }		
		
}

//========================================================================
//					KEEP ALIVE
//========================================================================

function update(deltaTime) {
	var now = util.getTime();
	if(now > TSSendAlive) {
		TSSendAlive = now + 5;
		keepAlive(); }
}

 function keepAlive() {
// 		local.send("/live/song/get/is_playing") ;
	}

// =====================================================================
// 			GENERIC FUNCTIONS
// =====================================================================

// ____________________________________________
// >>>>>> Generic Functions <<<<<<<<<<<<<<<
// ____________________________________________

//===========TRACKS ================
function master_volume(val) {
	local.send("/master/volume", val);
}

function volume(no, val) {
	no =no-1 ;
	local.send("/live/track/set/volume", [no, val]);	
}

function pan(no, val) {
	no= no-1 ;
	local.send("/live/track/set/panning", [no,val]);	
}

function mute(no , val) {
	no= no-1 ;
	local.send("/live/track/set/mute", [no,val]);
}

function solo(no, val) {
	no= no-1 ;
	local.send("/live/track/set/solo", [no,val]);
}

function select(no) {
no = no-1 ;
	local.send("/live/view/set/selected_track", no);
}

function send(no, send, val){
		no = no - 1;
		send = send -1 ; 
	local.send("/live/track/set/send", [no, send, val]);	
}

function tr_name(no, name){
		no = no - 1; 
	local.send("/live/track/set/name", [no, name]);	
}

function tr_color(no, col){
		no = no - 1; 
	local.send("/live/track/set/color", [no, col]);	
}

function tr_col_id(no, col){
		no = no - 1; 
	local.send("/live/track/set/color_index", [no, col]);	
}

function play() {
	local.send("/live/song/start_playing");
}

function stop() {
	local.send("/live/song/stop_playing");
}

function resume_play() {
	local.send("/live/song/continue_playing");
}

function cycle(val) {
	local.send("/live/song/set/loop", val);
}

function rec() {
	local.send("/live/song/trigger_session_record");
}

function click() {
	local.send("/click");
}

function rwind() {
	local.send("/live/song/continue_playing");
}

function taptempo() {
	local.send("/live/song/tap_tempo");
}

function metronome(val) {
	local.send("/live/song/set/metronome", val);
}
function bank_back() {
	local.send("/device/track/bank/-");
}

function bank_next() {
	local.send("/device/track/bank/+");
}

function bank_sel(no) {
	local.send("/device/track/bank/select/"+no) ;
}

function track_back() {
	local.send("/device/track/-");
	local.send("/reaper/track/follows/device");
}

function track_next() {
	local.send("/device/track/+");
	local.send("/reaper/track/follows/device");
}

function preset_next(no, fx) {
	local.send("/track/"+no+"/fx/"+fx+"/preset+");
}

function preset_prev(no, fx) {
	local.send("/track/"+no+"/fx/"+fx+"/preset-");
}

function fx_drywet(no, fx, val) {
	local.send("/track/"+no+"/fx/"+fx+"/wetdry", val);
}

function fx_bypass (no, fx, val) {
	local.send("/track/"+no+"/fx/"+fx+"/bypass", val);
}

//  =================  Clips and Scenes ===================

function sel_scene (no) {
no= no-1;
local.send("/live/view/set/selected_scene", no ) ;
}

function play_scene (no) {
no= no-1;
local.send("/live/view/set/selected_scene", no ) ;
local.send("/live/view/start_listen/selected_scene");
}

function stop_track_clips (no) {
no= no-1;
local.send("/live/track/stop_all_clips" , no);
}

function stop_all_clips (no) {
local.send("/live/song/stop_all_clips");
}

function fire_clip (track,clip) {
track= track-1;
clip= clip-1;
local.send("/live/clip/fire", [track , clip]);
}

function stop_clip (track,clip) {
track= track-1;
clip= clip-1;
local.send("/live/clip/stop", [track , clip]);
}

function rename_clip (track,clip, name) {
track= track-1;
clip= clip-1;
local.send("/live/clip/set/name", [track , clip , name]);
}

//  =================  Song Actions  ===================

function new_scene (text,no) {
 no= no-1;
local.send("/live/song/create_scene", no);
}

function duplicate_scene (no) {
no= no-1;
local.send("/live/song/duplicate_scene", no);
}

function delete_scene (no) {
no= no-1;
local.send("/live/song/delete_scene", no);
}

function set_tempo (val) {
local.send("/live/song/set/tempo", val);
}

//  =================  Markers  ===================

function prev_mark () {
local.send("/live/song/jump_to_prev_cue");
}

function next_mark () {
local.send("/live/song/jump_to_next_cue");
}

function jump_mark (val) {
val = val - 1 ;
local.send("/live/song/cue_point/jump", val);
}

function jump_beats (val) {
local.send("/live/song/jump_by", val);
}

//  =================  Actions  ===================

function undo (val) {
local.send("/live/song/undo");
}

function redo (val) {
local.send("/live/song/redo");
}

function create_track (track, no) {
no= no-1;
local.send("/live/song/"+track, no);
}

function aux_track () {
local.send("/live/song/create_return_track");
}

function dupli_track ( no) {
no= no-1;
local.send("/live/song/duplicate_track", no);
}

function del_track (track, no) {
no= no-1;
local.send("/live/song/"+track, no);
}

