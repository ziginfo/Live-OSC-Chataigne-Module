## Live-OSC-Chataigne-Module
controls Ableton-Live via OSC and Chataigne   
.... I am still working on this module ! Some featured might not work yet, and there might be still some bugs in there...
Ableton-Live is quite complexe to remote...       
this module is an "advanced" version of the basic Ableton-Live-Module which is already integrated in Chataigne

To get this OSC-Module run correctly, you must first donwload and install the free [LiveOSC](https://github.com/ideoforms/AbletonOSC) Remote-Script and than activate it in Ableton Live !!   
The Module will be shown under the Menu "Software" and its name is "Live OSC Advanced".
    
### Actual Version is 1.2     
##### Please read carefully the following advices :   
After changing the Number of shown Channels and Clips/Scenes you must save the Chataigne session (cmd-S) and than reload it (cmd-shift-O)    
Channel Names, Faders and Meters are shown and noticed in the same order as they are VISIBLE and arranged in the Albeton-Live-Mixer !! This means that after changing a channel's place (move it to the left or the right) you must reset and resync the Data in Chataigne; and if you use "Sub-Groups" the "channel-display" in Chataigne depends if the subgroup is expanded or not...    
and very important : when changing Track's Places in Ableton-Live's Mixer; the mixers internal Index is reset and some of Chataigne's Feedback-Values (especially Meter and Fader) will receive  false informations (=> Track-Index not up-to-date !!) !! To avoid this kind of confusion, the best way is to Save (cmd-S) the Ableton-Live-Session and reload it (File->Open Recent...) !! By loading a Live-Session its Index of the Mixer-Elements (Tracks etc) is automatically updated. And so Chataigne will receive the right Datas and put it in the right Cases in the Feedback-Containers !  

Please keep in mind that Chataigne and Abelton-Live can eventually slow down, when you are requesting too much Feedback ! Especially Showtime and Metering creates a huge Data-Traffic!! So try to use only what you really need and deactivate what is less important ! 

You can set the number of shown Tracks (min = 8) and the number of shown Scenes (Clips -> min = 4) ! In the "Infos" Container and after "Syncing" you will also see the actual number of available and used Tracks and Scenes in the actual Live-Session !   
There is a SyncButton to automatically adjust the  Chataigne's Tracks- and Scenes-Number, to your Live-Mixer-Settings !   

This module will grow up with more features.    
Please contact me if you have suggestions, demands or requests and any help is always welcome !!   
Have Fun

To learn more about Chataigne, please visit : http://benjamin.kuperberg.fr/chataigne/    
And Ben's Youtube channel where you can find tutorials : https://youtu.be/RSBU9MwJNLY
