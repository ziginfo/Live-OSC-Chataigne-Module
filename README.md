## Live-OSC-Chataigne-Module
controls Ableton-Live via OSC and Chataigne 

This Module has been tested on Ableton-Live-Suite 11; but may run also on other versions (not yet tested !)    
To get this OSC-Module run correctly, you must first donwload and install the free [AbletonOSC](https://github.com/ideoforms/AbletonOSC) Remote-Script and than activate it in Ableton Live !!   
The Chataigne Module will be shown under the Menu "Software" and its name is "Live OSC Advanced".
 
There is already a basic Ableton-Live-Module in the Chataigne's Modules-Menu (based on another Max4Live-OSC Plugin) . I wrote this extended script to have more Control on Ableton Live and getting more Feedback from the DAW. If you don't need all these "full" features use the basic module instead. It has much less Data-Traffic and so it'll be much faster, especially when using many other modules and mappings in your Chataigne Project.... Please be aware that you must choose the basic OR the advanced Module and activate only the concerned OSC-Driver as they are not compatible to run both at the same time on a Live-Session !    

This Advanced module here is still in developpement and I can add some more features and actions if needed. Just contact me for that ! Ableton-Live is quite complexe to remote and there are hundreds of possible Remote Actions and Feedback.   
BUT : this module is based on an Python library that has been written by another person :  [Daniel Jones](https://github.com/ideoforms) .   So I could only use what is already available in the Python-Script, and there are still some lacks, unfortunately !    
for example it is still not possible to "fire" Scenes by OSC-Remote with this Library. Many other users requested this feature and hopefully, ideoforms will add it in the future.       
    
### Actual Version is 1.4
I just updated it and added some more features, as Markers Feedback and Color Features (all 70 Ableton Colors are now available for Actions as well as for Feedback !)     
##### Please read carefully the following advices :   
After changing the Number of shown Channels and Clips/Scenes you must save the Chataigne session (cmd-S) and than reload it (cmd-shift-O)    
Channel Names, Faders and Meters are shown and noticed in the same order as they are arranged and indexed in the Albeton-Live-Mixer !! This means that when you change a channel's place (move it to the left or the right) in the Live-Mixer, it is possible that the changes are NOT immediatly reflected in Chataigne, and in any case you must reset and resync the Data in Chataigne (I added some Trigger-Buttons for that)...    
It is important to know : when changing/moving Track's Places in Ableton-Live's Mixer; the mixer's internal Index is reset (but not transmitted by OSC) and some of Chataigne's Feedback-Values (especially Meter and Fader) will receive  false informations (=> Track-Index may not be up-to-date in Chataigne !!) !! To avoid this kind of confusion, the best way is to Save (cmd-S) the Ableton-Live-Session and reload it (File->Open Recent...) !! By loading a Live-Session, its Index of the Mixer-Elements (Tracks etc) is automatically updated. And so Chataigne will receive the correct Datas and put it in the right Cases in the Feedback-Containers !  

Please keep in mind that Chataigne and Abelton-Live can eventually slow down, when you are requesting too much Feedback ! Especially "Showtime" and "Metering" creates a huge and continous Data-Traffic!! So try to use only what you really need and deactivate what is less important ! It might be helpfull to enable incomind data logging to see what happens !

You can set the number of shown Tracks (min = 8) and the number of shown Scenes (Clips -> min = 4) ! In the "Infos Container" and after "Syncing" you will also see the actual number of available and used Tracks and Scenes for the actual connected Live-Session !   
There is a SyncButton (called "Update Chataigne Settings") to automatically adjust the  Chataigne's Tracks- and Scenes-Number to your Live-Mixer-Session-Settings !   

This module will grow up with more features.    
Please contact me if you have any suggestions, demands or requests and any help is always welcome !!   
Have Fun   

Special Thanks to [Daniel Jones](https://github.com/ideoforms) who wrote essentially the Python library for the Remote Script called AbletonOSC.   
Special Thanks to [Dan Hemerlein](https://github.com/danhemerlein), who encoded the Ableton Live Color Palette.    

To learn more about Chataigne, please visit : http://benjamin.kuperberg.fr/chataigne/    
And Ben's Youtube channel where you can find tutorials : https://youtu.be/RSBU9MwJNLY