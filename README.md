[Dean Khurana's Crusade Against Harvard Undergraduate Social Groups](https://www.ziziberry.github.io)
======
###  ZiZi Zhang, Tessa Muss, Kelly Luo
###  CS171 Final Project (Fall 2017)  

&nbsp;
## Project Links
### [Live Website](https://ziziberry.github.io/)
### [Process Book](https://docs.google.com/document/d/1DGIaF2ng46NAVub3uPMyiwnfLDLeKbN5lVuhvWiyTPg/edit?usp=sharing)
### [Screencast Video](youtube.com)
### [Github Repository](https://github.com/ziziberry/ziziberry.github.io)


&nbsp;
## Visualizations
#### **USGSO Quiz**
Presented with descriptions of various student organizations at Harvard, determine whether the club is a "USGSO" or "Not USGSO" by clicking the associated buttons. This quiz visualization highlights ambiguities in the administration's definition of a USGSO as to which clubs and student organizations with single-gender membership are classified as USGSOs. 

#### **Key Characters in the Sanctions**
Hover over the images to reveal a tooltip with more information about key parties involved in the progression of the undergraduate social sanctions. 

#### **Key Events in the Sanctions**
Interactive timeline overview of the development of the social sanctions since their inception in May 2016. Each event is linked to relevant news coverage in The Harvard Crimson. 

#### **Harvard vs. Peer Institutions Radar Chart**
The interactive radar chart overlays a school profile of Harvard College versus those of Peer Institutions identified by sanctions policy reports. Hover over individual nodes for specific statistics regarding a certain dimension and click on a layer to learn more information about the particular school.

#### **Diverse Perspectives**
Visualization of pro-sanction voices vs anti-sanction voices to highlight the ongoing debate about the implementation and enforcement of social sanctions at Harvard. 

#### **USGSO Perspective**
Select a group from dropdown to visualize a specific subset of clubs (all, sororities, fraternities, male final clubs, female final clubs). Select a button to visualize status of clubs before or after the sanctions announcement. Hover over icons to identify the organization and contextualize their current status in regards to the sanctions. 


&nbsp;
## Project Code

#### Javascript
* **categories.js**: (visualization) status of USGSOs before and after the sanctions
* **description.js**: description of different categories of USGSOs
* **main.js**: primary javascript file for data loading and wrangling
* **radarvis.js**: (visualization) radar chart comparing Harvard's school profile against peer institutions; developed alongside a modified version of the radar chart library _radarchart.js_
* **treevis.js**: (visualization) key players in the development of the social group sanctions
* **usgsoquiz.js**: (visualization) interactive quiz to higlight ambiguities in the definition of USGSOs under the sanctions.

####  HTML & CSS
* **index.html**: primary html file for webpage structure and content 
* **style.css**: primary css file for webpage style  

&nbsp;  

## External Libraries

#### Javascript
* [d3.js](https://d3js.org/)
* [jquery.min.js](https://jquery.com/)
* [d3-tip.js](https://github.com/Caged/d3-tip): tooltip library to supplement visualiztions 
* [jquery.fullPage.js](asynchronous): fullpage.js is a scrolling and layout template for the webpage
* [queue.v1.min.js](https://github.com/d3/d3-queue): queue and load data files asynchronously 
* [timelinevis.js](https://timeline.knightlab.com/): library from the Knight Lab for the timeline visualization
* [radarchart.js](http://bl.ocks.org/nbremer/6506614): base code for creating the radar chart, but heavily modified and adapted to specific visualization needs


#### CSS
* [bootstrap.css](https://getbootstrap.com/): webpage structure and style
* [animate.min.css](https://daneden.github.io/animate.css/): fade-in animations