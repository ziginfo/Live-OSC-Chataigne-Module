//====================================================================
//			VARIABLES 
//====================================================================

var trackcount = local.parameters.numberOfTracks.get() ;
var scenecount = local.parameters.numberOfScenes.get() ;

var trackItems = {
	"nam"	: ["Label", "s", "label"],
	"fad" : ["Fader", "f","fader"],
	"pan" : ["Pan", "fp","pan"],
	"mute" : ["Mute", "b","mute"],
	"eq" : ["EQ", "b","eq"],
	"dyn" : ["Dyn", "b","dyn"],
	"locut" : ["LoCut", "b","loCut"]};
//====================================================================
//			INITIAL FUNCTIONS 
//====================================================================

function init() {

// =====================================================================
// 			CREATE CONTAINERS
// =====================================================================

	sync = local.values.addTrigger("Sync All" , "Request values from Live !!" , false);
	stopAll = local.values.addTrigger("Stop All Feedback" , "Stop All Feedback" , false);
	syncClips = local.values.clips.addTrigger("Sync Clip Infos" , "Request Clip Infos from Live !!" , false);
	resetClips = local.values.clips.addTrigger("Reset Clip Infos" , "Reset Clip Infos from Live !!" , false);
	selTrack = local.values.addStringParameter("Selected Track", "Shows Selected Track Name","Selected Track");
//	selScene = local.values.addStringParameter("Selected Scene", "Shows Selected Scene Name","Selected Scene");
	tempo = local.values.addFloatParameter("Tempo", "Shows the Temp en BPM", 120, 30, 400);
	tempo.setAttribute("ui", "label") ;
	setTempo = local.values.addTrigger("Set New Tempo" , "Set Tempo" , false);
	metersOn = local.values.addTrigger("Activate Meters" , "Request values from Live !!" , false);
	metersOff = local.values.addTrigger("Stop Meters" , "Stop All Feedback" , false);
	songtimeOff = local.values.addTrigger("Stop Songtime" , "Stop Songtime Feedback" , false);
	
// Track Items Container >>>>>>>>>>>>>>>>>>>>>>
		local.values.tracks.addTrigger("Sync All" , "Request Track Infos from Live !!" , false);
		local.values.tracks.addTrigger("Reset Track Infos" , "Reset Track Infos from Live !!" , false);		
		for (var n = 1; n <= trackcount; n++) {
		trac=local.values.tracks.addContainer("Track "+n);
		trac.setCollapsed(true);
		trac.addColorParameter("Color", "Color of Track",[0,0,0]);
		trac.addStringParameter("Label", "", "");
		var read=trac.addFloatParameter("Meter", "", 0, 0, 1);
			read.setAttribute("readonly" ,true);
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
			add.addStringParameter("Clip "+m, "", ""); } }
			
//Scenes Labels Container >>>>>>>>>>>>>>>>>>>>>>		
		scene=local.values.addContainer("Scenes");
		scene.setCollapsed(true);
		scene.addTrigger("Sync Scenes", "Get Labels from Live" , false);
		scene.addTrigger("Reset Scenes", "Reset All Labels" , false);	
		for (var n = 1; n <= scenecount; n++) {
			scene.addStringParameter("Scene "+n, "", "");  }
			
//Track Labels Container >>>>>>>>>>>>>>>>>>>>>>		
		label=local.values.addContainer("Track Labels");
		label.setCollapsed(true);
		label.addTrigger("Sync Labels", "Get Labels from Live" , false);
		label.addTrigger("Reset Labels", "Reset All Labels" , false);	
		for (var n = 1; n <= trackcount; n++) {
			label.addStringParameter("Label "+n, "", "");
//			label.addColorParameter("Color "+n, "Description of my color param",[1,0,1]); 
			}
			
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
		info.addTrigger("Stop Songtime", "", false);
		info.addIntParameter("Song Time Measure", "Measure", 0);
		info.addIntParameter("Song Time Beats", "Beats", 0);
			var read = info.addIntParameter("Tempo", "Tempo", 1);
			read.setAttribute("readonly" ,true);
			var read = info.addIntParameter("All Tracks", "All Tracks",1);
			read.setAttribute("readonly" ,true);
			var read = info.addIntParameter("All Scenes", "All Tracks",1);
			read.setAttribute("readonly" ,true);
		info.addTrigger("Update Chataigne Settings", "", false);
		info.addStringParameter("Advice", "Reload the Session after Update!", "Reload the Session after Update!");
			
}

