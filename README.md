# capstone-part-4
STEPS I TOOK

1. First, I created required files: index.html,styles.css and script.js

2. I built a simple layout: a date form, APOD display section, and favourites section.

3. I added basic styling and made the page responsive.

4. I signed up for the NASA API key and connected the APOD API.

5. I displayed the title, date, image, explanation, and added the HD image click.

6. When APOD was a video, I displayed a message instead of the video.

7. I used localStorage to save, load, and delete favourite APODs.

8. I used addEventListener() for all events and prevented page reloads.

9. I tested everything with different dates, then pushed to the part-4 branch and updated the README.

RESOURCES USED

1. NASA APOD API documentation

2. MDN Web Docs (fetch(), localStorage, event listeners, JSON)

3. Chrome DevTools for testing and debugging

4. GitHub for version control and branch setup

CHALLANGES FACED

1. Some APOD results were videos, so I had to add a check and show a message instead of trying to load them.

2. localStorage only accepts strings, so I used JSON.stringify() and JSON.parse() to save and load favourite APODs.

