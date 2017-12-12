[Dean Khurana's Crusade Against Harvard Undergraduate Social Groups](https://www.ziziberry.github.io)
======
###  ZiZi Zhang, Tessa Muss, Kelly Luo
###  CS171 Final Project (Fall 2017)  

&nbsp;
## Project Links
### [Live Website](https://ziziberry.github.io/)
### [Process Book](https://docs.google.com/document/d/1DGIaF2ng46NAVub3uPMyiwnfLDLeKbN5lVuhvWiyTPg/edit?usp=sharing)
### [Screencast Video](https://youtu.be/hde3ZOHuqrE)
### [Github Repository](https://github.com/ziziberry/ziziberry.github.io)


&nbsp;
#### Troubleshooting
While completing the project, we occasionally experienced an error with the d3-tip library we used for tooltips that affected rendering of certain visualizations; the console error read "TypeError: Cannot read property 'tagName' of null and is likely due to inconsistencies in the d3-tip library code with the updated d3 v4. We believe we have resolved the issue as we no longer encounter the same error. **However, we recommend that you check console first to verify you do not encounter the same error; if it does, please _**reload the page**_ and everything will work as it should.**

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
Visualization of pro-sanction voices versus anti-sanction voices to highlight the ongoing debate about the implementation and enforcement of social sanctions at Harvard. 

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

&nbsp;  
## Sources
#### Faculty
* [Report of the Committee on the Unrecognized Single-Gender Social Organizations (USGSO)](https://usgsocommittee.fas.harvard.edu/files/usgso-committee/files/usgso_committee_report_2017_final_draft.pdf)
* [Final Report of the Implementation Committee for the Policy on Membership in Single Gender Social Organizations](http://osl.fas.harvard.edu/files/osl/files/implementationcommitteefinalreport.pdf)
* [Dean Khurana Letter to Drew Faust](https://college.harvard.edu/sites/default/files/deankhurana_letter.pdf)
* [Harry Lewis Op-Ed in The Washington Post](https://www.washingtonpost.com/opinions/harvards-nondiscrimination-hypocrisy/2017/04/21/519cff78-2540-11e7-b503-9d616bd5a305_story.html?utm_term=.d696ca8a3a59)
#### Peer Institutions
* [Amherst College](https://www.amherst.edu)
* [Williams College](https://williams.edu)
* [Harvard College](https://college.harvard.edu)
* [Bowdoin College](http://www.bowdoin.edu/)
#### Student Organizations
* [Asian American Brotherhood](http://aabrotherhood.com/)
* [Association of Black Harvard Women](http://blackharvardwomen.wixsite.com/abhw)
* [Radcliffe Choral Society](https://www.radcliffechoralsociety.com/)
* [Kappa Alpha Theta](http://www.kappaalphatheta.org/?from=chaptersitebounce)
#### The Harvard Crimson
* https://www.thecrimson.com/article/2017/12/6/sanctions-to-stay-mainbar/
* http://www.thecrimson.com/article/2016/5/10/women-oppose-sanctions/  
* http://www.thecrimson.com/article/2016/5/26/summers-denounces-sanctions/ 
* http://www.thecrimson.com/article/2017/12/11/sanctions-handbook-addition/
* https://www.thecrimson.com/article/2017/12/12/house-bill-sanctions/
* http://www.thecrimson.com/article/2017/12/8/sanctions-enforcement-next-semester/
* https://www.thecrimson.com/article/2017/12/12/house-bill-sanctions/
* http://www.thecrimson.com/widget/2017/5/23/sanctions-timeline/