// =====================================================================
// 			PARAM CHANGES
// =====================================================================

function moduleParameterChanged(param) {  
}

// =====================================================================
// 			VALUE CHANGES -> RESET etc...
// =====================================================================

function moduleValueChanged(value) {

// >>>>> Syncing and/or Resetting Clip-Names   
  	if (value.name == "syncClipInfos"){   				
		for (var n = 0; n < trackcount; n++) {
		for (var m = 0; m < scenecount; m++) {
		local.send("/live/clip/get/name", [n,m]); } } 	}
		
	if (value.name == "resetClipInfos"){   				
		for (var n = 0; n < trackcount; n++) {
		var no = n + 1 ;
		for (var m = 0; m < scenecount; m++) {
		var mo = m + 1 ;
		local.values.clips.getChild('Track'+no+'Clips').getChild('clip'+mo).set("");} } }
		
// >>>>> Sync Scenes 	
 	if (value.name == "syncScenes"){ 
  		local.send("/live/song/get/scene_names") ; }
  		
// >>>>> Stop All Feedback 	
 	if (value.name == "stopAllFeedback"){ 
  		local.send("/live/song/stop_listen/current_song_time") ;  
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
		local.send("/live/song/start_listen/current_song_time");
		for (var n = 0; n < trackcount; n++) {
		local.send("/live/track/get/is_grouped", n); } 
  	}
// >>>>> Set Tempo  	
  	if (value.name == "setNewTempo"){
  		var temp = local.values.tempo.get() ; 
  		local.send("/live/song/set/tempo", temp) ; }
// >>>>> Stop Songtime  	
  	if (value.name == "stopSongtime"){ 
  		local.send("/live/song/stop_listen/current_song_time") ;  
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
	
// >>> Tempo
 	if (address == "/live/song/get/tempo") {
 		local.values.tempo.set(args[0]);
 		local.values.infos.tempo.set(args[0]);}
// >>> Selected Track
 	if (address == "/live/view/get/selected_track") {
 		local.send("/live/track/get/name",args[0]); }
 	if (address == "/live/track/get/name") {
 		local.values.selectedTrack.set(args[1]);}

// >>> Song Time 	
 	if (address == "/live/song/get/current_song_time") {
 		var args = args[0] +1 ;
		var meas = (args +3) / 4 ;
		var compte = Math.round(meas * 4) ;
		var beats = (meas * 4)  - args ;  
		local.values.infos.songTimeMeasure.set(meas);
		local.values.infos.songTimeBeats.set(args);}
 	
// >>> Number of Scenes
 	if (address == "/live/song/get/num_scenes") {
 		local.values.infos.allScenes.set(args[0]);}
// >>> Number of Tracks
 	if (address == "/live/song/get/num_tracks") {
 		local.values.infos.allTracks.set(args[0]);}	


//  >>>>>>>> INSERT TRACK VALUES <<<<<<<<<<<<<<<<	
/*
// >>> insert Track Color	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/color" ;
	if (address == addr)
	{if (args[0] == n)
	var col = "1,1,1"  ;
	 {	local.values.trackLabels.getChild('Color'+no).set([0.5,1,0]); } }
	}
*/
// >>> insert Track Labels	
	for (var n = 0; n < scenecount; n++) {
	var no = n+1 ;
	var addr = "/live/song/get/scene_names" ;
	if (address == addr){
	var arg = args[n] ;
	local.values.scenes.getChild("scene"+no).set(arg) ; }  }
	
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
		local.values.tracks.getChild('Track'+no).meter.set(args[1]);} }
	}
	
// >>> insert Clip Names	
	for (var n = 0; n < trackcount; n++) {	
	var no = n+1 ;
	var addr = "/live/clip/get/name" ;
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
	}

// =====================================================================
// 			GENERIC FUNCTIONS
// =====================================================================

// Generic Functions

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

function play() {
	local.send("/live/song/start_playing");
}

function stop() {
	local.send("/live/song/stop_playing");
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

function audio_track (no) {
no= no-1;
local.send("/live/song/create_audio_track", no);
}
function midi_track (no) {
no= no-1;
local.send("/live/song/create_midi_track", no);
}

function aux_track () {
local.send("/live/song/create_return_track");
}

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

