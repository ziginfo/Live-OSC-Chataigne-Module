// ========================== VARS ===========================
var trackcount = local.parameters.numberOfTracks.get() ;
var scenecount = local.parameters.numberOfScenes.get() ;

//====================================================================
//			INITIAL FUNCTIONS 
//====================================================================

function init() {

/*
//	local.send("/live/track/start_listen/volume", "*") ;
//	local.send("/live/track/start_listen/name", "*") ;
//	local.send("/live/track/get/output_meter_level", "*") ;
	local.send("/live/song/start_listen/num_scenes") ;
	local.send("/live/song/get/num_scenes") ;
	local.send("/live/song/get/tempo") ;
	local.send("/live/track/stop_listen/output_meter_left", "*") ;
	local.send("/live/track/stop_listen/output_meter_right", "*") ;
//	local.send("/live/track/start_listen/output_meter_left", "*") ;
//	local.send("/live/track/start_listen/output_meter_right", "*") ;
*/

// =====================================================================
// 			CREATE CONTAINERS
// =====================================================================

Sync = local.values.addTrigger("Sync" , "Request values from Live !!" , false);
Synclips = local.values.clips.addTrigger("Sync Clip Infos" , "Request Clip Infos from Live !!" , false);
Resetclips = local.values.clips.addTrigger("Reset Clip Infos" , "Reset Clip Infos from Live !!" , false);
Snap = local.values.addStringParameter("Selected Channel", "Shows Selected Channel Name","Selected Channel");
//	activeCue = local.values.addStringParameter("Active Cue", "Shows Active Cue Name","Active Cue");
//	nextCue = local.values.addStringParameter("Next Cue", "Shows Next Cue Name","Next Cue");
	tempo = local.values.addFloatParameter("Tempo", "Shows the Temp en BPM", 0, 0);
//		cpu.setAttribute("readonly" ,true);


//Scenes Labels Container >>>>>>>>>>>>>>>>>>>>>>		
		scene=local.values.addContainer("Scenes");
		scene.setCollapsed(true);
		scene.addTrigger("Sync Scenes", "Get Labels from Live" , false);
		scene.addTrigger("Reset Scenes", "Reset All Labels" , false);	
		for (var n = 1; n <= scenecount; n++) {
			scene.addStringParameter("Scene "+n, "", "");}
			
//Track Labels Container >>>>>>>>>>>>>>>>>>>>>>		
		label=local.values.addContainer("Track Labels");
		label.setCollapsed(true);
		label.addTrigger("Sync Labels", "Get Labels from Live" , false);
		label.addTrigger("Reset Labels", "Reset All Labels" , false);	
		for (var n = 1; n <= trackcount; n++) {
			label.addStringParameter("Label "+n, "", "");
			label.addColorParameter("Color "+n, "Description of my color param",[1,0,1]); }
			
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
		meter.addTrigger("Activate Meters", "Set the Meters ON" , false);
		meter.addTrigger("Stop Meters", "Set the Meters OFF" , false);	
		for (var n = 1; n <= trackcount; n++) {
			var met = meter.addFloatParameter("Track "+n, "", 0, 0, 1);
			met.setAttribute("readonly" ,true);  
			}
			
// Clips Container >>>>>>>>>>>>>>>>>>>>>>

		for (var n = 1; n <= trackcount; n++) {
		lab = "Track "+n+" Clips" ;
		clip=local.values.clips.addContainer(lab);
		clip.setCollapsed(true);
		clip.addTrigger("Sync Clip Labels", "Get Labels from Live" , false);
//		clip.addTrigger("Reset Clip Labels", "Reset All Labels" , false);	
		for (var m = 1; m <= scenecount; m++) {
			var nam= "track"+n+"Clips" ;
			add=local.values.clips.getChild(nam) ;
			add.addStringParameter("Clip "+m, "", ""); } }
			
			
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
  
  	if (value.name == "syncClipInfos"){ 
 // 		local.send("/live/track/start_listen/name", "*") ;
//  	local.send("/live/clip/get/name", [1,3]) ;
//  	local.send("/live/track/get/clips/name", "0") ;
//  	local.send("/live/track/get/arrangement_clips/name", "0") ;
		local.send("/live/track/get/clips/name", 0) ; 
  	}
  	
  	if (value.name == "sync"){ 
  	local.send("/live/song/get/tempo") ; }
  	
  	if (value.name == "syncScenes"){ 
  	local.send("/live/song/start_listen/name", "*") ;  }
  	
  	if (value.name == "syncLabels"){ 
  	local.send("/live/track/start_listen/name", "*") ;
  	local.send("/live/track/start_listen/color", "*") ;}
  	
  	if (value.name == "syncFaders"){ 
  	local.send("/live/track/start_listen/volume", "*") ;  }
  	
 	if (value.name == "activateMeters"){ 
 	local.send("/live/track/start_listen/output_meter_level", "*"); }
 	if (value.name == "stopMeters"){ 
 	local.send("/live/track/stop_listen/output_meter_level", "*");
 	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var child = "fader"+no ;
	local.values.meters.getChild('Track'+no).set(0);
	}  }
	  	
  	if (value.name == "resetLabels"){ 
  	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	local.values.trackLabels.getChild('Label'+no).set("");
	local.values.trackLabels.getChild('Color'+no).set(""); 
	} }
		
	if (value.name == "resetValues"){ 
  	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var child = "fader"+no ;
	local.values.trackVolumes.getChild('Fader'+no).set(0);
	local.values.meters.getChild('Track'+no).set(0);
	} }
    
  
}

//============================================================
//			OSC EVENTS
//============================================================

function oscEvent(address, args) {
	
// >>> Tempo
 	if (address == "/live/song/get/tempo")
 	{local.values.tempo.set(args[0]);}
 	
// >>> Number of Scenes
 	if (address == "/live/song/get/num_scenes")
 	{local.parameters.numberOfScenes.set(args[0]);}		


// >>> insert Track Labels	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/name" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.trackLabels.getChild('Label'+no).set(args[1]); } }
	}
	
// >>> insert Track Color	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/color" ;
	if (address == addr)
	{if (args[0] == n)
	var col = "1,1,1"  ;
	 {	local.values.trackLabels.getChild('Color'+no).set([0.5,1,0]); } }
	}

// >>> insert Fader Volume	
	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/volume" ;
	if (address == addr) 
	{if (args[0] == n)
	{local.values.trackVolumes.getChild("Fader"+no).set(args[1]);} }
	}
	
// >>> insert Meter Value	

	for (var n = 0; n < trackcount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/output_meter_level" ;
	if (address == "/live/track/get/output_meter_level")
	{if (args[0] == n)
	{local.values.meters.getChild("track"+no).set(args[1]);} }
	}
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
//	local.send ("/live/track/start_listen/volume", "*");
//	local.send("/live/song/get/tempo") ;
//	local.send("/live/track/start_listen/name", "*") ;
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
	local.send("/track/"+no+"/pan", val);	
}

function mute(no) {
	local.send("/track/"+no+"/mute/toggle");
}

function solo(no, val) {
	local.send("/track/"+no+"/solo/toggle");
}

function select(no) {
no = no-1 ;
	local.send("/live/view/set/selected_track", no);

}

function send(no, send, val) {
	local.send("/track/"+no+"/send/"+send+"/volume", val);	
}

function solo_reset() {
	local.send("/soloreset");
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

function stop_clips (no) {
no= no-1;
local.send("/live/track/stop_all_clips" , no);
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

function new_scene (no) {
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

