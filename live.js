// ========================== VARS ===========================
var chancount = local.parameters.numberOfTracks.get() ;

//====================================================================
//			INITIAL FUNCTIONS 
//====================================================================

function init() {

	local.send("/live/track/start_listen/volume", "*") ;
	local.send("/live/track/start_listen/name", "*") ;
	local.send("/live/track/get/output_meter_level", "*") ;
	local.send("/live/song/get/tempo") ;
	local.send("/live/track/stop_listen/output_meter_left", "*") ;
	local.send("/live/track/stop_listen/output_meter_right", "*") ;
//	local.send("/live/track/start_listen/output_meter_left", "*") ;
//	local.send("/live/track/start_listen/output_meter_right", "*") ;


// =====================================================================
// 			CREATE CONTAINERS
// =====================================================================

Snap = local.values.addStringParameter("Selected Channel", "Shows Selected Channel Name","Selected Channel");
//	activeCue = local.values.addStringParameter("Active Cue", "Shows Active Cue Name","Active Cue");
//	nextCue = local.values.addStringParameter("Next Cue", "Shows Next Cue Name","Next Cue");
	tempo = local.values.addFloatParameter("Tempo", "Shows the Temp en BPM", 0, 0);
//		cpu.setAttribute("readonly" ,true);


//Track Labels Container >>>>>>>>>>>>>>>>>>>>>>		
		label=local.values.addContainer("Track Labels");
		label.setCollapsed(true);
		label.addTrigger("Sync Labels", "Get Labels from Live" , false);
		label.addTrigger("Reset Labels", "Reset All Labels" , false);	
		for (var n = 1; n <= chancount; n++) {
			label.addStringParameter("Label "+n, "", ""); }
			
// Track Faders Container>>>>>>>>>>>>>>>>>>>>>		
		faders = local.values.addContainer("Track Volumes");
		faders.setCollapsed(true);
		faders.addTrigger("Sync Faders", "Get Fader Values from Live" , false);		
		faders.addTrigger("Reset Values", "Reset All Values" , false);		
		for (var n = 1; n <= chancount; n++) {
			var fade = faders.addFloatParameter("Fader "+n, "", 0, 0, 1);
			fade.setAttribute("readonly" ,true);  }
			
// Channel Meters Container>>>>>>>>>>>>>>>>>>>>>		
		meter = local.values.addContainer("Meters");
		meter.setCollapsed(true);
//		meter.addBoolParameter("Activate Meters", "Set the Meters ON" , false);	
		for (var n = 1; n <= chancount; n++) {
			var met = meter.addFloatParameter("Track "+n, "", 0, 0, 1);
			met.setAttribute("readonly" ,true);  
			}
			
// Clips Container >>>>>>>>>>>>>>>>>>>>>>		
		clip=local.values.addContainer("Clip Labels");
		clip.setCollapsed(true);
		clip.addTrigger("Sync Clip Labels", "Get Labels from Live" , false);
		clip.addTrigger("Reset Clip Labels", "Reset All Labels" , false);	
		for (var n = 1; n <= 8; n++) {
			clip.addStringParameter("Clip "+n, "", ""); }
			
			
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
  
  	if (value.name == "syncGains"){ 
  	local.send("/GlobalSnapshots/Refresh"); 
  	local.send("/StatusPoll") ;  	}
  	
  	if (value.name == "syncLabels"){ 
  	local.send("/live/track/start_listen/name", "*") ;}
  	
  	if (value.name == "syncFaders"){ 
  	local.send("/live/track/start_listen/volume", "*"); 
  	local.send("/live/track/start_listen/output_meter_level", "*") ;}
  	
  	if (value.name == "syncMeters"){ 
  	local.send("/live/track/start_listen/output_meter_level", "*"); }
  	
  	if (value.name == "resetLabels"){ 
  	for (var n = 0; n < chancount; n++) {
	var no = n+1 ;
	local.values.trackLabels.getChild('Label'+no).set(""); 
	} }
		
	if (value.name == "resetValues"){ 
  	for (var n = 0; n < chancount; n++) {
	var no = n+1 ;
	var child = "fader"+no ;
	local.values.trackVolumes.getChild('Fader'+no).set(0);
	} }
    
  
}

//============================================================
//			OSC EVENTS
//============================================================

