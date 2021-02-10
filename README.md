# year-in-review
The second React app that I've made for a Discord server I've partaken in this past 2020.
## get-data
This is an associated small node program run in a subdirectory of the actual page directory (where index.html is once its built). It is run by a crontab every 12 hours which runs the node program then clones the profile pictures directory into the page directory where it is then accessed by the site itself.
