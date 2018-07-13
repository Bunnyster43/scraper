# scraper

# MongoDB Homework - Alternate

### Overview

This is an alternate, more challenging assignment to the "NYT Scraper" homework in Unit 18. There are some helpful setup tips in the original instructions that you should read over, but to get credit for this assignment, you _must_ attempt the app outlined below.

Don't worry, it's still very similar in design to the [NYT Scraper](http://nyt-mongo-scraper.herokuapp.com/), so you can continue to reference it for architectural help, but we're going to build something a little more complicated that has some useful tracking built into it.

### Phase One

Our app is going to scrape two separate websites at once to consolidate game and movie reviews. The websites we will be scraping are:

  1. http://www.nintendolife.com/reviews
  2. https://www.avclub.com/c/review/movie-review

We'll have one "reviews" collection in our Mongo database that will store information from these two websites:

  * Name of game or movie
  * Type of media (game or movie)
  * Date the article was published
  * Link to the article
  * An array of clicks

Regarding the clicks array: we want to track if users are actually using our website, so whenever someone clicks on a link, we want to add _a timestamp of when it was clicked_ to the clicks array in the db. This will help us track not only which articles are more popular but _when_ they were popular.

On the front-end, users should, on initial page load, see all of the articles saved in our "reviews" collection. By default, these should be sorted by date of publication. However, we want to add a few buttons that will let the user sort/filter them in other ways. At a minimum, we want to be able to:

  * sort by date (the default)
  * sort alphabetically
  * sort by popularity (based on clicks)
  * filter by type (i.e. only show games or movies)

It's up to you if you want to do the sorting on the front-end or on the back-end via APIs.

We do need two more buttons on the front-end, though. One button to initiate the scraping of our game and movie websites and another button to "purge" unpopular articles. When the purge button is clicked, all articles that have never been clicked should be removed from the database.

### Phase Two

Once you get this far, the next step is to add a search box on the front-end. When users enter a search keyword and press Enter, they should only see  articles that have that keyword in the game/movie title.

At the same time, we want to track what users have been searching for. So every time a user searches, we are going to save that in a second collection called "searches." This collection will hold two values per record:

  * the keyword
  * an array of timestamps

Meaning if the same keyword is used again, it doesn't create a duplicate record in the database; it adds a timestamp to the existing array.

Finally, create an `/admin` route/page that displays all of this tracking data. Don't worry about password-protecting this route.

### Minimum Requirements

A working version of this app must be deployed to Heroku. Broken deployments won't receive a grade, nor will falling back on the easier homework assignment. Good luck!