function oscEvent(address, args) {
	
 // >>> Tempo
 	if (address == "/live/song/get/tempo")
 	{local.values.tempo.set(args[0]);}	


// >>> insert Track Labels	
	for (var n = 0; n < chancount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/name" ;
	if (address == addr)
	{if (args[0] == n)
	 {	local.values.trackLabels.getChild('Label'+no).set(args[1]); } }
	}

// >>> insert Fader Volume	
	for (var n = 0; n < chancount; n++) {
	var no = n+1 ;
	var addr = "/live/track/get/volume" ;
	if (address == addr) 
	{if (args[0] == n)
	{local.values.trackVolumes.getChild("fader"+no).set(args[1]);} }
	}
	
// >>> insert Meter Value	

	for (var n = 0; n < chancount; n++) {
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

/*
function update(deltaTime) {
	var now = util.getTime();
	if(now > TSSendAlive) {
		TSSendAlive = now + 10;
		keepAlive(); }
}

 function keepAlive() {
	local.send ("/live/track/start_listen/volume", "*");
	}

*/
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

//  =================  Markers  ===================

function prev_mark () {
local.send("/live/song/jump_to_prev_cue");
}

function next_mark () {
local.send("/live/song/jump_to_next_cue");
}






























function set_snap(val) {
	val = val-1 ;
	local.send("/GlobalSnapshots/Recall", val);
}

function prev_snap() {
	local.send("/Command/GlobalSnapshots/RecallPreviousGlobalSnapshot");
}

function next_snap() {
	local.send("/Command/GlobalSnapshots/RecallNextGlobalSnapshot");
}

function update_snap() {
	local.send("/Command/GlobalSnapshots/UpdateActiveGlobalSnapshot");
}

function add_snap() {
	local.send("/Command/GlobalSnapshots/AddNewGlobalSnapshot");
}

/// ===========Cues  ==================

function cuelist_top() {
	local.send("/Command/CueLists/GoToTop");
}

function cue_down() {
	local.send("/Command/CueLists/StepDown");
}

function cue_up() {
	local.send("/Command/CueLists/StepUp");
}

function set_listcue(list, cue) {
//	val = val-1 ;
	
	local.send("/Cue/Recall", [list , cue]);
}

function set_cue(val) {
//	val = val-1 ;
	local.send("/Cue/Recall", val);
}

function prev_cue() {
	local.send("/Command/CueLists/FirePreviousCue");
}

function next_cue() {
	local.send("/Command/CueLists/FireNextCue");
}

function stop_cues() {
	local.send("/Command/CueLists/StopAllCues");
}

/// =========== Chain Control =============

function add_chain() {
	local.send("/Command/Chains/AddNewChain");
}

function prev_chain() {
	local.send("/Command/PluginWindows/SelectPreviousChain");
}

function next_chain() {
	local.send("/Command/PluginWindows/SelectNextChain");
}

function prev_plug() {
	local.send("/Command/PluginWindows/SelectPreviousPlugin");
}

function next_plug() {
	local.send("/Command/PluginWindows/SelectNextPlugin");
}

function move_up() {
	local.send("/GigPerformer/MoveUp");
}

function move_down() {
	local.send("/GigPerformer/MoveDown");
}

/// =========== View Control =============

function recall_view(val) {
	local.send("/Command/ViewSets/RecallViewSet"+val);
}

function routing_view() {
	local.send("/Command/View/PluginAudioRouting");
}

function wiring_view() {
	local.send("/Command/ViewModes/WireView");
}

function chains_view() {
	local.send("/Command/ViewModes/Chains");
}

function main_view(val) {
	local.send("/Command/ViewModes/"+val);
}

function plug_manager() {
	local.send("/Command/Options/PluginManager");
}

function shortcuts() {
	local.send("/Command/Options/KeyboardShortcuts");
}

function program_options() {
	local.send("/Command/Options/ProgramOptions");
}

function project_options() {
	local.send("/Command/Options/ProjectOptions");
}

function fullscreen() {
	local.send("/Command/View/FullScreen");
}

/// =========== Show Hide Panels =============

function audio_panel() {
	local.send("/Command/View/PluginAudioRouting");
}

function midi_panel() {
	local.send("/Command/View/PluginMidiPanel");
}

function plugsnap_panel() {
	local.send("/Command/View/PluginSnapshotPanel");
}

function plugpreset_panel() {
	local.send("/Command/View/PluginPresetList");
}

function navi_panel() {
	local.send("/Command/View/Navigator");
}

function snapshots_panel() {
	local.send("/Command/View/GlobalSnapshotsPanel");
}

function cuelists_panel() {
	local.send("/Command/View/CueListPanel");
}

function transport_panel() {
	local.send("/Command/View/TransportPanel");
}

function workspace_panel() {
	local.send("/Command/View/WorkspacePanel");
}

/// =========== Main Actions =============

function save() {
	local.send("/Command/Project/SaveProject");
}

function save_as() {
	local.send("/Command/Project/SaveAs");
}

function rename_project() {
	local.send("/Command/Project/RenameProject");
}

function close() {
	local.send("/Command/Project/CloseProject");
}

function open() {
	local.send("/Command/Project/Open");
}

function quit() {
	local.send("/Command/Application/Quit");
}

function recall_workspace(val) {
	local.send("/Command/Workspaces/RecallWorkspace"+val);
}



